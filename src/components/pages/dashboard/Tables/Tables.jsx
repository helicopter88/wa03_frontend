import React, { PropTypes, Component } from 'react';
import {Image, Pagination, Panel, Well, ButtonToolbar, ButtonGroup, Button, PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import Websocket from 'ws';

var Tables = React.createClass({
  getInitialState: function() {
    return ({
      times: ['1D','5D','1M', '3M', '6M', '1Y', '2Y'],
      time: '1y',
      stocks: [],
      stock: '',
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080"),
    });
  },
 
    open: function() {
      console.log("Hello");
      this.state.ws.send("db get_owned " + sessionStorage.userName);
    },

    handleMessage: function(event) {
      console.log(event.data);
      var j = event.data.substring(sessionStorage.userName.length + 5);
      var list = JSON.parse(j);
      var arr = []; 
      list.map(elem => arr.push(elem.instr));
      this.setState({
        stock: arr[0],
        stocks: arr
      });

    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
     
    },
  render: function() {
    var self = this;
    return (

      <div>
        <div className="col-lg-12"> 
          <PageHeader>Review</PageHeader> 
        </div>
       
        <div className="col-lg-11">
                 
        	<Panel header={<span>Instrument History</span>} >
                  <div className="col-lg-2">
                <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
         <ListGroup>
         {this.state.stocks.map(elem => (<ListGroupItem onClick={ function() {
									   
                                                                            self.setState({stock: elem});
                                                                            }}> {elem} </ListGroupItem>))}

        </ListGroup>          
          </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
	    <div className="col-lg-1">
              <ButtonToolbar>
                <ButtonGroup block vertical>
                  {this.state.times.map(elem => (<Button onClick={function() { self.setState({time: elem.toLowerCase()});}}> {elem} </Button>))}
                </ButtonGroup>
              </ButtonToolbar>
	     </div> 
            <div className="col-lg-11">
              <img style={{width: 80 + '%', height: 'auto'}} src={"https://chart.finance.yahoo.com/z?s="  + this.state.stock + "&t=" + this.state.time +"&q=&l=&z=l&a=v&p=s"}/>
	     </div>
	    </div>
            </div>     
            </Panel>
          </div>

      </div> 
    );
  }

});

export default Tables;
