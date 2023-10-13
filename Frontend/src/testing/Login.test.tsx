import { render, screen, fireEvent, queryByAttribute, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from "../components/login/Login";
import React from 'react';
import 'intersection-observer';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
const getById = queryByAttribute.bind(null, 'id');

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));
describe('Login Component', () => {

    it('should handle login when the button is clicked', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Login setIsLogin={setIsLogin} /></Router>);
        const emailInput = getById(dom.container, 'form3');
        const passwordInput = getById(dom.container, 'form4');
        fireEvent.change(emailInput!, { target: { value: 't@gmail.com' } });
        fireEvent.change(passwordInput!, { target: { value: 'tamir123' } });
        expect(emailInput).toHaveValue('t@gmail.com');
        expect(passwordInput).toHaveValue('tamir123');
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
                Email: 't@gmail.com',
                Password: 'tamir123',
            });
        });
        expect(setIsLogin).toHaveBeenCalled();
    });
});