import React, { Component } from "react";

import Autocomplete from '../components/Autocomplete';

export default class Pokus extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      name: ""
    };
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (event.target.value.length >= 3) {
      console.log([event.target.id],':', event.target.value);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
  }

  render() {
    return (
      <Autocomplete
        labelKey='streetAutocomplete'
        // onInputChange={this.handleInputChange}
        // onChange={this.onChange.bind(this)}
        // fetchData={`/api/ulica?q=${input}`}
        options={this.state.dataList}
        placeholder='Vyber ulicu'
      />
    );
  }
}