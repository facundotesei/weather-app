import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsByUser } from "../actions";
import '../style/board_list.css';


class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = { url:'' };
  }
  componentDidMount() {
    const id = localStorage.getItem('userid'); //poner user en state y pasarlo por props de auth0
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}   
    this.props.fetchBoardsByUser(id, headers);
  
  }

  renderBoards(user) {
    return _.map(this.props.boards, board => {
      return (
        <Link to={`/boards/${user}/${board.id}`} key={board.id}>
          <li className="list-group-item">
            {board.name}
          </li>
        </Link>
      );
    });
  }

  render() {
    const { user } = this.props.match.params;
    return (
      <div className="container" >
            <Link to={`/boards/${user}/new`}>
            <div className="addBoard">Add a Board</div>
            </Link>
           <h3 className="my-boards">My Boards</h3>
           <ul className="list-group" style={{ width:80 + '%' }}>
            { this.renderBoards(user) }
           </ul>
          </div>
    );
  }
}


function mapStateToProps(state) {
  return { boards: state.boards };
}

export default connect(mapStateToProps, { fetchBoardsByUser })(BoardList);
