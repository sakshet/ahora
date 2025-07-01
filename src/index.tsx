import { AppContainer } from '@Views/app';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
);
