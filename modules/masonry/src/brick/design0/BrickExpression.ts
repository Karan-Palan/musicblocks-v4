import type { TBrickArgDataType, TBrickColor, TBrickCoords, TBrickExtent } from '@/@types/brick';
import { BrickModelExpression } from '../model';
import { generatePath } from '../utils/path';

// -------------------------------------------------------------------------------------------------

/**
 * @class
 * Final class that defines an expression brick.
 */
export default class BrickExpression extends BrickModelExpression {
    readonly _pathResults: ReturnType<typeof generatePath>;

    constructor(params: {
        uuid: string;
        name: string;
        label: string;
        glyph: string;
        dataType: TBrickArgDataType;
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
    }) {
        super(params);
        const argsKeys = Object.keys(this._args);
        this._pathResults = generatePath({
            hasNest: false,
            hasNotchArg: true,
            hasNotchInsTop: false,
            hasNotchInsBot: false,
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

    // Method to return React props for the BrickExpression component
    public getReactProps(): Record<string, unknown> {
        return {
            uuid: this.uuid,
            name: this.name,
            label: this.label,
            glyph: this.glyph,
            dataType: this.dataType,
            args: this.args,
            colorBg: this.colorBg,
            colorFg: this.colorFg,
            colorBgHighlight: this.colorBgHighlight,
            colorFgHighlight: this.colorFgHighlight,
            outline: this.outline,
            scale: this.scale,
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

    public setHighlighted(highlighted: boolean): void {
        this.highlighted = highlighted;
    }

    // Method to update connection points based on current state
    protected updateConnectionPoints(): void {
        this._connectionPoints.ArgsIncoming = Object.keys(this._args).map((_, index) => ({
            x: 0,
            y: index * 20,
        }));
        this._connectionPoints.ArgsOutgoing = Object.keys(this._args).map((_, index) => ({
            x: 0,
            y: index * 20,
        }));
    }
}
