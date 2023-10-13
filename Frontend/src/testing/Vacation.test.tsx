import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import 'intersection-observer';
import { BrowserRouter as Router } from 'react-router-dom';
import Vacations from '../components/vacations/Vacations';

describe('Vacations Component', () => {

    it('should handle toggle buttons', () => {
        render(<Router><Vacations /></Router>);
        const allToggeles = screen.getAllByRole('checkbox')
        for(let toggle of allToggeles) {
            fireEvent.click(toggle!);
            expect(toggle).toBeChecked();
            fireEvent.click(toggle!);
            expect(toggle).not.toBeChecked();
        }
    });

});
