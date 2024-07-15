import { App } from '@Views/app';

import React from 'react';
import { createRoot } from 'react-dom/client';

import './global.css';
import './core/styles/fonts.css';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(<App />);
