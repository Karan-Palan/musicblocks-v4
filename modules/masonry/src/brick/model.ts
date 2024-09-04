import type {
    IBrick,
    IBrickArgument,
    IBrickBlock,
    IBrickData,
    IBrickExpression,
    IBrickInstruction,
    IBrickStatement,
    TBrickArgDataType,
    TBrickColor,
    TBrickCoords,
    TBrickExtent,
    TBrickKind,
    TBrickType,
} from '@/@types/brick';

/**
 * @abstract
 * @class
 * Defines the data model of a generic brick.
 */
abstract class BrickModel implements IBrick {
    // intrinsic
    protected _uuid: string;
    protected _name: string;
    protected _kind: TBrickKind;
    protected _type: TBrickType;
    protected _label: string;
    protected _glyph: string;
    // style
    protected _colorBg: TBrickColor;
    protected _colorFg: TBrickColor;
    protected _colorBgHighlight: TBrickColor;
    protected _colorFgHighlight: TBrickColor;
    protected _outline: TBrickColor;

    public highlighted = false;
    protected _scale: number;

    // Common connection points
    protected _connectionPoints: {
        ArgsIncoming?: TBrickCoords[];
        ArgsOutgoing?: TBrickCoords[];
    };

    constructor(params: {
        uuid: string;
        name: string;
        kind: TBrickKind;
        type: TBrickType;
        label: string;
        glyph: string;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
    }) {
        this._uuid = params.uuid;
        this._name = params.name;
        this._kind = params.kind;
        this._type = params.type;
        this._label = params.label;
        this._glyph = params.glyph;
        this._colorBg = params.colorBg;
        this._colorFg = params.colorFg;
        this._colorBgHighlight = params.colorBgHighlight;
        this._colorFgHighlight = params.colorFgHighlight;
        this._outline = params.outline;
        this._scale = params.scale;
        this._connectionPoints = {};
    }

    // Getters
    public get uuid(): string {
        return this._uuid;
    }
    public get name(): string {
        return this._name;
    }
    public get kind(): TBrickKind {
        return this._kind;
    }
    public get type(): TBrickType {
        return this._type;
    }
    public get label(): string {
        return this._label;
    }
    public get glyph(): string {
        return this._glyph;
    }
    public get colorBg(): TBrickColor {
        return this._colorBg;
    }
    public get colorFg(): TBrickColor {
        return this._colorFg;
    }
    public get colorBgHighlight(): TBrickColor {
        return this._colorBgHighlight;
    }
    public get colorFgHighlight(): TBrickColor {
        return this._colorFgHighlight;
    }
    public get outline(): TBrickColor {
        return this._outline;
    }
    public get scale(): number {
        return this._scale;
    }
    public get connectionPoints(): {
        ArgsIncoming?: TBrickCoords[];
        ArgsOutgoing?: TBrickCoords[];
    } {
        return this._connectionPoints;
    }

    public abstract get bBoxBrick(): { extent: TBrickExtent; coords: TBrickCoords };
    public abstract get SVGpath(): string;

    protected abstract updateConnectionPoints(): void;
}

/**
 * @abstract
 * @class
 * Defines the data model of a generic argument brick.
 */
abstract class BrickModelArgument extends BrickModel implements IBrickArgument {
    protected _dataType: TBrickArgDataType;
    protected _argExtents: Map<string, { argLengthX?: number; argLengthY: number }> = new Map();

    constructor(params: {
        uuid: string; // Added uuid
        name: string; // Added name
        type: TBrickType;
        label: string;
        glyph: string;
        dataType: TBrickArgDataType;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
    }) {
        super({ ...params, kind: 'argument' });
        this._dataType = params.dataType;
    }

    public get dataType(): TBrickArgDataType {
        return this._dataType;
    }
    public get argExtents(): Map<string, { argLengthX?: number; argLengthY: number }> {
        return this._argExtents;
    }

    public abstract get bBoxNotchArg(): { extent: TBrickExtent; coords: TBrickCoords };
}

/**
 * @abstract
 * @class
 * Defines the data model of a generic instruction brick.
 */
abstract class BrickModelInstruction extends BrickModel implements IBrickInstruction {
    protected _args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>;
    protected _connectAbove: boolean;
    protected _connectBelow: boolean;
    protected _argExtents: Map<string, { argLengthX?: number; argLengthY: number }> = new Map();

    constructor(params: {
        uuid: string; // Added uuid
        name: string; // Added name
        type: TBrickType;
        label: string;
        glyph: string;
        args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
    }) {
        super({ ...params, kind: 'instruction' });
        this._args = params.args;
        this._connectAbove = params.connectAbove;
        this._connectBelow = params.connectBelow;
    }

