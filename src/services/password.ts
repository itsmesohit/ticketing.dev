import bcrypt from 'bcrypt';

export class Password {
    static async toHash(password: string) {
        const hashed = await bcrypt.hash(password, 8);
        return hashed;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        return await bcrypt.compare(suppliedPassword, storedPassword);
    }
}