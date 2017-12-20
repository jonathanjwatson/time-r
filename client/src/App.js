import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import CustomNav from './components/CustomNav';
import './App.css';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    let token = cookies.get('token');
    this.setState({token})
  }
  _removeCookies() {
    cookies.remove('token');
    window.location.reload();
  }
  constructor() {
      super();
      this.state = {
          user: {
      email: "",
      password: ""
    },
    token: "",
    submittedForm: false,
    redirect: false
      }
  }
  _handleChange = (e) => {
  const attributeName = e.target.name;
  const attributeValue = e.target.value;
  const user = {...this.state.user};
  user[attributeName] = attributeValue;
  this.setState({ user });
  }
  _handleSubmit = (e, payload, route) => {
  e.preventDefault();
  axios.post(`/auth/${route}`, payload)
  .then((res) => {
    console.log("success")
    let token = res.data.token;
    console.log(token);
    this.setState({token})
    cookies.set("token", token);
    if(token){
      let redirect = !this.state.redirect;
      this.setState({redirect})
    }
      })
      .catch((err) => {
          console.log(err.response.data.error);
      })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <CustomNav token={this.state.token} _removeCookies={this._removeCookies}/>
          {/* <Route exact path="/signup" component={SignUp} something="foo"/> */}
          <Route path="/signup" render={()=><SignUp _handleSubmit={this._handleSubmit}/>}/>
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
