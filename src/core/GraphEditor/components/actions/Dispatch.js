import Rete from "rete";
import { numberSocket } from "../../sockets";
import { ActionsSelectorControl } from "../../controls/ActionsSelector";

export class DispatchEventComponent extends Rete.Component {
  constructor(PluginManager) {
    super("DispatchEvent");
    this.pluginManager = PluginManager;
    this.task = {
      outputs: { onSuccess: "option", onError: "option", onFailure: "option" }
    };
  }

  builder(node) {
    return node
      .addInput(new Rete.Input("dispatch", "dispatch()", numberSocket))
      .addOutput(new Rete.Output("onSuccess", "onSuccess()", numberSocket))
      .addOutput(new Rete.Output("onError", "onError()", numberSocket))
      .addOutput(new Rete.Output("onFailure", "onFailure()", numberSocket))
      .addControl(
        new ActionsSelectorControl({
          actions: Array.from(this.pluginManager.actions),
          emitter: this.editor,
          label: "Action Creator",
          name: "action"
        })
      );
  }

  worker(node, inputs, outputs) {
    // console.log("Worker: DispatchEvent", { node, inputs, outputs });

    console.log("DispatchEvent", {
      action: node.data.action
    });

    return {
      onSuccess: {
        foo: "bar"
      }
    };
  }
}
