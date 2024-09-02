import { v4 as uuidv4 } from 'uuid';
import type { TBrickArgDataType, TBrickColor } from '@/@types/brick';
import BrickStatement from './BrickStatement';
import BrickExpression from './BrickExpression';
import BrickData from './BrickData';
import BrickBlock from './BrickBlock';

/**
 * Factory function to create a new BrickBlock instance.
 * @param params - Parameters to initialize the BrickBlock.
 * @returns A new instance of BrickBlock.
 */
export function createBrickBlock(params: {
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
    outline: TBrickColor;
    scale: number;
    connectAbove: boolean;
    connectBelow: boolean;
    nestLengthY: number;
}): BrickBlock {
    return new BrickBlock({
        id: uuidv4(),
        ...params,
    });
}

/**
 * Factory function to create a new BrickData instance.
 * @param params - Parameters to initialize the BrickData.
 * @returns A new instance of BrickData.
 */
export function createBrickData(params: {
    name: string;
    label: string;
    glyph: string;
    dataType: TBrickArgDataType;
    dynamic: boolean;
    value?: boolean | number | string;
    input?: 'boolean' | 'number' | 'string' | 'options';
    colorBg: TBrickColor;
    colorFg: TBrickColor;
    outline: TBrickColor;
    scale: number;
}): BrickData {
    return new BrickData({
        id: uuidv4(),
        ...params,
    });
}

/**
 * Factory function to create a new BrickExpression instance.
 * @param params - Parameters to initialize the BrickExpression.
 * @returns A new instance of BrickExpression.
 */
export function createBrickExpression(params: {
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
    outline: TBrickColor;
    scale: number;
}): BrickExpression {
    return new BrickExpression({
        id: uuidv4(),
        ...params,
    });
}

/**
 * Factory function to create a new BrickStatement instance.
 * @param params - Parameters to initialize the BrickStatement.
 * @returns A new instance of BrickStatement.
 */
export function createBrickStatement(params: {
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
    outline: TBrickColor;
    scale: number;
    connectAbove: boolean;
    connectBelow: boolean;
}): BrickStatement {
    return new BrickStatement({
        id: uuidv4(),
        ...params,
    });
}
