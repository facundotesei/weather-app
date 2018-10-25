import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLocacion } from "../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { addLocacion, boardId } = this.props;
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

    addLocacion(boardId, this.state.term, headers);
    this.setState({ term: "" });
  }

  render() {
    return (
    <div className="container">
    <center>
      <form onSubmit={this.onFormSubmit} className="input-group" style={{ width:70 + '%' }}>
        <input
          placeholder="Get the current weather"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary-danger"><span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </form>
      </center>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocacion }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
