import {
  DEVICES_NAVIGATE,
  DEVICES_FETCHING,
  DEVICES_FETCHED,
  DEVICES_FETCHING_ONE,
  DEVICES_FETCHED_ONE,
  DEVICES_SET_SIMULATION
} from '../actions/devices';

const INITIAL_STATE = {
  scene: 'list',          // active scene  displayed by the 'devices' component
  items: [],              // fetched list of devices
  itemsFetching: false,   // to display a 'loading..' when fetching
  item: null,             // stores the loaded item to be used on the form
  itemFetching: false,    // to display a 'loading..' when opening the form
  simulated: false,       // if is simulating remote calls with a delay
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // change the scene (form / list)
    case DEVICES_NAVIGATE:
      return { ...state, scene: action.payload };

    // the list is being loaded, show the loading.. and reset the items
    case DEVICES_FETCHING:
      return { ...state, itemsFetching: true, items: [] };

    // hide the loading and set the loaded data into items
    case DEVICES_FETCHED:
      return { ...state, itemsFetching: false, items: action.payload};

    // one item is being loaded, show a loading.. inside the form and reset the current item
    case DEVICES_FETCHING_ONE:
      return { ...state, itemFetching: true, item: null};

    // hide the loading.. inside the form and set the loaded data into our 'item'
    case DEVICES_FETCHED_ONE:
      return { ...state, itemFetching: false, item: action.payload};

    // status change on the simulation checkbox
    case DEVICES_SET_SIMULATION:
      return { ...state, simulated: action.payload};

    // do nothing
    default:
      return state;
  }
}
