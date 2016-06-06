import React, { PropTypes, Component } from 'react';
import {Alert, ListGroup, ListGroupItem, Tabs, Tab, Panel, Button, Input, Label, FormControls, Row, Col, PageHeader} from 'react-bootstrap';

import Websocket from 'ws';
import Router from 'react-router';

var Forms = React.createClass({

  getInitialState: function() {
	return({
		userName: sessionStorage.userName,
		newName: '',
		newPword: '',
		leaderboard: [],
		followers: [],
		showResetAlert: false,
		showDeleteAlert: false,
		ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
	});

  },

  
  mixins: [Router.Navigation],

  open: function() {
	console.log("Connected");
  	this.state.ws.send("db get_leaderboard profit " + this.state.userName);
	this.state.ws.send("db get_followers " + this.state.userName);
  },

  handleData: function(event) {
	var data = event.data;

	if(data.indexOf("get_followers") > -1) {
	  var follows = JSON.parse(data.substring("get_followers: ".length));
	  follows.map(elem => console.log(elem));
	  this.setState({followers: follows}); 
	}

	if(data.indexOf("get_leaderboard") > -1) {
	  var lb = JSON.parse(data.substring("get_leaderboard: ".length));
	  this.setState({ leaderboard: lb });
	}
  },

  componentWillMount: function() {
	if (!sessionStorage.userName) {
	  this.transitionTo('login');
	}
	this.state.ws.addEventListener('open', this.open);
	this.state.ws.addEventListener('message', this.handleData);
  },

  handleName: function(e) {
	this.setState({newName: e.target.value });
  },


  handlePword: function(e) {
	this.setState({newPword: e.target.value });
  },

  saveChanges: function(e) {
	var userName = this.state.userName;
	var newName = this.state.newName;
	var newPword = this.state.newPword;
	if (newName !== '') {
	// DB requests to change stuff here
	  this.state.ws.send("db update_name" + userName + " " + newName);
	}
	if (newPword !== '') {
	  this.state.ws.send("db update_pword" + userName + " " + newPword);
	}

  },

  showResetAlert: function() {
    this.setState({showResetAlert: true});
  },

  showDeleteAlert: function() {
    this.setState({showDeleteAlert: true});
  },

  dismissResetAlert: function() {
    this.setState({showResetAlert: false});
  },

  dismissDeleteAlert: function() {
    this.setState({showDeleteAlert: false});
  },


  handleReset: function() {
    console.log("Account reset");
    var userName = this.state.userName;
    this.state.ws.send("db reset_acc" + userName);
  },

  handleDelete: function() {
    console.log("Account Delete");
    var userName = this.state.userName;
    this.state.ws.send("db delete_acc" + userName);
  },


  renderResetAlert: function() {
    if (this.state.showResetAlert) {
         return (
	   <div className="text-center">
	   <Alert bsStyle="danger" onDismiss={this.dismissResetAlert}>
           <h4>You are about to reset your account. This action cannot be reversed. Are you sure?</h4>
	   <p><Button bsStyle="warning" onClick={this.handleReset}>Yes, reset my account</Button>
           <Button bsStyle="primary" style={{marginLeft: 10 + 'px'}} onClick={this.dismissResetAlert}>No, dismiss</Button></p></Alert>
	   </div>);
    }
  },


  renderDeleteAlert: function() {
    if (this.state.showDeleteAlert) {
         return (
	   <div className="text-center">
	   <Alert bsStyle="danger" onDismiss={this.dismissDeleteAlert}>
           <h4>You are about to delete your account. This action cannot be reversed. Are you sure?</h4>
	   <p><Button bsStyle="warning" onClick={this.handleDelete}>Yes, delete my account</Button>
           <Button bsStyle="primary" style={{marginLeft: 10 + 'px'}} onClick={this.dismissDeleteAlert}>No, dismiss</Button></p></Alert>
	   </div>);
    }
  },


  render: function() {
    var self = this; 
    return (

      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>My Profile</PageHeader>
          </div>
        </div>


	<div className="row">
          <div className="col-lg-12">
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Profile Details">
		  <div className="col-lg-8">
		  <form>
	                  <h2>Change your on screen name</h2>
			  <Input type="text" addonBefore="Abc" onChange={this.handleName} value={this.state.newName} placeholder="Your new name:" />
			  <h2>Change your email</h2>
			  <Input type="email" addonBefore="@" onChange={this.handleEmail} value={this.state.newEmail} placeholder="Your new email address:" />
			  <h2>Change your password</h2>
			  <Input type="password" addonBefore={<i className="fa fa-key"></i>} onChange={this.handlePword} value={this.state.newPword} placeholder="New password" />
			  <Button bsSize="large" onClick={this.saveChanges} bsStyle="success">Save my changes</Button>
		  </form>
		  </div>
                </Tab>


                <Tab eventKey={2} title="Followers">
                  <h2>See who is following you, and who you follow</h2>
		      <div className="row">
	              <div className="col-lg-8">
		        <Panel header={<div align="center"><i className="fa fa-bar-chart fa-fw"></i>Profit Leaderboard</div>}>
	                <ListGroup>
          	          {this.state.leaderboard.map(elem =>
	                  <ListGroupItem><i className="fa fa-user fa-fw"></i> {elem.user}
          	            <span className="pull-right"><em>{parseFloat(elem.profit).toFixed(2)}</em></span>
	                  </ListGroupItem>)}
	                </ListGroup>
		        </Panel>
		      </div>
	            </div>
		    <div className="row">
		      <div className="col-lg-8">
		        <Panel header={<div align="center"><i className="fa fa-bar-chart fa-fw"></i>Your Followers</div>}>
	                <ListGroup>
          	          {this.state.followers.map(elem =>
	                  <ListGroupItem><i className="fa fa-user fa-fw"></i> {elem}
	                  </ListGroupItem>)}
	                </ListGroup>
		        </Panel>
	              </div>
		    </div>
                </Tab>

                <Tab eventKey={3} title="Messages & Trades">
                  <h2>Messages, Active and Past trade requests</h2>
                </Tab>
                
		<Tab eventKey={4} title="Settings">
                  <h2>Settings</h2>
		  <br></br>
		  <div className="col-lg-8">
		  <strong><h3 className="text-danger"> Reset profile</h3></strong>
		  <strong><p>Resetting your account will restart your progress. This will delete all your followers, reset your capital to its initial value and you will lose all the profits you have made so far. You will start again from no stocks.</p></strong>
		  <Button bsStyle="danger" onClick={this.showResetAlert}>Click here to reset your profile</Button>

		  <br></br>
		  <strong><h3 className="text-danger">Delete account</h3></strong>
		  <strong><p>This will permanently delete your account and wipe all the information related to it. This action cannot be reverted.</p></strong>
		  <Button bsStyle="danger" onClick={this.showDeleteAlert}>Click here to permanently delete your profile</Button>
		  <br></br><br></br>
		  {self.renderResetAlert()}
		  {self.renderDeleteAlert()}
		  </div>
                </Tab>

            </Tabs>
          </div>
	</div>


      </div>
      
    );
  }

});

export default Forms;
