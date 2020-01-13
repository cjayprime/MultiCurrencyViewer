import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import {Card, FormLayout, TextField, Select, RadioButton, TextStyle} from '@shopify/polaris';

class Display extends Component {
	
	state = {
		menuCssSelectorError: ''
	}
	
	componentDidMount(){
		if(this.props.store.display.menu.position === 'static')this.setState({enableCssSelector:true});
		else this.setState({enableCssSelector:false});
	}
	
	render(){
		var store = this.props.store;
		
		if(store.display.inline.originalPrices === 'false')
		store.display.inline.originalPrices = false;
		if(store.display.inline.originalPrices === 'true')
		store.display.inline.originalPrices = true;
		
		//For the Tour
		var pc = $('.Polaris-Card__Section');
		pc.eq(5).attr("id","display-inline");
		pc.eq(6).attr("id","display-menu");
		return (
			<Card>
				<Card.Section title="Inline Currencies and Prices">
					<FormLayout>
						<TextStyle>Show original prices on hover</TextStyle>
						<RadioButton
						  label="No, don't show original prices"
						  helpText="Customers will not be able to see the original prices when they hover above the currency text"
						  checked={store.display.inline.originalPrices === false}
						  name="originalPrices"
						  onChange={()=>{store.display.inline.originalPrices = !store.display.inline.originalPrices}}
						/>
						<RadioButton
						  label="Yes, show original prices"
						  helpText="Customers will see the original prices when they hover above the currency text"
						  name="originalPrices"
						  checked={store.display.inline.originalPrices === true}
						  onChange={()=>{store.display.inline.originalPrices = !store.display.inline.originalPrices}}
						/>
					</FormLayout>
				</Card.Section>
				<Card.Section title="Menu Currencies">
					<FormLayout>
						<FormLayout.Group>
							<Select label="Position" options={[{label:'Static',value:'static'},{label:'Top left corner',value:'topleft'},{label:'Top center corner',value:'topcenter'},{label:'Top right corner',value:'topright'},{label:'Bottom left corner',value:'bottomleft'},{label:'Bottom center corner',value:'bottomcenter'},{label:'Bottom right corner',value:'bottomright'}]} value={store.display.menu.position} 
							onChange={(value) => {
								if(value === 'static')this.setState({enableCssSelector:true});
								else this.setState({enableCssSelector:false});
								store.display.menu.position = value;
							}} />
							{
								!this.state.enableCssSelector
								?
								null
								:
								<TextField label="Css selector for displaying menu" value={store.display.menu.cssSelector}
								error={this.state.menuCssSelectorError}
								onChange={(value)=>{
									store.display.menu.cssSelector = value; 
									if(store.validateQuery(store.display.menu.cssSelector) || store.display.menu.cssSelector === ''){
										store.display.error = false;
										this.setState({menuCssSelectorError:''});
									}else{
										store.display.error = true;
										this.setState({menuCssSelectorError:'Enter only valid css selectors'});
									}
								}}/>
							}
						</FormLayout.Group>
					</FormLayout>
				</Card.Section>
			</Card>
		);
	};
}

export default inject('store')(observer(Display));