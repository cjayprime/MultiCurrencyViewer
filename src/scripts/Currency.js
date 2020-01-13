/*
	selected currencies must have an accompanying rate or the server will return an error 
*/
import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Shopify
import {Card, Button, Subheading, FormLayout, TextField, Select, Stack, Badge, TextStyle, Checkbox, DataTable, Icon, Scrollable, RadioButton} from '@shopify/polaris';

class Currency extends Component {
	
	state = {
		fixedRateError: '',
		searchCurrency: '',
		selectAll: false,
		oldSelected: [],
		rows: [],
		allCheckboxes: [],
		makeDefault: false,
		makeDefaultID: null,
		liveOrFixed: {}
	}
	
	constructor(){
		super();
		this.searchForCurrency = this.searchForCurrency.bind(this);
		this.removeSelectedCurrency = this.removeSelectedCurrency.bind(this);
		this.makeGreen = this.makeGreen.bind(this);
		this.setRate = this.setRate.bind(this);
	}
	
	componentDidMount(){
		this.setState({
			allCheckboxes: this.props.store.allCurrencies,
			liveOrFixed: JSON.parse(JSON.stringify(this.props.store.currency.rates))
		});
	}
	
	currencyNames = {"AOA":"Angolan Kwanza","ALL":"Albania Lek","AFN":"Afghanistan Afghani","ARS":"Argentina Peso","AWG":"Aruba Guilder","AUD":"Australia Dollar","AZN":"Azerbaijan Manat","BDT":"Bangladesh Taka","BSD":"Bahamas Dollar","BBD":"Barbados Dollar","BYN":"Belarus Ruble","BZD":"Belize Dollar","BMD":"Bermuda Dollar","BOB":"Bolivia Bolíviano","BAM":"Bosnia and Herzegovina Convertible Marka","BWP":"Botswana Pula","BGN":"Bulgaria Lev","BRL":"Brazil Real","BND":"Brunei Darussalam Dollar","KHR":"Cambodia Riel","CAD":"Canada Dollar","KYD":"Cayman Islands Dollar","CLP":"Chile Peso","CNY":"China Yuan Renminbi","COP":"Colombia Peso","CRC":"Costa Rica Colon","HRK":"Croatia Kuna","CUP":"Cuba Peso","CZK":"Czech Republic Koruna","DKK":"Denmark Krone","DOP":"Dominican Republic Peso","DZD":"Algerian Dinar","XCD":"East Caribbean Dollar","EGP":"Egypt Pound","SVC":"El Salvador Colon","ETB":"Ethiopian Birr","EUR":"Euro Member Countries","FKP":"Falkland Islands (Malvinas) Pound","FJD":"Fiji Dollar","GHS":"Ghana Cedi","GIP":"Gibraltar Pound","GTQ":"Guatemala Quetzal","GGP":"Guernsey Pound","GYD":"Guyana Dollar","HNL":"Honduras Lempira","HKD":"Hong Kong Dollar","HUF":"Hungary Forint","ISK":"Iceland Krona","INR":"India Rupee","IDR":"Indonesia Rupiah","IRR":"Iran Rial","IMP":"Isle of Man Pound","ILS":"Israel Shekel","JMD":"Jamaica Dollar","JPY":"Japan Yen","JEP":"Jersey Pound","KZT":"Kazakhstan Tenge","KPW":"Korea (North) Won","KRW":"Korea (South) Won","KGS":"Kyrgyzstan Som","LAK":"Laos Kip","LBP":"Lebanon Pound","LRD":"Liberia Dollar","MKD":"Macedonia Denar","MYR":"Malaysia Ringgit","MUR":"Mauritius Rupee","MXN":"Mexico Peso","MNT":"Mongolia Tughrik","MZN":"Mozambique Metical","NAD":"Namibia Dollar","NPR":"Nepal Rupee","ANG":"Netherlands Antilles Guilder","NZD":"New Zealand Dollar","NIO":"Nicaragua Cordoba","NGN":"Nigeria Naira","NOK":"Norway Krone","OMR":"Oman Rial","PKR":"Pakistan Rupee","PAB":"Panama Balboa","PYG":"Paraguay Guarani","PEN":"Peru Sol","PHP":"Philippines Peso","PLN":"Poland Zloty","QAR":"Qatar Riyal","RON":"Romania Leu","RUB":"Russia Ruble","SDG":"Sudanese Pound","SHP":"Saint Helena Pound","SAR":"Saudi Arabia Riyal","RSD":"Serbia Dinar","SCR":"Seychelles Rupee","SGD":"Singapore Dollar","SBD":"Solomon Islands Dollar","SOS":"Somalia Shilling","ZAR":"South Africa Rand","LKR":"Sri Lanka Rupee","SEK":"Sweden Krona","CHF":"Switzerland Franc","SRD":"Suriname Dollar","SYP":"Syria Pound","TWD":"Taiwan New Dollar","THB":"Thailand Baht","TTD":"Trinidad and Tobago Dollar","TRY":"Turkey Lira","TVD":"Tuvalu Dollar","UAH":"Ukraine Hryvnia","GBP":"United Kingdom Pound","USD":"United States Dollar","UYU":"Uruguay Peso","UZS":"Uzbekistan Som","VEF":"Venezuela Bolívar","VND":"Viet Nam Dong","YER":"Yemen Rial","ZWD":"Zimbabwe Dollar"};
	
