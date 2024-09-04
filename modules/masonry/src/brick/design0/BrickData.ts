import type { TBrickArgDataType, TBrickColor, TBrickCoords, TBrickExtent } from '@/@types/brick';
import { BrickModelData } from '../model';
import { generatePath } from '../utils/path';

// -------------------------------------------------------------------------------------------------

/**
 * @class
 * Final class that defines a data brick.
 */
export default class BrickData extends BrickModelData {
    readonly _pathResults: ReturnType<typeof generatePath>;

    constructor(params: {
        //intrinsic
        uuid: string;
        name: string;
        label: string;
        glyph: string;
        dataType: TBrickArgDataType;
        dynamic: boolean;
        value?: boolean | number | string;
        input?: 'boolean' | 'number' | 'string' | 'options';
        //style
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
    }) {
        super(params);
        this._pathResults = generatePath({
            hasNest: false,
            hasNotchArg: true,
            hasNotchInsTop: false,
            hasNotchInsBot: false,
            scale: this._scale,
            innerLengthX: 100,
            argHeights: [],
        });
    }

    // Getter for SVG path
    public get SVGpath(): string {
        return this._pathResults.path;
    }

    // Getter for bounding box of the brick
    public get bBoxBrick(): { extent: TBrickExtent; coords: TBrickCoords } {
        const { extent, coords } = this._pathResults.bBoxBrick;
        return {
            extent: {
                width: extent.width * this._scale,
                height: extent.height * this._scale,
            },
            coords: {
                x: coords.x * this._scale,
                y: coords.y * this._scale,
            },
        };
    }

    // Getter for bounding box of the argument notch
    public get bBoxNotchArg(): { extent: TBrickExtent; coords: TBrickCoords } {
        const { extent, coords } = this._pathResults.bBoxNotchArg!;
        return {
            extent: {
                width: extent.width * this._scale,
                height: extent.height * this._scale,
            },
            coords: {
                x: coords.x * this._scale,
                y: coords.y * this._scale,
            },
        };
    }

    // Method to return React props for the BrickData component
    public renderProps(): Record<string, unknown> {
        return {
            uuid: this.uuid,
            name: this.name,
            label: this.label,
            glyph: this.glyph,
            dataType: this.dataType,
            dynamic: this.dynamic,
            value: this.value,
            input: this.input,
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
    public setDynamic(dynamic: boolean): void {
        this._dynamic = dynamic;
        this.updateConnectionPoints();
    }

    public setValue(value: boolean | number | string): void {
        this._value = value;
    }

    public setInput(input: 'boolean' | 'number' | 'string' | 'options'): void {
        this._input = input;
    }

    public setHighlighted(highlighted: boolean): void {
        this.highlighted = highlighted;
    }

    // Method to update connection points based on current state
    protected updateConnectionPoints(): void {
        // Update connection points logic if needed
        this._connectionPoints.ArgsOutgoing = this._dynamic ? [{ x: 0, y: 0 }] : [];
    }
}
