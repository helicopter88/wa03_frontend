import React, { PropTypes, Component } from 'react';
import {Modal, Input, Panel, PageHeader, ControlLabel, Table, Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import Websocket from 'ws';

var Grid = React.createClass({
  getInitialState: function() {
    return ({
      showModal: false,
      elements: [],
      quantity: 0,
      symbol: "",
      isLoading: false,
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
    });
  },
  handleSymbol(e) {
        this.setState({ symbol: e.target.value });
  },

  handleValue(e) {
	this.setState({ quantity: e.target.value}); 
},

    openModal: function() {
      this.setState({ showModal: true});
    },

    close: function() { this.setState({showModal: false});},

    handleMessage: function(event) {
      var length =  sessionStorage.userName.length + 5;
      if(event.data.indexOf("ow") > -1) {
        var j = event.data.substring(length);
        var list = JSON.parse(j);
        this.setState({
          isLoading: false,
          elements: list
        });
      } 
      if(event.data.indexOf("exists") > -1) {
        if(event.data.indexOf("true") > -1) {
        	this.state.ws.send("yahoo ask_price " + this.state.symbol);
        } else {
        	alert("No such symbol");
        }
      }
      if(event.data.indexOf("ask_price") > -1) {
	var msg = JSON.parse(event.data.substring(10));
	var price = parseFloat(msg.res);
        this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + this.state.symbol + " " + price + " " + this.state.quantity + " t"); 
      }
      if(event.data.indexOf("it_" + sessionStorage.userName) > -1) {
	
	this.setState({isLoading:false});
        if (event.data.indexOf("1") > -1) {
	  alert("Negative amount of stocks is not allowed");
        } else if  (event.data.indexOf("2") > -1) {
          alert("Negative price is not allowed");
        } else if (event.data.indexOf("3") > -1) {
          alert("Wrong currency");
        } else if(event.data.indexOf("-1") > -1) {
          alert("Not enough funds or not enough shares");
        } else {
	  this.setState({ showModal:false});
	  this.state.ws.send("db get_owned " + sessionStorage.userName);
	}
      }
    },
    open: function() {
      this.state.ws.send("db get_owned " + sessionStorage.userName);
    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
    },

  buyStocks: function() {
    var quantity = this.state.quantity;
    var symbol = this.state.symbol;
    this.state.ws.send("yahoo exists " + symbol);
    
  },

  sell: function(elem) {
	this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + elem.instr + " " + elem.bp + " " + this.state.quantity + " f"); 
  },
  

  render: function() {
    var self = this;
    return (

      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Portfolio</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
		<Col className="pull-right"><Button pullRight bsStyle="primary" onClick={self.openModal} >Buy <i className="fa fa-plus"></i></Button></Col>
              <h3>Current holdings</h3>
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
                 <td>{elem.name} </td> <td>  {elem.amount} </td> <td> {elem.bp} </td> <td> {elem.ap} </td> <td>  <input type="number" value={this.state.quantity} onChange={this.handleValue}></input><Button bsStyle="danger" bsSize="small" disabled={this.state.isLoading}
       	  style={{marginLeft: 1 + 'em'}} 
          onClick={function() {
			self.setState({isLoading: true});
			self.sell(elem);
			}}>{self.state.isLoading ? 'Selling...' : 'Sell'} {this.state.quantity} of {elem.instr}</Button></td>
                 </tr>
                
                                              )}
         </tbody>
        </Table>
        </div>
        
      </Panel>
           <Modal show={this.state.showModal} onHide={this.close}>
                     <Modal.Header closeButton>
                                 <Modal.Title>Buy more instruments</Modal.Title>
                                           </Modal.Header>

                                                     <Modal.Body>
							<form onSubmit={this.buyStocks}>
							<h4>The instrument symbol below:</h4>
							<input type="search" value={this.state.symbol} onChange={this.handleSymbol} placeholder="Eg AAPL:"></input>
							<br></br>
							<h4>Quantity below:</h4>
							<input type="number" value={this.state.quantity} onChange={this.handleValue} placeholder="Quantity:"></input>
							<br></br><br></br>
							<Button bsStyle="success" onClick={!this.state.isLoading ? this.buyStocks : null}>{this.state.isLoading ? 'Buying... ' : 'Buy'} {this.state.quantity} of {this.state.symbol}</Button>	
							</form>
                                                     </Modal.Body>          
                                                                 <Modal.Footer>
                                                                                       <Button onClick={this.close}>Close</Button>
                                                                                                 </Modal.Footer>
                                                                                                         </Modal>
 
    </div>
  </div>

     </div>
      
    );
  }

});

export default Grid;
