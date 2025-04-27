import {DateTime} from "luxon";

export class TimeUtil {
    static formatDateString = (dateString: string) => {
        // Check if the dateString matches the new format
        const newFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}$/;

        let dateTime;

        if (newFormatRegex.test(dateString)) {
            // Parse the new date format
            dateTime = DateTime.fromISO(dateString);
        } else {
            // Fallback to the original format
            const isoStringWithTAndZ = dateString.replace(" ", "T") + "Z";
            dateTime = DateTime.fromISO(isoStringWithTAndZ);
        }

        const formattedDateString = dateTime.toFormat("LLL d' 'yyyy HH:mm:ss");
        const [month, day, year, time] = formattedDateString.split(" ");
        const dayWithSuffix = `${parseInt(day)}${this.getOrdinalSuffix(parseInt(day))}`;
        return `${month} ${dayWithSuffix}, ${year} ${time}`;
    };

    static getOrdinalSuffix = (num: number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const remainder = num % 100;
        return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    };

}