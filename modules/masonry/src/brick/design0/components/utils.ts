import type {
    TBrickType,
    TBrickCoords,
    IBrickData,
    IBrickExpression,
    IBrickStatement,
    IBrickBlock,
} from '@/@types/brick';

type InstanceMap = {
    data: IBrickData;
    expression: IBrickExpression;
    statement: IBrickStatement;
    block: IBrickBlock;
};

export type Brick = {
    id: string;
    type: TBrickType;
    instance: InstanceMap[TBrickType];
    surroundingBricks: { above: string; below: string };
    childBricks: string[];
    coords: TBrickCoords;
    children?: Brick[];
};
