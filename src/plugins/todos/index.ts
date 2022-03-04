import { BuilderPlugin } from "../../core/Plugins/Plugin";
import PluginManager from "../../core/Plugins/PluginManager";
import todosReducer, { addTodo, toggleTodo } from "./store";
import { TodoComponent } from "./blocks/todo";

const plugin = new BuilderPlugin("Todos");

plugin.addAction({
  action: addTodo,
  name: "Add Todo",
  schema: {
    type: "object",
    required: ["text"],
    properties: {
      text: {
        type: "string",
        title: "Todo text",
        default: "New Todo"
      }
    }
  }
});

plugin.addAction({
  action: toggleTodo,
  name: "Toggle Todo",
  schema: {
    type: "object",
    required: ["text"],
    properties: {
      text: {
        type: "string",
        title: "Todo text",
        default: "New Todo"
      }
    }
  }
});

plugin.addReducer({
  reducer: todosReducer,
  name: "Todos"
});

plugin.addBlock({
  component: TodoComponent,
  name: "Todo Component",
  type: BuilderPlugin.ComponentTypes.Content,
  isDroppable: false,
  schema: {
    properties: {
      text: {
        title: "Todo Text",
        default: "New Todo",
        type: "string"
      }
    }
  },
  uiSchema: {}
});

PluginManager.registerPlugin(plugin);

export default plugin;
