import _ from "lodash";
import React, { Component } from "react";
import LocacionItem from './locacion_item';

class LocacionList extends Component {
  
  render() {
    const { name, fetchBoard, boardId, locaciones, update } = this.props;

    if (!locaciones) { return <div>Loading...</div>; }

    return (
      <div className="container">
      <center>
        <table className="table table-hover" style={{ width:80 + '%' }}>
        <thead>
          <tr>
            <th><center>Locations Of {_.capitalize(name)}.</center></th>
          </tr>
        </thead>
        <tbody>
          {_.map(locaciones, locacion => {
            if(locacion.id === update.id) {
              return ( <LocacionItem locacion={update} key={locacion.id}  
                boardId={boardId}
                fetchBoard={fetchBoard}
               />
             );
            } else {
             return ( <LocacionItem locacion={locacion} key={locacion.id}  
                       boardId={boardId}
                       fetchBoard={fetchBoard}
                      />
                    );}})
          }  
        </tbody>
      </table>
      </center>
     
    </div>  
      
    );
  }
}

export default LocacionList