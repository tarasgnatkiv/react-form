import React, { Component } from "react";
import "./Form.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            checkbox: false,

            errorEmail: null,
            errorPassword: null,
            errorCheckbox: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formValid = this.formValid.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    formValid() {
        let valid = false;
        if (this.state.email && this.state.password && this.state.checkbox) {
            valid = true;
        } else {
            alert(`ERROR`)
        }
        return valid
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.formValid()) {
            console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            Checkbox: ${this.state.checkbox}
            `)
            this.setState({
                email: null,
                password: null,
                checkbox: false,

                errorEmail: null,
                errorPassword: null,
                errorCheckbox: null,
            })
            document.forms.signin.reset();
        }
    }

    handleChange(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'email':
                if (!emailRegex.test(value)) {
                    this.setState({
                        errorEmail: 'invalid email address',
                        email: null
                    })
                } else {
                    this.setState({
                        errorEmail: null,
                        email: value
                    })
                }
                break;
            case 'password':
                if (value.length < 4) {
                    this.setState({
                        errorPassword: 'minimum 4 characaters required',
                        password: null,
                    })
                } else {
                    this.setState({
                        errorPassword: null,
                        password: value,
                    })
                }
            default:
                break;
        }
    }

    handleCheckbox(e) {
        const value = e.target.checked;
        if (value) {
            this.setState({
                errorCheckbox: null,
                checkbox: true
            })
        } else {
            this.setState({
                errorCheckbox: 'checkbox is not checked',
                checkbox: false
            })
        }
    }


    render() {
        console.log(this.state)
        return (
            <div className='wrapper'>
                <div className="form-wrapper">
                    <h1>Sign in to your account</h1>
                    <form noValidate name='signin' onSubmit={this.handleSubmit}>
                        <div className="email">
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {this.state.errorEmail && (
                                <span className="errorMessage">{this.state.errorEmail}</span>
                            )}
                        </div>
                        <div className="password">
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {this.state.errorPassword && (
                                <span className="errorMessage">{this.state.errorPassword}</span>
                            )}
                        </div>

                        <div className='checkbox'>
                            <input
                                type="checkbox"
                                name="checkbox"
                                noValidate
                                onChange={this.handleCheckbox}
                            />
                            <label htmlFor="password">Keep me signed in </label>
                            {this.state.errorCheckbox && (
                                <span className="errorMessage"> {this.state.errorCheckbox}</span>
                            )}
                        </div>

                        <div className="createAccount">
                            <button type="submit">Create Account</button>
                            <small>Forgot your <a href='#'>password</a></small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Form;