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

// powerbi
import powerbi from "powerbi-visuals-api";
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import IDataViewObjects = powerbi.DataViewObjects;
import PrimitiveValue = powerbi.PrimitiveValue;

// powerbi.data
import Selector = powerbi.data.Selector;

// powerbi.extensibility
import IColorPalette = powerbi.extensibility.IColorPalette;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;

export type ThemeColorName = keyof ISandboxExtendedColorPalette;

export class ColorHelper {
    private fillProp: DataViewObjectPropertyIdentifier;
    private defaultDataPointColor: string;
    private colorPalette: IColorPalette | ISandboxExtendedColorPalette;

    constructor(colors: IColorPalette | ISandboxExtendedColorPalette, fillProp?: DataViewObjectPropertyIdentifier, defaultDataPointColor?: string) {
        this.colorPalette = colors;
        this.fillProp = fillProp;
        this.defaultDataPointColor = defaultDataPointColor;
    }

    /**
     * Gets the color for the given series value.
     * If no explicit color or default color has been set then the color is
     * allocated from the color scale for this series.
     */
    public getColorForSeriesValue(objects: IDataViewObjects, value: PrimitiveValue, themeColorName?: ThemeColorName): string {
        if (this.isHighContrast) {
            return this.getThemeColor(themeColorName);
        }

        return (this.fillProp && dataViewObjects.getFillColor(objects, this.fillProp))
            || this.defaultDataPointColor
            || this.colorPalette.getColor(String(value)).value;
    }

    /**
     * Gets the color for the given measure.
     */
    public getColorForMeasure(objects: IDataViewObjects, measureKey: any, themeColorName?: ThemeColorName): string {
        if (this.isHighContrast) {
            return this.getThemeColor(themeColorName);
        }
        // Note, this allocates the color from the scale regardless of if we use it or not which helps keep colors stable.
        const scaleColor = this.colorPalette.getColor(measureKey).value;

        return (this.fillProp && dataViewObjects.getFillColor(objects, this.fillProp))
            || this.defaultDataPointColor
            || scaleColor;
    }

    public static normalizeSelector(selector: Selector, isSingleSeries?: boolean): Selector {
        // For dynamic series charts, colors are set per category.  So, exclude any measure (metadata repetition) from the selector.
        if (selector && (isSingleSeries || (<any>selector).data)) {
            return { data: (<any>selector).data };
        }

        return selector;
    }

    public get isHighContrast(): boolean {
        return !!(this.colorPalette && (this.colorPalette as ISandboxExtendedColorPalette).isHighContrast);
    }

    public getThemeColor(themeColorName: ThemeColorName = "background"): string {
        return this.colorPalette
            && this.colorPalette[themeColorName]
            && this.colorPalette[themeColorName].value;
    }

    public getHighContrastColor(themeColorName: ThemeColorName = "background", defaultColor?: string): string {
        return this.isHighContrast
            ? this.getThemeColor(themeColorName)
            : defaultColor;
    }
}