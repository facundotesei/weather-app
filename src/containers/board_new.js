import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBoard } from "../actions";
import '../style/board_new.css';

class BoardNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    const { user } = this.props.match.params;
    const { getHeaders, getId } = this.props.auth;
    this.props.createBoard(values, getId(), getHeaders(), () => {
      this.props.history.push(`/boards/${user}`);  
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { user } = this.props.match.params;

    return (
      <div className="container">
      <form 
        onSubmit={handleSubmit(this.onSubmit.bind(this))} 
        className="form-new" 
        style={{ width:50 + '%' }}>
        <Field
          label="Name For Board"
          name="name"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={`/boards/${user}`} className="btn btn-danger">Cancel</Link>
      </form>
    </div>
    );
  }
}

function validate({ name }) {
  const errors = {};

  if (!name) {
    errors.name = "Enter a Name";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "BoardNewForm"
})(connect(null, { createBoard })(BoardNew));
