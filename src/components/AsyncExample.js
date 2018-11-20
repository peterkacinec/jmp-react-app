import React, { Fragment, Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export default class AsyncExample extends Component {
  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    options: [],
  };

  render() {
    return (
      <Fragment>
        <AsyncTypeahead
          {...this.state}
          labelKey="login"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={(option, props) => (
            <GithubMenuItem key={option.id} user={option} />
          )}
        />
      </Fragment>
    );
  }

  _handleChange = (e) => {
    const {checked, name} = e.target;
    this.setState({[name]: checked});
  }

  _handleSearch = (query) => {
    this.setState({isLoading: true});
    makeAndHandleRequest(query)
      .then(({options}) => {
        this.setState({
          isLoading: false,
          options,
        });
      });
  }
}