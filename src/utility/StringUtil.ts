import { format } from 'date-fns';


export class StringUtil {
    private static countOccurrences(mainStr: string, subStr: string) {
        // Initialize count
        let count = 0;

        // Loop through the string to find occurrences
        let index = mainStr.indexOf(subStr);
        while (index !== -1) {
            // If substring is found, increase count and move to the next index
            count++;
            index = mainStr.indexOf(subStr, index + 1);
        }

        return count;
    }
    static sortAlphabetically<T>(
        array: T[],
        key?: keyof T | null,
        options: {
            ignoreCase?: boolean,
            locale?: string | string[],
            direction?: 'ascending' | 'descending'
        } = {}
    ): T[] {
        const {
            ignoreCase = true,
            locale = 'en',
            direction = 'ascending'
        } = options;

        // Create a copy to avoid modifying the original array
        const result = [...array];

        // Sort the array
        result.sort((a, b) => {
            // If items are objects and key is provided, use the key for comparison
            let aValue: string;
            let bValue: string;

            if (key !== undefined && key !== null && typeof a === 'object' && typeof b === 'object') {
                aValue = String(a?.[key] || '');
                bValue = String(b?.[key] || '');
            } else if (typeof a === 'string' && typeof b === 'string') {
                aValue = a;
                bValue = b;
            } else {
                aValue = String(a || '');
                bValue = String(b || '');
            }

            // Convert to lowercase if ignoreCase is true
            const aCompare = ignoreCase ? aValue.toLowerCase() : aValue;
            const bCompare = ignoreCase ? bValue.toLowerCase() : bValue;

            // Use localeCompare for proper language-specific sorting
            const comparison = aCompare.localeCompare(bCompare, locale);

            // Handle sort direction
            return direction === 'ascending' ? comparison : -comparison;
        });

        return result;
    }

    static formatAmount = (amount: string): string => {
        // Remove commas and convert to number for easier manipulation
        // let numericAmount = parseFloat(amount);
        let numericAmount = parseFloat(amount.replace(/,/g, ""));
        if (amount.endsWith(".")) return numericAmount.toLocaleString("en-US") + ".";
        if (amount.includes(".") && this.countOccurrences(amount, ".") == 1) {
            const [amountInt, amountDecimal] = amount.split(".");
            const formattedAmountInt = this.formatAmount(amountInt);
            return formattedAmountInt + "." + amountDecimal;
        }
        if (amount.includes(".")) {
            return amount;
            // Format with commas
        }
        // Format with commas
        return numericAmount.toLocaleString("en-US");
    };

    static formatAmountDp = (amount: string): string => {
        // Handle empty or invalid input
        if (!amount || isNaN(parseFloat(amount.replace(/,/g, "")))) {
            return "0.00";
        }

        // Remove commas for easier manipulation
        const amountWithoutCommas = amount.replace(/,/g, "");

        // Handle case where input ends with a decimal point
        if (amountWithoutCommas.endsWith(".")) {
            return parseFloat(amountWithoutCommas).toLocaleString("en-US") + ".00";
        }

        // If amount has a decimal and only one decimal point
        if (amountWithoutCommas.includes(".") && this.countOccurrences(amountWithoutCommas, ".") === 1) {
            const [amountInt, amountDecimal] = amountWithoutCommas.split(".");
            const formattedAmountInt = parseFloat(amountInt).toLocaleString("en-US");

            // Format decimal to 2 places
            let formattedDecimal = amountDecimal;
            if (amountDecimal.length === 0) {
                formattedDecimal = "00";
            } else if (amountDecimal.length === 1) {
                formattedDecimal = amountDecimal + "0";
            } else if (amountDecimal.length > 2) {
                formattedDecimal = amountDecimal.substring(0, 2);
            }

            return formattedAmountInt + "." + formattedDecimal;
        }

        // No decimal point in the amount, add .00
        const numericAmount = parseFloat(amountWithoutCommas);
        return numericAmount.toLocaleString("en-US") + ".00";
    };

    static shortenWord(word: string, replace: string = "...", length: number = 28): string {
        return word.length >= length
            ? word.replace(/(\r\n|\n|\r)/gm, "").slice(0, length) + replace
            : word.replace(/(\r\n|\n|\r)/gm, "")

    }
    static toTitleCase(sentence: string) {
        // Split the input string into sentences
        const words = sentence?.split(" ");

        // Capitalize the first letter of each sentence
        const titleCase = words?.map((word) => {
            // Capitalize the first letter of the sentence
            const firstLetter = word.charAt(0).toUpperCase();
            // Concatenate the capitalized first letter with the rest of the word
            return firstLetter + word.slice(1).toLowerCase();
        });
        // Join the sentences back together with a period and space
        const result = titleCase.join(" ");
        // console.log(result);
        return result;
    }

    static maskCardNumber(cardNumber: string) {
        if (cardNumber.length !== 16) {
            throw new Error('Input must be a 16-digit number');
        }
        const part1 = cardNumber.slice(0, 4);
        const part2 = '****';
        const part3 = '****';
        const part4 = cardNumber.slice(12);

        return `${part1} ${part2} ${part3} ${part4}`;
    }

