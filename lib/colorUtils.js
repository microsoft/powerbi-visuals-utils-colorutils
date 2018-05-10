/*
*  Power BI Visualizations
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
import { double as Double } from "powerbi-visuals-utils-typeutils";
export function hexToRGBString(hex, transparency) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    // Hex format which return the format r-g-b
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    // Wrong input
    if (rgb === null) {
        return "";
    }
    if (!transparency && transparency !== 0) {
        return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    }
    else {
        return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + transparency + ")";
    }
}
export function rotate(rgbString, rotateFactor) {
    if (rotateFactor === 0)
        return rgbString;
    let originalRgb = parseColorString(rgbString);
    let originalHsv = rgbToHsv(originalRgb);
    let rotatedHsv = rotateHsv(originalHsv, rotateFactor);
    let rotatedRgb = hsvToRgb(rotatedHsv);
    return hexString(rotatedRgb);
}
export function normalizeToHexString(color) {
    let rgb = parseColorString(color);
    return hexString(rgb);
}
export function parseColorString(color) {
    if (color.indexOf("#") >= 0) {
        if (color.length === 7) {
            // #RRGGBB
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            if (result == null || result.length < 4)
                return;
            return {
                R: parseInt(result[1], 16),
                G: parseInt(result[2], 16),
                B: parseInt(result[3], 16),
            };
        }
        else if (color.length === 4) {
            // #RGB
            let result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(color);
            if (result == null || result.length < 4)
                return;
            return {
                R: parseInt(result[1] + result[1], 16),
                G: parseInt(result[2] + result[2], 16),
                B: parseInt(result[3] + result[3], 16),
            };
        }
    }
    else if (color.indexOf("rgb(") >= 0) {
        // rgb(R, G, B)
        let result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(color);
        if (result == null || result.length < 4)
            return;
        return {
            R: parseInt(result[1], 10),
            G: parseInt(result[2], 10),
            B: parseInt(result[3], 10),
        };
    }
    else if (color.indexOf("rgba(") >= 0) {
        // rgba(R, G, B, A)
        let result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)$/.exec(color);
        if (result == null || result.length < 5)
            return;
        return {
            R: parseInt(result[1], 10),
            G: parseInt(result[2], 10),
            B: parseInt(result[3], 10),
            A: parseFloat(result[4]),
        };
    }
}
function rgbToHsv(rgbColor) {
    let s, h;
    let r = rgbColor.R / 255, g = rgbColor.G / 255, b = rgbColor.B / 255;
    let min = Math.min(r, Math.min(g, b));
    let max = Math.max(r, Math.max(g, b));
    let v = max;
    let delta = max - min;
    if (max === 0 || delta === 0) {
        // R, G, and B must be 0.0, or all the same.
        // In this case, S is 0.0, and H is undefined.
        // Using H = 0.0 is as good as any...
        s = 0;
        h = 0;
    }
    else {
        s = delta / max;
        if (r === max) {
            // Between Yellow and Magenta
            h = (g - b) / delta;
        }
        else if (g === max) {
            // Between Cyan and Yellow
            h = 2 + (b - r) / delta;
        }
        else {
            // Between Magenta and Cyan
            h = 4 + (r - g) / delta;
        }
    }
    // Scale h to be between 0.0 and 1.
    // This may require adding 1, if the value
    // is negative.
    h /= 6;
    if (h < 0) {
        h += 1;
    }
    return {
        H: h,
        S: s,
        V: v,
    };
}
function hsvToRgb(hsvColor) {
    let r, g, b;
    let h = hsvColor.H, s = hsvColor.S, v = hsvColor.V;
    if (s === 0) {
        // If s is 0, all colors are the same.
        // This is some flavor of gray.
        r = v;
        g = v;
        b = v;
    }
    else {
        let p, q, t, fractionalSector, sectorNumber, sectorPos;
        // The color wheel consists of 6 sectors.
        // Figure out which sector you//re in.
        sectorPos = h * 6;
        sectorNumber = Math.floor(sectorPos);
        // get the fractional part of the sector.
        // That is, how many degrees into the sector
        // are you?
        fractionalSector = sectorPos - sectorNumber;
        // Calculate values for the three axes
        // of the color.
        p = v * (1.0 - s);
        q = v * (1.0 - (s * fractionalSector));
        t = v * (1.0 - (s * (1 - fractionalSector)));
        // Assign the fractional colors to r, g, and b
        // based on the sector the angle is in.
        switch (sectorNumber) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
    }
    return {
        R: Math.floor(r * 255),
        G: Math.floor(g * 255),
        B: Math.floor(b * 255),
    };
}
function rotateHsv(hsvColor, rotateFactor) {
    let newH = hsvColor.H + rotateFactor;
    return {
        H: newH > 1 ? newH - 1 : newH,
        S: hsvColor.S,
        V: hsvColor.V,
    };
}
export function darken(color, diff) {
    let flooredNumber = Math.floor(diff);
    return {
        R: Math.max(0, color.R - flooredNumber),
        G: Math.max(0, color.G - flooredNumber),
        B: Math.max(0, color.B - flooredNumber),
    };
}
export function rgbString(color) {
    if (color.A == null)
        return "rgb(" + color.R + "," + color.G + "," + color.B + ")";
    return "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
}
export function hexString(color) {
    return "#" + componentToHex(color.R) + componentToHex(color.G) + componentToHex(color.B);
}
/**
 * Overlays a color with opacity over a background color
 * @param {string} foreColor Color to overlay
 * @param {number} opacity number between 0 (transparent) to 1 (opaque)
 * @param {string} backColor Background color
 * @returns Result color
 */
