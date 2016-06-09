import React, { PropTypes, Component } from 'react';
import {Input, Image, Pagination, Panel, Well, ButtonToolbar, ButtonGroup, Button, PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import Websocket from 'ws';
import Loader from 'react-loader';

var Tables = React.createClass({
  getInitialState: function() {
    return ({
      news: [],
      times: ['1D','5D','1M', '3M', '6M', '1Y', '2Y'],
      time: '1y',
      stocks: [],
      stock: '',
      searchStock: '',
      ws: new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080"),
      loaded: false,
      showNews: 'hidden',
      newsLoaded: false
    });
  },
 
    open: function() {
      this.state.ws.send("db get_owned " + sessionStorage.userName);
    },

    handleMessage: function(event) {
      if(event.data.indexOf("get_owned") > -1) {
      var j = event.data.substring(("get_owned: ").length);
      var list = JSON.parse(j);
      var arr = []; 
      list.map(elem => arr.push(elem.instr));
      this.setState({
        stock: arr[0],
        stocks: arr,
	loaded: true
      });
      this.state.ws.send("news get_news " + arr[0]);
      } else if (event.data.indexOf("get_news") > -1) {
        var list = JSON.parse(event.data.substring("get_news: ".length));
        this.setState({news: list, showNews: 'visible', newsLoaded: true}); 
      }
    },
    componentWillMount: function() {
      this.state.ws.addEventListener('open', this.open);
      this.state.ws.addEventListener('message', this.handleMessage);
     
    },
    
    searchStock: function(e) {
      this.state.ws.send("news get_news " + this.state.stock);
    },

    handleSearch: function(e) {
      e.preventDefault();
      this.setState({stock: e.target.value}, () => {this.state.ws.send("news get_news " + this.state.stock)});
    },

    handleOnClick: function(elem) {
      this.setState({ news: [] });
      this.state.ws.send("news get_news " + elem);
    },

  render: function() {
    var self = this;
    return (

      <div>
	<Loader loaded={this.state.loaded}>
        <div className="col-lg-12"> 
          <PageHeader>Review</PageHeader> 
        </div>
       
        <div className="col-lg-11">        
          <Panel header={<span>Instrument History</span>} >
           <div className="col-lg-2">
             <div>
		<h4>Search for another stock below</h4>
		<form onSubmit={this.searchStock}>
		<Input type="text" style={{marginBottom: 0}} onSubmit={this.searchStock} value={this.state.stock} onChange={this.handleSearch} addonAfter=<i className="fa fa-search"></i> placeholder="Symbol:"></Input>
		</form>
	     </div>
	     <br></br>
	     <h4>Your stocks:</h4>
	     <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer" style={{overflow: 'auto', height: 30 + 'em'}}>
                <ListGroup>
                 {this.state.stocks.map(elem => (<ListGroupItem onClick={ function() {									   
                    self.setState({stock: elem});
                    self.handleOnClick(elem);
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
              <div id="newsBlock" style={{visibility: this.state.showNews}}>
                 <br></br>  
                 <h3> News for {this.state.stock}</h3>
		 <Loader loaded={this.state.newsLoaded}>
                 <div style={{overflow: 'auto', height: 14 + 'em'}}>
                   <ListGroup>
                     {this.state.news.map(elem => <ListGroupItem href={elem.link}> {elem.title} </ListGroupItem>)}
                   </ListGroup>
	         </div>
		 </Loader>
	       </div>
             </div>     
            </Panel>
          </div>
	</Loader>
      </div> 
    );
  }

});

export default Tables;
