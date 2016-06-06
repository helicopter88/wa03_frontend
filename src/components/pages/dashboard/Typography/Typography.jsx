import React, { PropTypes, Component } from 'react';
import {Accordion, Panel, PageHeader} from 'react-bootstrap';

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


              <Accordion>
                <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">How do I change my username or password?</a>
                                </h4>}  eventKey="1">
		You just have to go into “My profile” and any setting you want can be found there!

                </Panel>
                <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">How do I turn the tooltips on?</a>
                                </h4>}  eventKey="2">
		You can find the option to toggle tooltips in the top right corner, by clicking on the cog!

                </Panel>
                <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">How can I find a past transaction?</a>
                                </h4>}  eventKey="3">
	Head over to your “Portfolio” page and you will have a section with all your past transactions called transaction history.


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Where can I see a complete leaderboard?</a>
                                </h4>}  eventKey="4">
	You would only be able to see a complete leaderboard if you followed every player of the game. Follows cost £10 because they enable you to see the profit of other people.



                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">How do I switch between different types of graphs in the review section?
</a>
                                </h4>}  eventKey="5">
	On the right of the list of instruments (to the left of the graph) there are several options (D = days, M = months, Y = years)


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">How do I delete my account?</a>
                                </h4>}  eventKey="6">
	Head over to “My profile” and in the settings area you have the choices to reset your profile or completely delete your account. None of these operations can be undone!


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What is the leaderboard?
				
				  </a>
                                </h4>}  eventKey="7">
	The leaderboard is the place where you can see how your friends fare against you. You can only see their profit and how well they are doing in comparison to you. The leaderboard only shows people you follow. 



                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What is the follow for? How do I use it?
				
				  </a>
                                </h4>}  eventKey="8">
	Follows are directly related to the leaderboard. If you follow someone, they show up on your leaderboard. Following someone costs £10 and if someone follows you, you earn £10. Just click on the follow button and input your friends’ usernames. 


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What exactly is my Net Asset Value (NAV)?
				
				  </a>
                                </h4>}  eventKey="9">
	Your Net Asset Value is the value of your assets minus the value of your liabilities. To make it easier to understand, this value is calculated by adding up your initial capital with your realized and unrealized profits and losses!


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	Why is my current capital different than my Net Asset Value?
				
				  </a>
                                </h4>}  eventKey="10">
	Your current capital will be different than your Net Asset Value when you start investing. Since your NAV takes into account your profits and losses, it is a better way to gauge what you own – both as money and shares. Your current capital represents your liquid assets – the cash you can still use to invest in different stocks.


                </Panel>
         <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	Why is my profit negative?
				
				  </a>
                                </h4>}  eventKey="11">
	Your profit is negative if you have sold your shares for less than what you bought them for. This can happen if a particular stock starts dropping in price quite abruptly and you decide it is not worth having shares in it anymore. Sometimes, cutting your losses short is the better thing to do!


                </Panel>
          <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What is my unrealized P&L?
				
				  </a>
                                </h4>}  eventKey="12">
	Your unrealized P&L represents the amount you would earn or lose if you were to sell all the shares you own in this moment. The moment you liquidize your shares, the unrealized profit and losses become part of your profit (which can be negative).


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What is my profit?
				
				  </a>
                                </h4>}  eventKey="13">
	Your profit is the amount you earned by selling the shares you had. It can be positive (which means you made money) when you sell for more than the price you paid when you bought them or it can be negative (you lost money) when the sell price is smaller than the buy price.


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	Why is the bid price different than the ask price?
				
				  </a>
                                </h4>}  eventKey="14">
	The ask price represents the amount you would pay to buy one share of that particular instrument. The bid price represents the amount you would pay to sell one share of that particular instrument. The spread between the two prices is usually bigger for stocks with low volumes, although it can happen anyway in times of high volatility.


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	How do prices fluctuate on a daily basis?
				
				  </a>
                                </h4>}  eventKey="15">
	It is impossible to say. People have jobs that are related to the analysis and prediction of market prices, but the stock market is volatile nevertheless. 


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	When should I buy/sell my stocks?
				
				  </a>
                                </h4>}  eventKey="16">
	Ideally, to make a profit you should buy stocks when they are cheap and sell them when they are expensive. However, we don’t live in an ideal world so there is almost no way to fully predict when these times will happen. Study the charts in the review section and read our news section and maybe you will get inspired!


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	I made an unprofitable transaction in the past. Can I change or delete it?
				
				  </a>
                                </h4>}  eventKey="17">
	Just as in the real world, undoing a bad transaction is not a possibility. If you bought some shares for a more expensive price than the current one, this should serve you as a lesson in the financial world – nothing is stable and brokers do just this: they try to avoid losing you money by finding perfect times to invest. Although you might not have a lot of experience, our application will help you understand how they do it in a very short time, especially by trial and error. After all, you’ve got nothing to lose!


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What are the review graphs?
				
				  </a>
                                </h4>}  eventKey="18">
	The review graphs are graphical descriptions of how the price fluctuated across different time periods that you can choose. These can be very helpful to understand how a certain stock is performing or whether it is time to buy or sell a particular instrument.


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	How do I use the review graphs to increase my profit?
				
				  </a>
                                </h4>}  eventKey="19">
	Try to find patterns in the graphs and correlate them to the financial news! It is often very hard to do this and this is why people are paid very large sums of money to do it!


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	I am ready to switch to the real-world version. What do I do?
				
				  </a>
                                </h4>}  eventKey="20">
	You should look into several FCA approved applications that are very similar to our own. We recommend checking out…


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
	What happens if I lose all my money?
				
				  </a>
                                </h4>}  eventKey="21">
	Unlike in the real world, losing all your money is not a reason to despair. It can be solved by resetting your account, making a new one (maybe with a different initial capital) or contacting us – we will make sure your account will be back to the state you wanted it to be. Next time be more careful what you invest in!


                </Panel>
  <Panel header={<h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
			Why is my Unrealised P & L negative?		
				  </a>
                                </h4>}  eventKey="22">

This can happen shorty after you buy a share or if its price has not risen. Since the ask (buying) price is higher than the bid (selling) price, you should hope for the share bid price to rise above the ask price you bought the share for to make some profits.
                </Panel>
             </Accordion>

            </Panel>
          </div>
	
        </div>
      </div>
      
    );
  }

});

export default Typography;
