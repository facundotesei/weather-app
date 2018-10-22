import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoard, deleteBoard } from "../actions";

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
    const { board } = this.props;

    if (!board) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Board
        </button>
        <p>{board.id}</p>
        <p>{board.name}</p>
      </div>
    );
  }
}

function mapStateToProps({ boards }, ownProps) {
  return { board: boards[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBoard, deleteBoard })(BoardDetail);