export function hexBlend(foreColor, opacity, backColor) {
    return hexString(rgbBlend(parseColorString(foreColor), opacity, parseColorString(backColor)));
}
/**
 * Overlays a color with opacity over a background color. Any alpha-channel is ignored.
 * @param {RgbColor} foreColor Color to overlay
 * @param {number} opacity number between 0 (transparent) to 1 (opaque). Any value out of range will be corrected.
 * @param {RgbColor} backColor Background color
 * @returns
 */
export function rgbBlend(foreColor, opacity, backColor) {
    // correct opacity
    opacity = Double.ensureInRange(opacity, 0, 1);
    return {
        R: channelBlend(foreColor.R, opacity, backColor.R),
        G: channelBlend(foreColor.G, opacity, backColor.G),
        B: channelBlend(foreColor.B, opacity, backColor.B)
    };
}
/**
 * Blend a single channel for two colors
 * @param {number} foreChannel Channel of foreground color. Will be enforced to be between 0 and 255.
 * @param {number} opacity opacity of the foreground color. Will be enforced to be between 0 and 1.
 * @param {number} backChannel channel of the background color. Will be enforced to be between 0 and 255.
 * @returns result channel value
 */
export function channelBlend(foreChannel, opacity, backChannel) {
    opacity = Double.ensureInRange(opacity, 0, 1);
    foreChannel = Double.ensureInRange(foreChannel, 0, 255);
    backChannel = Double.ensureInRange(backChannel, 0, 255);
    return Math.round((opacity * foreChannel) +
        ((1 - opacity) * backChannel));
}
/**
 * Calculate the highlight color from the rgbColor based on the lumianceThreshold and delta.
 * @param {RgbColor} rgbColor The original color.
 * @param {number} lumianceThreshold The lumiance threshold used, the highlight color will be brighter when the lumiance is smaller the threshold, otherwise the highlight color will be darker. Will be enforced to be between 0 and 1.
 * @param {number} delta the highlight color will be calculated based on the delta. Will be enforced to be between 0 and 1. lumianceThreshold + delta cannot greater than 1.
 * @returns result highlight color value
 */
export function calculateHighlightColor(rgbColor, lumianceThreshold, delta) {
    let hsvColor = rgbToHsv(rgbColor);
    // For invalid lumianceThreshold and delta value, use default.
    if (lumianceThreshold + delta > 1 || lumianceThreshold <= 0 || delta <= 0) {
        lumianceThreshold = 0.8;
        delta = 0.2;
    }
    // Make it lighter when the lumianceValue is less than 200, otherwise make it darker.
    if (hsvColor.V < lumianceThreshold)
        hsvColor.V = hsvColor.V + delta;
    else
        hsvColor.V = hsvColor.V - delta;
    return hexString(hsvToRgb(hsvColor));
}
function componentToHex(hexComponent) {
    let clamped = Double.ensureInRange(hexComponent, 0, 255);
    let hex = clamped.toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
}
export function createLinearColorScale(domain, range, clamp) {
    let rangeColors = range.map(v => parseColorString(v));
    return value => {
        // treat undefined and NULL as 0
        if (value == null)
            value = 0;
        // Returns undefined for NaN values
        if (isNaN(value))
            return undefined;
        if (clamp) {
            if (value >= domain[domain.length - 1])
                return range[range.length - 1];
            if (value <= domain[0])
                return range[0];
        }
        let domainMin, domainMax, rangeMin, rangeMax;
        for (let i = 1, len = domain.length; i < len; i++) {
            domainMin = domain[i - 1];
            domainMax = domain[i];
            if (domainMax === value) {
                return range[i];
            }
            else if (value >= domainMin && value <= domainMax) {
                rangeMin = rangeColors[i - 1];
                rangeMax = rangeColors[i];
                break;
            }
        }
        let newValue = {
            R: Math.round((((value - domainMin) * (rangeMax.R - rangeMin.R)) / (domainMax - domainMin)) + rangeMin.R),
            G: Math.round((((value - domainMin) * (rangeMax.G - rangeMin.G)) / (domainMax - domainMin)) + rangeMin.G),
            B: Math.round((((value - domainMin) * (rangeMax.B - rangeMin.B)) / (domainMax - domainMin)) + rangeMin.B)
        };
        return hexString(newValue);
    };
}
/**
 * Convert string hex expression to number, calculate percentage and R, G, B channels.
 * Apply percentage for each channel and return back hex value as string with pound sign.
 */
export function shadeColor(color, percent) {
    let hexNum = parseInt(color.slice(1), 16);
    let t = percent < 0 ? 0 : 255;
    let p = percent < 0 ? percent * -1 : percent;
    let R = hexNum >> 16;
    let G = hexNum >> 8 & 0x00FF;
    let B = hexNum & 0x0000FF;
    let hexString = "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    return hexString;
}
//# sourceMappingURL=colorUtils.js.map