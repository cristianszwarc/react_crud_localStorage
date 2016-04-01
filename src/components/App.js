import React from 'react';
import { Component } from 'react';

// components (scenes) that will be displayed by this component
import Splash from './pages/Splash';
import Home from './pages/Home';
import About from './pages/About';
import DevicesContainer from '../containers/DevicesContainer';

// scenes is a silly trick to avoid routes, check the file to see it how works
import {Scene, SceneLink} from './Scenes';

export default class App extends Component {

  render() {
    // extract some fields from the props (to avoid use this.prop.bla after)
    const { scene } = this.props;

    return (
      <div className="container">

        <ul className="nav nav-tabs">
          {/* this should be inside another component because is repeating, but.. */}
          <li role="presentation" className={this.props.scene === 'home' ? 'active' : ''}>
            <SceneLink param="home" onClick={this.props.navigate}>Home</SceneLink>
          </li>

          <li role="presentation" className={this.props.scene === 'about' ? 'active' : ''}>
            <SceneLink param="about" onClick={this.props.navigate}>About</SceneLink>
          </li>

          <li role="presentation" className={this.props.scene === 'devices' ? 'active' : ''}>
            <SceneLink param="devices" onClick={this.props.navigate}>Devices</SceneLink>
          </li>

        </ul>

        <Scene scene="splash" current={scene}>
          <Splash />
        </Scene>

        <Scene scene="home" current={scene}>
          <Home />
        </Scene>

        <Scene scene="about" current={scene}>
          <About />
        </Scene>

        <Scene scene="devices" current={scene}>
          <DevicesContainer />
        </Scene>

        <hr />
        <p className="help-block">
          <strong>Use CTRL + H to show/hide the redux dev tool.</strong> <br />
          <strong>Note</strong> that the state and the application data are independent,
          so despite you can time travel on the state you can not do it on changes pushed to the API
          just like when you are working with a real remote database.
        </p>

      </div>
    );

  }
}
