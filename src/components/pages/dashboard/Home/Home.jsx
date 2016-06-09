import React, { PropTypes, Component } from 'react';
import {Alert, Input, Modal, NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
import Router from 'react-router';
import Loader from 'react-loader';

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
		users: [],
                news: [],
		newFollow: '',
		oldFollow: '',
		showFollowers: false,
		showFollowAlert: false,
		loaded: false,
		ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
                
	});
  },

  mixins: [Router.Navigation],

  open: function() {
    console.log("Connected");
    this.state.ws.send("db get_leaderboard profit " + this.state.userName);
    this.state.ws.send("db get_capital " + this.state.userName);
    this.state.ws.send("db get_profit " + this.state.userName);
    this.state.ws.send("db get_currency " + this.state.userName);
    this.state.ws.send("db get_name " + this.state.userName);
    this.state.ws.send("db get_upnl " + this.state.userName);
    this.state.ws.send("db get_total " + this.state.userName);
    this.state.ws.send("db get_followable_users " + this.state.userName);    
    this.state.ws.send("news get_international_news");
  },

  handleData: function(event) {
    var length =  this.state.userName.length + 5;
    var data = event.data;
    if(data.indexOf("get_profit") > -1) {
      this.setState({ profit: parseFloat(data.substring(("get_profit: ").length)).toFixed(2)});
    }
    if(data.indexOf("get_capital") > -1) {
      this.setState({ capital: parseFloat(data.substring(("get_capital: ").length)).toFixed(2)});
    }
    if(data.indexOf("get_upnl") > -1) {
      this.setState({ upnl: parseFloat(data.substring(("get_upnl: ").length)).toFixed(2)});

    }
    if(data.indexOf("get_name") > -1) {
      this.setState({realName: data.substring(("get_name: ").length), loaded: true});	
    }
    if(data.indexOf("get_currency") > -1) { 
      this.setState({currency: data.substring(("get_currency: ").length)});
      var currency = this.state.currency;
      if (currency.indexOf("USD") > -1) {
        this.setState({currencyIcon: "fa fa-usd fa-5x"});
      } else {
        this.setState({currencyIcon: "fa fa-gbp fa-5x"});
      }
    }
    if(data.indexOf("get_total") > -1) {
      this.setState({ total: parseFloat(data.substring(("get_total: ").length)).toFixed(2)});
    }
    if(data.indexOf("get_leaderboard") > -1) {
      var lb = JSON.parse(data.substring("get_leaderboard: ".length));
      this.setState({ leaderboard: lb });
      for (var i = 0; i < lb.length; i++) {
	if (lb[i].user_id === this.state.userName) {
	  this.setState({rank: (i+1)});
	}
      }
    }
    if(data.indexOf("get_followable_users") > -1) {
      var usrs = JSON.parse(data.substring("get_followable_users: ".length));
      var old  = this.state.newFollow;
      this.setState({ users: usrs, newFollow: usrs[0], oldFollow: old});
      console.log(usrs[0]);
    }
    if(data.indexOf("get_international_news") > -1) {
      var n = JSON.parse(data.substring("get_international_news: ".length));
      this.setState({news: n});
      
    }
  },
 
  componentWillMount: function() {
    if (!sessionStorage.userName) {
      this.transitionTo('login');
    }
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


  handleNewFollow: function() {
    this.state.ws.send("db follow " + this.state.newFollow + " " + this.state.userName);
    this.state.ws.send("db get_leaderboard profit " + this.state.userName);
    this.state.ws.send("db get_followable_users " + this.state.userName);
    this.state.ws.send("db get_capital " + this.state.userName);
    this.state.ws.send("db get_total " + this.state.userName);
    this.setState({showFollowers: false});
    this.setState({showFollowAlert: true});  
  },

  renderFollowAlert: function() {
    if (this.state.showFollowAlert) {
         return (
           <div className="text-center">
           <Alert bsStyle="warning" onDismiss={this.dismissFollowAlert}>
           <h4>You have just followed {this.state.oldFollow}</h4>
           <Button bsStyle="primary" onClick={this.dismissFollowAlert}>Ok</Button></Alert>
           </div>);
    }

  },

  dismissFollowAlert: function() {
    this.setState({showFollowAlert: false});
  },


  showFollowers: function() {
   
    this.setState({showFollowers: true});
  },

  dismissFollowerModal: function() {
    this.setState({showFollowers: false});
  }, 

  changeFollow: function(e) {
    this.setState({newFollow: e.target.value});
  },

  render: function() {
    return (
      <div>
  <Loader loaded={this.state.loaded}>

        <div className="row">
	
          <div className="col-lg-12">
	                <PageHeader>Hello, {this.state.realName}!</PageHeader>
	   	              </div>
        </div>
	<div className="row">
	  {this.renderFollowAlert()}
	
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
         	 <h1> International News:</h1>
	 <h1><small>Courtesy of Yahoo Finance</small></h1>
 	<div style={{overflow: "auto", height: 14 + 'em'}}>

         <ListGroup>
           {this.state.news.map(elem => <ListGroupItem href={elem.link}> {elem.title} </ListGroupItem>)}
         </ListGroup>
	 </div>
         </div>

	
	<div className="col-lg-3">

	<OverlayTrigger placement="top" overlay={this.displayTip(sessionStorage.help === 'on', <strong> Following someone will cost you 10 {this.state.currency}, but you will be able to see the transactions of successful people!</strong>)}>
	<Button bsStyle="success" block bsSize="large" onClick={this.showFollowers} className="btn-outline">Follow someone <i className="fa fa-plus-square fa-fw"></i></Button>	
	</OverlayTrigger>

	  <Panel header={<div >
            <i className="fa fa-bar-chart fa-fw"></i> Profit Leaderboards <div className="pull-right" style={{marginTop: -6 + 'px'}}> </div>
            </div>}>
            <ListGroup>
              {this.state.leaderboard.map(elem => 
              <ListGroupItem><i className="fa fa-user fa-fw"></i> {elem.name}
                <span className="pull-right text-muted small"><em>{parseFloat(elem.profit).toFixed(2)}</em></span>
              </ListGroupItem>)}    
            </ListGroup>
	  </Panel>
	</div>


	
	<Modal bsStyle="danger" show={this.state.showFollowers} onHide={this.dismissFollowerModal}>
	<Modal.Header>
	  <h2> Follow someone!</h2>
	</Modal.Header>
	<Modal.Body>
           <h4>Following someone will cost you 10 {this.state.currency}. Select a user from the list below to start following their progress.</h4>
	   <Input type="select" placeholder="Select a user to follow" onChange={this.changeFollow} id={this.state.newFollow}>
		   {this.state.users.map(elem =>(<option value={elem}>{elem}</option>))}
	   </Input>
 
           <p><Button bsStyle="primary" onClick={this.handleNewFollow}>Follow</Button>
           <Button style={{marginLeft: 10 + 'px'}} onClick={this.dismissFollowerModal}>Close</Button></p>
	</Modal.Body>
	</Modal>


	 </Loader>

        
     </div>
    );
  }

});

export default Home;
