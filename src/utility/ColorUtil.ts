type RGB = {
    r: number;
    g: number;
    b: number;
};

type NamedColors = {
    [key: string]: number[];
};

/**
 * Adds or modifies the alpha value of a color in any format
 * Supports: hex, rgb, rgba, hsl, hsla, named colors
 * @param color - The color string in any valid CSS format
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA color string
 */
export const addAlpha = (color: string, alpha: number): string => {
    'worklet';
    // Validate alpha value
    const validAlpha = Math.min(1, Math.max(0, alpha));

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string): RGB | null => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const processedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(processedHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    // Named color map for common colors
    const namedColors: NamedColors = {
        transparent: [0, 0, 0, 0],
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        // Add more named colors as needed
    };

    // Handle different color formats
    if (color.startsWith('#')) {
        // Hex color
        const rgb = hexToRgb(color);
        if (rgb) {
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${validAlpha})`;
        }
    } else if (color.startsWith('rgb')) {
        // RGB/RGBA color
        // Handle various separators and spacing in rgb/rgba values
        const cleanColor = color.replace(/\s+/g, '');  // Remove all whitespace
        const values = cleanColor.match(/[\d.]+/g)?.map(Number) ?? [];
        return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${validAlpha})`;
    } else if (color.startsWith('hsl')) {
        // Convert HSL to RGB first
        const values = color.match(/\d+/g)?.map(Number) ?? [];
        const h = values[0] / 360;
        const s = values[1] / 100;
        const l = values[2] / 100;

        let r: number, g: number, b: number;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
            g = Math.round(hue2rgb(p, q, h) * 255);
            b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
        }
        return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
    } else if (namedColors[color.toLowerCase()]) {
        // Named color
        const rgb = namedColors[color.toLowerCase()];
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${validAlpha})`;
    }

    // If color format is not recognized, return rgba(0,0,0,alpha)
    console.warn(`Unrecognized color format: ${color}. Defaulting to black.`);
    return `rgba(0, 0, 0, ${validAlpha})`;
};