import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsByUser } from "../actions";

class BoardList extends Component {
  componentDidMount() {
    this.props.fetchBoardsByUser();
  }

  renderBoards() {
    return _.map(this.props.boards, board => {
       var styles = { backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.85))," + `url(${board.name})` }
      return (
        <li className="list-group-item" key={board.id}>
          <Link to={`/boards/${board.id}`}>
            {board.name}
          </Link>
        </li>
      );
    });
  }

  render() {
  const {boards} = this.props;    

    return (
      <div className="container" >
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/boards/new">
            Add a Board
          </Link>
        </div>
        <h3>My Boards</h3>
        <ul className="list-group" style={{ width:80 + '%' }}>
          {!this.props.boards ? (<li className="list-group-item">Loading...</li>) : this.renderBoards() }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { boards: state.boards };
}

export default connect(mapStateToProps, { fetchBoardsByUser })(BoardList);
