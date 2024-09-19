import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';

const useAccountData = (accountId) => {
    const accounts = useStore(accountsStore).accounts;
    const movements = useStore(accountsStore).movements;
    const transfers = useStore(accountsStore).transfers;

    const account = accounts.find((acc) => acc.id === accountId);

    if (!account) {
        return { account: undefined, accountMovements: [], accountTransfers: [] };
    }

    const accountMovements = movements.filter((mov) => mov.accountId === account.id);
    const accountTransfers = transfers.filter(
        (transfer) => transfer.fromAccountId === account.id || transfer.toAccountId === account.id
    );

    return { account, accountMovements, accountTransfers };
};

export default useAccountData;
