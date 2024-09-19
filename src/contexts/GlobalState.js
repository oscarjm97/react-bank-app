import React, { createContext, useContext } from 'react';
import { map } from 'nanostores';
import { useStore } from '@nanostores/react';

export const accountsStore = map({
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
});

export const addTransfer = (transfer) => {
    const currentTransfers = accountsStore.get().transfers;
    accountsStore.setKey('transfers', [...currentTransfers, transfer]);
};

export const addAccount = (account) => {
    const currentAccounts = accountsStore.get().accounts;
    accountsStore.setKey('accounts', [...currentAccounts, account]);
};
export const deleteAccount = (accountId) => {
    const currentAccounts = accountsStore.get().accounts;
    const updatedAccounts = currentAccounts.filter(account => account.id !== accountId);
    accountsStore.setKey('accounts', updatedAccounts);
};

export const addDeposit = (deposit) => {
    const currentDeposits = accountsStore.get().deposits;
    accountsStore.setKey('deposits', [...currentDeposits, deposit]);
};

export const deleteDeposit = (depositId) => {
    const currentDeposits = accountsStore.get().deposits;
    const updatedDeposits = currentDeposits.filter(deposit => deposit.id !== depositId);
    accountsStore.setKey('deposits', updatedDeposits);
};

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children, initialState }) => {
    if (initialState) {
        accountsStore.set(initialState);
    }
    const store = useStore(accountsStore);
    return (
        <GlobalStateContext.Provider value={store}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
