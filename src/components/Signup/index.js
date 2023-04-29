import { Component } from "react";
import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    newPassword: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    const { history } = this.props;
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  render() {
    const {
      showSubmitError,
      errorMsg,
      username,
      password,
      email,
      newPassword,
    } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662030635/TastyKitchen/mobile-view-login-image_hunzed.png"
          className="banner-sm-image"
          alt="website login"
        />
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          <form className="login-form" onSubmit={this.submitForm}>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="user-input"
              value={email}
              onChange={this.onChangeEmail}
            />
            <label htmlFor="userName" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="user-input"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="user-input"
              value={password}
              onChange={this.onChangePassword}
            />
            <label htmlFor="newPassword" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="newPassword"
              className="user-input"
              value={newPassword}
              onChange={this.onChangeNewPassword}
            />
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
