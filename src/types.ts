export type EventType = 'ROAD' | 'TRAIL';

export interface RunEvent {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: EventType;
    location: string;
    distances: string[];
    url?: string;
    description?: string;
    status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ENDED';
}

export type ViewMode = 'CALENDAR' | 'LIST';
