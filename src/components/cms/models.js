import React from "react";
import { connect } from "react-redux";

import * as actions from "./actions.js";
import util from 'util';

const styles = {
  clickable: { cursor: "pointer" },
  delete: {
    color: "red",
    cursor: "pointer",
    marginLeft: ".5em"
  }
};

const API = process.env.REACT_APP_API;

const mapStateToProps = state => {
  return ({
    models: state.records.models
  })
};

const mapDispatchToProps = (dispatch, getState) => {
  return ({
    setModel: model => dispatch(actions.setModel(model)),
    getModels: url => dispatch(actions.getModels(url)),
    getRecords: url => dispatch(actions.getRecords(url)),
    clearRecord: () => dispatch(actions.clearRecord())
  })
};


/**
 * Class Models
 */
class Models extends React.Component {
  componentDidMount() {
    let url = `${API}/models`;
    this.props.getModels(url);
  }

  /**
   * changes the selected model
   * @function selectModel
   * @param {string} model
   */
  selectModel = model => {
    let url = `${API}/${model}`;
    this.props.clearRecord();
    this.props.setModel(model);
    this.props.getRecords(url);
  };

  /**
   * renders available models to select from
   * @function render
   */
  render() {
    return (
      <>
        <ul>
          {this.props.models &&
            this.props.models.map((model, i) => (
              <li
              key={`models-${i}`}
              onClick={() => {
                  this.selectModel(model);
                }}
              >
                <span style={styles.clickable}>Model: {model}</span>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Models);
