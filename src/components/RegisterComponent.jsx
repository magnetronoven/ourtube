import React, { Component } from 'react';
import { formValidation } from '../js/formValidation';

export default class RegisterComponent extends Component {

  constructor() {
    super();
    this.state = {
      email: {correct: true, msg: []},
      firstname: {correct: true, msg: []},
      infix: {correct: true, msg: []},
      lastname: {correct: true, msg: []},
      password: {correct: true, msg: []},
      confirmPassword: {correct: true, msg: []},
      
      // Set the validations you want to have
      validation: [
        // {field: "email", minLength: 10, maxLength: 40, sameAs: "password", required: true /*, regex:  /[0-9]/g */}
        {field: "email", maxLength: 40, required: true},
        {field: "firstname", maxLength: 40, required: true},
        {field: "infix", maxLength: 20},
        {field: "lastname", maxLength: 40, required: true},
        {field: "password", minLength: 5, maxLength: 40, required: true},
        {field: "confirmPassword", required: true, sameAs: "password"}
      ]
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let form = document.querySelector(".register-form");

    // Do the validations and set the results in a variable
    let validatedForm = formValidation(form, this.state.validation);
    console.log(validatedForm);

    let stateCopy = JSON.parse(JSON.stringify(this.state));

    // Handle the errors in the validation
    validatedForm.form.forEach(field => {
      let allRequirementsAreValid = true;

      // Clearing the messages
      stateCopy[field.field].msg = [];

      field.validation.forEach((requirement, i) => {
        if(!requirement.correct) {
          allRequirementsAreValid = false;
        }

        // Custom Message
        if(requirement.name === "required" && !requirement.correct){
          stateCopy[field.field].msg.push(`Is required`);   
        }
        if(requirement.name === "minLength" && !requirement.correct){
          this.state.validation.forEach(e => {
            if(e.field === field.field) {
              stateCopy[field.field].msg.push(`The minimal length must be ${e.minLength}`);   
            }
          })
        }
        if(requirement.name === "maxLength" && !requirement.correct){
          this.state.validation.forEach(e => {
            if(e.field === field.field) {
              stateCopy[field.field].msg.push(`The maximum length is ${e.maxLength}`);   
            }
          })
        }
        if(requirement.name === "sameAs" && !requirement.correct){
          this.state.validation.forEach(e => {
            if(e.field === field.field) {
              stateCopy[field.field].msg.push(`Must be the same as ${e.sameAs}`);
            }
          })
        } 
      });

      // Set the global true false on input
      if(!allRequirementsAreValid){
        stateCopy[field.field].correct = false;
      } else {
        stateCopy[field.field].correct = true;
      }
    })

    // Set the stateCopy as the (free) real (e)state
    this.setState({...stateCopy})

    // If form is incorrect return
    if(!validatedForm.valid) return;

    let data = {
      email: e.target.email.value,
      firstname: e.target.firstname.value,
      infix: e.target.infix.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };

    fetch('/register',
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)} className="login-form register-form">
        <div className={`form-group ${!this.state.email.correct ? 'form-group-error' : ''}`}>

          {/* The Error messages */}
          {this.state.email.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}

          <label>Email:</label>
          <input name="email" type="email" />
        </div>

        <div className={`form-group ${!this.state.firstname.correct ? 'form-group-error' : ''}`}>
          {this.state.firstname.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}
          <label>Firstname:</label>
          <input name="firstname" type="text" />
        </div>

        <div className={`form-group ${!this.state.infix.correct ? 'form-group-error' : ''}`}>
          {this.state.infix.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}
          <label>Infix:</label>
          <input name="infix" type="text" />
        </div>

        <div className={`form-group ${!this.state.lastname.correct ? 'form-group-error' : ''}`}>
          {this.state.lastname.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}
          <label>Lastname:</label>
          <input name="lastname" type="text" />
        </div>

        <div className={`form-group ${!this.state.password.correct ? 'form-group-error' : ''}`}>
          {this.state.password.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}
          <label>Password:</label>
          <input name="password" type="password" />
        </div>

        <div className={`form-group ${!this.state.confirmPassword.correct ? 'form-group-error' : ''}`}>
          {this.state.confirmPassword.msg.map((msg, i) => {
            return (<p className="error-message" key={i}>{msg}</p>)
          })}
          <label>Confirm Password:</label>
          <input name="confirmPassword" type="password" />
        </div>

        <input type="submit" value="Register" />
      </form>
    )
  }
}
