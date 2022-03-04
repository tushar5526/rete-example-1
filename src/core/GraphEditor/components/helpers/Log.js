import Rete from "rete";

import { numberSocket } from "../../sockets";

export class LogComponent extends Rete.Component {
  constructor() {
    super("console.log");
    this.task = {
      outputs: { onLog: "option" }
    };
  }

  builder(node) {
    return node
      .addInput(new Rete.Input("log", "log()", numberSocket, true))
      .addOutput(new Rete.Output("onLog", "onLog()", numberSocket));
  }

  worker(node, inputs, data) {
    console.log("Log:", {
      node,
      inputs,
      data
    });
  }
}
