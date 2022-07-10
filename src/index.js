import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import App from './App'

import { registerLicense } from '@syncfusion/ej2-base';
import { ContextProvider } from './contexts/ContextProvider'

registerLicense(process.env.REACT_APP_SYNCFUSION_LICENSE_KEY);

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>
    , document.getElementById('root')
)