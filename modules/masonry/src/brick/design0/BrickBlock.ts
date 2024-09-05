import type { TBrickRenderPropsBlock, TColor, TCoords, TExtent } from '@/@types/brick';
import { BrickModelBlock } from '../model';
import { generatePath } from '../utils/path';

// -------------------------------------------------------------------------------------------------

/**
 * @class
 * Final class that defines a block brick.
 */
export default class BrickBlock extends BrickModelBlock {
    readonly _pathResults: ReturnType<typeof generatePath>;

    private _boundingBoxArgs: Record<string, TExtent> = {};
    private _boundingBoxNest: TExtent = { width: 0, height: 0 };

    constructor(params: {
        uuid: string;
        name: string;

        label: string;
        glyph?: string;
        colorBg: TColor;
        colorFg: TColor;
        colorBgHighlight: TColor;
        colorFgHighlight: TColor;
        outline: TColor;
        connectAbove: boolean;
        connectBelow: boolean;

        args: {
            /** unique identifier of the argument */
            id: string;
            /** label for the argument */
            label: string;
        }[];
    }) {
        super(params);

        this._pathResults = generatePath({
            hasNest: true,
            hasNotchArg: false,
            hasNotchInsTop: this._connectAbove,
            hasNotchInsBot: this._connectBelow,
            scale: this._scale,
            nestLengthY: 0, // generate from length of label/s
            innerLengthX: 100,
            argHeights: Array.from({ length: this._args.length }, () => 17),
        });
    }

    /** @todo implement correctly */
    public get boundingBox(): TExtent {
        return {
            width: this._pathResults.bBoxBrick.extent.width * this._scale,
            height: this._pathResults.bBoxBrick.extent.height * this._scale,
        };
    }

    /** @todo implement correctly */
    public get connPointsFixed(): Record<
        'insTop' | 'insBottom' | 'insNest',
        { extent: TExtent; coords: TCoords }
    > {
        return {
            insTop: {
                extent: { width: 0, height: 0 },
                coords: { x: 0, y: 0 },
            },
            insBottom: {
                extent: { width: 0, height: 0 },
                coords: { x: 0, y: 0 },
            },
            insNest: {
                extent: { width: 0, height: 0 },
                coords: { x: 0, y: 0 },
            },
        };
    }

    /** @todo implement correctly */
    get connPointsArg(): { [id: string]: { extent: TExtent; coords: TCoords } } {
        const results: { [id: string]: { extent: TExtent; coords: TCoords } } = {};

        this._args.forEach(({ id }) => {
            results[id] = {
                extent: { width: 0, height: 0 },
                coords: { x: 0, y: 0 },
            };
        });

        return results;
    }

    /** @todo implement correctly */
    public get renderProps(): TBrickRenderPropsBlock {
        return {
            path: this._pathResults.path,

            label: this._label,
            labelArgs: this._args.map(({ label }) => label),

            boundingBoxArgs: this._args.map(({ id }) => this._boundingBoxArgs[id]),
            boundingBoxNest: this._boundingBoxNest,

            glyph: this._glyph,
            colorBg: !this._highlighted ? this._colorBg : this._colorBgHighlight,
            colorFg: !this._highlighted ? this._colorFg : this._colorFgHighlight,
            outline: this._outline,
            scale: this._scale,
            folded: this.folded,
        };
    }

    /** @todo implement correctly */
    public setBoundingBoxArg(id: string, extent: TExtent): void {
        this._boundingBoxArgs[id] = extent;
    }

    public setBoundingBoxNest(extent: TExtent): void {
        this._boundingBoxNest = extent;
    }

    // // Getter for bounding box of the brick
    // public get bBoxBrick(): { extent: TBrickExtent; coords: TBrickCoords } {
    //     return {
    //         extent: {
    //             width: this._pathResults.bBoxBrick.extent.width * this._scale,
    //             height: this._pathResults.bBoxBrick.extent.height * this._scale,
    //         },
    //         coords: {
    //             x: this._pathResults.bBoxBrick.coords.x * this._scale,
    //             y: this._pathResults.bBoxBrick.coords.y * this._scale,
    //         },
    //     };
    // }

