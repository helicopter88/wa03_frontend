import React, { PropTypes, Component } from 'react';
import {Tooltip, Overlay, OverlayTrigger, Alert, Modal, Input, Panel, PageHeader, ControlLabel, Table, Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import Websocket from 'ws';
import Loader from 'react-loader';



var Grid = React.createClass({
  getInitialState: function() {
    return ({
      tstring: '',
      capital: 0,
      transactions: [],
      changeColor: [],
      showModal: false,
      elements: [],
      buyQuantity: 0,
      quickQuantity: [],
      symbol: "",
      showTransactionAlert: false,
      isLoading: false,
      loaded: false,
      historyOffset: 1,
      pricePreview: 0,
      totalTransactionPrice: 0,
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080/")
    });
  },
  handleSymbol(e) {
        this.setState({ symbol: e.target.value });
        this.state.ws.send("yahoo exists " + e.target.value);	
  },

  handleBuyValue(e) {
	var bq = e.target.value;
	var pPrev = this.state.pricePreview;
	this.setState({ buyQuantity: bq, totalTransactionPrice: bq * pPrev}); 
  },

  handleQuickValue(e, elem) {
    var arr = this.state.quickQuantity;
    arr[elem] = e.target.value;	
    this.setState({ quickQuantity: arr});
  },

  displayTip: function(bool, msg) {
    if (bool) {
	return (<Tooltip> {msg} </Tooltip>);
    } else {
	return (<div></div>);
    } 

  },

    openModal: function() {
      this.setState({ showModal: true});
    },

    close: function() { this.setState({showModal: false});},

    handleMessage: function(event) {
      var length =  sessionStorage.userName.length + 5;
      if(event.data.indexOf("get_owned") > -1) {
        var j = event.data.substring(("get_owned: ").length);
        var list = JSON.parse(j);
	list.map(elem => this.calculateColor(elem.name, elem.yc));
        this.setState({
          isLoading: false,
          elements: list,
	  loaded: true
        });
      } 
      if(event.data.indexOf("exists") > -1) {
        if(event.data.indexOf("true") > -1) {
        	this.state.ws.send("yahoo ask_price " + this.state.symbol);
        } 
      }
      if(event.data.indexOf("ask_price") > -1) {
	var msg = JSON.parse(event.data.substring(10));
	var price = parseFloat(msg.res);
	var bQ = this.state.buyQuantity;
	this.setState({pricePreview: price, totalTransactionPrice: bQ * price});
      }
      if(event.data.indexOf("get_all_trans") > -1) {
        var j = JSON.parse(event.data.substring(("get_all_trans: ").length));
	var hist = this.state.transactions;
	hist = hist.concat(j);
        this.setState({transactions: hist});
      }
      if(event.data.indexOf("insert_trans") > -1) {
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
	  this.setState({ tstring: event.data.substring(("insert_trans: ").length), showModal:false, showTransactionAlert: true});
	  this.state.ws.send("db get_owned " + sessionStorage.userName);
          this.state.ws.send("db get_capital " + sessionStorage.userName);
	  this.state.ws.send("db get_all_trans " + sessionStorage.userName + " " + this.state.historyOffset);
        }
      }
      if(event.data.indexOf("get_capital") > -1) { 
        this.setState({capital: event.data.substring(("get_capital: ").length)});
      }
    },
    
    handleAlertDismiss: function() {
      this.setState({showTransactionAlert: false});

    },

    open: function() {
      this.state.ws.send("db get_capital " + sessionStorage.userName);
      this.state.ws.send("db get_owned " + sessionStorage.userName);
      this.state.ws.send("db get_all_trans " + sessionStorage.userName + " 0");
    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
    },

  buyStocks: function() {
    var quantity = this.state.buyQuantity;
    var symbol = this.state.symbol;
    this.state.ws.send("yahoo exists " + symbol);
    this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + this.state.symbol + " " + this.state.buyQuantity + " t");
    this.state.ws.send("db get_all_trans " + sessionStorage.userName + " 0");
  },

  quick: function(elem, c) {
	this.state.ws.send("db insert_trans " + sessionStorage.userName + " " + elem.instr + " " + this.state.quickQuantity[elem.name] + " " + c);
	this.state.ws.send("db get_all_trans " + sessionStorage.userName + " 0");
  },
  
  renderAlert: function() {
  if (this.state.showTransactionAlert) {
         return (<Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
           <h4>{this.state.tstring}</h4>
           <p><Button onClick={this.handleAlertDismiss}>Dismiss</Button></p></Alert>);

      }
  },

  increaseHistory: function() {
    this.setState({historyOffset: (this.state.historyOffset + 1)});
    this.state.ws.send("db get_all_trans " + sessionStorage.userName + " " + this.state.historyOffset);    
  },

  calculateColor: function(name, change) {
    var newColor = this.state.changeColor;
    if (change.indexOf('+') > -1) {
      newColor[name] = 'green';
    } else if (change.indexOf("-") > -1) {
      newColor[name] = 'red';
    } else {
      newColor[name] = 'orange';
    }
    this.setState({changeColor: newColor});
  },
  
  render: function() {
    var self = this;
    return (

      <div>
	<Loader loaded={this.state.loaded}>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Portfolio  - Your balance is: {this.state.capital}</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
		{self.renderAlert()}

            <Panel>
	<OverlayTrigger placement="left" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Click here to buy more stocks!</strong>)}>
	
              <Col className="pull-right"><Button pullRight bsStyle="primary" onClick={self.openModal} >Buy <i className="fa fa-plus"></i></Button></Col>
	</OverlayTrigger>	

	<OverlayTrigger placement="left" overlay={this.displayTip(sessionStorage.help === 'on', <strong>These are the stocks you currently own</strong>)}>
              <h3>Current holdings</h3>
	</OverlayTrigger>
              <div className="table-responsive" style={{overflow: "auto", height: 16 + 'em'}}>
               
                    <Table striped bordered condensed hover>
              <thead>
            <tr>           
            <th >Instrument</th>

                    <th>Name</th>
                    <th>Amount</th>
                    <th>Avg Price</th>
		    <th>Change from yesterday</th>
                            <th>Bid price</th>
                            <th>Ask Price</th>
			<th>Quick Transaction</th>
            </tr>
            </thead>
            <tbody>
            {this.state.elements.map(elem => <tr>
                <td> 
		  {elem.instr}
		</td>
                <td>
		  {elem.name}
		</td>
		<td>
		  {elem.amount}
		</td>
		<td>
		  {elem.avg}
		</td> 
		<td>
		  <p style={{color: this.state.changeColor[elem.name]}}>
		    {elem.yc}
		  </p>
		</td> 
		<td> 
		  {elem.bp}
		</td>
		<td>
		  {elem.ap}
		</td> 
		
		<td>
		 <input type="number"
			placeholder="0" 
			value={this.state.quickQuantity[elem.name]} 
			onChange={function (e) { self.handleQuickValue(e, elem.name);}}>
		</input>
		<Button bsStyle="danger" bsSize="small" disabled={this.state.isLoading || !this.state.quickQuantity[elem.name]}
		       	style={{marginLeft: 1 + 'em'}}
		        onClick={function() {
				self.setState({isLoading: true});
				self.quick(elem, 'f');
			}}>
		  {self.state.isLoading ? 'Selling...' : 'Sell'} {this.state.quickQuantity[elem.name]} of {elem.instr} @ {elem.bp}
		</Button>
		<Button bsStyle="primary" bsSize="small" disabled={this.state.isLoading || !this.state.quickQuantity[elem.name]}
		       	style={{marginLeft: 1 + 'em'}}
		        onClick={function() {
				self.setState({isLoading: true});
				self.quick(elem, 't');
			}}>
		  {self.state.isLoading ? 'Buying...' : 'Buy'} {this.state.quickQuantity[elem.name]} of {elem.instr} @ {elem.ap}
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
	<OverlayTrigger placement="left" overlay={this.displayTip(sessionStorage.help === 'on', <strong>This displays all your past transactions</strong>)}>

              <h3>Transaction history</h3>
	</OverlayTrigger>
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
                 <td> {elem.amount} </td> <td> {elem.price} </td> <td> {(elem.type.indexOf('t') > -1) ? 'Buy' : 'Sell'} </td> <td> {elem.time.slice(0, elem.time.indexOf('.'))} </td></tr>)} 
            </tbody>
	    </Table>
	    <Button bsStyle="warning" onClick={this.increaseHistory} > Show more transactions</Button>
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
	      <h4>Price preview for {this.state.symbol}:</h4>
	      <p>{this.state.pricePreview}</p>
	      <h4>Quantity below:</h4>
	      <input type="number" value={this.state.buyQuantity} onChange={this.handleBuyValue} placeholder="Quantity:"></input>
	      <br></br>
	      <h4>Total Transaction price:</h4>
	      <p>{this.state.totalTransactionPrice}</p>
	      <br></br>
	
	      <Button bsStyle="primary" onClick={!this.state.isLoading ? this.buyStocks : null}>{this.state.isLoading ? 'Buying... ' : 'Buy'} {this.state.buyQuantity} of {this.state.symbol}</Button>	
	    </form>
                                                     </Modal.Body>          
                                                                 <Modal.Footer>
                                                                                       <Button onClick={this.close}>Close</Button>
                                                                                                 </Modal.Footer>
                                                                                                         </Modal>
 
  </div>
	</Loader>
     </div>
      
    );
  }

});

export default Grid;
