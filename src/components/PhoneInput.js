import React, { Component } from 'react';
import MaskedInput from 'react-text-mask'

export default class BasicExample extends Component {

  render() {
    return (
      <MaskedInput
        mask={[/\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/]}
        className="form-control"
        placeholder="902 999 999"
        guide={false}
      />
    )
  }
}