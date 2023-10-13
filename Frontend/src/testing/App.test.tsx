import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import React from 'react';
import 'intersection-observer';

test('renders the landing page', () => {
  render(<App />);
});