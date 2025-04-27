const prefixes = ['090', '080', '070', '091', '081', '071'];

export class RandomGeneratorUtil {
    static generateRandomText(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomTextWithNumber(length:number=15) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    static generateRandomReference = (length: number=25, prefixes: string[]= ['090', '080', '070', '091', '081', '071']): string => {
        // Validate inputs
        if (!prefixes || prefixes.length === 0) {
            throw new Error('At least one prefix must be provided');
        }

        if (length <= 0) {
            throw new Error('Length must be greater than 0');
        }

        // Randomly select one of the provided prefixes
        const randomPrefixIndex = Math.floor(Math.random() * prefixes.length);
        const selectedPrefix = prefixes[randomPrefixIndex];

        // Calculate how many more characters we need after the prefix
        const remainingLength = length - selectedPrefix.length;

        // If the prefix is already longer than or equal to the requested length,
        // truncate the prefix to match the requested length
        if (remainingLength <= 0) {
            return selectedPrefix.substring(0, length);
        }

        // Generate random digits for the remaining length
        let randomDigits = '';
        for (let i = 0; i < remainingLength; i++) {
            randomDigits += Math.floor(Math.random() * 10).toString();
        }

        // Combine prefix and random digits
        return selectedPrefix + randomDigits;
    };

    static generateTimestampReference = (length: number=25, prefixes: string[]= ['090', '080', '070', '091', '081', '071']): string => {
        // Validate inputs
        if (!prefixes || prefixes.length === 0) {
            throw new Error('At least one prefix must be provided');
        }

        if (length <= 0) {
            throw new Error('Length must be greater than 0');
        }

        // Randomly select one of the provided prefixes
        const randomPrefixIndex = Math.floor(Math.random() * prefixes.length);
        const selectedPrefix = prefixes[randomPrefixIndex];

        // Get current timestamp
        const timestamp = Date.now().toString();

        // Calculate how many more random digits we need
        const timestampAndPrefixLength = selectedPrefix.length + timestamp.length;
        const remainingLength = length - timestampAndPrefixLength;

        // If the timestamp and prefix combined are already longer than the requested length,
        // truncate the result to match the requested length
        if (remainingLength < 0) {
            return (selectedPrefix + timestamp).substring(0, length);
        }

        // Generate random digits for any remaining length
        let randomDigits = '';
        for (let i = 0; i < remainingLength; i++) {
            randomDigits += Math.floor(Math.random() * 10).toString();
        }

        // Combine prefix, timestamp, and random digits
        return selectedPrefix + timestamp + randomDigits;
    };
}
