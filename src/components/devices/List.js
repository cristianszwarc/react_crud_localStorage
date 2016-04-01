import React from 'react';
import { Component } from 'react';

// scenes is a silly trick to avoid routes, check the file to see it how works
import {SceneLink} from '../Scenes';

export default class List extends Component {
  componentWillMount() {
    this.props.fetch();
  }

  renderList(items) {
    return items.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            {item.title}
          </td>
          <td>
            {item.port}
          </td>
          <td>
            <SceneLink param={item._id} onClick={this.props.edit}>Edit</SceneLink>
          </td>
          <td>
            <SceneLink param={item._id} onClick={this.props.remove}>Remove</SceneLink>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { items, itemsFetching } = this.props;

    if (itemsFetching) {
      return (
        <div className="alert alert-warning" role="alert">
          Loading...
        </div>
      );
    }

    if (!items || items.length<1) {
      return (
        <div className="alert alert-info" role="alert">
          No devices found, please add one.
        </div>
      );
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Port</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderList(items)}
        </tbody>
      </table>
    );

  }

}
