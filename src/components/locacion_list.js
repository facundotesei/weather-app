import _ from "lodash";
import React, { Component } from "react";
import LocacionItem from './locacion_item';

class LocacionList extends Component {
  constructor(props) {
    super(props);
    this.state = { btnStyle: true,
                   delete: false,
                   locacion: ''  };
  }

  render() {
    const { locaciones, name, fetchBoard } = this.props;

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
             return ( <LocacionItem locacion={locacion} key={locacion.id}  
                       boardId={this.props.boardId}
                       fetchBoard={fetchBoard}
                      />
                    );})
          }  
        </tbody>
      </table>
      </center>
    </div>  
      
    );
  }
}

export default LocacionList