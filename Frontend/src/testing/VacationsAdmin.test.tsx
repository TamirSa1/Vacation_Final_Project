import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import 'intersection-observer';
import { BrowserRouter as Router } from 'react-router-dom';
import VacationsAdmin from "../components/Admin/VacationsAdmin"
import axios from 'axios';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));
describe('Vacations Component', () => {

    it('should render the component', async () => {
        render(<Router><VacationsAdmin /></Router>);
        const titleElement = screen.getByText('Vacations Admin');
        expect(titleElement).toBeInTheDocument();
        const addVacationBtn = screen.getByTestId("addVacationAdminBtn");
        fireEvent.click(addVacationBtn);
        const adminPopUp = screen.getByTestId("AdminPopUp");
        expect(adminPopUp).toBeInTheDocument();
        const destinationInput = screen.getByPlaceholderText('Destination');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const startDateInput = screen.getByTestId('startDate');
        const endDateInput = screen.getByTestId('endDate');
        const priceInput = screen.getByPlaceholderText('Price $');
        const imageInput = screen.getByPlaceholderText('image url');
        fireEvent.change(destinationInput, { target: { value: 'madrid' } });
        fireEvent.change(descriptionInput, { target: { value: 'capital city' } });
        fireEvent.change(startDateInput, { target: { value: '2025-10-20' } });
        fireEvent.change(endDateInput, { target: { value: '2025-10-23' } });
        fireEvent.change(priceInput, { target: { value: '1000' } });
        fireEvent.change(imageInput, { target: { value: 'imageUrl' } });
        const addBtn = screen.getByText("Add");
        expect(addBtn).toBeInTheDocument();
        fireEvent.click(addBtn);
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith("/api/vacations/addVacation", {
                destination: 'madrid',
                description: 'capital city',
                startdate: '2025-10-20',
                enddate: '2025-10-23',
                price: '1000',
                imagefilename: 'imageUrl',
                followercount: 0,
                isfollowing: 0
            });
        });
    });


});
