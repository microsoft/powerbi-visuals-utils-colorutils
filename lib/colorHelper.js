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
import { dataViewObjects } from "powerbi-visuals-utils-dataviewutils";
var DataViewObjects = dataViewObjects.DataViewObjects;
export class ColorHelper {
    constructor(colors, fillProp, defaultDataPointColor) {
        this.colors = colors;
        this.fillProp = fillProp;
        this.defaultDataPointColor = defaultDataPointColor;
    }
    /**
     * Gets the color for the given series value.
     * If no explicit color or default color has been set then the color is
     * allocated from the color scale for this series.
     */
    getColorForSeriesValue(objects, value) {
        return (this.fillProp && DataViewObjects.getFillColor(objects, this.fillProp))
            || this.defaultDataPointColor
            || this.colors.getColor(String(value)).value;
    }
    /**
     * Gets the color for the given measure.
     */
    getColorForMeasure(objects, measureKey) {
        // Note, this allocates the color from the scale regardless of if we use it or not which helps keep colors stable.
        let scaleColor = this.colors.getColor(measureKey).value;
        return (this.fillProp && DataViewObjects.getFillColor(objects, this.fillProp))
            || this.defaultDataPointColor
            || scaleColor;
    }
    static normalizeSelector(selector, isSingleSeries) {
        // For dynamic series charts, colors are set per category.  So, exclude any measure (metadata repetition) from the selector.
        if (selector && (isSingleSeries || selector.data))
            return { data: selector.data };
        return selector;
    }
}
//# sourceMappingURL=colorHelper.js.map