import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Portfolio.jsx';
// We assume CSS/Tailwind imports would be configured here in a standard setup.
// For Vercel, the Tailwind configuration in package.json and tailwind.config.js 
// is usually sufficient for the build step.

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
