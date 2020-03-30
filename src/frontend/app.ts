import { createElement } from 'react';
import { hydrate } from 'react-dom';

import { App } from './components';

hydrate(createElement(App), document.getElementById('app'));
