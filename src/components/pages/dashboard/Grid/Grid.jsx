import React, { PropTypes, Component } from 'react';
import {Alert, Modal, Input, Panel, PageHeader, ControlLabel, Table, Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import Websocket from 'ws';

var Grid = React.createClass({
  getInitialState: function() {
    return ({
      tstring: '',
      capital: 0,
      transactions: [],
      showModal: false,
      elements: [],
      buyQuantity: 0,
      quickQuantity: [],
      symbol: "",
      showTransactionAlert: false,
      isLoading: false,
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
    });
  },
  handleSymbol(e) {
        this.setState({ symbol: e.target.value });
  },

  handleBuyValue(e) {
	this.setState({ buyQuantity: e.target.value}); 
  },

  handleQuickValue(e, elem) {
    var arr = this.state.quickQuantity;
    arr[elem] = e.target.value;	
    this.setState({ quickQuantity: arr});
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
        this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + this.state.symbol + " " + price + " " + this.state.buyQuantity + " t"); 
      }
      if(event.data.indexOf("tr_") > -1) {
        var j = JSON.parse(event.data.substring(length));
        this.setState({transactions: j});
      }
      if(event.data.indexOf("it_" + sessionStorage.userName) > -1) {
	
	this.setState({isLoading:false});
        if (event.data.indexOf("-6") > -1) {
	  alert("Negative amount of stocks is not allowed");
        } else if  (event.data.indexOf("-7") > -1) {
          alert("Negative price is not allowed");
        } else if (event.data.indexOf("-3") > -1) {
          alert("Wrong currency");
        } else if (event.data.indexOf("-2") > -1) {
          alert("Not enough capital");
        } else if(event.data.indexOf("-1") > -1) {
          alert("Not enough shares");
        } else {
	  this.setState({ tstring: event.data.substring(length), showModal:false, showTransactionAlert: true});
	  this.state.ws.send("db get_owned " + sessionStorage.userName);
          this.state.ws.send("db get_capital " + sessionStorage.userName);
	}
      }
      if(event.data.indexOf("gc_") > -1) { 
        this.setState({capital: event.data.substring(length)});
      }
    },
    
    handleAlertDismiss: function() {
      this.setState({showTransactionAlert: false});

    },

    open: function() {
      this.state.ws.send("db get_capital " + sessionStorage.userName);
      this.state.ws.send("db get_owned " + sessionStorage.userName);
      this.state.ws.send("db get_all_trans " + sessionStorage.userName);
    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
    },

  buyStocks: function() {
    var quantity = this.state.buyQuantity;
    var symbol = this.state.symbol;
    this.state.ws.send("yahoo exists " + symbol);
    
  },

  quick: function(elem, c) {
	this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + elem.instr + " " + elem.bp + " " + this.state.quickQuantity[elem.name] + " " + c); 
  },
  
  renderAlert: function() {
  if (this.state.showTransactionAlert) {
         return (<Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
           <h4>{this.state.tstring}</h4>
           <p><Button onClick={this.handleAlertDismiss}>Dismiss</Button></p></Alert>);

      }
  },
  
  render: function() {
    var self = this;
    return (

      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Portfolio  - Your current capital is: {this.state.capital}</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
{self.renderAlert()}

            <Panel>
		
              <Col className="pull-right"><Button pullRight bsStyle="primary" onClick={self.openModal} >Buy <i className="fa fa-plus"></i></Button></Col>
              <h3>Current holdings</h3>
              <div className="table-responsive" style={{overflow: "auto", height: 16 + 'em'}}>
               
                    <Table striped bordered condensed hover>
              <thead>
            <tr>           
            <th>Instrument</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Avg Price</th>
                            <th>Bid price</th>
                            <th>Ask Price</th>
			<th>Quick Transaction</th>
            </tr>
            </thead>
            <tbody>
            {this.state.elements.map(elem => <tr>
                 <td> {elem.instr} </td>
                 <td>{elem.name} </td> <td>  {elem.amount} </td> <td>{elem.avg}</td> <td> {elem.bp} </td> <td> {elem.ap} </td> 
		
		<td>
		 <input type="number"
			placeholder="0" 
			value={this.state.quickQuantity[elem.name]} 
			onChange={function (e) { self.handleQuickValue(e, elem.name);}}>
		</input>
		<Button bsStyle="danger" bsSize="small" disabled={this.state.isLoading}
		       	style={{marginLeft: 1 + 'em'}}
		        onClick={function() {
				self.setState({isLoading: true});
				self.quick(elem, 'f');
			}}>
		  {self.state.isLoading ? 'Selling...' : 'Sell'} {this.state.quickQuantity[elem.name]} of {elem.instr}
		</Button>
		<Button bsStyle="primary" bsSize="small" disabled={this.state.isLoading}
		       	style={{marginLeft: 1 + 'em'}}
		        onClick={function() {
				self.setState({isLoading: true});
				self.quick(elem, 't');
			}}>
		  {self.state.isLoading ? 'Buying...' : 'Buy'} {this.state.quickQuantity[elem.name]} of {elem.instr}
		</Button>


		</td>
                 </tr>
                
             )}
         </tbody>
        </Table>
        </div>
        </Panel>
        </div>



          <div className="col-lg-12">

            <Panel>
              <h3>Transaction history</h3>
              <div className="table-responsive" style={{overflow: "auto", height: 16 + 'em'}}>
               
              <Table striped bordered condensed hover>
              <thead>
            <tr>           
            <th>Instrument</th>
                    <th>Amount</th>
                            <th>Price</th>
			<th>Type</th>
                        <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {this.state.transactions.map(elem => <tr>
                 <td> {elem.instr_id} </td>
                 <td>  {elem.amount} </td> <td> {elem.price} </td> <td> {(elem.type.indexOf('t') > -1) ? 'Buy' : 'Sell'} </td> <td> {elem.time.slice(0, elem.time.indexOf('.'))} </td></tr>)} 
            </tbody>
            </Table>
           </div> 

      </Panel>
      </div>




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
							<input type="number" value={this.state.buyQuantity} onChange={this.handleBuyValue} placeholder="Quantity:"></input>
							<br></br><br></br>
							<Button bsStyle="primary" onClick={!this.state.isLoading ? this.buyStocks : null}>{this.state.isLoading ? 'Buying... ' : 'Buy'} {this.state.buyQuantity} of {this.state.symbol}</Button>	
							</form>
                                                     </Modal.Body>          
                                                                 <Modal.Footer>
                                                                                       <Button onClick={this.close}>Close</Button>
                                                                                                 </Modal.Footer>
                                                                                                         </Modal>
 
  </div>

     </div>
      
    );
  }

});

export default Grid;
