# colorHelper
> The ```colorHelper``` module provides some special methods to generate any number of different colors.

The ```powerbi.extensibility.utils.color``` module provides the following functions and interfaces:

* [getColorForSeriesValue](#getColorForSeriesValue)
* [getColorForMeasure](#getColorForMeasure)

## getColorForSeriesValue
Gets the color for the given series value.
If no explicit color or default color has been set then the color is
allocated from the color scale for this series.

```typescript
getColorForSeriesValue(objects: IDataViewObjects, value: PrimitiveValue): string
```

## getColorForMeasure
Gets the color for the given measure.

```typescript
getColorForMeasure(objects: IDataViewObjects, measureKey: any): string
```
