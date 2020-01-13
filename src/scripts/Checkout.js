import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import {Card, FormLayout, TextField, Button, Collapsible} from '@shopify/polaris';

class Checkout extends Component {
	
	state = {
		customizeInlineCurrency: false,
		fontColorError:'',
		backgroundColorError:'',
		sizeFontError: '',
		sizePaddingError: '',
	}
	
	render(){
		var store = this.props.store;
		
		//For the Tour
		var pc = $('.Polaris-Card__Section');
		pc.eq(7).attr("id","checkout");
		return (
			<Card>
				<Card.Section title="Checkout Note">
					<FormLayout>
						<FormLayout.Group>
							<TextField label="Checkout currency notification" multiline={3} value={store.checkout.notification} onChange={(value)=>{store.checkout.notification = value}}/>
						</FormLayout.Group>
						<Button plain onClick={()=>{this.setState({customizeInlineCurrency:!this.state.customizeInlineCurrency})}}>Customize</Button>
						<Collapsible open={this.state.customizeInlineCurrency}>
							<FormLayout.Group condensed>
								<TextField label="Font Color" prefix="#" value={store.checkout.color.font}
								error={this.state.fontColorError}
								onChange={(value)=>{
									store.checkout.color.font = value; 
									if(store.validateCss('#'+store.checkout.color.font) || store.checkout.color.font === ''){
										store.checkout.error = false;
										this.setState({fontColorError:''});
									}else{
										store.checkout.error = true;
										this.setState({fontColorError:'Enter a valid css color'});
									}
								}}/>
								<TextField label="Background color" prefix="#" value={store.checkout.color.background}
								error={this.state.backgroundColorError}
								onChange={(value)=>{
									store.checkout.color.background = value; 
									if(store.validateCss('#'+store.checkout.color.background) || store.checkout.color.background === ''){
										store.checkout.error = false;
										this.setState({backgroundColorError:''});
									}else{
										store.checkout.error = true;
										this.setState({backgroundColorError:'Enter a valid css color'});
									}
								}}/>
								<TextField label="Font size" suffix="px" value={store.checkout.size.font}
								error={this.state.sizeFontError}
								onChange={(value)=>{
									store.checkout.size.font = value; 
									if(/^(\d)+$/.test(store.checkout.size.font) || store.checkout.size.font === ''){
										store.checkout.error = false;
										this.setState({sizeFontError:''});
									}else{
										store.checkout.error = true;
										this.setState({sizeFontError:'Enter only numbers'});
									}
								}}/>
								<TextField label="Padding" suffix="px" value={store.checkout.size.padding}
								error={this.state.sizePaddingError}
								onChange={(value)=>{
									store.checkout.size.padding = value; 
									if(/^(\d)+$/.test(store.checkout.size.padding) || store.checkout.size.padding === ''){
										store.checkout.error = false;
										this.setState({sizePaddingError:''});
									}else{
										store.checkout.error = true;
										this.setState({sizePaddingError:'Enter only numbers'});
									}
								}}/>
							</FormLayout.Group>
						</Collapsible>
					</FormLayout>
				</Card.Section>
			</Card>
		);
	};
	
}

export default inject('store')(observer(Checkout));