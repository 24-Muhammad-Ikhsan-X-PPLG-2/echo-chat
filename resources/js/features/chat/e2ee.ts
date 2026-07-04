// End To End Encryption.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * ===============================
 * BASE 64 HELPER.
 * ===============================
 */

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => {
        binary += String.fromCharCode(b);
    });

    return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}

export class E2EE {
    static generateKeyPair(): Promise<CryptoKeyPair> {
        return crypto.subtle.generateKey(
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            ['deriveKey'],
        );
    }
    static async exportPublicKey(publicKey: CryptoKey): Promise<string> {
        const key = await crypto.subtle.exportKey('spki', publicKey);

        return arrayBufferToBase64(key);
    }
    static async exportPrivateKey(privateKey: CryptoKey): Promise<string> {
        const key = await crypto.subtle.exportKey('pkcs8', privateKey);

        return arrayBufferToBase64(key);
    }
    static async importPublicKey(publicKey: string): Promise<CryptoKey> {
        return crypto.subtle.importKey(
            'spki',
            base64ToArrayBuffer(publicKey),
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            [],
        );
    }
    static async importPrivateKey(privateKey: string) {
        return crypto.subtle.importKey(
            'pkcs8',
            base64ToArrayBuffer(privateKey),
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            ['deriveKey'],
        );
    }
    static async deriveSharedKey(
        publicKey: CryptoKey,
        privateKey: CryptoKey,
    ): Promise<CryptoKey> {
        return crypto.subtle.deriveKey(
            {
                name: 'ECDH',
                public: publicKey,
            },
            privateKey,
            {
                name: 'AES-GCM',
                length: 256,
            },
            false,
            ['encrypt', 'decrypt'],
        );
    }
    static async encryptMessage(
        sharedKey: CryptoKey,
        message: string,
    ): Promise<{
        ciphertext: string;
        iv: string;
    }> {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            sharedKey,
            encoder.encode(message),
        );

        return {
            ciphertext: arrayBufferToBase64(encrypted),
            iv: arrayBufferToBase64(iv.buffer),
        };
    }
    static async decryptMessage(
        sharedKey: CryptoKey,
        ciphertext: string,
        iv: string,
    ): Promise<string> {
        try {
            const decrypted = await crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: new Uint8Array(base64ToArrayBuffer(iv)),
                },
                sharedKey,
                base64ToArrayBuffer(ciphertext),
            );

            return decoder.decode(decrypted);
        } catch (e) {
            console.error(e);

            return "Can't decrypt";
        }
    }
}

export class SharedKeyCache {
    private static cache = new Map<string, CryptoKey>();
    static async getOrCreate(
        conversationId: string,
        privateKey: CryptoKey,
        publicKey: string,
    ) {
        const existing = this.cache.get(conversationId);

        if (existing) {
return existing;
}

        const importedPublicKey = await E2EE.importPublicKey(publicKey);
        const sharedKey = await E2EE.deriveSharedKey(
            importedPublicKey,
            privateKey,
        );
        this.cache.set(conversationId, sharedKey);

        return sharedKey;
    }
    static clear() {
        this.cache.clear();
    }
    static delete(conversationId: string) {
        this.cache.delete(conversationId);
    }
}
