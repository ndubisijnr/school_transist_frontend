import {ExampleActionSheet} from "@/component/actionSheet/ExampleActionSheet";
import {registerSheet, SheetDefinition} from "react-native-actions-sheet";



const registerSheets = {
    "example-sheet": ExampleActionSheet
}

Object.entries(registerSheets).forEach(([sheetId, SheetComponent]) => {
    registerSheet(sheetId, SheetComponent);
});


 type RegisteredSheets = typeof registerSheets;

declare module 'react-native-actions-sheet' {
    interface Sheets  {
        "example-sheet": SheetDefinition
    }
}

export {};

