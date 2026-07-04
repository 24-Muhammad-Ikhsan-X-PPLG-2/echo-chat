export class CryptoMan {
    private readonly encoder = new TextEncoder();
    private readonly decoder = new TextDecoder();

    private readonly iterations = 100_000;
    private readonly keyLength = 256;
    private readonly ivLength = 12;
    private readonly saltLength = 16;

    private async deriveKey(
        password: string,
        salt: Uint8Array,
    ): Promise<CryptoKey> {
        const passwordKey = await crypto.subtle.importKey(
            'raw',
            this.encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey'],
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt as BufferSource,
                iterations: this.iterations,
                hash: 'SHA-256',
            },
            passwordKey,
            {
                name: 'AES-GCM',
                length: this.keyLength,
            },
            false,
            ['encrypt', 'decrypt'],
        );
    }

    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';

        bytes.forEach((b) => {
            binary += String.fromCharCode(b);
        });

        return btoa(binary);
    }

    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return bytes.buffer;
    }

    async encrypt(text: string, password: string) {
        const salt = crypto.getRandomValues(new Uint8Array(this.saltLength));

        const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));

        const key = await this.deriveKey(password, salt);

        const encrypted = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            key,
            this.encoder.encode(text),
        );

        return {
            ciphertext: this.arrayBufferToBase64(encrypted),
            iv: this.arrayBufferToBase64(iv.buffer),
            salt: this.arrayBufferToBase64(salt.buffer),
        };
    }

    async decrypt(
        data: {
            ciphertext: string;
            iv: string;
            salt: string;
        },
        password: string,
    ) {
        const key = await this.deriveKey(
            password,
            new Uint8Array(this.base64ToArrayBuffer(data.salt)),
        );

        const decrypted = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: new Uint8Array(this.base64ToArrayBuffer(data.iv)),
            },
            key,
            this.base64ToArrayBuffer(data.ciphertext),
        );

        return this.decoder.decode(decrypted);
    }
}

export const cryptoMan = new CryptoMan();
