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

    // powerbi.extensibility.utils.color
    import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;

    // powerbi.extensibility.utils.test
    import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;

    describe("Color Helper", () => {
        let palette: IColorPalette;

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
            palette = createColorPalette(colors);
        });

        describe("getColorForSeriesValue", () => {

            it("should return fill property value if it exists", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                let objects: powerbi.DataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                let color = colorHelper.getColorForSeriesValue(objects, "value");

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                let color = colorHelper.getColorForSeriesValue(undefined, "value");

                expect(color).toEqual("defaultColor");
            });
        });

        describe("getColorForMeasure", () => {
            it("should return fill property value if it exists", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                let objects: IDataViewObjects = {
                    dataPoint: {
                        fill: { solid: { color: "red" } }
                    }
                };

                let color = colorHelper.getColorForMeasure(objects, 0);

                expect(color).toEqual("red");
            });

            it("should return default color if no fill property is defined", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp, "defaultColor");

                let color = colorHelper.getColorForMeasure(undefined, 0);

                expect(color).toEqual("defaultColor");
            });

            it("should return scale color if neither fill property nor default color is defined", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp, undefined);

                let color = colorHelper.getColorForMeasure(undefined, 0);

                expect(color).toEqual(colors[0].value);
            });

            it("should return the nth color for the nth measure even if colors are explicitly set", () => {
                let colorHelper: ColorHelper = new ColorHelper(palette, fillProp);

                let objects: IDataViewObjects = {
                    dataPoint: { fill: { solid: { color: "red" } } }
                };

                let color1 = colorHelper.getColorForMeasure(null, 0);
                let color2 = colorHelper.getColorForMeasure(objects, 1);
                let color3 = colorHelper.getColorForMeasure(null, 2);

                expect(color1).toEqual(colors[0].value);
                expect(color2).toEqual("red");
                expect(color3).toEqual(colors[2].value);
            });
        });
    });
}