    public get args(): Record<
        string,
        { label: string; dataType: TBrickArgDataType; meta: unknown }
    > {
        return this._args;
    }
    public get connectAbove(): boolean {
        return this._connectAbove;
    }
    public get connectBelow(): boolean {
        return this._connectBelow;
    }
    public get argExtents(): Map<string, { argLengthX?: number; argLengthY: number }> {
        return this._argExtents;
    }

    public abstract get bBoxNotchInsTop(): { extent: TBrickExtent; coords: TBrickCoords };
    public abstract get bBoxNotchInsBot(): { extent: TBrickExtent; coords: TBrickCoords };
    public abstract get bBoxArgs(): Record<string, { extent: TBrickExtent; coords: TBrickCoords }>;
}

/**
 * @abstract
 * @class
 * Defines the data model of a data brick.
 */
export abstract class BrickModelData extends BrickModelArgument implements IBrickData {
    protected _dynamic: boolean;
    protected _value?: boolean | number | string;
    protected _input?: 'boolean' | 'number' | 'string' | 'options';

    constructor(params: {
        uuid: string; // Added uuid
        name: string;
        label: string;
        glyph: string;
        dataType: TBrickArgDataType;
        dynamic: boolean;
        value?: boolean | number | string;
        input?: 'boolean' | 'number' | 'string' | 'options';
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
    }) {
        super({ ...params, type: 'data' });
        this._dynamic = params.dynamic;
        this._value = params.value;
        this._input = params.input;
        this._connectionPoints.ArgsOutgoing = [];
        this.updateConnectionPoints();
    }

    public get dynamic(): boolean {
        return this._dynamic;
    }
    public get value(): boolean | number | string | undefined {
        return this._value;
    }
    public get input(): 'boolean' | 'number' | 'string' | 'options' | undefined {
        return this._input;
    }

    protected abstract updateConnectionPoints(): void;
}

/**
 * @abstract
 * @class
 * Defines the data model of an expression brick.
 */
export abstract class BrickModelExpression extends BrickModelArgument implements IBrickExpression {
    protected _args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>;

    constructor(params: {
        uuid: string; // Added uuid
        name: string;
        label: string;
        glyph: string;
        dataType: TBrickArgDataType;
        args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
    }) {
        super({ ...params, type: 'expression' });
        this._args = params.args;
        this._connectionPoints.ArgsIncoming = [];
        this._connectionPoints.ArgsOutgoing = [];
        this.updateConnectionPoints();
    }

    public get args(): Record<
        string,
        { label: string; dataType: TBrickArgDataType; meta: unknown }
    > {
        return this._args;
    }

    public abstract get bBoxArgs(): Record<string, { extent: TBrickExtent; coords: TBrickCoords }>;

    protected abstract updateConnectionPoints(): void;
}

/**
 * @abstract
 * @class
 * Defines the data model of a statement brick.
 */
export abstract class BrickModelStatement extends BrickModelInstruction implements IBrickStatement {
    constructor(params: {
        uuid: string; // Added uuid
        name: string;
        label: string;
        glyph: string;
        args: Record<string, { label: string; dataType: TBrickArgDataType; meta: unknown }>;
        colorBg: TBrickColor;
        colorFg: TBrickColor;
        colorBgHighlight: TBrickColor;
        colorFgHighlight: TBrickColor;
        outline: TBrickColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
    }) {
        super({ ...params, type: 'statement' });
        this._connectionPoints.ArgsOutgoing = [];
        this.updateConnectionPoints();
    }

    protected abstract updateConnectionPoints(): void;
}

/**
 * @abstract
 * @class
 * Defines the data model of a block brick.
 */
export abstract class BrickModelBlock extends BrickModelInstruction implements IBrickBlock {
    public nestExtent: TBrickExtent = { width: 0, height: 0 };
    protected _folded = false;

    protected _connectionPointsBlock: {
        Top: TBrickCoords[];
        Bottom: TBrickCoords[];
        TopInner: TBrickCoords[];
    };

    constructor(params: {
        uuid: string; // Added uuid
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
    }) {
        super({ ...params, type: 'block' });
        this._connectionPointsBlock = {
            Top: [],
            Bottom: [],
            TopInner: [],
        };
        this._connectionPoints.ArgsIncoming = [];
        this.updateConnectionPoints();
    }

    public get folded(): boolean {
        return this._folded;
    }

    public get connectionPointsBlock(): {
        Top: TBrickCoords[];
        Bottom: TBrickCoords[];
        TopInner: TBrickCoords[];
    } {
        return this._connectionPointsBlock;
    }

    public abstract get bBoxNotchInsNestTop(): { extent: TBrickExtent; coords: TBrickCoords };

    protected abstract updateConnectionPoints(): void;
}