    // // Getter for bounding boxes of the arguments
    // public get bBoxArgs(): Record<string, { extent: TBrickExtent; coords: TBrickCoords }> {
    //     const argsKeys = Object.keys(this._args);
    //     const result: Record<string, { extent: TBrickExtent; coords: TBrickCoords }> = {};

    //     argsKeys.forEach((key, index) => {
    //         result[key] = {
    //             extent: {
    //                 width: this._pathResults.bBoxArgs.extent.width * this._scale,
    //                 height: this._pathResults.bBoxArgs.extent.height * this._scale,
    //             },
    //             coords: {
    //                 x: this._pathResults.bBoxArgs.coords[index].x * this._scale,
    //                 y: this._pathResults.bBoxArgs.coords[index].y * this._scale,
    //             },
    //         };
    //     });

    //     return result;
    // }

    // // Getter for bounding box of the argument notch
    // public get bBoxNotchArg(): { extent: TBrickExtent; coords: TBrickCoords } {
    //     return {
    //         extent: {
    //             width: this._pathResults.bBoxNotchArg!.extent.width * this._scale,
    //             height: this._pathResults.bBoxNotchArg!.extent.height * this._scale,
    //         },
    //         coords: {
    //             x: this._pathResults.bBoxNotchArg!.coords.x * this._scale,
    //             y: this._pathResults.bBoxNotchArg!.coords.y * this._scale,
    //         },
    //     };
    // }

    // // Getter for bounding box of the top insertion notch
    // public get bBoxNotchInsTop(): { extent: TBrickExtent; coords: TBrickCoords } {
    //     return {
    //         extent: {
    //             width: this._pathResults.bBoxNotchInsTop!.extent.width * this._scale,
    //             height: this._pathResults.bBoxNotchInsTop!.extent.height * this._scale,
    //         },
    //         coords: {
    //             x: this._pathResults.bBoxNotchInsTop!.coords.x * this._scale,
    //             y: this._pathResults.bBoxNotchInsTop!.coords.y * this._scale,
    //         },
    //     };
    // }

    // // Getter for bounding box of the bottom insertion notch
    // public get bBoxNotchInsBot(): { extent: TBrickExtent; coords: TBrickCoords } {
    //     return {
    //         extent: {
    //             width: this._pathResults.bBoxNotchInsBot!.extent.width * this._scale,
    //             height: this._pathResults.bBoxNotchInsBot!.extent.height * this._scale,
    //         },
    //         coords: {
    //             x: this._pathResults.bBoxNotchInsBot!.coords.x * this._scale,
    //             y: this._pathResults.bBoxNotchInsBot!.coords.y * this._scale,
    //         },
    //     };
    // }

    // // Getter for bounding box of the nest insertion notch
    // public get bBoxNotchInsNestTop(): { extent: TBrickExtent; coords: TBrickCoords } {
    //     return {
    //         extent: {
    //             width: this._pathResults.bBoxNotchInsNestTop!.extent.width * this._scale,
    //             height: this._pathResults.bBoxNotchInsNestTop!.extent.height * this._scale,
    //         },
    //         coords: {
    //             x: this._pathResults.bBoxNotchInsNestTop!.coords.x * this._scale,
    //             y: this._pathResults.bBoxNotchInsNestTop!.coords.y * this._scale,
    //         },
    //     };
    // }

    // // Setters for properties that can change at runtime
    // public setArgs(
    //     args: Record<
    //         string,
    //         {
    //             label: string;
    //             dataType: TBrickArgDataType;
    //             meta: { argId: string; argLabel: string; argTypeIncoming: string };
    //         }
    //     >,
    // ): void {
    //     this._args = args;
    //     this.updateConnectionPoints();
    // }

    // // Method to update connection points based on current state
    // protected updateConnectionPoints(): void {
    //     // Update the connection points for the top, bottom, and nest of the block
    //     this._connectionPointsBlock.Top = this.connectAbove ? [{ x: 0, y: 0 }] : [];
    //     this._connectionPointsBlock.Bottom = this.connectBelow ? [{ x: 0, y: 0 }] : [];
    //     this._connectionPointsBlock.TopInner = this.folded ? [] : [{ x: 0, y: 0 }];
    // }
}
