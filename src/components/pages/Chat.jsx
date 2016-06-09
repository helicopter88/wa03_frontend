import React, {Component, PropTypes} from 'react';
import {Table, Button, Input, Panel, FormGroup, FormControls, ListGroup, ListGroupItem} from 'react-bootstrap';
import Websocket from 'ws';
var Chat = React.createClass ({

  getInitialState: function() {
    return ({
      username: sessionStorage.userName,
      messages: [],
      message: '',
      online: [],
      ws: new WebSocket('ws://webapps3.westeurope.cloudapp.azure.com:8081')
    });
  },

  handleMessage: function(event) {
    var data = JSON.parse(event.data);
    console.log(data);
    if(data.online != null) {
      this.setState({ online: data.online });
    } else {
      var msgs = this.state.messages;
      msgs.push(data);
      this.setState({ messages: msgs });
      this.state.ws.send("get_online public");
    }
  },

  open: function() {
    console.log('Connected');
    this.state.ws.send('new_chan public ' + this.state.username);
    this.state.ws.send("get_online public");
  },

  componentWillMount: function() {
    this.state.ws.addEventListener('open', this.open);
    this.state.ws.addEventListener('message', this.handleMessage);

  },

  handleChange: function(e) {
    this.setState({message: e.target.value});
  },

  submitMsg: function() {
    event.preventDefault();
    if (this.state.message !== '') {
      this.state.ws.send("send_msg public " + this.state.username + " " + this.state.message);
    }
    this.setState({message: ''});
    this.scrollChat;

  },

  scrollChat: function() {
  },

  render: function() {
        return (
      <div>
      <Panel>
	<div className="col-lg-9">
	<div id="chat" style={{overflow: 'auto', height: 16 + 'em'}}>
        {this.state.messages.map((msg) => (<h5> <strong>{msg.author}</strong>: {msg.msg}</h5> ))}
	</div>
	<form onSubmit={this.submitMsg}>
	  <div className="form-group">
          <Input
            type="text"
            value={this.state.message}
            placeholder="Enter your message"
            onChange={this.handleChange}
	    addonAfter= <Button bsStyle="success" className="btn-outline" bsSize="xsmall" onClick={this.submitMsg}><i className="fa fa-paper-plane fa-fw"></i></Button>
          ></Input> 
	  </div>
	  	</form>
	</div>
	<div className="col-lg-3">
	  <ListGroup>
            {this.state.online.map(elem => <ListGroupItem> {elem} </ListGroupItem>)}
	  </ListGroup>	  
	</div>
      </Panel>
      </div>
      );
  }
});

export default Chat;
