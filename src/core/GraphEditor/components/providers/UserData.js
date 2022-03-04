import Rete from "rete";

import { numberSocket } from "../../sockets";

export class UserDataProviderComponent extends Rete.Component {
  constructor() {
    super("UserDataProvider");
    this.task = {
      outputs: { onSuccess: "option", onError: "option" }
    };
  }

  builder(node) {
    return node
      .addInput(new Rete.Input("fetch", "fetch()", numberSocket))
      .addOutput(new Rete.Output("onSuccess", "onSuccess()", numberSocket))
      .addOutput(new Rete.Output("onError", "onError()", numberSocket));
  }

  async worker(node, inputs, data) {
    const fakeApi = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              name: "will",
              email: "will@example.com"
            }
          });
        }, 500);
      });
    };

    console.log("Worker: UserDataProvider");
    const res = await fakeApi();

    console.log("UserDataProvider response", {
      node,
      inputs,
      data,
      res
    });
  }
}
