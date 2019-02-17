import React from "react";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import { When } from "../if";
import Auth from '../auth/auth.js';

import util from 'util';

import * as actions from "./actions.js";

const API = process.env.REACT_APP_API;

// Auto-Hide some of the mongo specific fields
const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};

const mapStateToProps = state => ({
  record: state.records.record,
  schemas: state.records.schemas,
  model: state.records.model
});

const mapDispatchToProps = (dispatch, getState) => ({
  getRecord: url => dispatch(actions.getRecord(url)),
  getSchema: (model, url) => dispatch(actions.getSchema(model, url)),
  post: (model, url, record) => dispatch(actions.post(model, url, record)),
  put: (model, url, record) => dispatch(actions.put(model, url, record))
});

/**
 * Class Record
 */
class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schemas: {} };
  }

  /**
   * gets the schema pre-render
   * @function getDerivedStateFromProps
   * @param {object} props
   * @param {object} state
   */
  // Runs whenever props change (pre-render)
  static getDerivedStateFromProps(props, state) {
    if (props.model && !props.schemas[props.model]) {
      let url = `${API}/${props.model}/schema`;
      props.getSchema(props.model, url);
    }
    return {state};
  }

  handleError = error => {
    console.error(error);
  };

  /**
   * handles put and post operations given a form
   * @function handleSubmit
   * @param {component} form
   */
  handleSubmit = form => {
    if (form.formData._id) {
      let url = `${API}/${this.props.model}/${form.formData._id}`;
      this.props.put(this.props.model, url, form.formData);
    } else {
      let url = `${API}/${this.props.model}`;
      this.props.post(this.props.model, url, form.formData);
    }
  };

  /**
   * renders a form
   * @function render
   */
  render() {
    return (
      <Auth capability='update'>
        <When condition={this.props.schemas[this.props.model]}>
          <Form
            schema={this.props.schemas[this.props.model] || {}}
            uiSchema={uiSchema}
            formData={this.props.record}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onError={this.handleError}
          />
        </When>
      </Auth>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Record);