    static isStringNullOrEmpty = (string: string | null) => {
        if (string == null) {
            return true;
        }
        return string == "";

    };

    static abbreviateToTwoCharacter(word: string): string {
        if (StringUtil.isStringNullOrEmpty(word)) {
            return ""
        } else if (word.trim().split(" ").length > 1) {
            return `${word.split(" ")[0][0]}${word.split(" ")[1][0]}`.toUpperCase();
        } else if (word.length > 1) {
            return `${word[0]}${word[1]}`.toUpperCase();
        } else if (word.length === 1) {
            return `${word[0]}`.toUpperCase();
        } else {
            return "";
        }
    }

    static formatDate = (dateString: string) => {
        // Convert from "Mon Feb 24 2025" to "24-Feb-2025"
        const date = new Date(dateString);
        return format(date, 'dd-MMM-yyyy');
    };
    // static timeMM(timestamp: string){
    //     const date = new Date(timestamp);
    //     const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
    //     return formattedTime
    // }
    static timeMM(timestamp: string) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    static timeFMM(timestamp: string) {
        const date = new Date(timestamp);

        // Adjust time by subtracting 1 hour
        date.setTime(date.getTime() - (60 * 60 * 1000));

        // Get the month in abbreviated form (Jan, Feb, Mar, etc.)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        // Get the day number
        const day = date.getDate();

        // Add the appropriate suffix (1st, 2nd, 3rd, etc.)
        const daySuffix = this.getDaySuffix(day);

        const year = date.getFullYear();

        // Get the time in HH:MM:SS format
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${month} ${day}${daySuffix}, ${year} ${hours}:${minutes}:${seconds}`;
        // return `${month} ${day}${daySuffix}, ${year}`;

    }

    static getDaySuffix(day: number): string {
        if (day >= 11 && day <= 13) {
            return "th";
        }

        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    static getFormattedHour(timestamp: string) {
        const date = new Date(timestamp);
        return date.getHours().toString().padStart(2, '0');
    }
    static splitWords(text: string, start: number=0, end: number=1): string  {
        return text ? `${text.split(" ")[start]} ${text.split( " ")[end]}`:''
    }



    static enhancedFormatAmount = (amount: string): string => {
        if (!amount) return "0.00";

        // Clean the input first (remove non-numeric and non-decimal characters except commas)
        const cleanedAmount = amount.replace(/[^\d.,]/g, '');

        // Check if the amount already has a decimal point
        if (cleanedAmount.includes('.')) {
            // Split the amount into whole and decimal parts
            const [wholePart, decimalPart] = cleanedAmount.split('.');

            // Format the whole part with commas (leverage existing formatAmount)
            const formattedWholePart = StringUtil.formatAmount(wholePart);

            // Limit decimal part to 2 places and pad if needed
            let formattedDecimalPart: string;

            if (decimalPart.length === 0) {
                // If decimal part is empty (e.g., "100.")
                formattedDecimalPart = "00";
            } else if (decimalPart.length === 1) {
                // If decimal part has only one digit (e.g., "100.2")
                formattedDecimalPart = decimalPart + "0";
            } else {
                // If decimal part has 2 or more digits, round to 2
                const roundedDecimal = Math.round(parseFloat("0." + decimalPart) * 100) / 100;
                formattedDecimalPart = roundedDecimal.toString().substring(2);

                // Ensure it's still 2 digits (in case rounding made it 0.1 from 0.099)
                if (formattedDecimalPart.length === 1) {
                    formattedDecimalPart += "0";
                }
            }

            return formattedWholePart + "." + formattedDecimalPart;
        } else {
            // Format without decimal part
            const formattedWholePart = StringUtil.formatAmount(cleanedAmount);
            // Add .00 at the end
            return formattedWholePart + ".00";
        }
    };

    /**
     * Alternative implementation that doesn't depend on StringUtil.formatAmount
     */
    static formatAmountWithDecimals = (amount: string): string => {
        if (!amount) return "0.00";

        // Clean the input (remove non-numeric and non-decimal characters except commas)
        const cleanedAmount = amount.replace(/[^\d.,]/g, '').replace(/,/g, '');

        // Parse the cleaned amount
        let numericAmount: number;
        let decimalPlaces = 0;

        if (cleanedAmount.includes('.')) {
            const [wholePart, decimalPart] = cleanedAmount.split('.');
            numericAmount = parseFloat(wholePart + "." + (decimalPart || "0"));
            decimalPlaces = decimalPart ? decimalPart.length : 0;
        } else {
            numericAmount = parseFloat(cleanedAmount);
        }

        // Handle invalid input
        if (isNaN(numericAmount)) return "0.00";

        // Round to 2 decimal places if needed
        if (decimalPlaces > 2) {
            numericAmount = Math.round(numericAmount * 100) / 100;
        }

        // Format with exactly 2 decimal places and thousands separators
        return numericAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

}