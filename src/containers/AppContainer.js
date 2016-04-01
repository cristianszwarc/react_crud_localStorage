import { connect } from 'react-redux'
import { appNavigate } from '../actions/app';

// import the component to map
import App from '../components/App';

// this returns the pieces of the state
const mapStateToProps = (state) => {
  return {
    scene: state.app.scene  // selecting one element instead of the whole thing
  };
}

// map actions to this.props.someFunction
const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (targetScene) => {
      dispatch(appNavigate(targetScene));
    }
  }
}

// map the state
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
