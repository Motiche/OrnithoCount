# OrniCount Pro - Owner's Manual

## Overview
OrniCount Pro is a professional bird counting application designed for ornithologists. It allows for offline data collection in the field and subsequent synchronization with the main Birds of Iran database.

## 1. Connecting to WordPress (Birdsofiran.com)

To allow the app to upload session data to your website, you must configure your WordPress installation to accept REST API requests authenticated via **Application Passwords**.

### Step 1: Enable Application Passwords
1. Log in to your WordPress Admin Dashboard.
2. Navigate to **Users > Profile**.
3. Scroll down to the **Application Passwords** section.
4. Name the new password (e.g., "OrniCount App").
5. Click **Add New Application Password**.
6. **Important:** Copy the generated password immediately. It will not be shown again.

### Step 2: Install the Sync Plugin
You need a custom endpoint to handle the JSON data sent by the app. 

1. Create a file named `ornicount-sync.php` in `wp-content/plugins/`.
2. Paste the following code into it:

```php
<?php
/**
 * Plugin Name: OrniCount Sync
 * Description: Handles data uploads from OrniCount Pro app.
 */

add_action('rest_api_init', function () {
    register_rest_route('ornicount/v1', '/sync', [
        'methods' => 'POST',
        'callback' => 'ornicount_handle_sync',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ]);
});

function ornicount_handle_sync(WP_REST_Request $request) {
    $params = $request->get_json_params();
    
    if (empty($params['title'])) {
        return new WP_Error('missing_title', 'Title is required', ['status' => 400]);
    }

    $post_data = [
        'post_title'    => sanitize_text_field($params['title']),
        'post_content'  => '<!-- OrniCount Data Block -->', // You can expand this to generate HTML tables
        'post_status'   => 'publish', // Or 'pending' if you want to review first
        'post_type'     => 'post', // Change to 'sighting' if you use custom post types
        'meta_input'    => $params['meta']
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    return ['success' => true, 'post_id' => $post_id];
}
```

3. Go to **Plugins** in WordPress Admin and activate **OrniCount Sync**.

### Step 3: Configure the App
1. Open OrniCount Pro.
2. Click the **Log In** icon in the header.
3. Enter the Website URL: `https://birdsofiran.com`
4. Enter your WordPress **Username**.
5. Enter the **Application Password** generated in Step 1.

## 2. Using the App

### Trip Mode vs. Migration Mode
*   **Birding Trip (Default):** Simple checklist style. Click a bird to add +1 count. Use +/- buttons for adjustments. Ideal for casual outings.
*   **Migration Count:** Designed for counting stations. Clicking a bird selects it. A control panel appears at the bottom allowing you to set Direction, Age, Sex, and Count before saving. Ideal for high-volume passing birds.

### Weather Data
When starting a new session, scroll down to the "Weather Conditions" section to input temperature, wind, and cloud cover. This data is saved with the session and exported in the CSV/JSON.

### Restoring Sessions
If the app closes unexpectedly (e.g., battery dies), simply reopen it. You will be prompted to "Restore Session". This will recover your unsaved local data.

### Exporting & Sharing
Once a session is marked as **Finished**, you can:
*   **Share Text Summary:** Copies a readable list to your clipboard (great for WhatsApp/Telegram).
*   **Export CSV:** Generates a spreadsheet file.
*   **Sync to Cloud:** Uploads the data to your WordPress website (requires login).

## 3. Troubleshooting

**Sync Failed?**
*   Check your internet connection.
*   Ensure the Application Password is correct (spaces are ignored).
*   Ensure the `OrniCount Sync` plugin is active on the website.
*   Check if your security plugins (Wordfence, iThemes) are blocking REST API calls. You may need to whitelist your IP or enable "Application Passwords" in the security plugin settings.
