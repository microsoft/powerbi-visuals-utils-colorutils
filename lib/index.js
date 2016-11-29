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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var color;
            (function (color) {
                var DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;
                var ColorHelper = (function () {
                    function ColorHelper(colors, fillProp, defaultDataPointColor) {
                        this.colors = colors;
                        this.fillProp = fillProp;
                        this.defaultDataPointColor = defaultDataPointColor;
                    }
                    /**
                     * Gets the color for the given series value.
                     * If no explicit color or default color has been set then the color is
                     * allocated from the color scale for this series.
                     */
                    ColorHelper.prototype.getColorForSeriesValue = function (objects, value) {
                        return (this.fillProp && DataViewObjects.getFillColor(objects, this.fillProp))
                            || this.defaultDataPointColor
                            || this.colors.getColor(String(value)).value;
                    };
                    /**
                     * Gets the color for the given measure.
                     */
                    ColorHelper.prototype.getColorForMeasure = function (objects, measureKey) {
                        // Note, this allocates the color from the scale regardless of if we use it or not which helps keep colors stable.
                        var scaleColor = this.colors.getColor(measureKey).value;
                        return (this.fillProp && DataViewObjects.getFillColor(objects, this.fillProp))
                            || this.defaultDataPointColor
                            || scaleColor;
                    };
                    ColorHelper.normalizeSelector = function (selector, isSingleSeries) {
                        // For dynamic series charts, colors are set per category.  So, exclude any measure (metadata repetition) from the selector.
                        if (selector && (isSingleSeries || selector.data))
                            return { data: selector.data };
                        return selector;
                    };
                    return ColorHelper;
                }());
                color.ColorHelper = ColorHelper;
            })(color = utils.color || (utils.color = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var color;
            (function (color_1) {
                var Double = powerbi.extensibility.utils.type.Double;
                function hexToRGBString(hex, transparency) {
                    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                        return r + r + g + g + b + b;
                    });
                    // Hex format which return the format r-g-b
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    var rgb = result ? {
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
                color_1.hexToRGBString = hexToRGBString;
                function rotate(rgbString, rotateFactor) {
                    if (rotateFactor === 0)
                        return rgbString;
                    var originalRgb = parseColorString(rgbString);
                    var originalHsv = rgbToHsv(originalRgb);
                    var rotatedHsv = rotateHsv(originalHsv, rotateFactor);
                    var rotatedRgb = hsvToRgb(rotatedHsv);
                    return hexString(rotatedRgb);
                }
                color_1.rotate = rotate;
                function normalizeToHexString(color) {
                    var rgb = parseColorString(color);
                    return hexString(rgb);
                }
                color_1.normalizeToHexString = normalizeToHexString;
                function parseColorString(color) {
                    if (color.indexOf("#") >= 0) {
                        if (color.length === 7) {
                            // #RRGGBB
                            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
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
                            var result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(color);
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
                        var result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(color);
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
                        var result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)$/.exec(color);
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
                color_1.parseColorString = parseColorString;
                function rgbToHsv(rgbColor) {
                    var s, h;
                    var r = rgbColor.R / 255, g = rgbColor.G / 255, b = rgbColor.B / 255;
                    var min = Math.min(r, Math.min(g, b));
                    var max = Math.max(r, Math.max(g, b));
                    var v = max;
                    var delta = max - min;
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
                    var r, g, b;
                    var h = hsvColor.H, s = hsvColor.S, v = hsvColor.V;
                    if (s === 0) {
                        // If s is 0, all colors are the same.
                        // This is some flavor of gray.
                        r = v;
                        g = v;
                        b = v;
                    }
                    else {
                        var p = void 0, q = void 0, t = void 0, fractionalSector = void 0, sectorNumber = void 0, sectorPos = void 0;
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
                    var newH = hsvColor.H + rotateFactor;
                    return {
                        H: newH > 1 ? newH - 1 : newH,
                        S: hsvColor.S,
                        V: hsvColor.V,
                    };
                }
                function darken(color, diff) {
                    var flooredNumber = Math.floor(diff);
                    return {
                        R: Math.max(0, color.R - flooredNumber),
                        G: Math.max(0, color.G - flooredNumber),
                        B: Math.max(0, color.B - flooredNumber),
                    };
                }
                color_1.darken = darken;
                function rgbString(color) {
                    if (color.A == null)
                        return "rgb(" + color.R + "," + color.G + "," + color.B + ")";
                    return "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
                }
                color_1.rgbString = rgbString;
                function hexString(color) {
                    return "#" + componentToHex(color.R) + componentToHex(color.G) + componentToHex(color.B);
                }
                color_1.hexString = hexString;
                /**
                 * Overlays a color with opacity over a background color
                 * @param {string} foreColor Color to overlay
                 * @param {number} opacity number between 0 (transparent) to 1 (opaque)
                 * @param {string} backColor Background color
                 * @returns Result color
                 */
                function hexBlend(foreColor, opacity, backColor) {
                    return hexString(rgbBlend(parseColorString(foreColor), opacity, parseColorString(backColor)));
                }
                color_1.hexBlend = hexBlend;
                /**
                 * Overlays a color with opacity over a background color. Any alpha-channel is ignored.
                 * @param {RgbColor} foreColor Color to overlay
                 * @param {number} opacity number between 0 (transparent) to 1 (opaque). Any value out of range will be corrected.
                 * @param {RgbColor} backColor Background color
                 * @returns
                 */
                function rgbBlend(foreColor, opacity, backColor) {
                    // correct opacity
                    opacity = Double.ensureInRange(opacity, 0, 1);
                    return {
                        R: channelBlend(foreColor.R, opacity, backColor.R),
                        G: channelBlend(foreColor.G, opacity, backColor.G),
                        B: channelBlend(foreColor.B, opacity, backColor.B)
                    };
                }
                color_1.rgbBlend = rgbBlend;
                /**
                 * Blend a single channel for two colors
                 * @param {number} foreChannel Channel of foreground color. Will be enforced to be between 0 and 255.
                 * @param {number} opacity opacity of the foreground color. Will be enforced to be between 0 and 1.
                 * @param {number} backChannel channel of the background color. Will be enforced to be between 0 and 255.
                 * @returns result channel value
                 */
                function channelBlend(foreChannel, opacity, backChannel) {
                    opacity = Double.ensureInRange(opacity, 0, 1);
                    foreChannel = Double.ensureInRange(foreChannel, 0, 255);
                    backChannel = Double.ensureInRange(backChannel, 0, 255);
                    return Math.round((opacity * foreChannel) +
                        ((1 - opacity) * backChannel));
                }
                color_1.channelBlend = channelBlend;
                /**
                 * Calculate the highlight color from the rgbColor based on the lumianceThreshold and delta.
                 * @param {RgbColor} rgbColor The original color.
                 * @param {number} lumianceThreshold The lumiance threshold used, the highlight color will be brighter when the lumiance is smaller the threshold, otherwise the highlight color will be darker. Will be enforced to be between 0 and 1.
                 * @param {number} delta the highlight color will be calculated based on the delta. Will be enforced to be between 0 and 1. lumianceThreshold + delta cannot greater than 1.
                 * @returns result highlight color value
                 */
                function calculateHighlightColor(rgbColor, lumianceThreshold, delta) {
                    var hsvColor = rgbToHsv(rgbColor);
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
                color_1.calculateHighlightColor = calculateHighlightColor;
                function componentToHex(hexComponent) {
                    var clamped = Double.ensureInRange(hexComponent, 0, 255);
                    var hex = clamped.toString(16).toUpperCase();
                    return hex.length === 1 ? "0" + hex : hex;
                }
                function createLinearColorScale(domain, range, clamp) {
                    var rangeColors = range.map(function (v) { return parseColorString(v); });
                    return function (value) {
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
                        var domainMin, domainMax, rangeMin, rangeMax;
                        for (var i = 1, len = domain.length; i < len; i++) {
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
                        var newValue = {
                            R: Math.round((((value - domainMin) * (rangeMax.R - rangeMin.R)) / (domainMax - domainMin)) + rangeMin.R),
                            G: Math.round((((value - domainMin) * (rangeMax.G - rangeMin.G)) / (domainMax - domainMin)) + rangeMin.G),
                            B: Math.round((((value - domainMin) * (rangeMax.B - rangeMin.B)) / (domainMax - domainMin)) + rangeMin.B)
                        };
                        return hexString(newValue);
                    };
                }
                color_1.createLinearColorScale = createLinearColorScale;
                /**
                 * Convert string hex expression to number, calculate percentage and R, G, B channels.
                 * Apply percentage for each channel and return back hex value as string with pound sign.
                 */
                function shadeColor(color, percent) {
                    var hexNum = parseInt(color.slice(1), 16);
                    var t = percent < 0 ? 0 : 255;
                    var p = percent < 0 ? percent * -1 : percent;
                    var R = hexNum >> 16;
                    var G = hexNum >> 8 & 0x00FF;
                    var B = hexNum & 0x0000FF;
                    var hexString = "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
                    return hexString;
                }
                color_1.shadeColor = shadeColor;
            })(color = utils.color || (utils.color = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
