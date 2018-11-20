import React, { Component } from 'react';
import axios from 'axios';

import Autocomplete from '../components/Autocomplete';

export default class PokusUlica extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      streetList: [],
      debounceTimer:''
    }
  }

  // getUlica(input) {
  //   axios
  //   .get(`/api/ulica?q=${input}`)
  //   .then(response => {
  //     const newList = response.data.items.map(d => {
  //       return {
  //         id: d._id,
  //         name: d.name
  //       };
  //     });

  //     this.setState(Object.assign({}, this.state, {
  //       streetList: newList
  //     }));

  //     return newList;
  //     // console.log(this.state.streetList);
  //   })
  //   .catch(error => console.log(error));
  // }

  getUlica(input) {
    fetch(`/api/ulica?q=${input}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let array = [];
        myJson.items.map( data => {
          let { _id, name} = data;
          array.push({ _id, name});
        })
        console.log(array);
        return array;
      });
  }

  // onChange(field, value) {
  //   if (value.length >= 3) {
  //     clearTimeout(this.state.debounceTimer);
  //     this.setState(Object.assign({},this.state, {
  //       debounceTimer: setTimeout(() => {
  //         this.getUlica(value);
  //       }, 1500)
  //     }))
  //   }
  // }

  render() {
    return (
      <>
        <Autocomplete
          labelKey='streetAutocomplete'
          // onInputChange={this.handleInputChange}
          // onChange={this.onChange.bind(this)}
          fetchData='`/api/ulica?q=${input}`'
          // options={this.state.streetList}
          placeholder='Vyber ulicu'
        />
      </>
    );
  }
}