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
    const { getHeaders } = this.props.auth;
    const { id } = this.props.match.params;
    this.props.fetchBoard(id, getHeaders());
  }

  onDeleteClick() {
    const { user, id } = this.props.match.params; 
    const { getHeaders, getId } = this.props.auth; 
    this.props.deleteBoard(id, getId(), getHeaders(), () => {
      this.props.history.push(`/boards/${user}`);
    });
  }

  onMessage = (msj) => {
    const { locaciones } = this.props.board; 
      forEach(locaciones, ({ id }) => {
        if(id === msj.id) {
          this.setState({ locacionUpdate: msj }) 
        }
     })     
   }
  
  render() {
    if (!this.props.board) { return <div>Loading...</div>; }

    const { board: { id, name, locaciones }, fetchBoard, auth } = this.props;
    const { locacionUpdate } = this.state;
  
    return (
      <div  className="container-fluid">
        <SearchBar boardId={id} auth={auth} />
        <button
          className="board-btn-delete pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          <div >Delete { name }</div>
        </button>
        <div className="container">
          <LocacionList
           auth={auth} 
           locaciones={locaciones} 
           name={name} 
           update={locacionUpdate}
           boardId={id} 
           fetchBoard={fetchBoard}   
         />
        </div>
        <SockJsClient 
          url='http://localhost:8080/ws' 
          topics={['/topic/all']}
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
