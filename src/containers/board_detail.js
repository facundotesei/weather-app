import forEach from "lodash/forEach";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBoard, deleteBoard } from "../actions";
import SearchBar from './search_bar';
import LocacionList from '../components/locacion_list';
import '../style/board_detail.css';
import SockJsClient from 'react-stomp';
class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { locacionUpdate: '' };
  }
  componentDidMount() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    const { id } = this.props.match.params;
    this.props.fetchBoard(id, headers);
  }

  onDeleteClick() {
    const userId = localStorage.getItem('userid');
    const { user, id } = this.props.match.params;
    const { getAccessToken } = this.props.auth; //Se repite mucho este patron
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

    this.props.deleteBoard(id, userId, headers, () => {
      this.props.history.push(`/boards/${user}`);
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
    const { board, fetchBoard, auth } = this.props;
    const { locacionUpdate } = this.state;
  
    if (!board) { return <div>Loading...</div>; }

    return (
      <div  className="container-fluid">
        <SearchBar boardId={board.id} auth={auth} />
        
        <button
          className="board-btn-delete pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          <div >Delete {board.name}</div>
        </button>
      <div className="container">
        <LocacionList
         auth={auth} 
         locaciones={board.locaciones} 
         name={board.name} 
         update={locacionUpdate}
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
