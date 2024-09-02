import {
    createBrickBlock,
    createBrickData,
    createBrickExpression,
    createBrickStatement,
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
            args: {},
            colorBg: 'red',
            colorFg: 'blue',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
            nestLengthY: 20,
        });

        expect(block).toBeInstanceOf(BrickBlock);
        expect(block.id).toBeDefined();
        expect(block.SVGpath).toBeDefined();
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
            outline: 'black',
            scale: 1,
        });

        expect(data).toBeInstanceOf(BrickData);
        expect(data.id).toBeDefined();
        expect(data.SVGpath).toBeDefined();
    });

    test('createBrickExpression creates a BrickExpression instance', () => {
        const expression = createBrickExpression({
            name: 'Expression',
            label: 'Label',
            glyph: 'Glyph',
            dataType: 'number',
            args: {},
            colorBg: 'blue',
            colorFg: 'yellow',
            outline: 'black',
            scale: 1,
        });

        expect(expression).toBeInstanceOf(BrickExpression);
        expect(expression.id).toBeDefined();
        expect(expression.SVGpath).toBeDefined();
    });

    test('createBrickStatement creates a BrickStatement instance', () => {
        const statement = createBrickStatement({
            name: 'Statement',
            label: 'Label',
            glyph: 'Glyph',
            args: {},
            colorBg: 'orange',
            colorFg: 'purple',
            outline: 'black',
            scale: 1,
            connectAbove: true,
            connectBelow: false,
        });

        expect(statement).toBeInstanceOf(BrickStatement);
        expect(statement.id).toBeDefined();
        expect(statement.SVGpath).toBeDefined();
    });
});
