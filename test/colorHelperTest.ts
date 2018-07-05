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

/// <reference path="_references.ts"/>

module powerbi.extensibility.utils.color.test {
    // powerbi
    import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
    import IDataViewObjects = powerbi.DataViewObjects;

    import IColorPalette = powerbi.extensibility.IColorPalette;
    import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;

    // powerbi.extensibility.utils.color
    import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;

    // powerbi.extensibility.utils.test
    import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;

    describe("ColorHelper", () => {
        let colorPalette: IColorPalette | ISandboxExtendedColorPalette;

        let fillProp: DataViewObjectPropertyIdentifier = {
            objectName: "dataPoint",
            propertyName: "fill"
        };

        const colors = [
            { value: "#000000" },
            { value: "#000001" },
            { value: "#000002" },
            { value: "#000003" }
        ];

        beforeEach(() => {
            colorPalette = createColorPalette(colors);
        });

        describe("getColorForSeriesValue", () => {
            it("should return fill property value if it exists", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp, "defaultColor");

                const objects: powerbi.DataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                const color: string = colorHelper.getColorForSeriesValue(objects, "value");

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp, "defaultColor");

                const color: string = colorHelper.getColorForSeriesValue(undefined, "value");

                expect(color).toEqual("defaultColor");
            });

            it("should return background color if high contrast mode is active", () => {
                const color: string = "#00ff00";

                (colorPalette as ISandboxExtendedColorPalette).background = { value: color };
                (colorPalette as ISandboxExtendedColorPalette).isHighContrast = true;

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                const actualColor: string = colorHelper.getColorForSeriesValue(null, 0, "background");

                expect(actualColor).toBe(color);
            });
        });

        describe("getColorForMeasure", () => {
            it("should return fill property value if it exists", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp, "defaultColor");

                const objects: IDataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                const color: string = colorHelper.getColorForMeasure(objects, 0);

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp, "defaultColor");

                const color: string = colorHelper.getColorForMeasure(undefined, 0);

                expect(color).toEqual("defaultColor");
            });

            it("should return scale color if neither fill property nor default color is defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp, undefined);

                const color: string = colorHelper.getColorForMeasure(undefined, 0);

                expect(color).toEqual(colors[0].value);
            });

            it("should return the nth color for the nth measure even if colors are explicitly set", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette, fillProp);

                const objects: IDataViewObjects = {
                    dataPoint: { fill: { solid: { color: "red" } } }
                };

                const color1: string = colorHelper.getColorForMeasure(null, 0);
                const color2: string = colorHelper.getColorForMeasure(objects, 1);
                const color3: string = colorHelper.getColorForMeasure(null, 2);

                expect(color1).toEqual(colors[0].value);
                expect(color2).toEqual("red");
                expect(color3).toEqual(colors[2].value);
            });

            it("should return background color if high contrast mode is active", () => {
                const color: string = "#00ff00";

                (colorPalette as ISandboxExtendedColorPalette).background = { value: color };
                (colorPalette as ISandboxExtendedColorPalette).isHighContrast = true;

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                const actualColor: string = colorHelper.getColorForMeasure(null, 0, "background");

                expect(actualColor).toBe(color);
            });
        });

        describe("isHighContrast", () => {
            it("should return false if colorPalette is not defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(undefined);

                expect(colorHelper.isHighContrast).toBeFalsy();
            });

            it("should return false if isHighContrast is false in a colorPalette", () => {
                (colorPalette as ISandboxExtendedColorPalette).isHighContrast = false;

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.isHighContrast).toBeFalsy();
            });

            it("should return true if isHighContrast is true in a colorPalette", () => {
                (colorPalette as ISandboxExtendedColorPalette).isHighContrast = true;

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.isHighContrast).toBeTruthy();
            });
        });

        describe("getThemeColor", () => {
            it("should return undefined if colorPalette is not defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(undefined);

                expect(colorHelper.getThemeColor("background")).toBeUndefined();
            });

            it("should return undefined if background is not defined", () => {
                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.getThemeColor("background")).toBeUndefined();
            });

            it("should return color if background is defined", () => {
                const color: string = "#00ff00";

                (colorPalette as ISandboxExtendedColorPalette).background = { value: color };

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.getThemeColor("background")).toBe(color);
            });

            it("should return background by default", () => {
                const color: string = "#00ff00";

                (colorPalette as ISandboxExtendedColorPalette).background = { value: color };

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.getThemeColor()).toBe(color);
            });
        });

        describe("getHighContrastColor", () => {
            it("should return defaultColor if high contrast mode is not active", () => {
                const defaultColor: string = "#00ff00";

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.getHighContrastColor("background", defaultColor)).toBe(defaultColor);
            });

            it("should return themeColor if high contrast mode is active", () => {
                const color: string = "#00ff00";

                (colorPalette as ISandboxExtendedColorPalette).isHighContrast = true;
                (colorPalette as ISandboxExtendedColorPalette).background = { value: color };

                const colorHelper: ColorHelper = new ColorHelper(colorPalette);

                expect(colorHelper.getHighContrastColor("background")).toBe(color);
            });
        });
    });
}
