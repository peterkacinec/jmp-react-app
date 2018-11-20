import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';

import Ulica from '../components/Ulica';
import Obec from '../components/Obec';
import PhoneInput from '../components/PhoneInput';
// import AsyncExample from '../components/AsyncExample';

export default class NovaReklamacia extends Component {
  constructor(props) {
    super(props);

    let now = moment().format("YYYY-MM-DD");

    this.state = {
      claim_number_jmp: '',
      claim_number_obi: '',
      customer: '',
      date_claim: '',
      date_confirm: now,
      date_sale: '',
      machine_brand: 'riwall',
      machine_type: 'kosacka',
      model_number: '',
      claim_err: '',
      claim_result: '',
      machine_completeness: 'true',
      claim: 'true',
      phoneNumber: ''
    }
  }

  validateForm = () => {
    return (
      this.state.claim_number_jmp.length > 0 &&
      this.state.claim_number_obi.length > 0 &&
      this.state.customer.length > 0 &&
      this.state.date_claim.length > 0 &&
      this.state.date_confirm.length > 0 &&
      this.state.date_sale.length > 0 &&
      this.state.machine_brand.length > 0 &&
      this.state.machine_type.length > 0 &&
      this.state.model_number.length > 0 &&
      this.state.claim_err.length > 0 &&
      this.state.claim_result.length > 0
    );
  }

  getValidationCustomer() {
    const length = this.state.customer.length;
    if (length > 2) {
      return 'success';
    }
    else if (length > 0) {
      return 'error';
    }
    else {
      return null;
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    let claim_number_jmp = Number(this.state.claim_number_jmp);
    
    let date_sale = moment.utc(this.state.date_sale, 'YYYY-MM-DD').format();
    let date_claim = moment.utc(this.state.date_claim, 'YYYY-MM-DD').format();
    let date_confirm = moment.utc(this.state.date_confirm, 'YYYY-MM-DD').format();

    try {
      await this.createReklamacia(
        { reklamacne_cislo_JMP: claim_number_jmp,
          reklamacne_cislo_OBI: this.state.claim_number_obi,
          zakaznik: this.state.customer,
          datum_predaja: date_sale,
          datum_uplatnenia_reklamacie: date_claim,
          datum_odoslania_reklamacie: date_confirm,
          znacka_stroja: this.state.machine_brand,
          typ_stroja: this.state.machine_type,
          modelove_cislo: this.state.model_number,
          reklamovana_vada: this.state.claim_err,
          zistena_vada: this.state.claim_result 
        });
      this.props.history.push("/reklamacie");
    } catch (e) {
      alert(e);
    }
  }

  createReklamacia(data) {
    axios.post('/api/reklamacia', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="claim_number_jmp">
          <Col componentClass={ControlLabel} sm={2} >
            Reklamačný list číslo (JMP) *
          </Col>
          <Col sm={4} >
            <FormControl
              autoFocus
              type="number"
              min="0"
              value={this.state.claim_number_jmp}
              onChange={this.handleChange}
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2} >
            / 2018 /
          </Col>
          <Col sm={4} >
            <FormControl
              type="text"
              componentClass="select"
              value={this.state.machine_brand}
              onChange={this.handleChange}
            >
              <option value="riwall">Riwall</option>
              <option value="elpumps">Elpumps</option>
            </FormControl>
          </Col>
        </FormGroup>

        {/* <FormGroup controlId="fdsf" >
          <Col componentClass={ControlLabel} sm={2}>
            Pokus
          </Col>
          <Col sm={10}>
            <Ulica />
          </Col>
        </FormGroup> */}
        
        <FormGroup controlId="claim_number_obi" >
          <Col componentClass={ControlLabel} sm={2}>
            Reklamačné číslo*
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.claim_number_obi}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="customer" 
          validationState={this.getValidationCustomer()} 
        >
          <Col componentClass={ControlLabel} sm={2}>
            Zákazník *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.customer}
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="street" >
          <Col componentClass={ControlLabel} sm={2}>
            Ulica
          </Col>
          <Col sm={4}>
            <Ulica />
          </Col>
          <Col componentClass={ControlLabel} sm={2}>
            Číslo domu
          </Col>
          <Col sm={4}>
            <FormControl
              type="text"
              value={this.state.houseNumber}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="city" >
          <Col componentClass={ControlLabel} sm={2}>
            PSČ
          </Col>
          <Col sm={4}>
            <Obec />
            {/* <FormControl
              type="text"
              value={this.state.postCode}
            /> */}
          </Col>
          <Col componentClass={ControlLabel} sm={2}>
            Mesto
          </Col>
          <Col sm={4}>
            <FormControl
              type="text"
              value={this.state.city}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="tel" validationState="success" >
          <Col componentClass={ControlLabel} sm={2}>
            Tel.
          </Col>
            <Col sm={10}>
              <InputGroup>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="+421"
                >
                  <MenuItem key="+421">+421</MenuItem>
                </DropdownButton>
                <PhoneInput />
                <FormControl.Feedback />
              </InputGroup>
            </Col>
        </FormGroup>
        
