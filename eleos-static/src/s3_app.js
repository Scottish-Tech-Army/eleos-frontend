import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';

const history = createBrowserHistory();

let app = document.getElementById('app');
if (app) {
    // 1. Set up the browser history with the updated location
    // (minus the # sign)
	const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
	if (path) {
		history.replace(path);
	}

    // 2. Render our app
	render(<App />, app);
}