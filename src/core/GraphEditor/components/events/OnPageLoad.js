import Rete from "rete";

import { numberSocket } from "../../sockets";

export class OnPageLoadEventComponent extends Rete.Component {
  constructor() {
    super("OnPageLoad");
    this.task = {
      outputs: { onSuccess: "option", onError: "option" },
      init(task, node) {
        setTimeout(() => {
          task.run({
            status: "loaded",
            url: "/someurl"
          });
          task.reset();
        }, 1000);
      }
    };
  }

  builder(node) {
    return node
      .addOutput(new Rete.Output("onSuccess", "onSuccess()", numberSocket))
      .addOutput(new Rete.Output("onError", "onError()", numberSocket));
  }

  worker(node, inputs, data) {
    console.log("Worker: onPageLoad");
    const err = true;
    if (err) {
      this.closed = ["onSuccess"]; // prevents the transition to the output task
      return {
        onError: {
          status: "error",
          error: "Something went wrong"
        }
      };
    }
    return {
      onSuccess: data
    };
  }
}
