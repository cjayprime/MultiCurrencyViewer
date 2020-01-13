$(document).ready(function(e){
	/*
	For rates: 	https://free.currencyconverterapi.com/api/v6/convert?q=USD_'+quote+'&compact=ultra
	For geoLocation:  http://www.geoplugin.net/javascript.gp
	Alternative: http://freegeoip.net/json/
	*/
	//URL
	const BASE_URL = (/\.myshopify\.com/.test(window.location.origin) || /\.grey-loft\.com/.test(window.location.origin)) ? 'https://multicurrencyviewer.grey-loft.com/' : 'http://localhost/projects/work/ongoing/newhomesng/multicurrencyviewer/shopify/';
	
	MultiCurrencyViewer = function(){
		
		var MultiCurrencyViewer = this;
		
		this.H = $(window).height();
		
		this.W = $(window).width();
		
		/*The color of the border of the dropdown*/
		this.defaultColor = '#000';
		
		this.reverseSymbol = {"Lek":"ALL","؋":"AFN","$":"USD","ƒ":"ANG","₼":"AZN","Br":"BYN","BZ$":"BZD","$b":"BOB","KM":"BAM","P":"BWP","лв":"UZS","R$":"BRL","៛":"KHR","¥":"JPY","₡":"CRC","kn":"HRK","₱":"PHP","Kč":"CZK","kr":"SEK","RD$":"DOP","£":"GBP","€":"EUR","¢":"GHS","Q":"GTQ","L":"HNL","Ft":"HUF","":"TRY","₹":"IDR","﷼":"YER","₪":"ILS","J$":"JMD","₩":"KRW","₭":"LAK","ден":"MKD","RM":"MYR","₨":"LKR","₮":"MNT","MT":"MZN","C$":"NIO","₦":"NGN","B/.":"PAB","Gs":"PYG","S/.":"PEN","zł":"PLN","lei":"RON","₽":"RUB","Дин.":"RSD","S":"SOS","R":"ZAR","CHF":"CHF","NT$":"TWD","฿":"THB","TT$":"TTD","₴":"UAH","$U":"UYU","Bs":"VEF","₫":"VND","Z$":"ZWD"};
		
		this.symbol = {"ALL":"Lek","AFN":"؋","ARS":"$","AWG":"ƒ","AUD":"$","AZN":"₼","BSD":"$","BBD":"$","BYN":"Br","BZD":"BZ$","BMD":"$","BOB":"$b","BAM":"KM","BWP":"P","BGN":"лв","BRL":"R$","BND":"$","KHR":"៛","CAD":"$","KYD":"$","CLP":"$","CNY":"¥","COP":"$","CRC":"₡","HRK":"kn","CUP":"₱","CZK":"Kč","DKK":"kr","DOP":"RD$","XCD":"$","EGP":"£","SVC":"$","EUR":"€","FKP":"£","FJD":"$","GHS":"¢","GIP":"£","GTQ":"Q","GGP":"£","GYD":"$","HNL":"L","HKD":"$","HUF":"Ft","ISK":"kr","INR":"₹","IRR":"﷼","IMP":"£","ILS":"₪","JMD":"J$","JPY":"¥","JEP":"£","KZT":"лв","KPW":"₩","KRW":"₩","KGS":"лв","LAK":"₭","LBP":"£","LRD":"$","MKD":"ден","MYR":"RM","MUR":"₨","MXN":"$","MNT":"₮","MZN":"MT","NAD":"$","NPR":"₨","ANG":"ƒ","NZD":"$","NIO":"C$","NGN":"₦","NOK":"kr","OMR":"﷼","PKR":"₨","PAB":"B/.","PYG":"Gs","PEN":"S/.","PHP":"₱","PLN":"zł","QAR":"﷼","RON":"lei","RUB":"₽","SHP":"£","SAR":"﷼","RSD":"Дин.","SCR":"₨","SGD":"$","SBD":"$","SOS":"S","ZAR":"R","LKR":"₨","SEK":"kr","CHF":"CHF","SRD":"$","SYP":"£","TWD":"NT$","THB":"฿","TTD":"TT$","TRY":"","TVD":"$","UAH":"₴","GBP":"£","USD":"$","UYU":"$U","UZS":"лв","VEF":"Bs","VND":"₫","YER":"﷼","ZWD":"Z$"}

		this.country = ["Albania Lek","Afghanistan Afghani","Argentina Peso","Aruba Guilder","Australia Dollar","Azerbaijan Manat","Bahamas Dollar","Barbados Dollar","Belarus Ruble","Belize Dollar","Bermuda Dollar","Bolivia Bolíviano","Bosnia and Herzegovina Convertible Marka","Botswana Pula","Bulgaria Lev","Brazil Real","Brunei Darussalam Dollar","Cambodia Riel","Canada Dollar","Cayman Islands Dollar","Chile Peso","China Yuan Renminbi","Colombia Peso","Costa Rica Colon","Croatia Kuna","Cuba Peso","Czech Republic Koruna","Denmark Krone","Dominican Republic Peso","East Caribbean Dollar","Egypt Pound","El Salvador Colon","Euro Member Countries","Falkland Islands (Malvinas) Pound","Fiji Dollar","Ghana Cedi","Gibraltar Pound","Guatemala Quetzal","Guernsey Pound","Guyana Dollar","Honduras Lempira","Hong Kong Dollar","Hungary Forint","Iceland Krona","India Rupee","Indonesia Rupiah","Iran Rial","Isle of Man Pound","Israel Shekel","Jamaica Dollar","Japan Yen","Jersey Pound","Kazakhstan Tenge","Korea (North) Won","Korea (South) Won","Kyrgyzstan Som","Laos Kip","Lebanon Pound","Liberia Dollar","Macedonia Denar","Malaysia Ringgit","Mauritius Rupee","Mexico Peso","Mongolia Tughrik","Mozambique Metical","Namibia Dollar","Nepal Rupee","Netherlands Antilles Guilder","New Zealand Dollar","Nicaragua Cordoba","Nigeria Naira","Norway Krone","Oman Rial","Pakistan Rupee","Panama Balboa","Paraguay Guarani","Peru Sol","Philippines Peso","Poland Zloty","Qatar Riyal","Romania Leu","Russia Ruble","Saint Helena Pound","Saudi Arabia Riyal","Serbia Dinar","Seychelles Rupee","Singapore Dollar","Solomon Islands Dollar","Somalia Shilling","South Africa Rand","Sri Lanka Rupee","Sweden Krona","Switzerland Franc","Suriname Dollar","Syria Pound","Taiwan New Dollar","Thailand Baht","Trinidad and Tobago Dollar","Turkey Lira","Tuvalu Dollar","Ukraine Hryvnia","United Kingdom Pound","United States Dollar","Uruguay Peso","Uzbekistan Som","Venezuela Bolívar","Viet Nam Dong","Yemen Rial","Zimbabwe Dollar"];

		this.code = ["ALL","AFN","ARS","AWG","AUD","AZN","BSD","BBD","BYN","BZD","BMD","BOB","BAM","BWP","BGN","BRL","BND","KHR","CAD","KYD","CLP","CNY","COP","CRC","HRK","CUP","CZK","DKK","DOP","XCD","EGP","SVC","EUR","FKP","FJD","GHS","GIP","GTQ","GGP","GYD","HNL","HKD","HUF","ISK","INR","IRR","IMP","ILS","JMD","JPY","JEP","KZT","KPW","KRW","KGS","LAK","LBP","LRD","MKD","MYR","MUR","MXN","MNT","MZN","NAD","NPR","ANG","NZD","NIO","NGN","NOK","OMR","PKR","PAB","PYG","PEN","PHP","PLN","QAR","RON","RUB","SHP","SAR","RSD","SCR","SGD","SBD","SOS","ZAR","LKR","SEK","CHF","SRD","SYP","TWD","THB","TTD","TRY","TVD","UAH","GBP","USD","UYU","UZS","VEF","VND","YER","ZWD"];
		
		this.currencies = ['USD'];
		
		this.currentTarget = null;
		
		this.element = {menu: null,inline: null};
		
		/*Whether or not there is a dropdown set for menu or inline*/
		this.elementList = {menu: true,inline: true};
		
		this.preciseRound = function(num, dec, direction){
			
			var num = parseFloat(num);
			
			var callback = Math.round;
			if(direction == 'up')callback = Math.ceil;
			if(direction == 'down')callback = Math.floor;
			
			if ((typeof num !== 'number') || (typeof dec !== 'number')) 
			return false; 
			
			var num_sign = num >= 0 ? 1 : -1;
			
			return (callback((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
			
		}
		
		this.geoLocationCurrencyCode = function(){
			return window.geoplugin_currencyCode();
		}
		
		this.setCurrencies = function(currencies){
			var list = $('#multicurrencyviewer-list');
			list.html('');
			currencies.map(function(v){
				var code = v;
				list.append(
					'<div class="multicurrencyviewer-item multicurrencyviewer-item-'+code+'" data-code="'+code+'">'+
						'<div class="multicurrencyviewer-flag"><img src="'+BASE_URL+'images/countries/'+code.toLowerCase()+'.png"/></div>'+
						'<div class="multicurrencyviewer-code">'+code+'</div>'+
					'</div>'
				);
			});
		};
		
		this.init = function(position,selector,code){
			
			MultiCurrencyViewer.loadLocation();
			
			if($('#multicurrencyviewer-menu').length === 0)
			$('body').append(
			'<div id="multicurrencyviewer-menu">'+
				'<div id="multicurrencyviewer-menu-selected">'+
					'<div id="multicurrencyviewer-menu-flag"><img src="'+BASE_URL+'images/countries/usd.png"/></div>'+
					'<div id="multicurrencyviewer-menu-code">&nbsp;USD</div>'+
					'<div id="multicurrencyviewer-menu-symbol">&nbsp;($)</div>'+
					'<div id="multicurrencyviewer-menu-arrow"><img src="'+BASE_URL+'images/dropdown.svg" width="10px" height="10px"/></div>'+
				'</div>'+
			'</div>'+
			'<div id="multicurrencyviewer-list">'+
			'</div>'+
			'<div id="multicurrencyviewer-note">'+
			'</div>'+
			'<div id="multicurrencyviewer-note-body"></div>'+
			'<div id="multicurrencyviewer-note-close">CLOSE</div>');
			
			var css = '.code';
			MultiCurrencyViewer.element.inline = css;
			if($(css).length !== 0 && $('#multicurrencyviewer-inline').length === 0)
			$(css).each(function(){
				var html = $(this).html();
				//Detects $9.99 NGN
				var currency = html.match(/^.[0-9.]+\s([a-zA-Z]{3})?$/);//Extract the last 3 characters
				var value = html.match(/^.([0-9.]+)\s([a-zA-Z]{3})?$/);//Extract the numbers
				
				if(currency === null || value === null){
					//Difference is the whitespace identified by `\s` has a `?` after it
					value = html.match(/^.([0-9.]+)\s?([a-zA-Z]{3})?$/);
					var symbol = html.match(/^(.)([0-9.]+)\s?([a-zA-Z]{3})?$/);
					if(!symbol)return;
					currency = ['',MultiCurrencyViewer.reverseSymbol[symbol[1]]];
				}
				
				if(!currency || !value)return;
				
				currency = currency[1];
				value = value[1];
				
				$(this).html(
				'<div class="multicurrencyviewer-inline" data-currency="'+currency+'" data-value="'+value+'">'+
					'<div class="multicurrencyviewer-inline-selected">'+
						'<div class="multicurrencyviewer-inline-flag"><img src="'+BASE_URL+'images/countries/'+currency.toLowerCase()+'.png"/></div>'+
						'<div class="multicurrencyviewer-inline-symbol">&nbsp;'+MultiCurrencyViewer.symbol[currency]+'</div>'+
						'<div class="multicurrencyviewer-inline-value">'+value+'</div>'+
						'<div class="multicurrencyviewer-inline-code">&nbsp;'+currency+'</div>'+
						'<div class="multicurrencyviewer-inline-arrow"><img src="'+BASE_URL+'images/dropdown.svg" width="10px" height="10px"/></div>'+
					'</div>'+
				'</div>'
				);
			});
			
			MultiCurrencyViewer.listen();
			MultiCurrencyViewer.cartOpen();
			
			if($('#multicurrencyviewer-menu').length !== 0 
			   && 
			   $('.multicurrencyviewer-inline').length !== 0){
				
				return true;
				
			}
			
			return false;
		};
		
		/*Initial styling of the page*/
		this.style = function(){
			$('#multicurrencyviewer-inline-selected,#multicurrencyviewer-inline-list').hide();
			var fontSize = ($('#multicurrencyviewer-inline').parent('*').length) ? parseFloat($('#multicurrencyviewer-inline').parent('*').css('fontSize')) + 2: 20;
			var color = MultiCurrencyViewer.defaultColor = ($('#multicurrencyviewer-inline').parent('*').length) ? $('#multicurrencyviewer-inline').parent('*').css('color'): '#000';
			
			
			//Menu
			var left = -1000;
			var top = 'auto';
			var right = 'auto';
			var bottom = -1000;
			$('#multicurrencyviewer-menu').css({position:'fixed',left:left,top:top,right:right,bottom:bottom,background:'transparent',zIndex:90,color:'inherit',cursor:'pointer'});
			$('#multicurrencyviewer-menu-selected')
			.css({display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:'auto',height:'auto'});
			$('#multicurrencyviewer-menu-flag img').css({width:fontSize,height:fontSize});
			$('#multicurrencyviewer-menu-flag').css({flexGrow:0,flexShrink:0,flexBasis:fontSize});
			$('#multicurrencyviewer-menu-symbol').css({flexGrow:0,flexShrink:0,flexBasis:4});
			$('#multicurrencyviewer-menu-code').css({flexGrow:0,flexShrink:0,flexBasis:4});
			$('#multicurrencyviewer-menu-arrow').css({marginLeft:5});	
			
			
			//Inline
			$('.multicurrencyviewer-inline').css({background:'inherit',color:'inherit',width:'inherit',height:'inherit',cursor:'pointer'});
			$(MultiCurrencyViewer.element.inline).each(function(i) {
            	var place = ($(this).parent().css('textAlign') == 'center') ? 'center' : 'flex-start';
				$('.multicurrencyviewer-inline-selected,#multicurrencyviewer-inline-list')
				.eq(i)
				.css({justifyContent:place});
            });
			$('.multicurrencyviewer-inline-selected,#multicurrencyviewer-inline-list')
			.css({display:'flex',flexDirection:'row',alignItems:'center',width:'auto',height:'auto'});
			$('.multicurrencyviewer-inline-flag img').css({width:fontSize,height:fontSize,overflow:'hidden'});
			$('.multicurrencyviewer-inline-flag').css({flexGrow:0,flexShrink:0,flexBasis:fontSize});
			$('.multicurrencyviewer-inline-symbol').css({flexGrow:0,flexShrink:0,flexBasis:2});
			$('.multicurrencyviewer-inline-value').css({flexGrow:0,flexShrink:0,flexBasis:'auto',marginLeft:5});
			$('.multicurrencyviewer-inline-code').css({flexGrow:0,flexShrink:0,flexBasis:4});
			$('.multicurrencyviewer-inline-arrow').css({marginLeft:5});
			
			
			//List
			$('#multicurrencyviewer-list').css({position:'absolute',background:'white',border:'1px solid #000',borderRadius:5,zIndex:90,display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',width:75,height:'auto',maxHeight:0.5*MultiCurrencyViewer.H,overflowY:'auto',overflowX:'hidden'});
			$('.multicurrencyviewer-item').css({display:'flex',justifyContent:'center',alignItems:'center',flexGrow:1,flexShrink:1,flexBasis:'100%',paddingTop:3,paddingBottom:3,paddingLeft:10,paddingRight:10,width:75,cursor:'pointer',flexDirection:'row'}).hover(
			function(){
				$(this).css({background:'#D6D6D6'});
			},function(){
				$(this).css({background:'transparent'});
			});
			$('.multicurrencyviewer-flag img').css({width:fontSize,height:fontSize});
			$('.multicurrencyviewer-flag').css({display:'flex',width:fontSize,flexGrow:0,flexShrink:0,flexBasis:fontSize});
			$('.multicurrencyviewer-code').css({marginLeft:2});
			
			
			//Open
			MultiCurrencyViewer.open();
			//Theme
			MultiCurrencyViewer.theme();
		};
		
		this.open = function(){
			$('#multicurrencyviewer-list').hide();
			$('.multicurrencyviewer-inline,#multicurrencyviewer-menu')
			.off('click').click(function(e){
				e.preventDefault();
				MultiCurrencyViewer.currentTarget = this;
				var which = '';
				if($(this).is($('#multicurrencyviewer-menu')))which = 'menu';
				if($(this).is($('.multicurrencyviewer-inline')))which = 'inline';
				
				if(which == 'menu' && MultiCurrencyViewer.elementList.menu == false)return;
				if(which == 'inline' && MultiCurrencyViewer.elementList.inline == false)return;
				
				var menuArrow = $('#multicurrencyviewer-menu-arrow');
				var inlineArrow = $(this).find('.multicurrencyviewer-inline-arrow');
				if($('#multicurrencyviewer-list').css('display') == 'none'){
					//OPEN
					
					var list = $('#multicurrencyviewer-list').show();
					var top = 0;
					var left = 0;
					var width = $(this).outerWidth();
					var height = $(this).outerHeight();
					var direction = false;
					if(which == 'menu'){
						$('#multicurrencyviewer-list').css({position:'fixed'});
						top = $(this).position().top;
						left = $(this).position().left;
					}
					if(which == 'inline'){
						$('#multicurrencyviewer-list').css({position:'absolute'});
						top = $(this).offset().top;
						left = $(this).offset().left;
					}
					
					if((top + height + list.outerHeight(true)) > $(window).height()){
						newTop = top - list.outerHeight(true) - 5;
						//Menu arrows
						if(which == 'menu')menuArrow.css({transform:'rotate(180deg)'});
						//Inline arrows
						if(which == 'inline')inlineArrow.css({transform:'rotate(180deg)'});
					}else newTop = top + height;
					
					left = left + (0.5*width - 0.5*list.outerWidth());
					if((left + list.outerWidth(true)) > $(document).width()){
						newLeft = $(window).width() - list.outerWidth();	
					}else if(left < 0){
						newLeft = 3;	
					}else newLeft = left;
					
					list
					.css({top:newTop,left:newLeft});
				}else{
					//CLOSE
					
					$('#multicurrencyviewer-list').hide();
					//Menu arrows
					if(which == 'menu')menuArrow.css({transform:'rotate(0deg)'});
					//Inline arrows
					if(which == 'inline')inlineArrow.css({transform:'rotate(0deg)'});
				}
            });
			
			$('.multicurrencyviewer-item')
			.off('click').click(function(e){
				var code = $(this).data('code');
				var that = MultiCurrencyViewer.currentTarget;
				var which = '';
				if($(that).is($('#multicurrencyviewer-menu')))which = 'menu';
				if($(that).is($('.multicurrencyviewer-inline')))which = 'inline';
				
				$('#multicurrencyviewer-list').hide();
				if(which == 'menu'){
					if($('#multicurrencyviewer-menu-flag img').length)
					$('#multicurrencyviewer-menu-flag img')[0].src = BASE_URL+'images/countries/'+code.toLowerCase()+'.png';
					$('#multicurrencyviewer-menu-code').html('&nbsp;'+code);
					$('#multicurrencyviewer-menu-symbol').html('&nbsp;('+MultiCurrencyViewer.symbol[code]+')');
					//Open and select the same currency in all the inline currencies
					$('.multicurrencyviewer-inline').each(function(){
						$(this).click()
						$('.multicurrencyviewer-item-'+code).click();
					});
				}else{
					var elem = $(MultiCurrencyViewer.currentTarget);
					//Flag
					elem.find('.multicurrencyviewer-inline-flag img')[0].src = BASE_URL+'images/countries/'+code.toLowerCase()+'.png';
					//Symbol
					elem.find('.multicurrencyviewer-inline-symbol').html('&nbsp;'+MultiCurrencyViewer.symbol[code]);
					//Value
					MultiCurrencyViewer.convert(elem,code);
					elem.find('.multicurrencyviewer-inline-code').html('&nbsp;'+code);
				}
            });
		}
		
		this.theme = function(){
			//Themes
			var theme = MultiCurrencyViewer.defaultData.theme;
			//Menu and Inline
			['menu','inline'].map(function(v){
				var value = v;
				var elem = value == 'menu' ? $('#multicurrencyviewer-menu') : $('.multicurrencyviewer-inline');
				if(theme[value].color.font != '')
				elem.css({color:theme[value].color.font})
				if(theme[value].color.background != '')
				elem.css({background:theme[value].color.background})
				if(theme[value].color.hover != ''){
					var color = elem.css('background')
					elem.add('.multicurrencyviewer-item').hover(function(){
						//MultiCurrencyViewer.defaultColor = theme[value].color.hover;
						$(this).css({background:theme[value].color.hover});
						$(this).find('#multicurrencyviewer-'+value+'-arrow div,.multicurrencyviewer-'+value+'-arrow div')
						.css({borderBottomColor:theme[value].color.hover,borderTopColor:theme[value].color.hover,filter:'invert(0%)'})
					},function(){
						$(this).css({background:color});
						$(this).find('#multicurrencyviewer-'+value+'-arrow div,.multicurrencyviewer-'+value+'-arrow div')
						.css({borderBottomColor:color,borderTopColor:color,filter:'invert(100%)'})
					});
				}
				elem.css({border:'0px solid #000'})
				if(theme[value].color.border != '')
				elem.css({borderColor:theme[value].color.border})
				if(theme[value].border.size != '')
				elem.css({borderWidth:theme[value].border.size})
				if(theme[value].border.radius != '')
				elem.css({borderRadius:theme[value].border.radius})
				if(theme[value].flagSize.width != '')
				elem.find('#multicurrencyviewer-'+value+'-flag img,.multicurrencyviewer-'+value+'-flag img').css({width:theme[value].flagSize.width})
				if(theme[value].flagSize.height != '')
				elem.find('#multicurrencyviewer-'+value+'-flag img,.multicurrencyviewer-'+value+'-flag img').css({height:theme[value].flagSize.height});
				
				if(theme[value].flag == 'no')
				$('.multicurrencyviewer-'+value+'-flag,#multicurrencyviewer-'+value+'-flag').remove();
				if(theme[value].dropdown == 'no'){
					MultiCurrencyViewer.elementList[value] = false;
					$('.multicurrencyviewer-'+value+'-arrow,#multicurrencyviewer-'+value+'-arrow')
					.remove();
				}
				if(theme[value].code == 'no')
				$('.multicurrencyviewer-'+value+'-code,#multicurrencyviewer-'+value+'-code').remove();
				if(theme[value].symbol == 'no')
				$('.multicurrencyviewer-'+value+'-symbol,#multicurrencyviewer-'+value+'-symbol').remove();
			});
			
			//Display
			var display = MultiCurrencyViewer.defaultData.display
			//Display original currency
			if(display.inline.originalPrices == 'true')
			$('.multicurrencyviewer-inline').each(function(){
				$(this).attr('title',$(this).data('value') + ' '+ $(this).data('currency'));
			});
			//Menu currency
			if(display.menu.position == 'static'){
				//Move the menu here
				MultiCurrencyViewer.element.menu = display.menu.cssSelector;
				$('#multicurrencyviewer-menu').css({position:'static'}).appendTo(display.menu.cssSelector);
			}
			var bottom = 'auto';var right = 'auto';
			var top = 'auto';var left = 'auto';
			if(display.menu.position == 'topright' || display.menu.position == 'bottomright'){
				if(display.menu.position == 'topright')top = 15;
				if(display.menu.position == 'bottomright')bottom = 15;
				right = 50;
			}
			if(display.menu.position == 'topcenter' || display.menu.position == 'bottomcenter'){
				if(display.menu.position == 'topcenter')top = 15;
				if(display.menu.position == 'bottomcenter')bottom = 15;
				left = 0.5 * MultiCurrencyViewer.W;
			}
			if(display.menu.position == 'topleft' || display.menu.position == 'bottomleft'){
				if(display.menu.position == 'topleft')top = 30;
				if(display.menu.position == 'bottomleft')bottom = 15;
				left = 50;
			}
			$('#multicurrencyviewer-menu').css({top:top,left:left,bottom:bottom,right:right});
		}
		
		this.defaultData = {
			currency:{
				store: '',default: '',geoLocation: false,prices: {decimals: 'no',defaultCurrency: 'yes',rounding: 'default'},rates:{"USD":""},selected: ["USD"]
			},
			theme:{
				inline:{flag: 'yes',code: 'no',symbol: 'yes',dropdown: 'yes',color: {font: '',background: '',hover: '',border: ''},flagSize:{width: '',height: ''},border:{size: '',radius: ''}},
				menu:{flag: 'yes',code: 'yes',symbol: 'yes',dropdown: 'yes',color: {font: '',background: '',hover: '',border: ''},flagSize:{width: '',height: ''},border:{size: '',radius: ''}}
			},
			display:{inline:{originalPrices: false},menu: {cssSelector: '',position: 'bottomright'}},
			checkout: {size:{font:'',padding:''},color:{font:'',background:''},notification:''}
		};
		
		/*Apply settings*/
		this.settings = function(data){
			var data = data ? data : MultiCurrencyViewer.defaultData;
			//CURRENCY
			//all selected currencies
			var currency = data.currency;
			if(currency.selected.length == 0 && currency.default)
			currency.selected.push(currency.default);
			MultiCurrencyViewer.setCurrencies(currency.selected);
			
			//all prices
			setTimeout(function(){
				//Try to use store, default, geolocation currencies in that order
				var cur = currency.store;
				if(currency.default)cur = currency.default;
				if((currency.geoLocation == 'true' || currency.geoLocation === true) && typeof geoplugin_currencyCode != 'undefined')cur = MultiCurrencyViewer.geoLocationCurrencyCode();
				
				if($('#multicurrencyviewer-menu').length && $('.multicurrencyviewer-item-'+cur).length){
					$('#multicurrencyviewer-menu').click();
					$('.multicurrencyviewer-item-'+cur).click();
				}
			},100);
			
			//MAKE THE DATA AVAILABLE TO ALL CALLBACKS
			MultiCurrencyViewer.defaultData = data;
			
			MultiCurrencyViewer.style();
		};
		
		this.shopName = function(){	
			var shopname = $('#save').data('shop');
			$('script').each(function(i){
				if(/\?shop\=/.test($(this)[0].src)){
					shopname = $(this)[0].src.split('?shop=')[1];
					return false;
				}
			});
			return shopname;
		};
		
		/*Convert currency from Quote currency to Base currency*/
		this.convert = function(target,quote){
			//All rates are with reference to USD
			var that = $(target);
			that.each(async function(){
				var currency = MultiCurrencyViewer.defaultData.currency;
				var value = $(this).data('value');
				var originalCurrency = $(this).data('currency') ? $(this).data('currency') : currency.default;
				
				//Get the rates
				var rate_original = 1;
				var rate_original = 1;
				if(typeof currency.rates[originalCurrency] != 'undefined' && /^(\d)+$/.test(currency.rates[originalCurrency])){
					rate_original = currency.rates[originalCurrency];
				}else{
					//Use server
					rate_original = await MultiCurrencyViewer.loadRate(originalCurrency);
				}
				if(typeof currency.rates[quote] != 'undefined' && /^(\d)+$/.test(currency.rates[quote])){
					rate_quote = currency.rates[quote];
				}else{
					//Use server
					rate_quote = await MultiCurrencyViewer.loadRate(quote);
				}
				
				var direction = '';
				//Currency formating rules
				var decimals = false,rounding = 'default',defaultCurrency = false;
				if(currency.prices.decimals == 'yes')decimals = true;
				if(currency.prices.defaultCurrency == 'yes')defaultCurrency = true;
				if(currency.prices.rounding == 'up'){direction = rounding = 'up';}
				if(currency.prices.rounding == 'down'){direction = rounding = 'down'};
				//Set the currency formating
				var round;
				round = rounding == 'default' ? 2 : (rounding == 'up' ? 2 : 2);
				round = decimals ? 0 : round;
				round = (defaultCurrency && quote == originalCurrency) ? 2 : round;
				
				var newValue = 1;
				//Convert Quote/Base = Rate
				if(quote == originalCurrency || quote == 'USD'){
					// No convertion needed, Base is ALWAYS USD and
					// if original currency is selected again. 
					// Return the original rate
					if(quote == 'USD')
					newValue = MultiCurrencyViewer.preciseRound(value/rate_original,round,direction);
					if(quote == originalCurrency)
					newValue = MultiCurrencyViewer.preciseRound(value,round,direction);
				}else{
					//Convert from saved rates, if a rate has been saved
					var calced = MultiCurrencyViewer.preciseRound(value / rate_original,round,direction);
					newValue = MultiCurrencyViewer.preciseRound(calced * rate_quote,round,direction);
				}
				
				$(this).find('.multicurrencyviewer-inline-value').html(newValue)
			});
		};
		
		this.loadRate = async function(quote){
			//For efficieny this must run once per currency
			var response;
			response = await $.get('https://free.currencyconverterapi.com/api/v6/convert?q=USD_'+quote+'&compact=ultra');
			var value = response['USD_'+quote];
			MultiCurrencyViewer.defaultData.currency.rates[quote] = value;
			return value;
		};
		
		
		this.loadLocation = function(){
			//<script type="text/javascript" src="http://www.google.com/jsapi"></script>
			//console.log(google.loader.ClientLocation.address.country_code)
			$('body').append('<script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script>');
		};
		
		this.id = 0;
		
		/*Check for the addition of new nodes to the page*/
		this.listen = function(){
			var currentLength = $(MultiCurrencyViewer.element.inline).length;
			clearInterval(MultiCurrencyViewer.id);
			MultiCurrencyViewer.id = setInterval(function(){
				//If total number of MultiCurrencyViewer.element.inline.length changes
				//Target the new MultiCurrencyViewer.element.inline specifically
				if(currentLength != $(MultiCurrencyViewer.element.inline).length){
					var status = MultiCurrencyViewer.init();
					if(status){
						MultiCurrencyViewer.style();
						MultiCurrencyViewer.settings(MultiCurrencyViewer.defaultData);
					}
				}
			},2000);
		};
		
		//Used to handle when the cart alters the currencies that have already been styles
		this.cartOpen = function(){
			$('.site-header__link.site-header__cart.cart-link')
			.off('click.multicurrencyviewer')
			.on('click.multicurrencyviewer',function(e){
				//Re-initialize;
				setTimeout(function(){
					var mcv = new MultiCurrencyViewer();
					var status = mcv.init();
					if(status){
						mcv.style();
						mcv.settings();
					}
					
					var cart = $('#CartDrawer');
					var top = cart.offset().top;
					var left = cart.offset().left;
					var width = cart.outerWidth(true);
					var height = cart.outerHeight(true);
					
					$('#multicurrencyviewer-note,#multicurrencyviewer-note-body,#multicurrencyviewer-note-close')
					.show();
					
					$('#multicurrencyviewer-note-body').text(MultiCurrencyViewer.defaultData.checkout.notification);
					$('#multicurrencyviewer-note-close').css({color:'red',fontSize:8,fontWeight:100,background:'#000'});
					
					$('#multicurrencyviewer-note').css({zIndex:100000,position:'absolute',top:top,left:left,width:width,height:height,background:'grey',opacity:0.6,fontWeight:'bolder'});
					$('#multicurrencyviewer-note-body').css({zIndex:100000,position:'absolute',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',top:top+0.5*height,left:left+0.1*width,height:'auto',width:0.8*width,background:'#000000',padding:2,opacity:1,textAlign:'center',borderRadius:5});
					$('#multicurrencyviewer-note-close').css({zIndex:100000,position:'absolute',color:'red',fontSize:8,fontWeight:100,background:'#000',padding:5,cursor:'pointer',left:left+0.5*width-10,top:($('#multicurrencyviewer-note-body').offset().top+$('#multicurrencyviewer-note-body').outerHeight(true))+10,width:'auto',height:'auto',borderRadius:15})
					.click(function(e){
						$('#multicurrencyviewer-note,#multicurrencyviewer-note-body,#multicurrencyviewer-note-close').hide();
                    });
					
					var open = setInterval(function(){
						// If the body no longer has the class;
						// `js-drawer-open-right` then menu has been closed
						if(!$('body').hasClass('js-drawer-open-right')){
							$('#multicurrencyviewer-note,#multicurrencyviewer-note-body,#multicurrencyviewer-note-close').hide();
							clearInterval(open);
						}
					},100);
				},600);
            });
		}
	}
	
	
	
	
	
	//START
	const mcv = new MultiCurrencyViewer();
	
	$.ajax({url:BASE_URL+'get.php?shop='+mcv.shopName(),method:'GET',dataType:"json",success:function(response){
		
			if(typeof response != 'undefined' && typeof response.currency != 'undefined' && typeof response.theme != 'undefined' && typeof response.display != 'undefined' && typeof response.checkout != 'undefined'){
				var store = response;
				
				store.currency = JSON.parse(response.currency);
				
				store.theme = JSON.parse(response.theme);
				
				store.display = JSON.parse(response.display);
				
				store.checkout = JSON.parse(response.checkout);
				
				if(response.status != 'disabled'){
					var status = mcv.init();
					if(status){
						mcv.style();
						mcv.settings(store);
					}
				}
			}else submitError = 'AN ERROR OCCURRED WHILE LOADING THE FORM';
	},error:function(xhr){
		submitError = 'AN ERROR OCCURRED WHILE LOADING THE FORM';
	}});
});