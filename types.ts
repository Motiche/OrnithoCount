
export type SessionType = 'trip' | 'counting';

export type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW' | 'Local' | string;
export type Age = 'Juv' | 'Imm' | 'Ad' | 'Non-Juv' | 'Non-adult' | 'Unknown' | string;
export type Sex = 'F' | 'M' | 'FC' | 'Unknown' | string;
export type Morph = 'Light' | 'Dark' | 'Unknown' | string;
export type Distance = 'w3' | 'w2' | 'w1' | 'o' | 'e1' | 'e2' | 'e3' | 'Unknown' | string;
export type MigrationStatus = 'Active' | 'Killed' | 'Injured' | 'Resting' | 'Other' | string;

export interface UserConfig {
  websiteUrl: string;
  username: string;
  appPassword: string; // WordPress Application Password
}

export interface Species {
  id: string;
  name: string;
  abbreviation: string;
  family?: string;
}

export interface Sighting {
  id: string;
  speciesId: string;
  timestamp: string; // ISO string
  count: number;
  latitude?: number;
  longitude?: number;
  // Detailed fields for Counting mode
  direction?: Direction;
  age?: Age;
  sex?: Sex;
  morph?: Morph;
  distance?: Distance;
  status?: MigrationStatus;
  countType?: string;
  comment?: string;
}

export interface WeatherInfo {
  temperature?: string;
  cloudCover?: string;
  windSpeed?: string;
  windDirection?: string;
  precipitation?: string;
}

export interface Session {
  id: string;
  type: SessionType;
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  latitude?: number;
  longitude?: number;
  observers: string;
  notes?: string; // Checklist/Session comments
  weather?: WeatherInfo;
  sightings: Sighting[];
  status: 'active' | 'completed';
  syncStatus?: 'synced' | 'unsynced' | 'error' | 'queued'; // New field
  remoteId?: number; // WordPress Post ID
}

export interface FieldConfig {
  active: boolean;
  label: string;
}

export interface ValidationRule {
  id: string;
  targetType: 'family' | 'species';
  targetValue: string; // Family Name or Species ID
  targetName?: string; // Display name helper
  requiredFields: string[]; // 'age', 'sex', 'direction', 'distance', 'morph'
}

export interface AppSettings {
  speciesList: Species[];
  theme: 'light' | 'dark';
  language: string;
  rules: ValidationRule[]; // New validation rules
  // Configurable lists
  codes: {
    age: string[];
    sex: string[];
    distance: string[];
    direction: string[];
    status: string[];
    morph: string[];
    countType: string[];
  };
  // Visibility/Active settings for Counting mode
  fields: {
    age: boolean;
    sex: boolean;
    distance: boolean;
    direction: boolean;
    morph: boolean;
    countType: boolean;
  };
}

export type ViewState = 'dashboard' | 'new-session' | 'active-session' | 'settings' | 'history';