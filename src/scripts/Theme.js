import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import {Card, Select, FormLayout, Button, Collapsible, TextField} from '@shopify/polaris';

class Theme extends Component {
	
	state = {
		customizeInlineCurrency: false,
		customizeMenuCurrency: false,
		inlineFontColorError: '',
		inlineBackgroundColorError: '',
		inlineHoverColorError: '',
		inlineBorderColorError: '',
		inlineFlagWidthError: '',
		inlineFlagHeightError: '',
		inlineBorderSizeError: '',
		inlineBorderRadiusError: '',
		menuFontColorError: '',
		menuBackgroundColorError: '',
		menuHoverColorError: '',
		menuBorderColorError: '',
		menuFlagWidthError: '',
		menuFlagHeightError: '',
		menuBorderSizeError: '',
		menuBorderRadiusError: '',
	}
	
	render(){
		const store = this.props.store;
		
		//For the Tour
		var pc = $('.Polaris-Card__Section');
		pc.eq(3).attr("id","theme-inline");
		pc.eq(4).attr("id","theme-menu");
		return (
			<Card>
				<Card.Section title="Inline Currencies and Prices">
					<FormLayout>
						<FormLayout.Group>
							<Select label="Show country flag" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.inline.flag} onChange={(value) => {store.theme.inline.flag = value;}} />
							<Select label="Show dropdown of currencies" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.inline.dropdown} onChange={(value) => {store.theme.inline.dropdown = value;}} />
							<Select label="Show currency code" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.inline.code} onChange={(value) => {store.theme.inline.code = value;}} />
							<Select label="Show currency symbol" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.inline.symbol} onChange={(value) => {store.theme.inline.symbol = value;}} />
						</FormLayout.Group>
						<Button plain onClick={()=>{this.setState({customizeInlineCurrency:!this.state.customizeInlineCurrency})}}>Customize</Button>
						<Collapsible open={this.state.customizeInlineCurrency}>
							<FormLayout.Group condensed>
								<TextField label="Font color" prefix="#" value={store.theme.inline.color.font}
								error={this.state.inlineFontColorError}
								onChange={(value)=>{
									store.theme.inline.color.font = value; 
									if(store.validateCss('#'+store.theme.inline.color.font) || store.theme.inline.color.font === ''){
										store.theme.error = false;
										this.setState({inlineFontColorError:''});
									}else{
										store.theme.error = true;
										this.setState({inlineFontColorError:'Enter a valid css color'});
									}
								}}
								/>
								
								<TextField label="Background color" prefix="#" value={store.theme.inline.color.background}
								error={this.state.inlineBackgroundColorError}
								onChange={(value)=>{
									store.theme.inline.color.background = value; 
									if(store.validateCss('#'+store.theme.inline.color.background) || store.theme.inline.color.background === ''){
										store.theme.error = false;
										this.setState({inlineBackgroundColorError:''});
									}else{
										store.theme.error = true;
										this.setState({inlineBackgroundColorError:'Enter a valid css color'});
									}
								}}/>
								
								<TextField label="Hover color" prefix="#" value={store.theme.inline.color.hover}
								error={this.state.inlineHoverColorError}
								onChange={(value)=>{
									store.theme.inline.color.hover = value; 
									if(store.validateCss('#'+store.theme.inline.color.hover) || store.theme.inline.color.hover === ''){
										store.theme.error = false;
										this.setState({inlineHoverColorError:''});
									}else{
										store.theme.error = true;
										this.setState({inlineHoverColorError:'Enter a valid css color'});
									}
								}}/>
								
								<TextField label="Border color" prefix="#" value={store.theme.inline.color.border}
								error={this.state.inlineBorderColorError}
								onChange={(value)=>{
									store.theme.inline.color.border = value; 
									if(store.validateCss('#'+store.theme.inline.color.border) || store.theme.inline.color.border === ''){
										store.theme.error = false;
										this.setState({inlineBorderColorError:''});
									}else{
										store.theme.error = true;
										this.setState({inlineBorderColorError:'Enter a valid css color'});
									}
								}}/>
							</FormLayout.Group>
							<FormLayout.Group condensed>
								<TextField label="Flag width" suffix="px" value={store.theme.inline.flagSize.width}
								error={this.state.inlineFlagWidthError}
								onChange={(value)=>{
									store.theme.inline.flagSize.width = value; 
									if(/^(\d)+$/.test(store.theme.inline.flagSize.width) || store.theme.inline.flagSize.width === ''){
										store.checkout.error = false;
										this.setState({inlineFlagWidthError:''});
									}else{
										store.checkout.error = true;
										this.setState({inlineFlagWidthError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Flag height" suffix="px" value={store.theme.inline.flagSize.height}
								error={this.state.inlineFlagHeightError}
								onChange={(value)=>{
									store.theme.inline.flagSize.height = value; 
									if(/^(\d)+$/.test(store.theme.inline.flagSize.height) || store.theme.inline.flagSize.height === ''){
										store.checkout.error = false;
										this.setState({inlineFlagHeightError:''});
									}else{
										store.checkout.error = true;
										this.setState({inlineFlagHeightError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Border size" suffix="px" value={store.theme.inline.border.size}
								error={this.state.inlineBorderSizeError}
								onChange={(value)=>{
									store.theme.inline.border.size = value; 
									if(/^(\d)+$/.test(store.theme.inline.border.size) || store.theme.inline.border.size === ''){
										store.checkout.error = false;
										this.setState({inlineBorderSizeError:''});
									}else{
										store.checkout.error = true;
										this.setState({inlineBorderSizeError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Border radius" suffix="px" value={store.theme.inline.border.radius}
								error={this.state.inlineBorderRadiusError}
								onChange={(value)=>{
									store.theme.inline.border.radius = value; 
									if(/^(\d)+$/.test(store.theme.inline.border.radius) || store.theme.inline.border.radius === ''){
										store.checkout.error = false;
										this.setState({inlineBorderRadiusError:''});
									}else{
										store.checkout.error = true;
										this.setState({inlineBorderRadiusError:'Enter only numbers'});
									}
								}}/>
							</FormLayout.Group>
						</Collapsible>
					</FormLayout>
				</Card.Section>
				<Card.Section title="Menu Currencies">
					<FormLayout>
						<FormLayout.Group>
							<Select label="Show country flag" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.menu.flag} onChange={(value) => {store.theme.menu.flag = value;}} />
							<Select label="Show dropdown of currencies" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.menu.dropdown} onChange={(value) => {store.theme.menu.dropdown = value;}} />
							<Select label="Show currency code" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.menu.code} onChange={(value) => {store.theme.menu.code = value;}} />
							<Select label="Show currency symbol" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.theme.menu.symbol} onChange={(value) => {store.theme.menu.symbol = value;}} />
						</FormLayout.Group>
						<Button plain onClick={()=>{this.setState({customizeMenuCurrency:!this.state.customizeMenuCurrency})}}>Customize</Button>
						<Collapsible open={this.state.customizeMenuCurrency}>
							<FormLayout.Group condensed>
								<TextField label="Font color" prefix="#" value={store.theme.menu.color.font}
								error={this.state.menuFontColorError}
								onChange={(value)=>{
									store.theme.menu.color.font = value; 
									if(store.validateCss('#'+store.theme.menu.color.font) || store.theme.menu.color.font === ''){
										store.theme.error = false;
										this.setState({menuFontColorError:''});
									}else{
										store.theme.error = true;
										this.setState({menuFontColorError:'Enter a valid css color'});
									}
								}}
								/>
								
								<TextField label="Background color" prefix="#" value={store.theme.menu.color.background}
								error={this.state.menuBackgroundColorError}
								onChange={(value)=>{
									store.theme.menu.color.background = value; 
									if(store.validateCss('#'+store.theme.menu.color.background) || store.theme.menu.color.background === ''){
										store.theme.error = false;
										this.setState({menuBackgroundColorError:''});
									}else{
										store.theme.error = true;
										this.setState({menuBackgroundColorError:'Enter a valid css color'});
									}
								}}/>
								
								<TextField label="Hover color" prefix="#" value={store.theme.menu.color.hover}
								error={this.state.menuHoverColorError}
								onChange={(value)=>{
									store.theme.menu.color.hover = value; 
									if(store.validateCss('#'+store.theme.menu.color.hover) || store.theme.menu.color.hover === ''){
										store.theme.error = false;
										this.setState({menuHoverColorError:''});
									}else{
										store.theme.error = true;
										this.setState({menuHoverColorError:'Enter a valid css color'});
									}
								}}/>
								
								<TextField label="Border color" prefix="#" value={store.theme.menu.color.border}
								error={this.state.menuBorderColorError}
								onChange={(value)=>{
									store.theme.menu.color.border = value; 
									if(store.validateCss('#'+store.theme.menu.color.border) || store.theme.menu.color.border === ''){
										store.theme.error = false;
										this.setState({menuBorderColorError:''});
									}else{
										store.theme.error = true;
										this.setState({menuBorderColorError:'Enter a valid css color'});
									}
								}}/>
							</FormLayout.Group>
							<FormLayout.Group condensed>
								<TextField label="Flag width" suffix="px" value={store.theme.menu.flagSize.width}
								error={this.state.menuFlagWidthError}
								onChange={(value)=>{
									store.theme.menu.flagSize.width = value; 
									if(/^(\d)+$/.test(store.theme.menu.flagSize.width) || store.theme.menu.flagSize.width === ''){
										store.checkout.error = false;
										this.setState({menuFlagWidthError:''});
									}else{
										store.checkout.error = true;
										this.setState({menuFlagWidthError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Flag height" suffix="px" value={store.theme.menu.flagSize.height}
								error={this.state.menuFlagHeightError}
								onChange={(value)=>{
									store.theme.menu.flagSize.height = value; 
									if(/^(\d)+$/.test(store.theme.menu.flagSize.height) || store.theme.menu.flagSize.height === ''){
										store.checkout.error = false;
										this.setState({menuFlagHeightError:''});
									}else{
										store.checkout.error = true;
										this.setState({menuFlagHeightError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Border size" suffix="px" value={store.theme.menu.border.size}
								error={this.state.menuBorderSizeError}
								onChange={(value)=>{
									store.theme.menu.border.size = value; 
									if(/^(\d)+$/.test(store.theme.menu.border.size) || store.theme.menu.border.size === ''){
										store.checkout.error = false;
										this.setState({menuBorderSizeError:''});
									}else{
										store.checkout.error = true;
										this.setState({menuBorderSizeError:'Enter only numbers'});
									}
								}}/>
								
								<TextField label="Border radius" suffix="px" value={store.theme.menu.border.radius}
								error={this.state.menuBorderRadiusError}
								onChange={(value)=>{
									store.theme.menu.border.radius = value; 
									if(/^(\d)+$/.test(store.theme.menu.border.radius) || store.theme.menu.border.radius === ''){
										store.checkout.error = false;
										this.setState({menuBorderRadiusError:''});
									}else{
										store.checkout.error = true;
										this.setState({menuBorderRadiusError:'Enter only numbers'});
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

export default inject('store')(observer(Theme));