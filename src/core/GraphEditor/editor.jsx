import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import TaskPlugin from "rete-task-plugin";
import CommentPlugin from "rete-comment-plugin";

import { OnPageLoadEventComponent } from "./components/events/OnPageLoad";
import { ClickHandlerComponent } from "./components/events/ClickHandler";
import { UserDataProviderComponent } from "./components/providers/UserData";
import { DispatchEventComponent } from "./components/actions/Dispatch";
import { LogComponent } from "./components/helpers/Log";
import { ABTestComponent } from "./components/ABTest";

export default async function (container, PluginManager) {
  const components = [
    new OnPageLoadEventComponent(),
    new ClickHandlerComponent(),
    new UserDataProviderComponent(),
    new DispatchEventComponent(PluginManager),
    new LogComponent(),
    new ABTestComponent()
  ];

  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  const engine = new Rete.Engine("demo@0.1.0");

  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin);
  editor.use(TaskPlugin);
  editor.use(CommentPlugin);

  components.forEach((c) => {
    editor.register(c);
    engine.register(c);
  });

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      const editorJson = editor.toJSON();
      // console.log("process", JSON.stringify(editorJson));
      await engine.abort();
      await engine.process(editorJson);
    }
  );

  editor.fromJSON({
    id: "demo@0.1.0",
    nodes: {
      "625": {
        id: 625,
        data: {},
        inputs: {},
        outputs: {
          onClick: {
            connections: [
              { node: 627, input: "log", data: {} },
              { node: 626, input: "dispatch", data: {} }
            ]
          }
        },
        position: [-561.0706042153088, -329.5719547223268],
        name: "ClickHandler"
      },
      "626": {
        id: 626,
        data: { action: "SOME_ACTION" },
        inputs: {
          dispatch: {
            connections: [{ node: 625, output: "onClick", data: {} }]
          }
        },
        outputs: {
          onSuccess: {
            connections: [{ node: 628, input: "dispatch", data: {} }]
          },
          onError: { connections: [] },
          onFailure: { connections: [] }
        },
        position: [-260.39067472500824, -310.0828786800389],
        name: "DispatchEvent"
      },
      "627": {
        id: 627,
        data: {},
        inputs: {
          log: { connections: [{ node: 625, output: "onClick", data: {} }] }
        },
        outputs: { onLog: { connections: [] } },
        position: [-257.5950417559721, -83.64440075578167],
        name: "console.log"
      },
      "628": {
        id: 628,
        data: { action: "SOME_OTHER_ACTION" },
        inputs: {
          dispatch: {
            connections: [{ node: 626, output: "onSuccess", data: {} }]
          }
        },
        outputs: {
          onSuccess: { connections: [] },
          onError: { connections: [] },
          onFailure: { connections: [] }
        },
        position: [123.4833075935895, -307.4181802562038],
        name: "DispatchEvent"
      }
    },
    comments: []
  });

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger("process");
}
