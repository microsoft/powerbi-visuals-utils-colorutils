import powerbi from "powerbi-visuals-api";
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import IDataViewObjects = powerbi.DataViewObjects;
import PrimitiveValue = powerbi.PrimitiveValue;
import Selector = powerbi.data.Selector;
import IColorPalette = powerbi.extensibility.IColorPalette;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
export declare type ThemeColorName = keyof ISandboxExtendedColorPalette;
export declare class ColorHelper {
    private fillProp;
    private defaultDataPointColor;
    private colorPalette;
    constructor(colors: IColorPalette | ISandboxExtendedColorPalette, fillProp?: DataViewObjectPropertyIdentifier, defaultDataPointColor?: string);
    /**
     * Gets the color for the given series value.
     * If no explicit color or default color has been set then the color is
     * allocated from the color scale for this series.
     */
    getColorForSeriesValue(objects: IDataViewObjects, value: PrimitiveValue, themeColorName?: ThemeColorName): string;
    /**
     * Gets the color for the given measure.
     */
    getColorForMeasure(objects: IDataViewObjects, measureKey: any, themeColorName?: ThemeColorName): string;
    static normalizeSelector(selector: Selector, isSingleSeries?: boolean): Selector;
    readonly isHighContrast: boolean;
    getThemeColor(themeColorName?: ThemeColorName): string;
    getHighContrastColor(themeColorName?: ThemeColorName, defaultColor?: string): string;
}
