import Rete from "rete";

import { numberSocket } from "../../sockets";
import { ComponentsSelectorControl } from "../../controls/ComponentsSelector";

export class ClickHandlerComponent extends Rete.Component {
  constructor() {
    super("ClickHandler");
    this.task = {
      outputs: { onClick: "option" }
      // init(task, node) {
      //   // register click handler in site data
      // }
    };
  }

  builder(node) {
    return node
      .addOutput(new Rete.Output("onClick", "onClick()", numberSocket))
      .addControl(
        new ComponentsSelectorControl({
          emitter: this.editor,
          label: "Component",
          name: "component",
          value: "65tyaa8ut"
        })
      );
  }

  worker(node, inputs, data) {
    console.log("Worker: ClickHandler");

    return {
      onClick: data
    };
  }
}
