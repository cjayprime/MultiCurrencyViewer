import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import store from './Store';
import {Provider} from 'mobx-react';
import { AppProvider } from '@shopify/polaris';

ReactDOM.render(
		<Provider store={store}>
			<AppProvider>
				<App/>
			</AppProvider>
		</Provider>
	, document.getElementById('root'));