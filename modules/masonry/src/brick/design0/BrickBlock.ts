import type { TBrickArgDataType, TBrickColor, TBrickCoords, TBrickExtent } from '@/@types/brick';
import { BrickModelBlock } from '../model';
import { generatePath } from '../utils/path';

/**
 * Defines a block brick, extending `BrickModelBlock`.
 */
export default class BrickBlock extends BrickModelBlock {
    readonly _pathResults: ReturnType<typeof generatePath>;
    readonly id: string;
    readonly colorBgHighlight: TBrickColor;
    readonly colorFgHighlight: TBrickColor;
    public highlighted: boolean;
    private _argExtents: Record<string, { argLengthX?: number; argLengthY: number }> = {};
    private _folded: boolean;

    constructor(params: {
        id: string;
        name: string;
        label: string;
        glyph: string;
        args: Record<
            string,
            {
                argId: string;
                argLabel: string;
                argTypeIncoming: TBrickArgDataType;
            }
        >;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        outline: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
        nestLengthY: number;
        folded?: boolean;
        highlighted?: boolean;
    }) {
        super({
            name: params.name,
            label: params.label,
            glyph: params.glyph,
            args: Object.fromEntries(
                Object.entries(params.args).map(([key, value]) => [
                    key,
                    {
                        label: value.argLabel,
                        dataType: value.argTypeIncoming,
                        meta: {},
                    },
                ]),
            ),
            colorBg: params.colorBg,
            colorFg: params.colorFg,
            outline: params.outline,
            scale: params.scale,
            connectAbove: params.connectAbove,
            connectBelow: params.connectBelow,
        });

        this.id = params.id;
        this.colorBgHighlight = params.colorBgHighlight;
        this.colorFgHighlight = params.colorFgHighlight;
        this.highlighted = params.highlighted ?? false;
        this._folded = params.folded ?? false;

        this._pathResults = generatePath({
            hasNest: true,
            hasNotchArg: false,
            hasNotchInsTop: params.connectAbove,
            hasNotchInsBot: params.connectBelow,
            scale: params.scale,
            nestLengthY: params.nestLengthY,
            innerLengthX: 100,
            argHeights: Array(Object.keys(params.args).length).fill(17),
        });
    }

    public get SVGpath(): string {
        return this._pathResults.path;
    }

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

    public get bBoxArgs(): Record<string, { extent: TBrickExtent; coords: TBrickCoords }> {
        const result: Record<string, { extent: TBrickExtent; coords: TBrickCoords }> = {};
        Object.keys(this._args).forEach((key, index) => {
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

    public get instantiationProperties(): {
        id: string;
        name: string;
        label: string;
        glyph: string;
        args: Record<
            string,
            {
                argId: string;
                argLabel: string;
                argTypeIncoming: TBrickArgDataType;
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
        highlighted: boolean;
        argExtents: Record<string, { argLengthX?: number; argLengthY: number }>;
        folded: boolean;
    } {
        return {
            id: this.id,
            name: this.name,
            label: this.label,
            glyph: this.glyph,
            args: Object.fromEntries(
                Object.entries(this._args).map(([key, value]) => [
                    key,
                    {
                        argId: value.label,
                        argLabel: value.label,
                        argTypeIncoming: value.dataType,
                    },
                ]),
            ),
            colorBg: this.colorBg,
            colorFg: this.colorFg,
            colorBgHighlight: this.colorBgHighlight,
            colorFgHighlight: this.colorFgHighlight,
            outline: this.outline,
            scale: this._scale,
            connectAbove: this.connectAbove,
            connectBelow: this.connectBelow,
            highlighted: this.highlighted,
            argExtents: this._argExtents,
            folded: this._folded,
        };
    }

    public get renderProperties(): {
        boundingBox: { extent: TBrickExtent; coords: TBrickCoords };
        connectionPoints: {
            Top: { extent: TBrickExtent; coords: TBrickCoords } | null;
            Bottom: { extent: TBrickExtent; coords: TBrickCoords } | null;
            TopInner: { extent: TBrickExtent; coords: TBrickCoords } | null;
            ArgsIncoming: { extent: TBrickExtent; coords: TBrickCoords } | null;
        };
    } {
        return {
            boundingBox: this.bBoxBrick,
            connectionPoints: {
                Top: this.bBoxNotchInsTop,
                Bottom: this.bBoxNotchInsBot,
                TopInner: this.bBoxNotchInsNestTop,
                ArgsIncoming: this.bBoxNotchArg,
            },
        };
    }
}
