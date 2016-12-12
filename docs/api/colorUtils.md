# colorUtils
> The ```colorUtils``` module provides some special methods to convert color formats.

The ```powerbi.extensibility.utils.color``` module provides the following functions:

* [hexToRGBString](#hextorgbstring)
* [rotate](#rotate)
* [parseColorString](#parsecolorstring)
* [calculateHighlightColor](#calculatehighlightcolor)
* [createLinearColorScale](#createlinearcolorscale)
* [shadeColor](#shadecolor)
* [rgbBlend](#rgbblend)
* [channelBlend](#channelblend)
* [hexBlend](#hexblend)

## hexToRGBString
Converts hex color to RGB string.

```typescript
function hexToRGBString(hex: string, transparency?: number): string
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.hexToRGBString('#112233');

// returns: "rgb(17,34,51)"
```

## rotate
Rotates RGB color.

```typescript
function rotate(rgbString: string, rotateFactor: number): string
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.rotate("#CC0000", 0.25); // returns: #66CC00
```

## parseColorString
Parses any color string to RGB format.

```typescript
function parseColorString(color: string): RgbColor
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.parseColorString('#09f');
// returns: {R: 0, G: 153, B: 255 }

ColorUtility.parseColorString('rgba(1, 2, 3, 1.0)');
// returns: {R: 1, G: 2, B: 3, A: 1.0 }
```

## calculateHighlightColor
Calculate the highlight color from the rgbColor based on the lumianceThreshold and delta.

```typescript
function calculateHighlightColor(rgbColor: RgbColor, lumianceThreshold: number, delta: number): string
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

let yellow = "#FFFF00",
    yellowRGB = ColorUtility.parseColorString(yellow);

ColorUtility.calculateHighlightColor(yellowRGB, 0.8, 0.2);

// returns: '#CCCC00'
```

## createLinearColorScale
Returns a linear color scale for given domain of numbers.

```typescript
function createLinearColorScale(domain: number[], range: string[], clamp: boolean): LinearColorScale
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

let scale = ColorUtility.createLinearColorScale(
    [0, 1, 2, 3, 4],
    ["red", "green", "blue", "black", "yellow"],
    true);

scale(1); // returns: green
scale(10); // returns: yellow
```

## shadeColor
Converts string hex expression to number, calculate percentage and R, G, B channels.
Applies percentage for each channel and returns back hex value as string with pound sign.

```typescript
function shadeColor(color: string, percent: number): string
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.shadeColor('#000000', 0.1); // returns '#1a1a1a'
ColorUtility.shadeColor('#FFFFFF', -0.5); // returns '#808080'
ColorUtility.shadeColor('#00B8AA', -0.25); // returns '#008a80'
ColorUtility.shadeColor('#00B8AA', 0); // returns '#00b8aa'
```

## rgbBlend
Overlays a color with opacity over a background color. Any alpha-channel is ignored.

```typescript
function rgbBlend(foreColor: RgbColor, opacity: number, backColor: RgbColor): RgbColor
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.rgbBlend({R: 100, G: 100, B: 100}, 0.5, {R: 200, G: 200, B: 200});

// returns: {R: 150, G: 150, B: 150}
```

## channelBlend
Blends a single channel for two colors.

```typescript
function channelBlend(foreChannel: number, opacity: number, backChannel: number): number
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

ColorUtility.channelBlend(0, 1, 255); // returns: 0
ColorUtility.channelBlend(128, 1, 255); // returns: 128
ColorUtility.channelBlend(255, 0, 0); // returns: 0
ColorUtility.channelBlend(88, 0, 88); // returns: 88
```

## hexBlend
Overlays a color with opacity over a background color.

```typescript
function hexBlend(foreColor: string, opacity: number, backColor: string): string
```

### Example

```typescript
import ColorUtility = powerbi.extensibility.utils.color;

let yellow = "#FFFF00",
    black = "#000000",
    white = "#FFFFFF";

ColorUtility.hexBlend(yellow, 0.5, white); // returns: "#FFFF80"
ColorUtility.hexBlend(white, 0.5, yellow); // returns: "#FFFF80"

ColorUtility.hexBlend(yellow, 0.5, black); // returns: "#808000"
ColorUtility.hexBlend(black, 0.5, yellow); // returns: "#808000"
```
