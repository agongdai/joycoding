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
import CoinIcon from '@myex/components/ui/MyexFormatter/CoinIcon';
import useMyexRestFetch from '@myex/hooks/useMyexRestFetch';
import { IFormOnChainWallet } from '@myex/types/wallet';
import { Coin } from '@prisma/client';

import Select from './Select';

interface Props {
  control: Control<IFormOnChainWallet>;
  error: string | undefined;
}

export default function FieldCoinSelect({ control, error }: Props) {
  const { isLoading, data: coins } = useMyexRestFetch<Coin[]>('coins', []);
  return (
    <Controller
      render={({ field }) => (
        <FormControl variant='filled' fullWidth>
          <InputLabel error={!!error} id='coin-select-label'>
            Coin
          </InputLabel>
          <Select
            labelId='coin-select-label'
            id='coin-select'
            label='Coin'
            error={!!error}
            variant='filled'
            {...field}
            ref={null}
          >
            <MenuItem disabled value={0}>
              <em>Select a coin ...</em>
            </MenuItem>
            {!isLoading &&
              coins.map((coin) => (
                <MenuItem key={coin.myexId} value={coin.myexId} classes={{ root: 'py-3' }}>
                  <ListItemIcon>
                    <CoinIcon coin={coin} />
                  </ListItemIcon>
                  <ListItemText>
                    {coin.name} - {coin.currency}
                  </ListItemText>
                </MenuItem>
              ))}
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
      name='coinMyexId'
      rules={{ required: 'Please select a coin' }}
      control={control}
    />
  );
}
