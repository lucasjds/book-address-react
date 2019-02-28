import React, { Component } from "react";
import bootstrap from "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  inputElement = React.createRef();
  constructor() {
    super();
    this.state = {
      contacts: [],
      form: {
        id: 0,
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
      },
      create: true
    };
  }
  deleteMember(member) {
    var data = {
      id: member.id
    };
    console.log(data);
    fetch("hhttps://test4-vv6e1xcajcg8.runkit.sh/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        if (data === "success") {
          this.setState({ msg: "User has been deleted." });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleEdit(member) {
    this.setState({
      form: {
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        phone: member.phone,
        email: member.email
      },
      create: false
    });
  }

  editMember = e => {
    e.preventDefault();
    fetch("https://test4-vv6e1xcajcg8.runkit.sh/edit", {
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

  componentDidMount() {
    let self = this;
    fetch("https://test4-vv6e1xcajcg8.runkit.sh/contacts/all", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        self.setState({ contacts: data });
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  addItem = e => {
    e.preventDefault();
    fetch("https://test4-vv6e1xcajcg8.runkit.sh/new", {
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
      <div className="App">
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={this.state.create ? this.addItem : this.editMember}>
              <input type="hidden" name="id" value={this.state.form.id} />
              <input
                placeholder="First Name"
                onChange={this.handleChange}
                name="first_name"
                className="form-control"
                value={this.state.form.first_name}
              />
              <input
                placeholder="Last Name"
                onChange={this.handleChange}
                name="last_name"
                className="form-control"
                value={this.state.form.last_name}
              />
              <input
                placeholder="Phone"
                onChange={this.handleChange}
                name="phone"
                className="form-control"
                value={this.state.form.phone}
              />
              <input
                placeholder="Email"
                onChange={this.handleChange}
                name="email"
                className="form-control"
                value={this.state.form.email}
              />
              <button type="submit"> Submit </button>
            </form>
          </div>
        </div>
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>EMail</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map(member => (
                <tr key={member.id}>
                  <td>{member.first_name} </td>
                  <td>{member.last_name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>
                    <a onClick={() => this.handleEdit(member)}>Edit</a>
                    <a onClick={() => this.deleteMember(member)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
/*<TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        /><TodoItems entries={this.state.items} deleteItem={this.deleteItem} />*/

export default App;
