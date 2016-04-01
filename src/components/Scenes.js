import React from 'react';
import { Component } from 'react';

// show/hide a child component based on a given scene
export class Scene extends Component {

  render() {
    if (this.props.scene === this.props.current ) {
      return (
        this.props.children
      );
    } else {
      return null;
    }

  }

}

export class SceneLink extends Component {
  render() {
    let styles = {
       cursor: 'pointer'
    }

    return (
      <a style={styles} className={this.props.className} onClick={this.props.onClick.bind(null, this.props.param)}>
        {this.props.children}
      </a>
    );
  }

}
