# colorHelper
> The ```colorHelper``` module provides some special methods to convert color formats.

The ```powerbi.extensibility.utils.color``` module provides the following functions and interfaces:

* [hexToRGBString](#hexToRGBString)
* [rotate](#rotate)
* [parseColorString](#parseColorString)
* [rgbToHsv](#rgbToHsv)
* [hsvToRgb](#hsvToRgb)
* [rotateHsv](#rotateHsv)
* [calculateHighlightColor](#calculateHighlightColor)
* [createLinearColorScale](#createLinearColorScale)
* [shadeColor](#shadeColor)

## hexToRGBString
Converts hex color to RGB string

```typescript
function hexToRGBString(hex: string, transparency?: number): string
```

## rotate
Rotates RGB color

```typescript
function rotate(rgbString: string, rotateFactor: number): string
```

## parseColorString
Parses any color string to RGB format

```typescript
function parseColorString(color: string): RgbColor
```

## rgbToHsv
Converts RGB color to HSV color

```typescript
function rgbToHsv(rgbColor: RgbColor): HsvColor
```

## hsvToRgb
Converts HSV color to RGB color

```typescript
function hsvToRgb(hsvColor: HsvColor): RgbColor
```

## rotateHsv
Rotates Hsv color

```typescript
function rotateHsv(hsvColor: HsvColor, rotateFactor: number): HsvColor
```

## calculateHighlightColor
Calculate the highlight color from the rgbColor based on the lumianceThreshold and delta.

```typescript
function calculateHighlightColor(rgbColor: RgbColor, lumianceThreshold: number, delta: number): string
```

## createLinearColorScale
Returns a linear color scale for given domain of numbers

```typescript
function createLinearColorScale(domain: number[], range: string[], clamp: boolean): LinearColorScale
```

## shadeColor
Convert string hex expression to number, calculate percentage and R, G, B channels.
Apply percentage for each channel and return back hex value as string with pound sign.

```typescript
function shadeColor(color: string, percent: number): string
```
