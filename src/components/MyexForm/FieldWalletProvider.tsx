import React from 'react';
import { Control, Controller } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import MyexImage from '@myex/components/MyexImage';
import { WalletProvider } from '@myex/types/trading';
import { IFormOnChainWallet } from '@myex/types/wallet';

import Select from './Select';

interface Props {
  control: Control<IFormOnChainWallet>;
  error: string | undefined;
}

export default function FieldWalletProvider({ control, error }: Props) {
  return (
    <Controller
      render={({ field }) => (
        <FormControl variant='filled' fullWidth>
          <InputLabel error={!!error} id='wallet-provider-select-label'>
            Wallet Provider
          </InputLabel>
          <Select
            labelId='wallet-provider-select-label'
            id='wallect-provider-select'
            label='Provider'
            error={!!error}
            variant='filled'
            {...field}
            ref={null}
          >
            <MenuItem disabled value={WalletProvider.Unknown}>
              <em>Select provider ...</em>
            </MenuItem>
            <MenuItem value={WalletProvider.Ledger} classes={{ root: 'py-3' }}>
              <ListItemIcon>
                <MyexImage src='/images/ledger.svg' alt='ledger' width={28} height={28} />
              </ListItemIcon>
              <ListItemText>Ledger</ListItemText>
            </MenuItem>
            <MenuItem value={WalletProvider.MetaMask} classes={{ root: 'py-3' }}>
              <ListItemIcon>
                <MyexImage src='/images/metamask.svg' alt='metamask' width={28} height={28} />
              </ListItemIcon>
              <ListItemText>MetaMask</ListItemText>
            </MenuItem>
            <MenuItem value={WalletProvider.BitGetWallet} classes={{ root: 'py-3' }}>
              <ListItemIcon>
                <MyexImage src='/images/bitget-wallet.png' alt='metamask' width={28} height={28} />
              </ListItemIcon>
              <ListItemText>BitGet Wallet</ListItemText>
            </MenuItem>
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
      name='provider'
      defaultValue={WalletProvider.Unknown}
      rules={{ required: 'Please select a wallet provider' }}
      control={control}
    />
  );
}
