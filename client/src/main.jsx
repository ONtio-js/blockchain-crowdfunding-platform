import react from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId,ThirdwebProvider } from '@thirdweb-dev/react';
import {Sepolia} from '@thirdweb-dev/chains';
import App from  './App';
import './index.css';
import { StateContextProvider } from './context';
const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain = {Sepolia}>
        <Router>
            <StateContextProvider>
            <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)