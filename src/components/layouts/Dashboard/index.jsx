import React from "react";
import Router, { Link, RouteHandler } from "react-router";
import Chat from '../../pages/Chat.jsx';
import {DropdownButton, Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar, Button, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
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
      help: 'off',
      showChat: 'none',
      chat: <div className="col-lg-12"><Chat></Chat></div>
      //ftHeight: '100 px',
    };

  },
  
  toggleChat: function() {
    if (this.state.showChat === 'none') {
      this.setState({showChat: 'initial', ftHeight: '410 px'});
    } else {
      this.setState({showChat: 'none', ftHeight: '100 px'});
    }
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

          <Navbar brand={<span><a href="http://webapps3.westeurope.cloudapp.azure.com/frontend/build/#/dashboard" style={{fontSize: 28 + 'px'}}  title="Summit" rel="home">
		<img src="../src/common/img/LsummitLogoViolet.PNG" ></img> Summit</a> </span>} fluid={true}  style={ {margin: 0} }>
		
	  <div className="nav navbar-top-links navbar-right">
	    <Nav style={{margin:10}} >	
		<NavDropdown title=<i className="fa fa-gear fa-fw"></i> >
		 	<MenuItem onSelect={this.toggleHelp}><i className="fa fa-question fa-fw"></i> Tooltips: {this.state.help}</MenuItem> 
                </NavDropdown> 

		  <Link to="dashboard.forms">
			<Button  bsStyle="success" className="btn-outline"><i className="fa fa-user fa-fw"></i> My Profile</Button>
		  </Link>

		  <Link to="login">
	      		 <Button onClick={function() {sessionStorage.removeItem('userName');}} className="btn-outline" bsStyle="danger"><i className="fa fa-power-off fa-fw"></i> Logout </Button>
		  </Link>


 
             </Nav>
	   </div>

 
            <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
              <div className="sidebar-nav navbar-collapse">
               <br></br> 
                <ul className="nav in" id="side-menu" style={{fontSize: 'large'}}>
                  <li>
                    <Link to="dashboard.home"><i className="fa fa-home fa-fw"></i> Home </Link>
                  </li>

		  <li>
		    <OverlayTrigger placement="right" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Your portfolio keeps a record of all your instruments, and is also where you can buy more!</strong>)}> 
			    <Link to="dashboard.grid"><i className="fa fa-briefcase fa-fw"></i> Portfolio </Link>
		    </OverlayTrigger>
		  </li>
                  
		  <li>
		    <OverlayTrigger placement="right" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Go to review to see how your holdings are faring over time</strong>)}>
			    <Link to="dashboard.tables"><i className="fa fa-bar-chart-o fa-fw"></i> Review </Link>
		    </OverlayTrigger>
		  </li>
		
		  <li>
		    <OverlayTrigger placement="right" overlay={this.displayTip(sessionStorage.help === 'on', <strong>Click here for further help the tooltips don't cover</strong>)}>
			    <Link to="dashboard.typography"><i className="fa fa-question fa-fw"></i> Help </Link>
		    </OverlayTrigger>
		  </li>
		  
	

	
		
                </ul>

              </div>
            </div>





          </Navbar>



          <div id="page-wrapper" className="page-wrapper" ref="pageWrapper" style={{minHeight: this.state.Height}}>
            <RouteHandler {...this.props} />
          </div>
       

	<footer>


	  <div style={{position: 'fixed', bottom: 0, width: 100 + '%', height: this.state.ftHeight }}>
	      <div className="col-lg-6 pull-right">
		<div className="row">
		<div style={{display: this.state.showChat, width: 100 + '%'}} className="pull-right">
		  {this.state.chat}
		</div>
		</div>
		<div className="row" style={{width: 98 + '%'}}>
		<Button bsStyle="info" onClick={this.toggleChat} className="btn-outline btn-circle pull-right btn-xl"> 
		  <i className="fa fa-comments"></i>
                </Button> 
		</div>
	      </div>

	   </div>

	</footer>


        </div>

    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
