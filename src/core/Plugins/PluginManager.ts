import { BuilderPlugin, IAction, IReducer, IBlock } from "./Plugin";

class PluginManager {
  public plugins: Map<string, BuilderPlugin> = new Map();
  public actions: Map<string, IAction> = new Map();
  public reducers: Map<string, IReducer> = new Map();
  public blocks: Map<string, IBlock> = new Map();

  loadPlugins() {}

  loadPlugin() {}

  unloadPlugin() {}

  private registerAction(action: IAction) {
    this.actions.set(action.name, action);
  }

  private registerBlock(block: IBlock) {
    this.blocks.set(block.name, block);
  }

  private registerReducer(reducer: IReducer) {
    this.reducers.set(reducer.name, reducer);
  }

  public registerPlugin(plugin: BuilderPlugin) {
    this.plugins.set(plugin.name, plugin);

    plugin.reducers.forEach((reducer: any) => {
      this.registerReducer(reducer);
    });

    plugin.actions.forEach((action: any) => {
      this.registerAction(action);
    });

    plugin.blocks.forEach((block: any) => {
      this.registerBlock(block);
    });
  }
}

export default new PluginManager();
