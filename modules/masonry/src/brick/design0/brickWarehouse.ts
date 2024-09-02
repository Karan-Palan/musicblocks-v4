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
export function addBrickToWarehouse(
    brick: BrickStatement | BrickExpression | BrickData | BrickBlock,
): void {
    brickWarehouse.set(brick.id, brick);
}

/**
 * Retrieves a brick instance from the warehouse by its ID.
 * @param id - The ID of the brick to retrieve.
 * @returns The brick instance if found, otherwise undefined.
 */
export function getBrickFromWarehouse(
    id: string,
): BrickStatement | BrickExpression | BrickData | BrickBlock | undefined {
    return brickWarehouse.get(id);
}

/**
 * Deletes a brick instance from the warehouse by its ID.
 * @param id - The ID of the brick to delete.
 * @returns True if the brick was deleted, false if it was not found.
 */
export function deleteBrickFromWarehouse(id: string): boolean {
    return brickWarehouse.delete(id);
}
