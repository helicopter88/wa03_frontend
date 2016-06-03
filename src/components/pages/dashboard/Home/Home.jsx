import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Websocket from 'ws';


var Home = React.createClass({

  getInitialState: function() {
	return ({
                leaderboard: [],
                currency: "",
                currencyIcon: null,
                capital: 0,
                profit: 0,
		userName: sessionStorage.userName,
                realName: "",
                upnl: 0,
                total: 0,
		rank: 0,
		ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
                
	});
  },

  open: function() {
    console.log("Connected");
    this.state.ws.send("db get_leaderboard profit " + this.state.userName);
    this.state.ws.send("db get_capital " + this.state.userName);
    this.state.ws.send("db get_profit " + this.state.userName);
    this.state.ws.send("db get_currency " + this.state.userName);
    this.state.ws.send("db get_name " + this.state.userName);
    this.state.ws.send("db get_upnl " + this.state.userName);
    this.state.ws.send("db get_total " + this.state.userName);
    this.state.ws.send("db get_rank " + this.state.userName);
  },

  handleData: function(event) {
    var length =  this.state.userName.length + 5;
    var data = event.data;
    if(data.indexOf("tp_" + this.state.userName) > -1) {
      this.setState({ profit: parseFloat(data.substring(length)).toFixed(2)});
    }
    if(data.indexOf("gc_" + this.state.userName) > -1) {
      this.setState({ capital: parseFloat(data.substring(length)).toFixed(2)});
    }
    if(data.indexOf("pl_" + this.state.userName) > -1) {
      this.setState({ upnl: parseFloat(data.substring(length)).toFixed(2)});

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
      this.setState({ total: parseFloat(data.substring(length)).toFixed(2)});
    }
    if(data.indexOf("rk_" + this.state.userName) > -1) {
      this.setState({ rank: data.substring(length)});
    }
    if(data.indexOf("get_leaderboard") > -1) {
      var lb = JSON.parse(data.substring("get_leaderboard: ".length));
      lb.map(elem => console.log(elem));
      this.setState({ leaderboard: lb });
    }
  },
  
  componentWillMount: function() {
    this.state.ws.addEventListener('open', this.open);
    this.state.ws.addEventListener('message', this.handleData);
  },	

  displayTip: function(bool, msg) {
    if (bool) {
	return (<Tooltip> {msg} </Tooltip>);
    } else {
	return (<div></div>);
    }
  },

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Hello, {this.state.realName}!</PageHeader>
          </div>
        </div>


	<div className="col-lg-9">
	 <div className="row">
	<OverlayTrigger placement="top" overlay={this.displayTip(sessionStorage.help === 'on', <strong> NAV is your Net Asset Value{'; this'} is your total worth. </strong>)}>	

          <div className="col-lg-6 col-md-6">
	    
            <StatWidget style = "primary"
                    icon = {this.state.currencyIcon} 
                    count = {this.state.total}
		                    headerText="Your NAV" 
                    footerText="Go to my portfolio"
                    linkTo="dashboard.grid" />
	
        
          </div>
	</OverlayTrigger>
	
	<OverlayTrigger placement="top" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Your capital is the cash you can spend</strong>)}>	

	  <div className="col-lg-6 col-md-6">
            <StatWidget style="panel-info"
                    icon={this.state.currencyIcon}
                    count={this.state.capital}
                    headerText="Your current capital"
                    footerText="Review my progress"
                    linkTo="dashboard.tables" />
          </div>
	</OverlayTrigger>
	 </div>	
	 <div className="row">
	<OverlayTrigger placement="bottom" overlay={this.displayTip(sessionStorage.help === 'on', <strong>This is the money you have made since you started the game</strong>)}>	
  
          <div className="col-lg-4 col-md-6">
            <StatWidget style="panel-green"
                    icon= {this.state.currencyIcon}
                    count= {this.state.profit}
                    headerText="Your profit" 
		    footerText="View Details"
                    linkTo="dashboard.tables" />
          </div>
	</OverlayTrigger>
	<OverlayTrigger placement="bottom" overlay={this.displayTip(sessionStorage.help === 'on', <strong>This is your unrealised Profits and Losses. This is how much money you would make (or lose) if you sold all your positions now. It is relative to the initial price you bought your shares at. It may be negative immediately after buying (ask price is bigger than bid price).</strong>)}>	

          <div className="col-lg-4 col-md-6">

            <StatWidget style="panel-yellow"
                    icon= "fa fa-line-chart fa-4x"
                    headerText="Your Unrealized P&L" 
                    count={this.state.upnl}
                    footerText="Sell all my positions now!"
                    linkTo="dashboard.grid" />                            
          </div>
	</OverlayTrigger>
	<OverlayTrigger placement="bottom" overlay={this.displayTip(sessionStorage.help === 'on', <strong>This is your ranking amongst your followers. Hit the follow button to see more people!</strong>)}>	

	  <div className="col-lg-4 col-md-6">
	    <StatWidget style="panel-red"
		    icon= "fa fa-trophy fa-5x"
		    headerText="Your rank among followers:"
		    count={this.state.rank}
		    footerText="See the leaderboards"
		    linkTo="dashboard.home" />
	  </div>
	</OverlayTrigger>
	 </div>
        </div>
	
	<div className="col-lg-3">
		
		<Panel header={<div align="center">
              <i className="fa fa-bar-chart fa-fw"></i> Profit Leaderboards  <Button bsStyle="success" style={{marginLeft: 3.85 + 'em'}}>Follow <i className="fa fa-plus-square fa-fw"></i></Button>
              </div>}>
              <ListGroup>
               {this.state.leaderboard.map(elem => 
                <ListGroupItem><i className="fa fa-user fa-fw"></i> {elem.user}
                  <span className="pull-right text-muted small"><em>{parseFloat(elem.profit).toFixed(2)}</em></span>
                </ListGroupItem>)}
                
              </ListGroup>
            </Panel>

	</div>

	<div className="row">

	
	</div>

            
     </div>
    );
  }

});

export default Home;
