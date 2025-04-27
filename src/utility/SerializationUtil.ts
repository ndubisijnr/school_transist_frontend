import { createTransform } from 'redux-persist';

export class SerializationUtil {
    private static SERIALIZED_FUNCTION_KEY = '__fn__';

    private static serializeFunction(fn: Function): string {
        let fnString = fn.toString();

        // Remove any 'use strict' directives
        fnString = fnString.replace(/'use strict';?/g, '');

        // Handle arrow functions
        if (!fnString.startsWith('function')) {
            const arrowMatch = fnString.match(/^(?:async\s*)?(\(.*?\)|[^=]*)\s*=>/);
            if (arrowMatch) {
                const params = arrowMatch[1];
                const isAsync = fnString.startsWith('async');
                const body = fnString.substring(fnString.indexOf('=>') + 2).trim();
                // Ensure the body is wrapped in curly braces and has a return statement if needed
                const wrappedBody = body.startsWith('{') ? body : `{ return ${body} }`;
                fnString = `${isAsync ? 'async ' : ''}function${params} ${wrappedBody}`;
            }
        }

        return fnString;
    }

    private static deserializeFunction(fnString: string): Function {
        try {
            // Clean up the function string
            fnString = fnString.trim();

            // Ensure the function has a proper declaration
            if (!fnString.startsWith('function')) {
                throw new Error('Invalid function string: must start with "function"');
            }

            // Create a safe context for function evaluation
            const safeContext = {
                // Add any safe global functions/objects here if needed
                console: console,
                setTimeout: setTimeout,
                clearTimeout: clearTimeout
            };

            // Create the function in a safe context
            const functionCreator = new Function('context', `
                with (context) {
                    return ${fnString};
                }
            `);

            return functionCreator(safeContext);
        } catch (error) {
            console.error('Failed to deserialize function:', error);
            // Return a safe fallback function
            return function fallbackFunction() {
                console.warn('Using fallback function due to deserialization error');
                return null;
            };
        }
    }

    private static deepSerialize(obj: any): any {
        if (obj === null || obj === undefined) {
            return obj;
        }

        if (typeof obj === 'function') {
            return {
                [this.SERIALIZED_FUNCTION_KEY]: true,
                source: this.serializeFunction(obj)
            };
        }

        if (typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.deepSerialize(item));
        }

        const result: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                result[key] = this.deepSerialize(value);
            }
        }
        return result;
    }

    private static deepDeserialize(obj: any): any {
        if (obj === null || obj === undefined) {
            return obj;
        }

        if (typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.deepDeserialize(item));
        }

        if (obj[this.SERIALIZED_FUNCTION_KEY] && typeof obj.source === 'string') {
            try {
                return this.deserializeFunction(obj.source);
            } catch (error) {
                console.error('Error deserializing function:', error);
                return () => null;
            }
        }

        const result: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = this.deepDeserialize(obj[key]);
            }
        }
        return result;
    }

    public static createTransform() {
        return createTransform(
            (state) => this.deepSerialize(state),
            (state) => this.deepDeserialize(state)
        );
    }
}