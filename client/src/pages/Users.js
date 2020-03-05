import React, { Component } from 'react';
// eslint-disable-next-line 
import API from '../utils/API';
// import SearchResult from '../components/SearchResults';
import './App.css';

class App extends Component {
  state = {
    searchResults: [],
    name: "",
    email: "",
    organization: ""
  }

  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  //upon entering anything on the input fields:
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleCreate = event => {
    event.preventDefault();
    //check and make sure all fields are entered:
    if (this.state.name && this.state.email && this.state.organization) {

      // ready data for POST here
      var data = {
        name: this.state.name,
        email: this.state.email,
        organization: this.state.organization
      };


      // call POST here using axios
      API.saveUsers(data)
        .then(res => {
          //after successfully adding new user, display it on the front end
          console.log(res)
          this.getUsers()
        })
        .catch(err => console.log(err))

    } else {
      alert("All fields need to be filled out")
    }

  }

  getUsers() {
    // call GET here using axios
    API.getUsers()
      .then(res => {
        console.log(res.data)
        this.setState({ searchResults: res.data, name: "", email: "", organization: "" })
      })
      .catch(err => console.log(err))

  }

  deleteUser = id => {
    // call DELETE here using axios
    API.deleteUser(id)
      .then(res => this.getUsers())
      .catch(err => console.log(err))
  }

  render() {


    return (
      <div className="App">
        <div className="newUser">
          <table>
            <thead>
              <tr>
                <th>
                  Create a new user!
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="nameInputContainer">
                  <label>Name</label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    id="nameInput"
                    placeholder="Enter a name..." />
                </td>
                <td id="emailInputContainer">
                  <label>Email</label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    id="emailInput"
                    placeholder="Enter an email..." />
                </td>
                <td id="orgInputContainer">
                  <label>Organization</label>
                  <input
                    name="organization"
                    value={this.state.organization}
                    onChange={this.handleInputChange}
                    id="orgInput"
                    placeholder="Enter an organization..." />
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <button
                    onClick={this.handleCreate}
                    id="createButton">Create</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="allUsers">
          <h3>
            Users in the Database
          </h3>
          <table id="usersList">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Organization
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.searchResults.map(user =>
                <tr className="userComp">

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.organization}
                  </td>

                  <td>
                    <button
                      id="deleteButton"
                      data-db-id={user._id}
                      onClick={() => this.deleteUser(user._id)}>
                      Delete
                     </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;