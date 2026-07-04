import { openDB } from 'idb';

export const db = openDB('chat-app', 1, {
    upgrade(db) {
        db.createObjectStore('keys');
    },
});
