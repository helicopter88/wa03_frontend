import React from "react";
import Router, { Link, RouteHandler } from "react-router";

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar, Button, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
import $ from "jquery";
import classNames from "classnames";

var HomePage = React.createClass({
    
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function(){
    
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
    
    sessionStorage.help = 'off';
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true,
      help: 'off'
    };

  },

  toggleMenu: function(){
    if($(".navbar-collapse").hasClass('collapse')){
      $(".navbar-collapse").removeClass('collapse');  
    }
    else{
      $(".navbar-collapse").addClass('collapse');
    }
  },

  toggleHelp: function() {
    if(sessionStorage.help === 'on') {
	sessionStorage.help = 'off';
    } else {
    	sessionStorage.help = 'on';
    }
    this.setState({help: sessionStorage.help});
  },

  displayTip: function(bool, msg) {
    if (bool) {
	return (<Tooltip>  {msg}  </Tooltip>) ;
    } else {
	return (<div></div>);
    }
  },
  

  render: function() {

    return (
        <div id="wrapper" className="content">

          <Navbar brand={<span><a href="http://webapps3.westeurope.cloudapp.azure.com/frontend/build/#/dashboard" title="Summit" rel="home"><img src="../src/common/img/LsummitLogoViolet.PNG"></img> Summit</a>
		
 
           </span>} fluid={true}  style={ {margin: 0} }>
		
	   <div className="nav navbar-top-links navbar-right">
	     <Nav style={ {margin: 10} }>
		<Link to="dashboard.default" onClick={this.toggleHelp} >	
			<Button bsStyle="info" style={{marginRight: 1 + 'em'}}><i className="fa fa-question fa-fw"></i> Tooltips: {this.state.help}</Button>
		</Link>
              
		<Link to="login">
			<Button bsStyle="danger"><i className="fa fa-power-off fa-fw"></i> Logout </Button>
		</Link>
             </Nav>
	   </div>

 
            <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
              <div className="sidebar-nav navbar-collapse">
                
                <ul className="nav in" id="side-menu">
                  <li>
                    <Link to="dashboard.home"><i className="fa fa-home fa-fw"></i> Home </Link>
                  </li>

		  <li>
		    <OverlayTrigger placement="right" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Your portfolio keeps a record of all your instruments, and is also where you can buy more!</strong>)}> 
			    <Link to="dashboard.grid"><i className="fa fa-briefcase fa-fw"></i> Portfolio </Link>
		    </OverlayTrigger>
		  </li>
                  
		  <li>
		    <Link to="dashboard.tables"><i className="fa fa-bar-chart-o fa-fw"></i> Review </Link>
		  </li>
		
		  <li>
		    <Link to="dashboard.home"><i className="fa fa-question fa-fw"></i> Help </Link>
		  </li>
                </ul>

              </div>
            </div>


          </Navbar>

          <div id="page-wrapper" className="page-wrapper" ref="pageWrapper" style={{minHeight: this.state.Height}}>
            <RouteHandler {...this.props} />
          </div>

        </div>

    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
