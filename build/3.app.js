webpackJsonp([3],{344:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(1),l=s(n),o=a(24),r=a(127),c=(s(r),l["default"].createClass({displayName:"Tables",getInitialState:function(){return{stocks:[],stock:"",ws:new WebSocket("ws://webapps3.westeurope.cloudapp.azure.com:8080")}},open:function(){console.log("Hello"),this.state.ws.send("db get_owned "+sessionStorage.userName)},handleMessage:function(e){console.log(e.data);var t=e.data.substring(sessionStorage.userName.length+5),a=JSON.parse(t),s=[];a.map(function(e){return s.push(e.instr)}),this.setState({stocks:s})},componentWillMount:function(){this.state.ws.addEventListener("open",this.open),this.state.ws.addEventListener("message",this.handleMessage)},render:function(){var e=this;return l["default"].createElement("div",null,l["default"].createElement("div",{className:"col-lg-12"},l["default"].createElement(o.PageHeader,null,"Review")),l["default"].createElement("div",{className:"col-lg-12"},l["default"].createElement(o.Panel,{header:l["default"].createElement("span",null,"Instrument History")},l["default"].createElement("div",{className:"col-lg-3"},l["default"].createElement("div",{id:"dataTables-example_wrapper",className:"dataTables_wrapper form-inline dt-bootstrap no-footer"},l["default"].createElement(o.ListGroup,null,this.state.stocks.map(function(t){return l["default"].createElement(o.ListGroupItem,{onClick:function(){e.setState({stock:t})}}," ",t," ")})))),l["default"].createElement("div",{className:"col-lg-9"},l["default"].createElement("img",{src:"https://chart.finance.yahoo.com/z?s="+this.state.stock+"&t=1y&q=&l=&z=l&a=v&p=s"})))))}}));t["default"]=c,e.exports=t["default"]}});