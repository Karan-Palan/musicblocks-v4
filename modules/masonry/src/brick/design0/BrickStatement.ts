import type { TBrickArgDataType, TBrickColor, TBrickCoords, TBrickExtent } from '@/@types/brick';
import { BrickModelStatement } from '../model';
import { generatePath } from '../utils/path';

// -------------------------------------------------------------------------------------------------

/**
 * @class
 * Final class that defines a statement brick.
 */
export default class BrickStatement extends BrickModelStatement {
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
                meta: unknown;
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
    }) {
        super(params);
        const argsKeys = Object.keys(this._args);
        this._pathResults = generatePath({
            hasNest: false,
            hasNotchArg: false,
            hasNotchInsTop: true,
            hasNotchInsBot: true,
            scale: this._scale,
            innerLengthX: 100,
            argHeights: Array.from({ length: argsKeys.length }, () => 17),
        });
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

    // Method to return React props for the BrickStatement component
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
            highlighted: this.highlighted,
        };
    }

    // Setters for properties that can change at runtime
    public setArgs(
        args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>,
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

    public setHighlighted(highlighted: boolean): void {
        this.highlighted = highlighted;
    }

    // Method to update connection points based on current state
    protected updateConnectionPoints(): void {
        // Update the connection points for the top and bottom of the brick
        this._connectionPoints.ArgsIncoming = this.connectAbove ? [{ x: 0, y: 0 }] : [];
        this._connectionPoints.ArgsOutgoing = this.connectBelow ? [{ x: 0, y: 0 }] : [];
    }
}
