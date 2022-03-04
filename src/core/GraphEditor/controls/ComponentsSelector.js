import React from "react";
import { Control } from "rete";

class ReactComponentsSelectorControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      name: this.props.name
    });

    this.props.putData(this.props.name, this.props.value);
  }
  onChange(event) {
    this.props.putData(this.props.name, event.target.value);
    this.props.emitter.trigger("process");
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div>
        <label>{this.props.label}: </label>
        <select value={this.state.value} onChange={this.onChange.bind(this)}>
          <option value="65tyaa8ut" label="Header (65tyaa8ut)" />
          <option value="uuy675abv" label="Footer (uuy675abv)" />
        </select>
      </div>
    );
  }
}

export class ComponentsSelectorControl extends Control {
  constructor({ emitter, name, label, value }) {
    super(name);
    this.render = "react";
    this.component = ReactComponentsSelectorControl;
    this.props = {
      emitter,
      label,
      name,
      value,
      putData: (name, value) => {
        this.putData(name, value);
      }
    };
  }
}
