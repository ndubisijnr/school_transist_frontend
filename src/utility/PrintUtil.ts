import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export class PrintUtil {
     static printToFile = async (htmlTemplate: string, userName: string) => {
        try {
            // Print HTML content to a PDF file
            const response = await Print.printToFileAsync({
                html: htmlTemplate,
            });

            // Generate a timestamp
            const timestamp = new Date().getTime();

            // Create new filename with timestamp and user name
            const pdfName = `${response.uri.slice(
                0,
                response.uri.lastIndexOf('/') + 1
            )}${timestamp}_${userName.replace(/\s+/g, '_')}.pdf`;

            // Move the file to the new location with the updated name
            await FileSystem.moveAsync({
                from: response.uri,
                to: pdfName,
            });

            // Share the PDF
            await this.sharePdf(pdfName);

            return { success: true, uri: pdfName };
        } catch (error) {
            console.error('Error printing or sharing PDF:', error);
            return { success: false, error };
        }
    };
    static sharePdf = async (url: string) => {
        try {
            await Sharing.shareAsync(url);
        } catch (error) {
            console.error('Error sharing PDF:', error);
            throw error;
        }
    };
}