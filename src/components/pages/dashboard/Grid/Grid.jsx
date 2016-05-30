import React, { PropTypes, Component } from 'react';
import {Panel, PageHeader, Table, Button, FromControl, FormGroup, Form} from 'react-bootstrap';
import Websocket from 'ws';

var Grid = React.createClass({
  getInitialState: function() {
    return ({
      details: ({}),
      elements: [],
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
    });
  },
    handleMessage: function(event) {
      var length =  sessionStorage.userName.length + 5;
      if(event.data.indexOf("ow") > -1) {
        var j = event.data.substring(length);
        var list = JSON.parse(j);
        //list.map(elem => this.state.ws.send("yahoo ask_price " + elem.instr));
        //list.map(elem => this.state.ws.send("yahoo bid_price " + elem.instr));
        //list.map(elem => this.state.ws.send("yahoo req_name  " + elem.instr));
        this.setState({
          elements: list
        });
        this.state.elements.map(elem => console.log(elem.instr + elem.amount));
      }
    },
    open: function() {
      console.log("HELLO");
      this.state.ws.send("db get_owned " + sessionStorage.userName);
    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
    },
  render: function() {
    return (

      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Grid</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3>Grid options</h3>
              <p>See how aspects of the Bootstrap grid system work across multiple devices with a handy table.</p>
              <div className="table-responsive">
               
              <Table striped bordered condensed hover>
              <thead>
              <tr>           
              <th>Instrument</th>
                      <th>Name</th>
                      <th>Amount</th>
                              <th>Bid price</th>
                              <th>Ask Price</th>
                              <th>Sell</th>
              </tr>
              </thead>
              <tbody>
              {this.state.elements.map(elem => <tr>
                   <td> {elem.instr} </td>
                   <td>{elem.name} </td> <td>  {elem.amount} </td> <td> {elem.bp} </td> <td> {elem.ap} </td>
                   </tr>
                  
                                                )}
             </tbody>
             </Table>
            </div>
            
          </Panel>

        </div>
      </div>

      </div>
      
    );
  }

});

export default Grid;
