import { db } from './db';

export class KeyStorage {
    private static cache: CryptoKey | null = null;
    private static loaded = false;
    static async save(privateKey: CryptoKey) {
        const database = await db;
        await database.put('keys', privateKey, 'private-key');
        this.cache = privateKey;
        this.loaded = true;
    }
    static async get() {
        if (this.loaded) {
            return this.cache;
        }
        const database = await db;
        this.cache = (await database.get('keys', 'private-key')) ?? null;
        this.loaded = true;
        return this.cache;
    }
    static async delete() {
        const database = await db;
        await database.delete('keys', 'private-key');
        this.cache = null;
        this.loaded = true;
    }
}
