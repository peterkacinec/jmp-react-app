import React, { Component } from 'react';
import axios from 'axios';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      debounceTimer:''
    }
  }

  getUlica(input) {
    axios
    .get(`/api/ulica?q=${input}`)
    .then(response => {
      const newList = response.data.items.map(d => {
        return {
          id: d._id,
          name: d.name
        };
      });

      this.setState(Object.assign({}, this.state, {
        data: newList
      }));

      console.log('this.state.data', this.state.data);

      return newList;
    })
    .catch(error => console.log(error));
  }

  onFieldChange(event) {
    // const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (fieldValue.length >= 3) {
      clearTimeout(this.state.debounceTimer);
      this.setState(Object.assign({},this.state, {
        debounceTimer: setTimeout(() => {
          let list = this.getUlica(fieldValue);
          console.log('list', list);
        }, 1500)
      }))
    }
  }

  render() {
    return (
      <>
        <input 
          id={this.props.labelKey} 
          name={this.props.labelKey} 
          type="text" 
          list={this.props.labelKey} 
          className="form-control" 
          placeholder={this.props.placeholder}
          onChange={this.onFieldChange.bind(this)}
        />
        <datalist id={this.props.labelKey}>
          {this.state.data.map((item) =>
              <option key={item.id} value={item.name} />
          )}
        </datalist>
      </>
    )
  }
}