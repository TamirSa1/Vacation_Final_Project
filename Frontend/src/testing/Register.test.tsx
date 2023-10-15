import { render, screen, fireEvent, queryByAttribute, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Register from "../components/register/Register";
import React from 'react';
import 'intersection-observer';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
const getById = queryByAttribute.bind(null, 'id');
afterEach(cleanup)
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));
describe('Register Component', () => {
    it('show error because first name empty', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        const emailInput = getById(dom.container, 'form3');
        const passwordInput = getById(dom.container, 'form4');
        fireEvent.change(firstNameInput!, { target: { value: '' } });
        fireEvent.change(lastNameInput!, { target: { value: 'last' } });
        fireEvent.change(emailInput!, { target: { value: 't@gmail.com' } });
        fireEvent.change(passwordInput!, { target: { value: 'tamir123' } });
        expect(firstNameInput).toHaveValue('');
        expect(lastNameInput).toHaveValue('last');
        expect(emailInput).toHaveValue('t@gmail.com');
        expect(passwordInput).toHaveValue('tamir123');
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        const errorFirstName = screen.getByText('Fill the First Name input to continue');
        expect(errorFirstName).toHaveStyle('display: block');
    })

    it('show error because last name empty', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        fireEvent.change(firstNameInput!, { target: { value: 'first' } });
        fireEvent.change(lastNameInput!, { target: { value: '' } });
        expect(firstNameInput).toHaveValue('first');
        expect(lastNameInput).toHaveValue('');
        fireEvent.blur(lastNameInput!)
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        const errorLastName = screen.getByText('Fill the Last Name input to continue');
        expect(errorLastName).toHaveStyle('display: block');
    })

    it('show error Email field empty', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        const emailInput = getById(dom.container, 'form3');
        fireEvent.change(firstNameInput!, { target: { value: 'first' } });
        fireEvent.change(lastNameInput!, { target: { value: 'last' } });
        fireEvent.change(emailInput!, { target: { value: '' } });
        expect(firstNameInput).toHaveValue('first');
        expect(lastNameInput).toHaveValue('last');
        expect(emailInput).toHaveValue('');
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        const errorEmailEmpty = screen.getByText('Fill the Email input to continue');
        expect(errorEmailEmpty).toHaveStyle('display: block');
    })

    it('show error Email field wrong', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        const emailInput = getById(dom.container, 'form3');
        fireEvent.change(firstNameInput!, { target: { value: 'first' } });
        fireEvent.change(lastNameInput!, { target: { value: 'last' } });
        fireEvent.change(emailInput!, { target: { value: 'email' } });
        expect(firstNameInput).toHaveValue('first');
        expect(lastNameInput).toHaveValue('last');
        expect(emailInput).toHaveValue('email');
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        const errorEmailWrong = screen.getByText('Please use a valid email address');
        expect(errorEmailWrong).toHaveStyle('display: block');
    })

    it('show error because password field is empty', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        const emailInput = getById(dom.container, 'form3');
        const passwordInput = getById(dom.container, 'form4');
        fireEvent.change(firstNameInput!, { target: { value: 'first' } });
        fireEvent.change(lastNameInput!, { target: { value: 'last' } });
        fireEvent.change(emailInput!, { target: { value: 't@gmail.com' } });
        fireEvent.change(passwordInput!, { target: { value: '' } });
        expect(firstNameInput).toHaveValue('first');
        expect(lastNameInput).toHaveValue('last');
        expect(emailInput).toHaveValue('t@gmail.com');
        expect(passwordInput).toHaveValue('');
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        const errorPassword = screen.getByText('The password should be a 4 characters');
        expect(errorPassword).toHaveStyle('display: block');
    })

    it('should handle register when the button is clicked', async () => {
        const setIsLogin = jest.fn();
        const dom = render(<Router><Register setIsLogin={setIsLogin} /></Router>);
        const firstNameInput = getById(dom.container, 'form1');
        const lastNameInput = getById(dom.container, 'form2');
        const emailInput = getById(dom.container, 'form3');
        const passwordInput = getById(dom.container, 'form4');
        fireEvent.change(firstNameInput!, { target: { value: 'first' } });
        fireEvent.change(lastNameInput!, { target: { value: 'last' } });
        fireEvent.change(emailInput!, { target: { value: 't@gmail.com' } });
        fireEvent.change(passwordInput!, { target: { value: 'tamir123' } });
        expect(firstNameInput).toHaveValue('first');
        expect(lastNameInput).toHaveValue('last');
        expect(emailInput).toHaveValue('t@gmail.com');
        expect(passwordInput).toHaveValue('tamir123');
        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/users/register', {
                firstname: 'first',
                lastname: 'last',
                email: 't@gmail.com',
                password: 'tamir123',
            });
        });
        expect(setIsLogin).toHaveBeenCalled();
    });
});