	render(){
		const store = this.props.store;
		
		window.MultiCurrencyViewer.defaultCurrency = store.currency.default;
		
		if(store.currency.geoLocation === 'true')
		store.currency.geoLocation = true;
		if(store.currency.geoLocation === 'false')
		store.currency.geoLocation = false;
		
		//Selected currency in rows
		var rows = [];
		store.currency.selected.map((v,i,a)=>{
			var code = v;
			return rows.push([
				<this.FlagIcon code={code} width={25} height={25}/>,
				v === store.currency.default ? <span id="selected_default"><Badge>Default</Badge></span> : '',
				this.currencyNames[code],
				code,
				(store.currency.rates[code] ? store.currency.rates[code] : '[LIVE]'),
				<this.DeleteIcon store={store} code={code}/>
			]);
		});
		
		//All currencies
		//Creates the list of currencies and their checboxes
		//Creates the radio buttons for Live and Fixed rates
		var allCheckboxes = [];
		this.state.allCheckboxes.map((v,i,a)=>{
			var checked = false;
			store.currency.selected.map((currency)=>{
				if(currency === v)checked = true;
				return null;
			});
			
			//If rates have been set then it's a fixed rate
			var liveOrFixed = (typeof this.state.liveOrFixed[v] === 'undefined') ? false : this.state.liveOrFixed[v];
			
			//The label, flag, default button, currency name and code
			var label = (<div onClick={(e)=>{
							//For setting default
							store.currency.default = v;
							if(store.currency.selected.indexOf(v) === -1)
							store.currency.selected.push(v)
							if(typeof store.currency.rates[v] === 'undefined')
							this.setRate(v,'');
						}}>
							<this.FlagIcon code={v} width={20} height={20}/>
							{
								v === store.currency.default
								?
								<span id={'default_'+v}><Badge>Default</Badge></span> 
								:
								this.state.makeDefault && this.state.makeDefaultID === v 
									?
									<span id={'make_default'} style={{height:15,width:100,whiteSpace:'pre',display:'none',cursor:'pointer'}}><Badge>Make default</Badge></span> 
									:
									null
							}
							&nbsp;{this.currencyNames[v] +' ('+v+')'}
						</div>);
			
			//Live rate and Fixed rate
			var helpText = (
				<Stack horizontal>
					<RadioButton name={v} checked={liveOrFixed} disabled={!checked}
					onChange={(value)=>{
						var liveOrFixed = this.state.liveOrFixed;
						liveOrFixed[v] = true;
						this.setState({liveOrFixed:liveOrFixed});
						store.currency.error = false;
						this.setRate(v,'');
						store.ratesError[v] = '';
					}}
					label="Live rate"
					/>
					
					<RadioButton name={v} checked={!liveOrFixed} disabled={!checked}
					onChange={(value)=>{
						var liveOrFixed = this.state.liveOrFixed;
						liveOrFixed[v] = false;
						this.setState({liveOrFixed:liveOrFixed});
						store.currency.error = true;
						this.setRate(v,'');
						store.ratesError[v] = 'You cannot leave this field blank';
					}}
					label={
						<TextField disabled={liveOrFixed} error={store.ratesError[v]} 
							placeholder="Fixed rate" value={store.currency.rates[v]} 
							onChange={(value)=>{
								this.setRate(v,value);
								if(/^(\d)+$/.test(value)){
									store.currency.error = false;
									store.ratesError[v] = '';
								}else{
									store.currency.error = true;
									store.ratesError[v] = 'Enter only numbers';
								}
							}}/>}
					/>
				</Stack>
			);
			
			var disabled = (v === store.currency.default) ? true : false;
			return allCheckboxes.push(
				<div key={i} onMouseEnter={()=>{this.setState({makeDefaultID:v,makeDefault:true},()=>{$('#make_default').show(500);});}} onMouseLeave={()=>{$('#make_default').hide(500,()=>{this.setState({makeDefault:false});});}} style={{background:this.state.backgroundColor,width:'100%',height:'100%'}}>
					<Checkbox id={v} disabled={disabled} helpText={helpText} label={label} checked={checked} onChange={(value,id)=>{
						if(value){
							//If rate is fixed and value is empty
							if((typeof this.state.liveOrFixed[v] === 'undefined' || !this.state.liveOrFixed[v]) && (typeof store.currency.rates[v] === 'undefined' || !store.currency.rates[v])){
								store.currency.error = true;
								store.ratesError[v] = 'You cannot leave this field blank';
							}
							store.currency.selected.push(v);
							this.setRate(v,'');
						}else{
							var currencies = [];
							store.currency.selected.map((currency)=>{
								if(currency !== id)currencies.push(currency);
								return null;
							});
							store.currency.selected = currencies;
							delete store.currency.rates[id];
							store.ratesError[id] = '';
						}
					}}/>
				</div>)
		});
		
		this.makeGreen();
		
		//For the Tour
		var pc = $('.Polaris-Card__Section');
		pc.eq(0).attr("id","currency-frontend");
		pc.eq(1).attr("id","currency-location");
		pc.eq(2).attr("id","currency-selections");
		return (
			<Card>
				<Card.Section title="Configure your prices">
					<FormLayout>
						<FormLayout.Group>
							<Select label="Omit decimals" options={[{label:'Yes',value:'yes'},{label:'No',value:'no'}]} value={store.currency.prices.decimals} onChange={(value) => {store.currency.prices.decimals = value}} />
							<Select label="Do nothing for store's default currency" options={[{label:'No',value:'no'},{label:'Yes',value:'yes'}]} value={store.currency.prices.defaultCurrency} onChange={(value) => {store.currency.prices.defaultCurrency = value}} />
							<Select label="Rounding" options={[{label:'Up',value:'up'},{label:'Down',value:'down'},{label:'Default',value:'default'}]} value={store.currency.prices.rounding} onChange={(value) => {store.currency.prices.rounding = value}} />
						</FormLayout.Group>
					</FormLayout>
				</Card.Section>
				 
				<Card.Section>
					<Stack>
						<Stack.Item vertical fill>
							<div style={{marginTop:7.5}}>
								<Subheading>Auto-detect country/location <u>{store.currency.geoLocation ? 'enabled': 'disabled'}</u></Subheading>
							</div>
							<TextStyle variation="subdued">If your user changes currency it will override the geo-location settings</TextStyle>
						</Stack.Item>
						<Stack.Item>
							<Button primary={store.currency.geoLocation} onClick={()=>{
								store.currency.geoLocation = !store.currency.geoLocation;
								store.currency.selected = store.allCurrencies;
								store.currency.selected.map((v)=>{
									if(typeof store.currency.rates[v] === 'undefined' || !store.currency.rates[v])
									this.setRate(v,'');
									return null;
								});
							}}>
								{store.currency.geoLocation ? 'Disable': 'Enable'}
							</Button>
						</Stack.Item>
					</Stack>
				</Card.Section>
				
				<Card.Section title="Select your dropdown's currencies">
					<FormLayout>
						<TextField label="Currencies" placeholder="Enter a currency code or country name" suffix={<Icon source="search"/>} value={this.state.searchCurrency} onChange={this.searchForCurrency}/>
						<TextStyle><Badge>{store.currency.default}</Badge> is your default currency.</TextStyle>
						<span>
							<Button onClick={(value)=>{store.currency.selected = store.allCurrencies;}}>Select all</Button>
							<span style={{marginLeft:10}}><Button plain onClick={(value)=>{store.currency.selected = store.currency.default ? [store.currency.default] : [];}}>Unselect all</Button></span>
						</span>
						<Scrollable shadow style={{height: 250,marginTop:-15}}>
							<div style={{marginLeft:15}}>							
								{
									allCheckboxes
								}
							</div>
						</Scrollable>
					</FormLayout>
				</Card.Section>
				
				<span style={{marginLeft:18}}>
					<TextStyle variation="subdued">Please note that all convertions occur with respect to the United States Dollar (USD).</TextStyle>
				</span>
				<br/>
				<span style={{marginLeft:18,color:'red'}}>
					<TextStyle variation="subdued"><span style={{color:'red'}}>Leave the rate input field empty to use Live Rates from Currency Converter API.</span></TextStyle>
					<br/>
				</span>
				<span style={{marginLeft:18}}>
					<TextStyle variation="subdued"><Badge>{store.currency.store}</Badge> is your store's currency.</TextStyle>
				</span>
				<div id="currency-selected">
					<DataTable
						columnContentTypes={['text','text','numeric','numeric','numeric','numeric']}
						headings={['Flag','','Currency','Code','Rate','Action']}
						sortable={[false, false, false, false, false, false]}
						rows={rows}
						totals={['', '', '', '', '', rows.length]}
						footerContent={"Selected "+rows.length+" out of "+store.allCurrencies.length+" currencies"}
					 />
				 </div>
			</Card>
		);
	};
	
