import React, { Fragment, Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

export default class Obec extends Component {

  state = {
    cityList: [],
    debounceTimer: ''
	};

  getObec = async (input) => {
    axios
    .get(`/api/obec?q=${input}`)
    .then(response => {
      console.log(response.data.items);
      const newList = response.data.items.map(d => {
        return {
          id: d._id,
          name: d.name,
          zip: d.zip
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
        this.getObec(input);
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
          placeholder="Vyber PSČ"
        />
      </Fragment>
    );
  }
}