export const DEVICES_NAVIGATE = 'DEVICES_NAVIGATE';
export const DEVICES_FETCHING = 'DEVICES_FETCHING';
export const DEVICES_FETCHED = 'DEVICES_FETCHED';
export const DEVICES_FETCHING_ONE = 'DEVICES_FETCHING_ONE';
export const DEVICES_FETCHED_ONE = 'DEVICES_FETCHED_ONE';
export const DEVICES_DELETING = 'DEVICES_DELETING';
export const DEVICES_SET_SIMULATION = 'DEVICES_SET_SIMULATION';

import localApi from '../libs/localApi';

// define a local db for devices (simulated async api)
let myAPI = new localApi(
  {
    tableName: 'myDevices', // used as local storage key
    fields: {               // row structure (pre loaded for new item)
      _id: null,            // row key (required)
      title: 'New Device',
      port: '*',
    },
    delay: 0,               // simulated delay
  }
);

export function navigate(value) {
  return {
    type: DEVICES_NAVIGATE,
    payload: value
  };
}

export function fetch() {
  return function (dispatch) {

    // show a loading
    dispatch(fetching())

    // async load
    myAPI.getAll().then(
      (data) => dispatch(fetched(data))
    );
  }

}

export function fetching() {
  return {
    type: DEVICES_FETCHING
  };
}

export function fetched(data) {
  return {
    type: DEVICES_FETCHED,
    payload: data
  };
}

export function fetchOne(id = null) {
  return function (dispatch) {

    // show a loading
    dispatch(fetchingOne())

    // async load
    myAPI.get(id).then(
      (data) => dispatch(fetchedOne(data))
    );
  }
}

export function fetchingOne() {
  return {
    type: DEVICES_FETCHING_ONE
  };
}

export function fetchedOne(data) {
  return {
    type: DEVICES_FETCHED_ONE,
    payload: data
  };
}

export function save(values, callback) {
  return function (dispatch) {
    // return the save promise
    return myAPI.save(values);
  }

}

export function remove(id = null) {
  return function (dispatch) {

    // async delete
    myAPI.remove(id).then(
      (data) => dispatch(fetched(data))
    );
  }
}

export function setSimulation(status) {
  if (status) {
    myAPI.delay = 700;
  } else {
    myAPI.delay = 0;
  }

  return {
    type: DEVICES_SET_SIMULATION,
    payload: status
  };
}
