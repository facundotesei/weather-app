import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsByUser } from "../actions";
import '../style/board_list.css';

class BoardList extends Component {
  
  componentDidMount() {
    const { getHeaders, getId } = this.props.auth;
    this.props.fetchBoardsByUser(getId(), getHeaders());
  }

  renderBoards(user) {
    return _.map(this.props.boards, ({ id, name }) => {
      return (
        <Link to={`/boards/${user}/${id}`} key={id}>
          <li className="list-group-item">
            { name }
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


function mapStateToProps({ boards }) { return { boards }; }

export default connect(mapStateToProps, { fetchBoardsByUser })(BoardList);
