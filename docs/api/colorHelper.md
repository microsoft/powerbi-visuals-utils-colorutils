# ColorHelper
> The ```ColorHelper``` class provides some special methods to generate any number of different colors.

The ```powerbi.extensibility.utils.color.ColorHelper``` class provides the following functions and methods:

* [getColorForSeriesValue](#getcolorforseriesvalue)
* [getColorForMeasure](#getcolorformeasure)
* [normalizeSelector](#normalizeselector)

## getColorForSeriesValue
This method gets the color for the given series value. If no explicit color or default color has been set then the color is allocated from the color scale for this series.

```typescript
getColorForSeriesValue(objects: IDataViewObjects, value: PrimitiveValue): string
```

### Example

```typescript
import DataViewObjects = powerbi.DataViewObjects;
import IVisual = powerbi.extensibility.visual.IVisual;
import IColorPalette = powerbi.extensibility.IColorPalette;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;

export class YourVisual implements IVisual {
    // Implementation of IVisual

    private colorPalette: IColorPalette;

    constructor(options: VisualConstructorOptions) {
        this.colorPalette = options.host.colorPalette;
    }

    public update(visualUpdateOptions: VisualUpdateOptions): void {
        const valueColumns: DataViewValueColumns = visualUpdateOptions.dataViews[0].categorical.values,
            grouped: DataViewValueColumnGroup[] = valueColumns.grouped(),
            defaultDataPointColor: string = "green",
            fillProp: DataViewObjectPropertyIdentifier = {
                objectName: "objectName",
                propertyName: "propertyName"
            };

        let colorHelper: ColorHelper = new ColorHelper(
            this.colorPalette,
            fillProp,
            defaultDataPointColor);

        for (let i = 0; i < grouped.length; i++) {
            let grouping: DataViewValueColumnGroup = grouped[i];

            colorHelper.getColorForSeriesValue(grouping.objects, grouping.name); // returns a color of the series
        }
    }
}
```

## getColorForMeasure
This method gets the color for the given measure.

```typescript
getColorForMeasure(objects: IDataViewObjects, measureKey: any): string
```

### Example

```typescript
import DataViewObjects = powerbi.DataViewObjects;
import IVisual = powerbi.extensibility.visual.IVisual;
import IColorPalette = powerbi.extensibility.IColorPalette;
import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;

export class YourVisual implements IVisual {
    // Implementation of IVisual

    private colorPalette: IColorPalette;

    constructor(options: VisualConstructorOptions) {
        this.colorPalette = options.host.colorPalette;
    }

    public update(visualUpdateOptions: VisualUpdateOptions): void {
        const objects: DataViewObjects = visualUpdateOptions.dataViews[0].categorical.categories[0].objects[0],
            defaultDataPointColor: string = "green",
            fillProp: DataViewObjectPropertyIdentifier = {
                objectName: "objectName",
                propertyName: "propertyName"
            };

        let colorHelper: ColorHelper = new ColorHelper(
            this.colorPalette,
            fillProp,
            defaultDataPointColor);

        colorHelper.getColorForMeasure(objects, ""); // returns a color
    }
}
```

You can take a look at the example code of the custom visual [here](https://github.com/Microsoft/powerbi-visuals-sankey/blob/4d544ea145b4e15006083a3610dfead3da5f61a4/src/visual.ts#L537).

## normalizeSelector
This function returns the normalized selector.

```typescript
static normalizeSelector(selector: Selector, isSingleSeries?: boolean): Selector;
```

### Example

```typescript
import ISelectionId = powerbi.visuals.ISelectionId;
import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;

let selectionId: ISelectionId = ...;

ColorHelper.normalizeSelector(selectionId.getSelector(), false);

// returns the normalized selector
```

You can take a look at the example code of the custom visual [here](https://github.com/Microsoft/powerbi-visuals-sankey/blob/4d544ea145b4e15006083a3610dfead3da5f61a4/src/visual.ts#L1169).
