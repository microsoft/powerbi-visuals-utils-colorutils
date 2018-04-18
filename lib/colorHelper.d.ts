/// <reference types="powerbi-visuals-tools" />
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import IDataViewObjects = powerbi.DataViewObjects;
import PrimitiveValue = powerbi.PrimitiveValue;
import Selector = powerbi.data.Selector;
import IColorPalette = powerbi.extensibility.IColorPalette;
export declare class ColorHelper {
    private fillProp;
    private defaultDataPointColor;
    private colors;
    constructor(colors: IColorPalette, fillProp?: DataViewObjectPropertyIdentifier, defaultDataPointColor?: string);
    /**
     * Gets the color for the given series value.
     * If no explicit color or default color has been set then the color is
     * allocated from the color scale for this series.
     */
    getColorForSeriesValue(objects: IDataViewObjects, value: PrimitiveValue): string;
    /**
     * Gets the color for the given measure.
     */
    getColorForMeasure(objects: IDataViewObjects, measureKey: any): string;
    static normalizeSelector(selector: Selector, isSingleSeries?: boolean): Selector;
}
