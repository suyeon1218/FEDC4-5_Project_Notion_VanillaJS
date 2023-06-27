import App from './src/App.js';
import { getRootDocument } from './src/utils/API.js';

const $app = document.querySelector('.App');
const rootDocument = await getRootDocument();
new App($app, rootDocument);