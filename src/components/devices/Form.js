import React from 'react';
import { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
import validation from './validation';

// scenes is a silly trick to avoid routes, check the file to see it how works
import {SceneLink} from '../Scenes';

class DeviceForm extends Component {

  render() {
    const { fields: {title, port}, item, itemFetching, handleSubmit, submitting, error } = this.props;

    if (itemFetching) {
      return (
        <div className="alert alert-warning" role="alert">
          Loading...
        </div>
      );
    }

    if (!item) {
      return (
        <div className="alert alert-danger" role="alert">
          Failed to load
        </div>
      );
    }

    return (
      <fieldset disabled={this.props.submitting}>
        <form onSubmit={handleSubmit(this.props.save)}>
          <div className="form-group">
            <label>Title ({item.title})</label>
            <input className="form-control" type="text" placeholder="Title" {...title}/>
            {title.touched && title.error && <div className="help-block">{title.error}</div>}
          </div>

          <div className="form-group">
            <label>Port</label>
            <input className="form-control" type="text" placeholder="port" {...port}/>
            {port.touched && port.error && <div className="help-block">{port.error}</div>}
          </div>

          {error && <div className="help-block">{error}</div>}

          <button className="btn btn-default btn-success" type="submit">
            Save
          </button>

          &nbsp; {/* two white spaces (one because the nbsp and another beacuse this comment) */}

          <SceneLink className="btn btn-default" param="list" onClick={this.props.navigate}>
            Cancel
          </SceneLink>

        </form>
        </fieldset>

    );
  }

}

DeviceForm = reduxForm({
  form: 'newDeviceForm',
  fields: ['title', 'port', '_id'],
  validate: validation
},
state => ({ // mapStateToProps
  initialValues: state.devices.item // will pull state into form's initialValues
})
)(DeviceForm);

export default DeviceForm;