	setRate(currency,value){
		var store = this.props.store;
		var rates = {};
		Object.keys(store.currency.rates).map((old_currency)=>{
			rates[old_currency] = JSON.parse(JSON.stringify(store.currency.rates[old_currency]));
			return null;
		});
		rates[currency] = value;
		store.currency.rates = rates;
	};
	
	makeGreen(){
		setTimeout(()=>{
			var cur = this.state.makeDefaultID ? this.state.makeDefaultID : this.props.store.currency.default;
			$('#selected_default,#default_'+cur).find('.Polaris-Badge')
			.css({backgroundColor:'green',color:'#FFF'});
		},400);
	};
	
	searchForCurrency(value){
		this.setState({searchCurrency:value});
		var reg = RegExp(value,'i');
		var allCheckboxes = [];
		this.props.store.allCurrencies.map((v)=>{
			if(reg.test(v) || reg.test(this.currencyNames[v])){
				allCheckboxes.push(v);
			}
			return null;
		});
		return this.setState({allCheckboxes:allCheckboxes});
	}
	
	removeSelectedCurrency(store,code){
		var selected = [];
		store.currency.selected.map((v)=>{
			if(v !== code){
				selected.push(v);
			}else delete store.currency.rates[v];
			return null;
		});
		store.currency.selected = selected;
	}
	
	DeleteIcon = (props)=>{
			return <div style={{float:'right',cursor:'pointer'}} onClick={()=>{this.removeSelectedCurrency(props.store,props.code)}}><Icon source="delete"/></div>
	};
	
	FlagIcon = (props)=>{
		var src = 'images/countries/'+props.code.toLowerCase()+'.png';
		return <div style={{float:'left'}}><img style={{borderRadius:20,border:"1px solid #d6d6d6"}} width={props.width} height={props.height} src={src} alt=""/></div>;
	}
}

export default inject('store')(observer(Currency));