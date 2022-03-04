import Rete from "rete";

import { numberSocket } from "../sockets";

export class ABTestComponent extends Rete.Component {
  constructor() {
    super("ABTestComponent");
    this.task = {
      outputs: { A: "option", B: "option" },
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
      .addOutput(new Rete.Output("Default", "Default", numberSocket))
      .addOutput(new Rete.Output("A", "A", numberSocket))
      .addOutput(new Rete.Output("B", "B", numberSocket));
  }

  worker(node, inputs, data) {
    console.log("Worker: ABTestComponent");
    const err = true;
    if (err) {
      this.closed = ["B"]; // prevents the transition to the output task
      return {
        B: {
          status: "error",
          error: "Something went wrong"
        }
      };
    }
    return {
      A: data
    };
  }
}
