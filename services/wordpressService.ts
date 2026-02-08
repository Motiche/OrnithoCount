
import { Session, UserConfig } from "../types";

/**
 * Validates credentials.
 * Tries /wp/v2/users/me first. If that fails (401/403), credentials are bad.
 * If 404 (disabled REST user endpoint), it tries the custom endpoint as a fallback check.
 */
export const validateWordPressCredentials = async (config: UserConfig): Promise<boolean> => {
    if (!config.websiteUrl || !config.username || !config.appPassword) return false;

    const auth = btoa(`${config.username}:${config.appPassword}`);
    const cleanUrl = config.websiteUrl.replace(/\/$/, '');

    try {
        // Attempt 1: Standard User Check
        const response = await fetch(`${cleanUrl}/wp-json/wp/v2/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) return true;
        
        // If 401/403, password is definitely wrong
        if (response.status === 401 || response.status === 403) return false;

        // Attempt 2: Fallback to Settings/Index if Users endpoint is hidden for security
        // We just check if we can reach the API root with auth
        const rootResponse = await fetch(`${cleanUrl}/wp-json/`, {
             method: 'GET',
             headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });
        
        return rootResponse.ok;

    } catch (error) {
        console.error("WP Auth Error:", error);
        return false;
    }
};

/**
 * Uploads a session to the custom WordPress REST API endpoint.
 * Requires the plugin code from the manual to be installed on WP.
 */
export const syncSessionToWordPress = async (session: Session, config: UserConfig): Promise<number> => {
    const auth = btoa(`${config.username}:${config.appPassword}`);
    const cleanUrl = config.websiteUrl.replace(/\/$/, '');

    // Payload matches what the custom WP endpoint expects
    const payload = {
        title: `${session.name} - ${session.date}`,
        status: 'publish',
        meta: {
            orni_session_id: session.id,
            orni_date: session.date,
            orni_location: session.name,
            orni_type: session.type,
            orni_observers: session.observers,
            orni_data: JSON.stringify(session) // Full JSON blob
        }
    };

    try {
        // Note: This endpoint must be created via the "Owner's Manual" instructions
        const response = await fetch(`${cleanUrl}/wp-json/ornicount/v1/sync`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload Failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.post_id; // Return the new WP Post ID
    } catch (error) {
        console.error("Sync Error:", error);
        throw error;
    }
};
