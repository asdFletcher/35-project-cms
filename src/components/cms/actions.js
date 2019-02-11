import superagent from "superagent";

/**
 * Action to set the current model
 * @function setModel
 * @param {string} model
 * @returns {object} action
 */
export const setModel = model => {
  return {
    type: "MODEL",
    payload: model
  };
};

/**
 * Action to get the schema from the given API url
 * @function getSchema
 * @param {string} model
 * @param {string} url
 */
export const getSchema = (model, url) => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetSchema({ model: model, schema: data.body }));
  });
};

/**
 * Helper action to get the schema, works in concert with getSchema
 * @function runGetSchema
 * @param {object} payload
 * @returns {object} action
 */
const runGetSchema = payload => {
  return {
    type: "SCHEMA",
    payload: payload
  };
};

/**
 * Action to get the models from the given API url
 * @function getModels
 * @param {string} url
 */
export const getModels = url => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetModels(data.body));
  });
};

/**
 * Helper action to get the models, works in concert with getModels
 * @function runGetModels
 * @param {object} payload
 * @returns {object} action
 */
const runGetModels = payload => {
  return {
    type: "MODELS",
    payload: payload
  };
};

/**
 * Action to get the records from the given API url
 * @function getRecords
 * @param {string} url
 */
export const getRecords = url => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetRecords(data.body.results));
  });
};

/**
 * Helper action to get the records, works in concert with getRecords
 * @function runGetModels
 * @param {object} payload
 * @returns {object} action
 */
const runGetRecords = payload => {
  return {
    type: "RECORDS",
    payload: payload
  };
};

/**
 * Action to get the record from the given API url
 * @function getRecord
 * @param {string} url
 */
export const getRecord = url => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetRecord(data.body));
  });
};

/**
 * Helper action to get the record, works in concert with getRecord
 * @function runGetRecord
 * @param {object} payload
 * @returns {object} action
 */
const runGetRecord = payload => {
  return {
    type: "RECORD",
    payload: payload
  };
};

/**
 * Action to post a record to the given API url
 * @function post
 * @param {string} model
 * @param {string} url
 * @param {object} record
 */
export const post = (model, url, record) => dispatch => {
  superagent
    .post(url)
    .send(record)
    .then(data => {
      dispatch(runPost({ model, record: data.body }));
    });
};

/**
 * Helper action to post a record, works in concert with post
 * @function runPost
 * @param {object} payload
 * @returns {object} action
 */
const runPost = payload => {
  return {
    type: "POST",
    payload: payload
  };
};

/**
 * Action to update a record to the given API url
 * @function put
 * @param {string} model
 * @param {string} url
 * @param {object} record
 */
export const put = (model, url, record) => dispatch => {
  superagent
    .put(url)
    .send(record)
    .then(data => {
      dispatch(runPut({ model, record: data.body }));
    });
};

/**
 * Helper action to update a record, works in concert with put
 * @function runPost
 * @param {object} payload
 * @returns {object} action
 */
const runPut = payload => {
  return {
    type: "PUT",
    payload: payload
  };
};

/**
 * Action to delete a record to the given API url
 * @function destroy
 * @param {string} model
 * @param {string} url
 * @param {object} record
 */
export const destroy = (model, id, url) => dispatch => {
  superagent.delete(url).then(data => {
    dispatch(runDestroy({ model, id }));
  });
};

/**
 * Helper action to delete a record, works in concert with destroy
 * @function runDestroy
 * @param {object} payload
 * @returns {object} action
 */
const runDestroy = payload => {
  return {
    type: "DELETE",
    payload: payload
  };
};

/**
 * Function to send action that clears the record form
 * @function clearRecord
 * @returns {object} action
 */
export const clearRecord = () => {
  return {
    type: "CLEAR"
  };
};
