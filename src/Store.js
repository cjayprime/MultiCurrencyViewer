import {decorate, observable, action} from 'mobx';

class Store {
	
	storeName = '';
	
	symbols = ["Lek"/*,"؋"*/,"$","ƒ","$","₼","$","$","Br","BZ$","$","$b","KM","P","лв","R$","$","៛","$","$","$","¥","$","₡","kn","₱","Kč","kr","RD$","$","£","$","€","£","$","¢","£","Q","£","$","L","$","Ft","kr","","Rp","﷼","£","₪","J$","¥","£","лв","₩","₩","лв","₭","£","$","ден","RM","₨","$","₮","MT","$","₨","ƒ","$","C$","₦","kr","﷼","₨","B/.","Gs","S/.","₱","zł","﷼","lei","₽","£","﷼","Дин.","₨","$","$","S","R","₨","kr","CHF","$","£","NT$","฿","TT$","","$","₴","£","$","$U","лв","Bs","₫","﷼","Z$"];
	
	allCurrencies = ["USD"/*,'AOA'*/,'ARS','BDT','BRL','CAD','CNY','CLP','COP','DKK','DZD','EGP','ETB','GBP','INR','IRR','JPY','MXN','NGN','PHP','PKR','RUB','SDG','TRY','VND','ZAR'];
	
	ratesError = {"USD":""/*,"AOA":""*/,"ARS":"","BDT":"","BRL":"","CAD":"","CNY":"","CLP":"","COP":"","DKK":"","DZD":"","EGP":"","ETB":"","GBP":"","INR":"","IRR":"","JPY":"","MXN":"","NGN":"","PHP":"","PKR":"","RUB":"","SDG":"","TRY":"","VND":"","ZAR":""};
	
	currency = {
		error: false,
		store: 'USD',
		default: 'USD',
		geoLocation: false,
		prices: {
			decimals: 'no',
			defaultCurrency: 'yes',
			rounding: 'default',
		},
		rates:{},
		selected: []
	};
	
	theme = {
		error: false,
		inline: {
			flag: 'yes',
			code: 'no',
			symbol: 'yes',
			dropdown: 'yes',
			color: {
				font: '',
				background: '',
				hover: '',
				border: ''
			},
			flagSize:{
				width: '',
				height: '',
			},
			border:{
				size: '',
				radius: '',
			}
		},
		menu: {
			flag: 'yes',
			code: 'yes',
			symbol: 'yes',
			dropdown: 'yes',
			color: {
				font: '',
				background: '',
				hover: '',
				border: ''
			},
			flagSize:{
				width: '',
				height: '',
			},
			border:{
				size: '',
				radius: '',
			}
		}
	};
	
	display = {
		error: false,
		inline: {
			originalPrices: false
		},
		menu: {
			cssSelector: '',
			position: 'bottomright'
		}
	};
	
	checkout = {
		error: false,
		notification: '',
		color: {
			font: '',
			background: ''
		},
		size:{
			font: '',
			padding: ''
		}
	};
	
	validateQuery(str){
		try {
			document.querySelector(str);
			return true;
		}
		catch(e) {
		}
		return false;
	};
	
	validateCss(str){
		// Detects rgb(255,255,255)
		// /^rgb\s*(\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*)$/i 
		const regexp = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
		if(regexp.test(str)){
			return true;
		}else{
			return false;
		}
	};
}

decorate(Store, {
	storeName: observable,
	allCurrencies: observable,
	ratesError: observable,
	currency: observable,
    theme: observable,
    display: observable,
    checkout: observable,
	
	setDefaultCurrency: action,
	validateQuery: action,
	validateCss: action
})

const store = new Store();

export default store;