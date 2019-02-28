import React, { Component } from "react";
import Registration from "./Registration";
//import TodoItems from "./TodoItems";

class App extends Component {
  inputElement = React.createRef();
  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }
  deleteMember(member) {
    var data = {
      id: member.id
    };
    console.log(data);
    fetch("https://untitled-2pnbnmu167mj.runkit.sh/delete", {
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

  editMember(member) {
    var data = {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      phone: member.phone,
      email: member.email
    };
    console.log(data);
  }

  componentDidMount() {
    let self = this;
    fetch("https://untitled-2pnbnmu167mj.runkit.sh/contacts/all", {
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

  render() {
    return (
      <div className="App">
        <Registration inputElement={this.inputElement} />
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
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
                    <a onClick={() => this.editMember(member)}>Edit</a>
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