import { render } from '@testing-library/react';
import OrderManagement from "@/components/features/order-management/OrderManagement";
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('display my order', () => {
    const mockOrder = [
        {
            productName: 'Product Name',
            purchaseDate: '11.10.2022',
            purchaseNumber: '1',
        },
        {
            productName: 'Product Name2',
            purchaseDate: '11.12.2022',
            purchaseNumber: '2',
        },
    ];
    let container: Container;

    beforeEach(() => {
        container = render(<OrderManagement />, { wrapper: BrowserRouter }).container;
    });
    test('render datePicker, apply button, reset button and OrderItem for Admin', () => {
        expect(container.querySelectorAll('.order-item-admin')).toBeTruthy()
        expect(container.querySelector('.start-end-date-picker')).toBeInTheDocument();
        expect(container.querySelector('.apply-button')).toBeInTheDocument();
        expect(container.querySelector('.reset-button')).toBeInTheDocument();
    });
});