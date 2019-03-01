import React, { Component } from "react";
import bootstrap from "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

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

  fechRequests(path, method, data) {
    fetch("https://address-book-back-end-ncjv5w7i8jvi.runkit.sh/" + path, {
      method: method,
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
        console.log(data);
        if (data.affectedRows == "1") {
          alert("The operation has been completed successfully");
          window.location.reload();
        }
      })
      .catch(function(err) {
        console.log("error", err);
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  deleteItem(member) {
    var data = {
      id: member.id
    };
    this.fechRequests("delete", "POST", data);
  }

  editItem = e => {
    e.preventDefault();
    this.fechRequests("delete", "POST", this.state.form);
  };

  addItem = e => {
    e.preventDefault();
    this.fechRequests("new", "POST", this.state.form);
  };

  componentDidMount() {
    let self = this;
    fetch("https://address-book-back-end-ncjv5w7i8jvi.runkit.sh/contacts/all", {
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
        <Form onSubmit={this.state.create ? this.addItem : this.editItem}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="first_name"
              className="form-control"
              minLength={3}
              required
              placeholder="Enter First Name"
              value={this.state.form.first_name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Enter Last Name"
              onChange={this.handleChange}
              name="last_name"
              className="form-control"
              required
              minLength={3}
              value={this.state.form.last_name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="Enter Phone"
              onChange={this.handleChange}
              name="phone"
              type="text"
              className="form-control"
              maxlength={10}
              value={this.state.form.phone}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Enter Email"
              onChange={this.handleChange}
              name="email"
              type="email"
              className="form-control"
              value={this.state.form.email}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

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
                  <Button variant="primary">
                    <a onClick={() => this.handleEdit(member)}>Edit</a>
                  </Button>
                  <Button variant="danger">
                    <a onClick={() => this.deleteItem(member)}>Delete</a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
