import React, { PropTypes, Component } from 'react';
import {Panel, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
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
                <ListGroup>
                            {this.state.elements.map(elem =>
                  <ListGroupItem href="javascript:void(0)">
                   <i className="fa fa-money fa-fw"></i> {elem.instr}
                   <span className="pull-right text-muted small"><em>{elem.amount}   {elem.name} {elem.bp} {elem.ap} </em></span>
                 </ListGroupItem>

                                                       )}
                                    </ListGroup>
            </div>
            <p>Grid classes apply to devices with screen widths greater than or equal to the breakpoint sizes, and override grid classes targeted at smaller devices. Therefore, applying any
              <code>.col-md-</code> class to an element will not only affect its styling on medium devices but also on large devices if a
              <code>.col-lg-</code> class is not present.</p>
          </Panel>

        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">

            <Panel>
              <h3>Example: Stacked-to-horizontal</h3>
              <p>Using a single set of
                <code>.col-md-*</code> grid classes, you can create a default grid system that starts out stacked on mobile devices and tablet devices (the extra small to small range) before becoming horizontal on desktop (medium) devices. Place grid columns in any
                <code>.row</code>.</p>
              <div className="row show-grid">
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
                <div className="col-md-1">.col-md-1</div>
              </div>
              <div className="row show-grid">
                <div className="col-md-8">.col-md-8</div>
                <div className="col-md-4">.col-md-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-md-4">.col-md-4</div>
                <div className="col-md-4">.col-md-4</div>
                <div className="col-md-4">.col-md-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-md-6">.col-md-6</div>
                <div className="col-md-6">.col-md-6</div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3>Example: Mobile and desktop</h3>
              <p>Dont want your columns to simply stack in smaller devices? Use the extra small and medium device grid classes by adding
                <code>.col-xs-*</code>
                <code>.col-md-*</code> to your columns. See the example below for a better idea of how it all works.</p>
              <div className="row show-grid">
                <div className="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
                <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
                <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
                <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-xs-6">.col-xs-6</div>
                <div className="col-xs-6">.col-xs-6</div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3>Example: Mobile, tablet, desktops</h3>
              <p>Build on the previous example by creating even more dynamic and powerful layouts with tablet
                <code>.col-sm-*</code> classes.</p>
              <div className="row show-grid">
                <div className="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
                <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
                <div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
                <div className="clearfix visible-xs"></div>
                <div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3 id="grid-responsive-resets">Responsive column resets</h3>
              <p>With the four tiers of grids available you're bound to run into issues where, at certain breakpoints, your columns don't clear quite right as one is taller than the other. To fix that, use a combination of a
                <code>.clearfix</code> and our <a href="javascript:void(0)">responsive utility classes</a>.</p>
              <div className="row show-grid">
                <div className="col-xs-6 col-sm-3">
                  .col-xs-6 .col-sm-3
                  <br />Resize your viewport or check it out on your phone for an example.
                </div>
                <div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

                <div className="clearfix visible-xs"></div>

                <div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
                <div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3 id="grid-offsetting">Offsetting columns</h3>
              <p>Move columns to the right using
                <code>.col-md-offset-*</code> classes. These classes increase the left margin of a column by
                <code>*</code> columns. For example,
                <code>.col-md-offset-4</code> moves
                <code>.col-md-4</code> over four columns.</p>
              <div className="row show-grid">
                <div className="col-md-4">.col-md-4</div>
                <div className="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
              </div>
              <div className="row show-grid">
                <div className="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
                <div className="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
              </div>
              <div className="row show-grid">
                <div className="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3 id="grid-nesting">Nesting columns</h3>
              <p>To nest your content with the default grid, add a new
                <code>.row</code> and set of
                <code>.col-md-*</code> columns within an existing
                <code>.col-md-*</code> column. Nested rows should include a set of columns that add up to 12.</p>
              <div className="row show-grid">
                <div className="col-md-9">
                  Level 1: .col-md-9
                  <div className="row show-grid">
                    <div className="col-md-6">
                      Level 2: .col-md-6
                    </div>
                    <div className="col-md-6">
                      Level 2: .col-md-6
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <Panel>
              <h3 id="grid-column-ordering">Column ordering</h3>
              <p>Easily change the order of our built-in grid columns with
                <code>.col-md-push-*</code> and
                <code>.col-md-pull-*</code> modifier classes.</p>
              <div className="row show-grid">
                <div className="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
                <div className="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
              </div>
            </Panel>
              
          </div>
        </div>

      </div>
      
    );
  }

});

export default Grid;
