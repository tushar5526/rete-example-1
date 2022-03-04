export enum ComponentTypes {
  Utility,
  Content,
  Layout
}

export interface IAction {
  name: string;
  action: object;
  schema: object;
}

export interface IReducer {
  name: string;
  reducer: object;
}

export interface IBlock {
  name: string;
  component: object;
  schema: object;
  uiSchema: object;
  isDroppable: boolean;
  type: ComponentTypes;
}

export class BuilderPlugin {
  static ComponentTypes = ComponentTypes;

  public actions = new Map();
  public reducers = new Map();
  public blocks = new Map();

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public addAction(action: IAction) {
    this.actions.set(action.name, action);
  }

  public addReducer(reducer: IReducer) {
    this.reducers.set(reducer.name, reducer);
  }

  public addBlock(block: IBlock) {
    this.blocks.set(block.name, block);
  }
}
