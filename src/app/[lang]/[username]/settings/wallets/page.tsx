import React from 'react';

import { Alert } from '@mui/material';
import { myexFetchOnChainWallets } from '@myex/app/serverActions/myexOnChainWallet';
import CreateWalletModal from '@myex/components/modals/CreateWalletModal';
import UpdateWalletModal from '@myex/components/modals/UpdateWalletModal';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import CreateWalletButton from '@myex/components/OnChainWallets/CreateWalletButton';
import WalletsList from '@myex/components/OnChainWallets/WalletsList';

export default async function WalletsPage() {
  const wallets = await myexFetchOnChainWallets();
  return (
    <MyexStyledPageWrapper>
      <div className='flex justify-between items-center'>
        <h1>Wallets (on chain)</h1>
        <CreateWalletButton />
      </div>
      <Alert severity='warning' classes={{ root: 'max-w-[60rem] my-4 py-3' }}>
        Myex.AI stores the addresses of your on-chain wallets. We do not store your private keys.
        Only read access is performed. You can even put some addresses that are not yours.
      </Alert>
      <WalletsList wallets={wallets} />
      <CreateWalletModal />
      <UpdateWalletModal />
    </MyexStyledPageWrapper>
  );
}
