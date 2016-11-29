declare module powerbi.extensibility.utils.color {
    import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
    import IDataViewObjects = powerbi.DataViewObjects;
    import PrimitiveValue = powerbi.PrimitiveValue;
    import Selector = powerbi.data.Selector;
    import IColorPalette = powerbi.extensibility.IColorPalette;
    class ColorHelper {
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
}
declare module powerbi.extensibility.utils.color {
    function hexToRGBString(hex: string, transparency?: number): string;
    function rotate(rgbString: string, rotateFactor: number): string;
    function normalizeToHexString(color: string): string;
    function parseColorString(color: string): RgbColor;
    function darken(color: RgbColor, diff: number): RgbColor;
    function rgbString(color: RgbColor): string;
    function hexString(color: RgbColor): string;
    /**
     * Overlays a color with opacity over a background color
     * @param {string} foreColor Color to overlay
     * @param {number} opacity number between 0 (transparent) to 1 (opaque)
     * @param {string} backColor Background color
     * @returns Result color
     */
    function hexBlend(foreColor: string, opacity: number, backColor: string): string;
    /**
     * Overlays a color with opacity over a background color. Any alpha-channel is ignored.
     * @param {RgbColor} foreColor Color to overlay
     * @param {number} opacity number between 0 (transparent) to 1 (opaque). Any value out of range will be corrected.
     * @param {RgbColor} backColor Background color
     * @returns
     */
    function rgbBlend(foreColor: RgbColor, opacity: number, backColor: RgbColor): RgbColor;
    /**
     * Blend a single channel for two colors
     * @param {number} foreChannel Channel of foreground color. Will be enforced to be between 0 and 255.
     * @param {number} opacity opacity of the foreground color. Will be enforced to be between 0 and 1.
     * @param {number} backChannel channel of the background color. Will be enforced to be between 0 and 255.
     * @returns result channel value
     */
    function channelBlend(foreChannel: number, opacity: number, backChannel: number): number;
    /**
     * Calculate the highlight color from the rgbColor based on the lumianceThreshold and delta.
     * @param {RgbColor} rgbColor The original color.
     * @param {number} lumianceThreshold The lumiance threshold used, the highlight color will be brighter when the lumiance is smaller the threshold, otherwise the highlight color will be darker. Will be enforced to be between 0 and 1.
     * @param {number} delta the highlight color will be calculated based on the delta. Will be enforced to be between 0 and 1. lumianceThreshold + delta cannot greater than 1.
     * @returns result highlight color value
     */
    function calculateHighlightColor(rgbColor: RgbColor, lumianceThreshold: number, delta: number): string;
    interface RgbColor {
        R: number;
        G: number;
        B: number;
        A?: number;
    }
    interface LinearColorScale {
        (value: number): string;
    }
    function createLinearColorScale(domain: number[], range: string[], clamp: boolean): LinearColorScale;
    /**
     * Convert string hex expression to number, calculate percentage and R, G, B channels.
     * Apply percentage for each channel and return back hex value as string with pound sign.
     */
    function shadeColor(color: string, percent: number): string;
}
