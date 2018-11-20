import React from "react";
import PropTypes from "prop-types";

function Reklamacia(props) {
  return (
    <tr>
      <td>1</td>
      <td><a href={"/reklamacie/"+props.id}>{props.id}</a></td>
      <td>{props.name}</td>
      <td>{props.zakaznik}</td>
    </tr>
  );
}

Reklamacia.propTypes = {
  name: PropTypes.string.isRequired
};

export default Reklamacia;