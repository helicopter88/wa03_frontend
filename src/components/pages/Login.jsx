import React from 'react';
import Router from 'react-router';
import {FormControls, FormGroup, Modal, Panel, Input, Button} from 'react-bootstrap';
import Websocket from 'ws';

	


var LoginPage = React.createClass({

  getInitialState: function(){
    return {
      name: '',
      email: '',
      username: '',
      regPword: '',
      currency: "",
      loginID: '',
      password: '',
      isSubmitted: false,
      showRegistration: false,
      ws: new WebSocket('ws://webapps3.westeurope.cloudapp.azure.com:8080')
    };
  },
  
    open: function() {
      console.log("Hello");
    },
    
    handleData: function(event) {
      if(event.data.indexOf("true") > -1) {
	sessionStorage.setItem("userName", this.state.loginID);
        this.transitionTo('dashboard');
      } else {
        alert('Wrong username/password');
      }
    },
    componentWillMount: function() {
    this.state.ws.addEventListener('open', this.open);
    this.state.ws.addEventListener('message', this.handleData);
  },
  
  mixins: [Router.Navigation],

  openRegistration: function() {
    this.setState({showRegistration: true});
  },

  hideRegistration: function() {
    this.setState({showRegistration: false});
  },

  submitRegistration: function() {
    var uName = this.state.username;
    var name = this.state.name;
    var pword = this.state.regPword;
    var currency = this.state.currency;
    this.state.ws.send("db insert_user " + uName + " " + pword + " " + name + " 10000 " + currency);  	  
    location.reload();
  },

  handleUname: function(e) {
    this.setState({username: e.target.value});

  },

  handlePword: function(e) {
    this.setState({regPword: e.target.value});
  },

  handleName: function(e) {
    this.setState({name: e.target.value});
  },

  render: function(){
  
    return <div className="col-md-4 col-md-offset-4">
 	
        <div className="text-center">
	  <img className="login-brand-text" src="../src/common/img/LsummitLogoViolet.PNG"></img>
          <h1 className="login-brand-text">Welcome to Summit</h1>
          <h3 className="text-muted">Trade your way to the top!</h3>
        </div>

        <Panel className="login-panel">

          <form role="form" onSubmit={this.handleLogin}>
            <fieldset>
              <div className="form-group">
                <Input onChange={this.setLoginID} className="form-control" placeholder="Username" ref="loginID" type="text" autofocus="" name="name" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>
              <Button type="submit" bsSize="large" bsStyle="primary" block>Login</Button>
	      <br></br>
	      <Button bsSize="large" bsStyle="success" onClick={this.openRegistration}block>First Time? Click to register</Button>
              
            </fieldset>
          </form>

        </Panel>
        
      

      <Modal show={this.state.showRegistration} onHide={this.hideRegistration}>
	<Modal.Header closeButton>
	  <Modal.Title>Register now!</Modal.Title>
	</Modal.Header>
	<Modal.Body>
	<div>
	  <form >
		  <div className="form-group">
		  <h4>Username:</h4>
		  <Input type="text" className="form-control" placeholder="Your username:" value={this.state.username} onChange={this.handleUname}></Input>
		  
		  <h4>Name:</h4>
		  <Input type="text" className="form-control" placeholder="Your name here:" value={this.state.name} onChange={this.handleName}></Input>
		  
		  <h4>Your password:</h4>
		  <Input type="password" placeholder="Your password:" value={this.state.regPword} onChange={this.handlePword}></Input>
		  <h4>Finally, pick your preferred trading currency</h4>
		  <Input type="select" placeholder="Select a currency" id={this.state.currency}>
		    <option value="gbp">GBP</option>
		    <option value="usd">USD</option>
		  </Input>
		  </div>
		  <br></br>
	  	  <Button bsStyle="success" bsSize="large" onClick={this.submitRegistration} >Submit</Button>
	  </form>
	</div>
	</Modal.Body>
	<Modal.Footer>
	  <Button onClick={this.hideRegistration}>Close</Button>

	</Modal.Footer>
      </Modal>

</div>





      

  },

  setLoginID: function(e) {

    this.setState({
      loginID: e.target.value,
      loginError: ''
    });

  },

  setPassword: function(e) {

    this.setState({
      password: e.target.value,
      loginError: ''
    });

  },

  handleLogin: function(e){

    this.state.ws.send("db login " + this.state.loginID + " " + this.state.password);
    return false;
  }

});

export default LoginPage;
