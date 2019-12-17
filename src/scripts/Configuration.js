import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import {Card, Heading, Image, FormLayout, Link} from '@shopify/polaris';
import Step_1 from '../images/steps/1.png'
import Step_2 from '../images/steps/2.png'
import Step_3 from '../images/steps/3.png'
import Step_4 from '../images/steps/4.png'

class Configuration extends Component {
	
	state = {
	}
	
	componentDidMount(){
		var pc = $('.Polaris-Card__Section');
		pc.eq(8).attr("id","configuration");
	}
	
	render(){
		
		//For the Tour
		var pc = $('.Polaris-Card__Section');
		pc.eq(8).attr("id","configuration");
		return (
			<Card>
				<Card.Section title="Instructions">
					<span style={{fontSize:'1.3rem'}}>Use these steps to add the code to your store and get the app working</span>
					<FormLayout>
						<FormLayout.Group>
							<Heading><br/>1. 
								Go to 
								<Link url="https://www.shopify.com/admin/settings"> Settings</Link>.
								<Image source={Step_1} width="100%"/>
							</Heading>
							<Heading><br/>2. 
								Go to 
								<Link url="https://www.shopify.com/admin/settings/general"> General</Link>.
								<Image source={Step_2} width="100%"/>
							</Heading>
							<Heading><br/>3. 
								Click on Change formatting<Image source={Step_3} width="100%"/>
							</Heading>
							<Heading><br/>4.
								Copy and paste the following.<Image source={Step_4} width="100%"/>
							</Heading>
						</FormLayout.Group>
					</FormLayout>
				</Card.Section>
			</Card>
		);
	};
	
}

export default inject('store')(observer(Configuration));