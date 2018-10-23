import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoard, deleteBoard } from "../actions";
import SearchBar from './search_bar';
import LocacionList from '../components/locacion_list';
class BoardDetail extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { board } = this.props;

    if (!board) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-fluid">
        <Link to="/"> 
          <span className="glyphicon glyphicon-arrow-left" aria-hidden="true">
          </span>
           Back To Index
        </Link>
        <SearchBar boardId={board.id} />
        <p>{board.name}</p>
        <button
          className="btn btn-danger pull-xs-left"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Board
        </button>
      <div className="container">
        <LocacionList locaciones={board.locaciones}/>
      </div>  
      </div>
    );
  }
}

function mapStateToProps({ boards }, ownProps) {
  return { board: boards[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBoard, deleteBoard })(BoardDetail);
