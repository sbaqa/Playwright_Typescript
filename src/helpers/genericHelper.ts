export class GenericHelpers {

    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    static getNewRandomEmail(): string {
        const randomString = GenericHelpers.generateRandomString(8);
        return `${randomString}@example.com`;
    }

    static getNewRandomPassword(): string {
        return GenericHelpers.generateRandomString(15);
    }

}
