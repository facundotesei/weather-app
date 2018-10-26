import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLocacion } from "../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({ term: value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { auth: { getHeaders }, addLocacion, boardId } = this.props;
    addLocacion(boardId, this.state.term, getHeaders());
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
          <button type="submit" className="btn btn-secondary-danger">
            <span className="glyphicon glyphicon-search" aria-hidden="true" />
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
