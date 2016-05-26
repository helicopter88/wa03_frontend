import React from "react";
import Router, { Link, RouteHandler } from "react-router";

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar, Button} from "react-bootstrap";
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
    
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
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

  render: function() {

    return (
        <div id="wrapper" className="content">

          <Navbar brand={<span><a href="http://webapps3.westeurope.cloudapp.azure.com/sb-admin-react/build/#/dashboard" title="Summit Trading" rel="home"><img src="../src/common/img/LsummitLogoViolet.PNG"></img> Summit Trading</a>
		
 
           </span>} fluid={true}  style={ {margin: 0} }>
		
	   <div className="nav navbar-top-links navbar-right">
	     <Nav style={ {margin: 10} }>
              
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
		    <Link to="dashboard.home"><i className="fa fa-briefcase fa-fw"></i> Portfolio </Link>
		  </li>
                  
		  <li>
		    <Link to="dashboard.home"><i className="fa fa-bar-chart-o fa-fw"></i> Review </Link>
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
