import React from "react";
import { Control } from "rete";

class ReactActionsSelectorControl extends React.Component {
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
          {this.props.actions.map(([name, schema]) => {
            return (
              <option value={name} label={`${name} (${schema.action.type})`} />
            );
          })}
        </select>
      </div>
    );
  }
}

export class ActionsSelectorControl extends Control {
  constructor({ emitter, name, label, value, actions = [] }) {
    super(name);
    this.render = "react";
    this.component = ReactActionsSelectorControl;
    this.props = {
      actions,
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
