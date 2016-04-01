import React from 'react';
import { Component } from 'react';

// components (scenes) that will be displayed by this component
import List from './List';
import Form from './Form';

// scenes is a silly trick to avoid routes, check the file to see it how works
import {Scene, SceneLink} from '../Scenes';

export default class Devices extends Component {

  componentWillMount() {
    this.props.setSimulation(this.props.simulated);
  }

  render() {
    // extract some fields from the props (to avoid use this.prop.bla after)
    const { scene } = this.props;

    // return the layout for the "devices",
    // check that List and Form are being feed with the current props
    // because I don't want to create more containers for them,
    // maybe a better way should be pass in only the functions each one require
    return (
      <div>
        <h1>
          Devices
        </h1>
        
        <ul className="nav nav-tabs">
          {/* yes.. this should be in a component instead of repeating it again here */}
          <li role="presentation" className={this.props.scene === 'list' ? 'active' : ''}>
            <SceneLink param="list" onClick={this.props.navigate}>List</SceneLink>
          </li>
          <li role="presentation" className={this.props.scene === 'form' ? 'active' : ''}>
            <SceneLink param="form" onClick={this.props.add}>Add / Modify</SceneLink>
          </li>
          <li className="checkbox">
            &nbsp;&nbsp;
            <label>
              <input type="checkbox" id="simulated"
                checked={this.props.simulated? 'checked' : ''}
                onChange={this.props.switchSimulation.bind(null, this.props.simulated)} />
              &nbsp;Simulate fetching
            </label>
          </li>
        </ul>

        <br />

        <Scene scene="list" current={scene}>
          <List {...this.props} />
        </Scene>

        <Scene scene="form" current={scene}>
          <Form {...this.props} />
        </Scene>

      </div>

    );
  }

}
