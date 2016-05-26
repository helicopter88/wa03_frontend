import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Websocket from 'ws';


var Home = React.createClass({

  getInitialState: function() {
	return ({
                currency: "",
                currencyIcon: null,
                capital: 0,
                profit: 0,
		userName: sessionStorage.userName,
                realName: "",
                upnl: 0,
                total: 0,
		ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
                
	});
  },

  open: function() {
    console.log("Connected");
    this.state.ws.send("db get_capital " + this.state.userName);
    this.state.ws.send("db get_profit " + this.state.userName);
    this.state.ws.send("db get_currency " + this.state.userName);
    this.state.ws.send("db get_name " + this.state.userName);
    this.state.ws.send("db get_upnl " + this.state.userName);
    this.state.ws.send("db get_total " + this.state.userName);
  },

  handleData: function(event) {
    var length =  this.state.userName.length + 5;
    var data = event.data;
    if(data.indexOf("tp_" + this.state.userName) > -1) {
      this.setState({ profit: parseFloat(data.substring(length))});
    }
    if(data.indexOf("gc_" + this.state.userName) > -1) {
      this.setState({ capital: parseFloat(data.substring(length))});
    }
    if(data.indexOf("pl_" + this.state.userName) > -1) {
      this.setState({ upnl: parseFloat(data.substring(length))});

    }
    if(data.indexOf("nm_" + this.state.userName) > -1) {
      this.setState({realName: data.substring(length)});
    }
    if(data.indexOf("cr_" + this.state.userName) > -1) { 
      this.setState({currency: data.substring(length)});
      var currency = this.state.currency;
      if (currency.indexOf("USD") > -1) {
        this.setState({currencyIcon: "fa fa-usd fa-5x"});
      } else {
        this.setState({currencyIcon: "fa fa-gbp fa-5x"});
      }
    }
    if(data.indexOf("tt_" + this.state.userName) > -1) {
      this.setState({ total: parseFloat(data.substring(length))});
    }
  },
  
  componentWillMount: function() {
    this.state.ws.addEventListener('open', this.open);
    this.state.ws.addEventListener('message', this.handleData);
  },	

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Hello {this.state.realName}</PageHeader>
          </div>
        </div>


	<div className="col-lg-9">
	 <div className="row">
          <div className="col-lg-6 col-md-6">
            <StatWidget style = "panel-green"
                    icon = {this.state.currencyIcon} 
                    count = {this.state.capital}
                    headerText="Your total capital" 
                    footerText="Go to my portfolio"
                    linkTo="/" />
          </div>
	 </div>	
	 <div className="row">
	  <div className="col-lg-4 col-md-6">
            <StatWidget style="primary"
                    icon={this.state.currencyIcon}
                    count={this.state.profit}
                    headerText="Your total profits"
                    footerText="Review my progress"
                    linkTo="/" />
          </div>

          <div className="col-lg-4 col-md-6">
            <StatWidget style="panel-yellow"
                    icon= {this.state.currencyIcon}
                    count= {this.state.upnl}
                    headerText="Unrealised P & L" 
		    footerText="View Details"
                    linkTo="/" />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatWidget style="panel-red"
                    icon= "fa fa-line-chart fa-5x"
                    headerText="Sell all positions for" 
                    count={this.state.total}
                    footerText="Sell all my positions now!"
                    linkTo="/" />                            
          </div>
	 </div>
        </div>

	<div className="col-lg-3">
		<Panel header={<span>
              <i className="fa fa-bell fa-fw"></i> Notifications Panel
              </span>}>
              <ListGroup>
                <ListGroupItem href="javascript:void(0)"><i className="fa fa-comment fa-fw"></i> New Comment
                  <span className="pull-right text-muted small"><em>4 minutes ago</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                  <span className="pull-right text-muted small"><em>12 minutes ago</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-envelope fa-fw"></i> Message Sent
                  <span className="pull-right text-muted small"><em>27 minutes ago</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-tasks fa-fw"></i> New Task
                  <span className="pull-right text-muted small"><em>43 minutes ago</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-upload fa-fw"></i> Server Rebooted
                  <span className="pull-right text-muted small"><em>11:32 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-bolt fa-fw"></i> Server Crashed!
                  <span className="pull-right text-muted small"><em>11:13 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-warning fa-fw"></i> Server Not Responding
                  <span className="pull-right text-muted small"><em>10:57 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-shopping-cart fa-fw"></i> New Order Placed
                  <span className="pull-right text-muted small"><em>9:49 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="javascript:void(0)">
                  <i className="fa fa-money fa-fw"></i> Payment Received
                  <span className="pull-right text-muted small"><em>Yesterday</em></span>
                </ListGroupItem>
              </ListGroup>
              <Button block>View All Alerts</Button>
            </Panel>

	</div>

            
     </div>
    );
  }

});

export default Home;
