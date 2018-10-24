import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBoard, deleteBoard } from "../actions";
import SearchBar from './search_bar';
import LocacionList from '../components/locacion_list';
import '../style/board_detail.css';
class BoardDetail extends Component {

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

  render() {
    const { board, fetchBoard } = this.props;

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
        <LocacionList locaciones={board.locaciones} name={board.name} boardId={board.id}
         fetchBoard={fetchBoard}   
        />
      </div>  
      </div>
    );
  }
}

function mapStateToProps({ boards }, ownProps) {
  return { board: boards[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBoard, deleteBoard })(BoardDetail);
