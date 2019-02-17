import React from "react";
import { connect } from "react-redux";
import util from 'util';
import Auth from '../auth/auth.js';
import { When } from "../if";

import * as actions from "./actions.js";

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
    records: state.records.records,
    model: state.records.model
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    getRecord: url => dispatch(actions.getRecord(url)),
    deleteRecord: (model, id, url) => dispatch(actions.destroy(model, id, url)),
    clearRecord: () => dispatch(actions.clearRecord())
  })
};

/**
 * Class Records
 */
class Records extends React.Component {

  /**
   * Calls action getRecord given an id
   * @function getRecord
   * @param {number} id
   */
  getRecord = id => {
    let url = `${API}/${this.props.model}/${id}`;
    this.props.getRecord(url);
  };

  /**
   * Calls action deleteRecord given an id
   * @function deleteRecord
   * @param {number} id
   */
  deleteRecord = id => {
    let url = `${API}/${this.props.model}/${id}`;
    this.props.deleteRecord(this.props.model, id, url);
  };

  DeleteButton = (record) => {
    return (
      <span
        style={styles.delete}
        onClick={() => this.deleteRecord(record._id)}
      >
        ✖︎
      </span>
    )
  }

  /**
   * Renders all Records if a model is specified
   * @function render
   * @param {number} id
   */
  render() {
    return (
      <When condition={this.props.model}>
        <ul>
          {this.props.records.map((record, i) => (
            <li key={record._id}>
              <span
                style={styles.clickable}
                onClick={() => this.getRecord(record._id)}
              >
                {record.name}
              </span>
              <Auth capability='delete'>
                {this.DeleteButton(record)}
              </Auth>
            </li>
          ))}
        </ul>
        <Auth capability='create'>
          <button onClick={this.props.clearRecord}>Add new</button>
        </Auth>
      </When>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
