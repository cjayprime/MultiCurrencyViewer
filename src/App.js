/**
 * Primary page display that utilizes secondary displays to render the app
 * @features Renders Checkout, Code, Currency, Display, Price, Theme
 *
 *
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import { Layout, Page, Banner, FooterHelp, Link, Button as ButtonPolaris, TextStyle } from '@shopify/polaris';

//Scripts
import Currency from './scripts/Currency';
import Theme from './scripts/Theme';
import Checkout from './scripts/Checkout';
import Display from './scripts/Display';
import Configuration from './scripts/Configuration';

//URL
const BASE_URL = (/\.myshopify\.com/.test(window.location.origin) || /\.grey-loft\.com/.test(window.location.origin)) ? 'https://multicurrencyviewer.grey-loft.com/' : 'http://localhost/projects/work/ongoing/newhomesng/multicurrencyviewer/shopify/';
const STATUS = 'development';

class App extends Component {
	
	state = {
		buttonEnabledLoading:'',
		buttonEnabled:true,
		saveButtonLoading:false,
		submitError:'',
		submitStatus:''
	}
	
	constructor(){
		super();
		this.load = this.load.bind(this);
		this.enable = this.enable.bind(this);
		this.submit = this.submit.bind(this);
		this.tour = this.tour.bind(this);
		
		window.MultiCurrencyViewer = {defaultCurrency:""};
	}
	
	componentDidMount(){
		this.load();
	}
	
	render() {
		const store = this.props.store;
		return(
			<Page seperator
			titleMetadata={
				<div>
					<span>Fill the form appropriately, and confirm all entries.</span>
					<br/>
					<div style={{display:'flex'}}>
						<div style={{marginTop:25}}>
							<span>
								The multi currency viewer is <TextStyle variation="strong">{this.state.buttonEnabled ? 'enabled':'disabled'}</TextStyle>.
							</span>
							<span style={{marginLeft:10}}>
								<ButtonPolaris onClick={this.enable} loading={this.state.buttonEnabledLoading} primary={!this.state.buttonEnabled} destructive={this.state.buttonEnabled}>{this.state.buttonEnabled ? 'Disable':'Enable'}</ButtonPolaris>
							</span>
						</div>
						<div style={{marginTop:25,marginLeft:25}}><ButtonPolaris onClick={this.tour}>Tour guide</ButtonPolaris></div>
					</div>
				</div>
			}
			breadcrumbs={[{url:"https://"+store.shopName,content:<div id="redirect"
				onClick={(e)=>{
					e.preventDefault();
					e.stopPropagation();
					window.open("https://"+this.shopname+".myshopify.com");				
				}}>Live View</div>
			}]}
			primaryAction={[{onAction:this.submit,loading:this.state.saveButtonLoading,content:<div className="save-buttons">Save</div>}]}>
				<Layout>
					{
						this.state.submitError
							? 
							<Layout.Section secondary>
								<Banner status={this.state.submitStatus} title={this.state.submitError} onDismiss={() => {this.setState({submitError:''})}} />
							</Layout.Section> 
							: 
							null
					}
					<Layout.AnnotatedSection title="Currency" description="This options control the price the user sees within the page next to the product they refer to; you can use it to round your prices, convert based on a set/automated customers’ location.">
						<Currency/>
					</Layout.AnnotatedSection>
					
					<Layout.AnnotatedSection title="Theme" description="Change what your customers see as pricing when they visit your store, apply styles, hide/show currency code, symbol and flag.">
						<Theme/>
					</Layout.AnnotatedSection>
					
					<Layout.AnnotatedSection title="Display" description="Modify the display of the inline and menu currency.">
						<Display/>
					</Layout.AnnotatedSection>
					
					<Layout.AnnotatedSection title="Checkout" description="Set and style the message your customers see in the cart and checkout pages, use this option to inform customers of the difference in prices and the reasons.">
						<Checkout/>
					</Layout.AnnotatedSection>
					
					<Layout.AnnotatedSection title="Configuration" description="Follow the instructions to get the app working on your storefront, add the code to your Store currency page.">
						<Configuration/>
					</Layout.AnnotatedSection>
					
				</Layout>
				<FooterHelp>
					Contact {' '}
					<Link id="support-contact" url="mailto:support@grey-loft.com?subject=Multi-Currency Viewer" onClick={(e)=>{
						e.preventDefault();
						e.stopPropagation();
						window.open('mailto:support@grey-loft.com?subject=Multi-Currency Viewer');
					}}>
						support
					</Link>
					{' '} for any inquiries
				</FooterHelp>
			</Page>
		);
	};
	
	tour(){
		window.localStorage.removeItem("multiCurrencyViewerTour_end");
		window.localStorage.removeItem("multiCurrencyViewerTour_current_step");
		window.startTour();
	};
	
	load(){
		var that = this;
		$('script').each(function(i){
			if(/\?shop=/.test($(this)[0].src)){
				that.props.store.storeName = $(this)[0].src.split('?shop=')[1];
				return false;
			}
		});
		
		$.ajax({url:BASE_URL+'get.php?shop='+that.props.store.storeName,method:'GET',dataType:"json",success:(response)=>{
			if(typeof response != 'undefined' && typeof response.currency != 'undefined' && typeof response.theme != 'undefined' && typeof response.display != 'undefined' && typeof response.checkout != 'undefined'){
				const store = this.props.store;
				
				store.currency = JSON.parse(response.currency);
				store.currency.error = false;
				
				store.theme = JSON.parse(response.theme);
				store.theme.error = false;
				
				store.display = JSON.parse(response.display);
				store.display.error = false;
				
				store.checkout = JSON.parse(response.checkout);
				store.checkout.error = false;
				
				this.setState({
					buttonEnabled:response.status === 'disabled' ? false : true
				});
			}else this.setState({submitError:'AN ERROR OCCURRED WHILE LOADING THE FORM.',submitStatus:'critical'});
		},error:(xhr)=>{
			this.setState({submitError:'AN ERROR OCCURRED WHILE LOADING THE FORM',submitStatus:'critical'});
		}});
	};
	
	enable(){
		var current = !this.state.buttonEnabled;
		this.setState({buttonEnabledLoading:true});
		$.ajax({url:BASE_URL+'switch.php',data:{status:STATUS,state:current ? 'on' : 'off'},method:'POST',dataType:'json'
			,success:(response)=>{
				var buttonEnabled,submitStatus;
				if(typeof response.success != 'undefined'){
					buttonEnabled = current;
					if(response.success === true)
					submitStatus = 'success';
					if(response.success === false)
					submitStatus = 'critical';
				}else if(typeof response.error != 'undefined'){
					buttonEnabled = false;
					submitStatus = 'critical';
				}
				this.setState({
					buttonEnabled:buttonEnabled,
					buttonEnabledLoading:false,
					submitError:response.text,
					submitStatus:submitStatus
				});
			},
			error:(xhr)=>{
				this.setState({buttonEnabledLoading:false});
			}
		});
	}
	
	submit(){
		const store = this.props.store;
		
		this.setState({saveButtonLoading:true});
		//Make sure there are no errors
		if(store.currency.error === false && store.theme.error === false && store.display.error === false && store.checkout.error === false){
			var storeData = JSON.stringify(store);
			storeData = JSON.parse(storeData);
			
			var data = {};
			data.currency = storeData.currency;
			data.theme = storeData.theme;
			data.display = storeData.display;
			data.checkout = storeData.checkout;
			data.status = STATUS;
			
			delete data.currency.error;
			delete data.theme.error;
			delete data.display.error;
			delete data.checkout.error;
			
			$.ajax({url:BASE_URL+'submit.php',data:data,method:'POST',dataType:'json',processData:true
			,success:(response)=>{
				var submitStatus;
				if(typeof response.success != 'undefined'){
					if(response.success === true)
					submitStatus = 'success';
					if(response.success === false)
					submitStatus = 'critical';
				}else if(typeof response.error != 'undefined'){
					submitStatus = 'critical';
				}
				this.setState({
					saveButtonLoading:false,
					submitError:response.text,
					submitStatus:submitStatus
				});
			},error:(xhr)=>{
				this.setState({saveButtonLoading:false,submitError:'AN ERROR OCCURED WHILE CONNECTING',submitStatus:'critical'});
			}});
		}else{
			var error = '';
			if(store.currency.error === true)
			error = 'CURRENCY';
			if(store.theme.error === true)
			error = 'THEME';
			if(store.display.error === true)
			error = 'DISPLAY';
			if(store.checkout.error === true)
			error = 'CHECKOUT';
			
			this.setState({saveButtonLoading:false,submitError:'CHECK THE '+error+' SECTION FOR ERRORS.',submitStatus:'critical'});
		}
	}
}

export default inject('store')(observer(App));