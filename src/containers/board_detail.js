import forEach from "lodash/forEach";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBoard, deleteBoard } from "../actions";
import SearchBar from './search_bar';
import LocacionList from '../components/locacion_list';
import '../style/board_detail.css';
import SockJsClient from 'react-stomp';
import { Glyphicon } from 'react-bootstrap';
class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { locacionUpdate: '' };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchBoard(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteBoard(id, () => {
      this.props.history.push("/boards");
    });
  }

  onMessage = (msj) => {
    const { locaciones } = this.props.board; 
      forEach(locaciones, loc => {
        if(loc.id === msj.id) {
          this.setState({ locacionUpdate: msj}) 
        }
      })
      
    }
  

  render() {
    const { board, fetchBoard } = this.props;
    const { locacionUpdate } = this.state;
  
    if (!board) { return <div>Loading...</div>; }

    return (
      <div  className="container-fluid">
        <SearchBar boardId={board.id} />
        
        <button
          className="board-btn-delete pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          <div >Delete {board.name}</div>
        </button>
      <div className="container">
        <LocacionList locaciones={board.locaciones} name={board.name} update={locacionUpdate}
         boardId={board.id} 
         fetchBoard={fetchBoard}   
        />
      </div>
      <SockJsClient url='http://localhost:8080/ws' topics={['/topic/all']}
      onMessage={this.onMessage}
      debug={ true }
        />
      </div>
    );
  }
}

function mapStateToProps({ boards }, ownProps) {
  return { board: boards[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBoard, deleteBoard })(BoardDetail);
