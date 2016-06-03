import React, { PropTypes, Component } from 'react';
import {Panel, PageHeader} from 'react-bootstrap';

var Typography = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Help</PageHeader>
          </div>
        </div>
      
        <div className="row">
          <div className="col-lg-12">
            <Panel header={<span>FAQ</span>} >
		

              <h2>
                <small><strong><em>Why is my Unrealised P & L negative?</em></strong></small>
              </h2>
	      <p> This can happen shorty after you buy a share or if its price has not risen. Since the ask (buying) price is higher than the bid (selling) price, you should hope for the share bid price to rise above the ask price you bought the share for to make some profits.</p>

            </Panel>
          </div>
	
        </div>
      </div>
      
    );
  }

});

export default Typography;
