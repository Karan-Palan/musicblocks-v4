import { v4 as uuidv4 } from 'uuid';
import type { TBrickArgDataType, TBrickColor } from '@/@types/brick';
import BrickStatement from './BrickStatement';
import BrickExpression from './BrickExpression';
import BrickData from './BrickData';
import BrickBlock from './BrickBlock';

// Warehouse to manage brick instances
const brickWarehouse: Map<string, BrickStatement | BrickExpression | BrickData | BrickBlock> =
    new Map();

/**
 * Adds a brick instance to the warehouse.
 * @param brick - The brick instance to add.
 */
function addBrickToWarehouse(
    brick: BrickStatement | BrickExpression | BrickData | BrickBlock,
): void {
    brickWarehouse.set(brick.uuid, brick);
}

/**
 * Retrieves a brick instance from the warehouse by its ID.
 * @param id - The ID of the brick to retrieve.
 * @returns The brick instance if found, otherwise undefined.
 */
function getBrickFromWarehouse(
    id: string,
): BrickStatement | BrickExpression | BrickData | BrickBlock | undefined {
    return brickWarehouse.get(id);
}

/**
 * Deletes a brick instance from the warehouse by its ID.
 * @param id - The ID of the brick to delete.
 * @returns True if the brick was deleted, false if it was not found.
 */
function deleteBrickFromWarehouse(id: string): boolean {
    return brickWarehouse.delete(id);
}

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
    folded?: boolean;
}): BrickBlock {
    const brick = new BrickBlock({
        uuid: uuidv4(),
        ...params,
    });
    addBrickToWarehouse(brick);
    return brick;
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
    colorBgHighlight: TBrickColor;
    colorFgHighlight: TBrickColor;
    outline: TBrickColor;
    scale: number;
}): BrickData {
    const brick = new BrickData({
        uuid: uuidv4(),
        ...params,
    });
    addBrickToWarehouse(brick);
    return brick;
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
    colorBgHighlight: TBrickColor;
    colorFgHighlight: TBrickColor;
    outline: TBrickColor;
    scale: number;
}): BrickExpression {
    const brick = new BrickExpression({
        uuid: uuidv4(),
        ...params,
    });
    addBrickToWarehouse(brick);
    return brick;
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
    colorBgHighlight: TBrickColor;
    colorFgHighlight: TBrickColor;
    outline: TBrickColor;
    scale: number;
    connectAbove: boolean;
    connectBelow: boolean;
}): BrickStatement {
    const brick = new BrickStatement({
        uuid: uuidv4(),
        ...params,
    });
    addBrickToWarehouse(brick);
    return brick;
}

// Exporting warehouse functions for external use
export { addBrickToWarehouse, getBrickFromWarehouse, deleteBrickFromWarehouse };
