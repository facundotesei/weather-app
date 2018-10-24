import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsByUser } from "../actions";
import '../style/board_list.css';
import { Jumbotron } from 'react-bootstrap';


class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = { url:''};
  }
  componentDidMount() {
    this.props.fetchBoardsByUser();
  }

  renderBoards() {
    return _.map(this.props.boards, board => {
      return (
        <Link to={`/boards/${board.id}`}  key={board.id}>
          <li className="list-group-item">
            {board.name}
          </li>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="container" >
            <Link to="/boards/new">
            <div className="addBoard">Add a Board</div>
            </Link>
           <h3 className="my-boards">My Boards</h3>
           <ul className="list-group" style={{ width:80 + '%' }}>
            { this.renderBoards() }
           </ul>
          </div>
    );
  }
}


function mapStateToProps(state) {
  return { boards: state.boards };
}

export default connect(mapStateToProps, { fetchBoardsByUser })(BoardList);
