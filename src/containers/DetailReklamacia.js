import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import moment from "moment";

export default class DetailReklamacia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      _id:"",
      reklamacne_cislo_JMP:"",
      reklamacne_cislo_OBI:"",
      zakaznik:"",
      datum_predaja:"",
      datum_uplatnenia_reklamacie:"",
      datum_odoslania_reklamacie:"",
      znacka_stroja:"",
      typ_stroja:"",
      modelove_cislo:"",
      reklamovana_vada:"",
      zistena_vada:""
    }
  }

  validateForm() {
    return (
      this.state.reklamacne_cislo_JMP.length > 0 &&
      this.state.claim_number_obi.length > 0 &&
      this.state.zakaznik.length > 0 &&
      this.state.datum_uplatnenia_reklamacie.length > 0 &&
      this.state.datum_odoslania_reklamacie.length > 0 &&
      this.state.date_sale.length > 0 &&
      this.state.znacka_stroja.length > 0 &&
      this.state.typ_stroja.length > 0 &&
      this.state.modelove_cislo.length > 0 &&
      this.state.reklamovana_vada.length > 0 &&
      this.state.zistena_vada.length > 0
    )
  }

  async componentDidMount() {
    try {
      const res = await this.getReklamacia();
      const data = await res.json();
      // console.log(data);
      const { _id, reklamacne_cislo_JMP, reklamacne_cislo_OBI, zakaznik, datum_predaja, datum_uplatnenia_reklamacie, datum_odoslania_reklamacie, znacka_stroja, typ_stroja, modelove_cislo, reklamovana_vada, zistena_vada } = data;
      // TODO
      const date_claim = moment(datum_uplatnenia_reklamacie).format('YYYY-MM-DD');
      const date_sale = moment(datum_predaja).format('YYYY-MM-DD');
      const date_confirm = moment(datum_odoslania_reklamacie).format('YYYY-MM-DD');

      // console.log(date_sale);

      this.setState({
        _id,
        reklamacne_cislo_JMP,
        reklamacne_cislo_OBI,
        zakaznik,
        date_sale,
        date_claim,
        date_confirm,
        znacka_stroja,
        typ_stroja,
        modelove_cislo,
        reklamovana_vada,
        zistena_vada
      });
    } catch (e) {
      alert(e);
    }
  }

  getReklamacia() {
    return fetch(`/api/reklamacia/${this.props.match.params.id}`);
  }

  saveReklamacia(data) {
    axios.put('/api/reklamacia', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    let claim_number_jmp = Number(this.state.reklamacne_cislo_JMP);
    
    let date_sale = moment.utc(this.state.date_sale, 'YYYY-MM-DD').format();
    let date_claim = moment.utc(this.state.date_claim, 'YYYY-MM-DD').format();
    let date_confirm = moment.utc(this.state.date_confirm, 'YYYY-MM-DD').format();

    this.setState({ isLoading: true });

    try {
      await this.saveReklamacia(
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
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });

    try {
      await this.deleteReklamacia();
      this.props.history.push("/reklamacie");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  deleteReklamacia() {
    return axios.delete(`/api/reklamacia/${this.props.match.params.id}`);
  }

  render() {
    return ( 
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="reklamacne_cislo_JMP">
          <Col componentClass={ControlLabel} sm={2}>
            Reklamačný list číslo (JMP) *
          </Col>
          <Col sm={4}>
            <FormControl
              autoFocus
              type="number"
              min="0"
              value={this.state.reklamacne_cislo_JMP}
              onChange={this.handleChange}
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2}>
            / 2018 /
          </Col>
          <Col sm={4}>
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
        <FormGroup controlId="claim_number_obi" >
          <Col componentClass={ControlLabel} sm={2}>
            Reklamačné číslo*
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.reklamacne_cislo_OBI}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="customer" >
          <Col componentClass={ControlLabel} sm={2}>
            Zákazník *
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.zakaznik}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="street" >
          <Col componentClass={ControlLabel} sm={2}>
            Ulica
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.street}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="city" >
          <Col componentClass={ControlLabel} sm={2}>
            Mesto a PSČ
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.city}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="tel" >
          <Col componentClass={ControlLabel} sm={2}>
            Tel.
          </Col>
          <Col sm={10}>
            <FormControl
              type="tel"
              value={this.state.tel}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="date_claim" >
          <Col componentClass={ControlLabel} sm={2}>
            Dátum uplatnenia reklamácia *
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              value={this.state.date_claim || ''}
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
              value={this.state.date_confirm || ''}
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
              value={this.state.date_sale || ''}
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
              value={this.state.znacka_stroja}
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
              value={this.state.typ_stroja}
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
              value={this.state.modelove_cislo}
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
              value={this.state.reklamovana_vada}
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
              value={this.state.zistena_vada}
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
        <LoaderButton
            block
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
      </Form>
    )
  }
}