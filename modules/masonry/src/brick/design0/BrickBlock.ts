import type { TBrickArgDataType, TBrickColor, TBrickCoords, TBrickExtent } from '@/@types/brick';
import { BrickModelBlock } from '../model';
import { generatePath } from '../utils/path';

// -------------------------------------------------------------------------------------------------

/**
 * @class
 * Final class that defines a block brick.
 */
export default class BrickBlock extends BrickModelBlock {
    readonly _pathResults: ReturnType<typeof generatePath>;

    constructor(params: {
        uuid: string;
        name: string;
        label: string;
        glyph: string;
        args: Record<
            string,
            {
                label: string;
                dataType: TBrickArgDataType;
                meta: {
                    argId: string;
                    argLabel: string;
                    argTypeIncoming: string;
                };
            }
        >;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
        nestLengthY: number;
        folded?: boolean; // Made folded optional
    }) {
        super(params);
        const argsKeys = Object.keys(this._args);
        this._pathResults = generatePath({
            hasNest: true,
            hasNotchArg: false,
            hasNotchInsTop: this._connectAbove,
            hasNotchInsBot: this._connectBelow,
            scale: this._scale,
            nestLengthY: params.nestLengthY,
            innerLengthX: 100,
            argHeights: Array.from({ length: argsKeys.length }, () => 17),
        });

        // Set folded to its initial state or default to false
        this._folded = params.folded ?? false;
    }

    // Getter for SVG path
    public get SVGpath(): string {
        return this._pathResults.path;
    }

    // Getter for bounding box of the brick
    public get bBoxBrick(): { extent: TBrickExtent; coords: TBrickCoords } {
        return {
            extent: {
                width: this._pathResults.bBoxBrick.extent.width * this._scale,
                height: this._pathResults.bBoxBrick.extent.height * this._scale,
            },
            coords: {
                x: this._pathResults.bBoxBrick.coords.x * this._scale,
                y: this._pathResults.bBoxBrick.coords.y * this._scale,
            },
        };
    }

    // Getter for bounding boxes of the arguments
    public get bBoxArgs(): Record<string, { extent: TBrickExtent; coords: TBrickCoords }> {
        const argsKeys = Object.keys(this._args);
        const result: Record<string, { extent: TBrickExtent; coords: TBrickCoords }> = {};

        argsKeys.forEach((key, index) => {
            result[key] = {
                extent: {
                    width: this._pathResults.bBoxArgs.extent.width * this._scale,
                    height: this._pathResults.bBoxArgs.extent.height * this._scale,
                },
                coords: {
                    x: this._pathResults.bBoxArgs.coords[index].x * this._scale,
                    y: this._pathResults.bBoxArgs.coords[index].y * this._scale,
                },
            };
        });

        return result;
    }

    // Getter for bounding box of the argument notch
    public get bBoxNotchArg(): { extent: TBrickExtent; coords: TBrickCoords } {
        return {
            extent: {
                width: this._pathResults.bBoxNotchArg!.extent.width * this._scale,
                height: this._pathResults.bBoxNotchArg!.extent.height * this._scale,
            },
            coords: {
                x: this._pathResults.bBoxNotchArg!.coords.x * this._scale,
                y: this._pathResults.bBoxNotchArg!.coords.y * this._scale,
            },
        };
    }

    // Getter for bounding box of the top insertion notch
    public get bBoxNotchInsTop(): { extent: TBrickExtent; coords: TBrickCoords } {
        return {
            extent: {
                width: this._pathResults.bBoxNotchInsTop!.extent.width * this._scale,
                height: this._pathResults.bBoxNotchInsTop!.extent.height * this._scale,
            },
            coords: {
                x: this._pathResults.bBoxNotchInsTop!.coords.x * this._scale,
                y: this._pathResults.bBoxNotchInsTop!.coords.y * this._scale,
            },
        };
    }

    // Getter for bounding box of the bottom insertion notch
    public get bBoxNotchInsBot(): { extent: TBrickExtent; coords: TBrickCoords } {
        return {
            extent: {
                width: this._pathResults.bBoxNotchInsBot!.extent.width * this._scale,
                height: this._pathResults.bBoxNotchInsBot!.extent.height * this._scale,
            },
            coords: {
                x: this._pathResults.bBoxNotchInsBot!.coords.x * this._scale,
                y: this._pathResults.bBoxNotchInsBot!.coords.y * this._scale,
            },
        };
    }

    // Getter for bounding box of the nest insertion notch
    public get bBoxNotchInsNestTop(): { extent: TBrickExtent; coords: TBrickCoords } {
        return {
            extent: {
                width: this._pathResults.bBoxNotchInsNestTop!.extent.width * this._scale,
                height: this._pathResults.bBoxNotchInsNestTop!.extent.height * this._scale,
            },
            coords: {
                x: this._pathResults.bBoxNotchInsNestTop!.coords.x * this._scale,
                y: this._pathResults.bBoxNotchInsNestTop!.coords.y * this._scale,
            },
        };
    }

    // Method to return React props for the BrickBlock component
    public getReactProps(): Record<string, unknown> {
        return {
            uuid: this.uuid,
            name: this.name,
            label: this.label,
            glyph: this.glyph,
            args: this.args,
            colorBg: this.colorBg,
            colorFg: this.colorFg,
            colorBgHighlight: this.colorBgHighlight,
            colorFgHighlight: this.colorFgHighlight,
            outline: this.outline,
            scale: this.scale,
            connectAbove: this.connectAbove,
            connectBelow: this.connectBelow,
            folded: this.folded,
            highlighted: this.highlighted,
        };
    }

    // Setters for properties that can change at runtime
    public setArgs(
        args: Record<
            string,
            {
                label: string;
                dataType: TBrickArgDataType;
                meta: { argId: string; argLabel: string; argTypeIncoming: string };
            }
        >,
    ): void {
        this._args = args;
        this.updateConnectionPoints();
    }

    public setConnectAbove(connectAbove: boolean): void {
        this._connectAbove = connectAbove;
    }

    public setConnectBelow(connectBelow: boolean): void {
        this._connectBelow = connectBelow;
    }

    public setFolded(folded?: boolean): void {
        // Set folded as optional
        this._folded = folded ?? false; // Default to false if not provided
    }

    public setHighlighted(highlighted: boolean): void {
        this.highlighted = highlighted;
    }

    // Method to update connection points based on current state
    protected updateConnectionPoints(): void {
        // Update the connection points for the top, bottom, and nest of the block
        this._connectionPointsBlock.Top = this.connectAbove ? [{ x: 0, y: 0 }] : [];
        this._connectionPointsBlock.Bottom = this.connectBelow ? [{ x: 0, y: 0 }] : [];
        this._connectionPointsBlock.TopInner = this.folded ? [] : [{ x: 0, y: 0 }];
    }
}
