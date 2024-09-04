import {
    createBrickBlock,
    createBrickData,
    createBrickExpression,
    createBrickStatement,
    addBrickToWarehouse,
    getBrickFromWarehouse,
    deleteBrickFromWarehouse,
} from './brickFactory';
import BrickBlock from './BrickBlock';
import BrickData from './BrickData';
import BrickExpression from './BrickExpression';
import BrickStatement from './BrickStatement';

describe('Factory Functions', () => {
    test('createBrickBlock creates a BrickBlock instance', () => {
        const block = createBrickBlock({
            name: 'Block',
            label: 'Label',
            glyph: 'Glyph',
            args: {
                arg1: {
                    label: 'Arg1',
                    dataType: 'string',
                    meta: { argId: '1', argLabel: 'Arg1', argTypeIncoming: 'string' },
                },
            },
            colorBg: 'red',
            colorFg: 'blue',
            colorBgHighlight: 'pink',
            colorFgHighlight: 'cyan',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
            nestLengthY: 20,
        });

        expect(block).toBeInstanceOf(BrickBlock);
        expect(block.uuid).toBeDefined();
        expect(block.SVGpath).toBeDefined();
        expect(block.args).toHaveProperty('arg1');
    });

    test('createBrickData creates a BrickData instance', () => {
        const data = createBrickData({
            name: 'Data',
            label: 'Label',
            glyph: 'Glyph',
            dataType: 'string',
            dynamic: true,
            value: 'Test',
            input: 'string',
            colorBg: 'green',
            colorFg: 'white',
            colorBgHighlight: 'lightgreen',
            colorFgHighlight: 'lightgrey',
            outline: 'black',
            scale: 1,
        });

        expect(data).toBeInstanceOf(BrickData);
        expect(data.uuid).toBeDefined();
        expect(data.SVGpath).toBeDefined();
        expect(data.value).toBe('Test');
    });

    test('createBrickExpression creates a BrickExpression instance', () => {
        const expression = createBrickExpression({
            name: 'Expression',
            label: 'Label',
            glyph: 'Glyph',
            dataType: 'number',
            args: {
                arg1: { label: 'Arg1', dataType: 'number', meta: {} },
            },
            colorBg: 'blue',
            colorFg: 'yellow',
            colorBgHighlight: 'lightblue',
            colorFgHighlight: 'lightyellow',
            outline: 'black',
            scale: 1,
        });

        expect(expression).toBeInstanceOf(BrickExpression);
        expect(expression.uuid).toBeDefined();
        expect(expression.SVGpath).toBeDefined();
        expect(expression.args).toHaveProperty('arg1');
    });

    test('createBrickStatement creates a BrickStatement instance', () => {
        const statement = createBrickStatement({
            name: 'Statement',
            label: 'Label',
            glyph: 'Glyph',
            args: {
                arg1: { label: 'Arg1', dataType: 'boolean', meta: {} },
            },
            colorBg: 'orange',
            colorFg: 'purple',
            colorBgHighlight: 'lightorange',
            colorFgHighlight: 'lightpurple',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
        });

        expect(statement).toBeInstanceOf(BrickStatement);
        expect(statement.uuid).toBeDefined();
        expect(statement.SVGpath).toBeDefined();
        expect(statement.args).toHaveProperty('arg1');
    });
});

describe('Warehouse Module', () => {
    test('addBrickToWarehouse adds a Brick instance to the warehouse', () => {
        const brick = createBrickBlock({
            name: 'Block',
            label: 'Label',
            glyph: 'Glyph',
            args: {
                arg1: {
                    label: 'Arg1',
                    dataType: 'string',
                    meta: { argId: '1', argLabel: 'Arg1', argTypeIncoming: 'string' },
                },
            },
            colorBg: 'red',
            colorFg: 'blue',
            colorBgHighlight: 'pink',
            colorFgHighlight: 'cyan',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
            nestLengthY: 20,
        });

        addBrickToWarehouse(brick);
        const storedBrick = getBrickFromWarehouse(brick.uuid);
        expect(storedBrick).toBe(brick);
    });

    test('deleteBrickFromWarehouse removes a Brick instance from the warehouse', () => {
        const brick = createBrickStatement({
            name: 'Statement',
            label: 'Label',
            glyph: 'Glyph',
            args: {
                arg1: { label: 'Arg1', dataType: 'boolean', meta: {} },
            },
            colorBg: 'orange',
            colorFg: 'purple',
            colorBgHighlight: 'lightorange',
            colorFgHighlight: 'lightpurple',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
        });

        addBrickToWarehouse(brick);
        const isDeleted = deleteBrickFromWarehouse(brick.uuid);
        const storedBrick = getBrickFromWarehouse(brick.uuid);
        expect(isDeleted).toBe(true);
        expect(storedBrick).toBeUndefined();
    });
});
