import _ from "lodash";
import React, { Component } from "react";
import axios from 'axios';
import LocacionItem from './locacion_item';
class LocacionList extends Component {
    constructor(props) {
      super(props);
    }
  render() {
    const { locaciones } = this.props;

    if (!locaciones) {
        return <div>Loading...</div>;
      }

    return (
      <div className="container">
      <center>
        <table className="table table-hover" style={{ width:80 + '%' }}>
        <thead>
          <tr>
            <th><center>Locaciones</center></th>
          </tr>
        </thead>
        <tbody>
          {_.map(locaciones, locacion => {
             return ( <LocacionItem locacion={locacion} key={locacion.id} />);})
          }  
        </tbody>
      </table>
      </center>
    </div>  
      
    );
  }
}

export default LocacionList