        <FormGroup controlId="date_claim" >
          <Col componentClass={ControlLabel} sm={2}>
            Dátum uplatnenia reklamácia *
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              value={this.state.date_claim}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="date_confirm" >
          <Col componentClass={ControlLabel} sm={2}>
            Dátum odoslania reklamácie *
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              value={this.state.date_confirm}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="date_sale" >
          <Col componentClass={ControlLabel} sm={2}>
            Dátum predaja *
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              value={this.state.date_sale}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="machine_brand" >
          <Col componentClass={ControlLabel} sm={2}>
            Značka stroja *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="select"
              value={this.state.machine_brand}
              onChange={this.handleChange}
            >
              <option value="riwall">Riwall</option>
              <option value="elpumps">Elpumps</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="machine_type" >
          <Col componentClass={ControlLabel} sm={2}>
            Typ stroja *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="select"
              value={this.state.machine_type}
              onChange={this.handleChange}
            >
              <option value="kosacka">Kosacka</option>
              <option value="cerpadlo">Cerpadlo</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="model_number" >
          <Col componentClass={ControlLabel} sm={2}>
            Modelové číslo *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.model_number}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="serial_number" >
          <Col componentClass={ControlLabel} sm={2}>
            Výrobné číslo
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.serial_number}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="machine_completeness" >
          <Col componentClass={ControlLabel} sm={2}>
            Kompletnosť stroja
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="select"
              value={this.state.machine_completeness}
              onChange={this.handleChange}
            >
              <option value="true">Ano</option>
              <option value="false">Nie</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="claim" >
          <Col componentClass={ControlLabel} sm={2}>
            Reklamácia
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="select"
              value={this.state.claim}
              onChange={this.handleChange}
            >
              <option value="true">uznana</option>
              <option value="false">neuznana</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="claim_err" >
          <Col componentClass={ControlLabel} sm={2}>
            Reklamovaná vada *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="textarea"
              value={this.state.claim_err}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="claim_result" >
          <Col componentClass={ControlLabel} sm={2}>
            Zistená vada *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.claim_result}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="repair" >
          <Col componentClass={ControlLabel} sm={2}>
            Oprava
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              componentClass="textarea"
              value={this.state.repair}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="password" >
          <Col componentClass={ControlLabel} sm={2}>
            
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="select"
            >
              <option value="nic">nič</option>
              <option value="1">Stroj bol odskúšaný, funkčný.</option>
              <option value="2">Oprava nerentabilná, stroj ostáva v servise.</option>
            </FormControl>
          </Col>
        </FormGroup>
        <Button
          block
          bsStyle="primary"
          disabled={!this.validateForm()}
          type="submit"
        >
          Odoslat
        </Button>
      </Form>
    );
  }
}