
import * as actions from './../components/cms/actions.js';
import util from 'util';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import superagent from 'superagent';
import config from './../components/cms/__mocks__/api.mock.js';
let logger = function(log) {
  console.log(`superagent call 🏈: ${util.inspect(log)}`);
}
const superagentMock = require("superagent-mock")(superagent, config, logger);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setModel', () => {
  it('correctly returns an action object', ()=>{
    let model = 'foo';
    let result = actions.setModel(model);
    let expected = {
      type: "MODEL",
      payload: 'foo',
    }

    expect(expected).toEqual(result);
  });
  it('returns undefined when given no model', ()=>{
    let model = 'foo';
    let result = actions.setModel();
    let expected = {
      type: "MODEL",
      payload: undefined,
    }

    expect(expected).toEqual(result);
  });
}); 

describe('getModels', () => {
  it('dispatches an action on valid model and url', ()=>{
    afterAll( ()=> {
      superagentMock.unset();
    });
    
    let url = 'http://localhost:3000/api/v1/foo/13';
    const store = mockStore();

    return store
    .dispatch(actions.getModels(url))
    .then( ()=> {
      let dispatchedActions = store.getActions();
      let result = dispatchedActions[0];
      expect(result.type).toEqual("MODELS");
      expect(typeof result.payload).toEqual("object");
    });
  });
});

describe('getRecords', () => {
  it('dispatches an action on valid model', ()=>{
    afterAll( ()=> {
      superagentMock.unset();
    });
    
    let url = 'http://localhost:3000/api/v1/recordstest';
    const store = mockStore();

    return store
    .dispatch(actions.getRecords(url))
    .then( ()=> {
      let dispatchedActions = store.getActions();
      let result = dispatchedActions[0];
      expect(result.type).toEqual("RECORDS");
      expect(typeof result.payload).toEqual("object");
    });
  });
});

describe('getRecord', () => {
  it('dispatches an action on valid model and url', ()=>{
    afterAll( ()=> {
      superagentMock.unset();
    });
    
    let url = 'http://localhost:3000/api/v1/model/id';
    const store = mockStore();

    return store
    .dispatch(actions.getRecord(url))
    .then( ()=> {
      let dispatchedActions = store.getActions();
      let result = dispatchedActions[0];
      expect(result.type).toEqual("RECORD");
      expect(typeof result.payload).toEqual("object");
    });
  });
});

describe('post', () => {
  it('dispatches an action on valid model and url', ()=>{
    afterAll( ()=> {
      superagentMock.unset();
    });
    
    let url = 'http://localhost:3000/api/v1/posting';
    let model = 'fakeModel';
    let record = {fake: 'record'};
    const store = mockStore();
 
    return store
    .dispatch(actions.post(model, url, record))
    .then( ()=> {
      let dispatchedActions = store.getActions();
      let result = dispatchedActions[0];
      expect(result.type).toEqual("POST");
      expect(typeof result.payload).toEqual("object");
    });
  });
});
