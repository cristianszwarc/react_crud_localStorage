import React from 'react';
import { Component } from 'react';

export default class Splash extends Component {

  render() {
    return (
      <div>
        <h1>
          Splash!
        </h1>
        <div className="alert alert-info" role="alert">
          <b>Welcome</b>, this is an unlinked page that will be shown only once.
        </div>
      </div>
    );
  }

}
