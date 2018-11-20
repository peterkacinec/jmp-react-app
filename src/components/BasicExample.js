import React, { Fragment, Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

export default class BasicExample extends Component {

  state = {
    cityList: [],
    debounceTimer: ''
	};

  getUlica = async (input) => {
    axios
    .get(`/api/ulica?q=${input}`)
    .then(response => {
      console.log(response.data.items);
      const newList = response.data.items.map(d => {
        return {
          id: d._id,
          name: d.name
        };
      });

      this.setState(Object.assign({}, this.state, {
        cityList: newList
      }));
    })
    .catch(error => console.log(error));
  }

  handleInputChange = async input => {
    if (input.length >= 3) {
      clearTimeout(this.state.debounceTimer);
      this.state.debounceTimer = setTimeout(() => {
        this.getUlica(input);
        // console.log(list);
      }, 1500);
    }
  }

  render() {
    return (
      <Fragment>
        <Typeahead
          labelKey="name"
          // onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          options={this.state.cityList}
          placeholder="Vyber ulicu"
        />
      </Fragment>
    );
  }
}