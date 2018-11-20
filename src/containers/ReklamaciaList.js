import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./NotFound.css";
import axios from "axios";
import Reklamacia from "./ReklamaciaListItem";

export default class ReklamaciaList extends Component {

	state = {
		reklamacie: []
	};

	async componentDidMount() {
		axios
		.get("/api/reklamacia")
		.then(response => {
			// console.log(response);
			// create an array of reklamacie only with relevant data
			const newReklamacie = response.data.items.map(d => {
				return {
					id: d._id,
					name: d.reklamacne_cislo_OBI,
					zakaznik: d.zakaznik
				};
			});

			// create a new "State" object without mutating 
			// the original State object. 
			const newState = Object.assign({}, this.state, {
				reklamacie: newReklamacie
			});

			// store the new state object in the component's state
			this.setState(newState);
		})
		.catch(error => console.log(error));
	}

	render() {
		return (
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>id</th>
						<th>obi cislo</th>
						<th>zakaznik</th>
					</tr>
				</thead>
				<tbody>
					{this.state.reklamacie.map(item => <Reklamacia key={item.id} name={item.name} id={item.id} zakaznik={item.zakaznik}/>)}
				</tbody>
			</Table>
		);
	}
}