"use client";

import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { ChatDocType, chatSchema } from "./chat-schema";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";

// 1. Definisikan tipe collection dan database
type ChatCollections = {
  chats: RxCollection<ChatDocType>;
};
export type MyDatabase = RxDatabase<ChatCollections>;

// 2. Tambahkan plugin global yang selalu dibutuhkan
addRxPlugin(RxDBQueryBuilderPlugin);

/**
 * LOGIKA DYNAMIC IMPORT UNTUK STORAGE & DEV MODE
 * Ini memastikan plugin dev-mode dan validator tidak bocor ke production bundle.
 */
let dbPromise: Promise<MyDatabase> | null = null;

const initDB = async () => {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    let storage: any = getRxStorageDexie();

    // 3. Konfigurasi khusus Development
    if (process.env.NODE_ENV === "development") {
      // Import secara dinamis agar tidak membebani production
      const { RxDBDevModePlugin } = await import("rxdb/plugins/dev-mode");
      addRxPlugin(RxDBDevModePlugin);

      const { wrappedValidateAjvStorage } =
        await import("rxdb/plugins/validate-ajv");
      storage = wrappedValidateAjvStorage({ storage });
    }

    // 4. Buat Database
    const db = await createRxDatabase<ChatCollections>({
      name: "chatappdb",
      storage: storage,
      ignoreDuplicate: process.env.NODE_ENV === "development", // Sangat penting untuk Next.js Fast Refresh
    });

    // 5. Tambah Collections
    await db.addCollections({
      chats: {
        schema: chatSchema,
      },
    });

    return db;
  })();

  return dbPromise;
};

export default initDB;
