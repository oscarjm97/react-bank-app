import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountDetails from '../../src/components/AccountDetails';
import { GlobalStateProvider } from '../../src/contexts/GlobalState';

// TODO: Tests
describe('AccountDetails Component', () => {
	// TODO: Mock data for the tests
    const mockData = {
        accounts: [
            { id: 1, name: 'Checking Account', balance: 1000, accountNumber: '1234567890', type: 'Checking', currency: 'EUR' },
            { id: 2, name: 'Savings Account', balance: 5000, accountNumber: '0987654321', type: 'Savings', currency: 'USD' },
            { id: 3, name: 'Business Account', balance: 3000, accountNumber: '1122334455', type: 'Business', currency: 'GBP' },
            { id: 4, name: 'Investment Account', balance: 15000, accountNumber: '5566778899', type: 'Investment', currency: 'EUR' },
        ],
        movements: [
            { id: 1, accountId: 1, description: 'Grocery Shopping', amount: -50, date: '2023-01-01' },
            { id: 2, accountId: 1, description: 'Salary', amount: 1500, date: '2023-01-15' },
        ],
        transfers: [
            { fromAccountId: 1, toAccountId: 2, amount: 100, date: '2023-01-20' },
            { fromAccountId: 2, toAccountId: 3, amount: 200, date: '2023-02-15' },
            { fromAccountId: 3, toAccountId: 4, amount: 300, date: '2023-03-10' },
            { fromAccountId: 4, toAccountId: 1, amount: 400, date: '2023-04-05' },
            { fromAccountId: 2, toAccountId: 1, amount: 150, date: '2023-05-25' },
            { fromAccountId: 3, toAccountId: 2, amount: 250, date: '2023-06-20' },
            { fromAccountId: 4, toAccountId: 3, amount: 350, date: '2023-07-15' },
            { fromAccountId: 1, toAccountId: 4, amount: 450, date: '2023-08-10' },
        ],
        deposits: [
            { id: 1, description: 'Fixed Deposit', amount: '1000', interestRate: '5%', duration: '1 year', maturityDate: '2024-01-01' },
            { id: 2, description: 'Recurring Deposit', amount: '500', interestRate: '4%', duration: '2 years', maturityDate: '2025-01-01' },
        ],
    };

	// TODO: Function to render the component with mock data
	const renderWithContext = (component, initialState) => {
		return render(<GlobalStateProvider initialState={initialState}>{component}</GlobalStateProvider>);
	};

    test('renders account details correctly when a valid account ID is provided', () => {
        // Render the component wrapped in the context provider with valid account data
        renderWithContext(<AccountDetails accountId={1} />, mockData);

        // Check if the correct account details are rendered
        expect(screen.getByText('Checking Account')).toBeInTheDocument();
        expect(screen.getByText(1000)).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
    });

    test('displays "Account not found" when an invalid account ID is provided', () => {
        // Render the component wrapped in the context provider with invalid account ID
        renderWithContext(<AccountDetails accountId={999} />, mockData);

        // Check if "Account not found" is rendered
        expect(screen.getByText('Account not found')).toBeInTheDocument();
    });
});
