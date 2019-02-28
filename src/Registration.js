import React, { Component } from "react";

class Registrarion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
      }
    };
  }

  componentDidUpdate() {}

  addItem = e => {
    e.preventDefault();
    fetch("https://untitled-2pnbnmu167mj.runkit.sh/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if (data == "success") {
          this.setState({ msg: "Thanks for registering" });
        }
      })
      .catch(function(err) {
        console.log("error", err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              placeholder="First Name"
              onChange={this.handleChange}
              name="first_name"
            />
            <input
              placeholder="Last Name"
              onChange={this.handleChange}
              name="last_name"
            />
            <input
              placeholder="Phone"
              onChange={this.handleChange}
              name="phone"
            />
            <input
              placeholder="Email"
              onChange={this.handleChange}
              name="email"
            />
            <button type="submit"> Add Contact </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registrarion;
