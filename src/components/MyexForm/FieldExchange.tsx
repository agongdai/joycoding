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
import exchanges from '@myex/data/exchanges.json';
import { IFormNewExchangeApi } from '@myex/types/exchange';

import Select from './Select';

interface Props {
  control: Control<IFormNewExchangeApi>;
  error: string | undefined;
}

export default function FieldExchange({ control, error }: Props) {
  return (
    <Controller
      render={({ field }) => (
        <FormControl variant='filled' fullWidth>
          <InputLabel error={!!error} id='category-select-label'>
            Exchange
          </InputLabel>
          <Select
            labelId='exchange-select-label'
            id='exchange-select'
            label='Exchange'
            error={!!error}
            variant='filled'
            {...field}
            ref={null}
          >
            <MenuItem disabled value=''>
              <em>Select exchange ...</em>
            </MenuItem>
            {exchanges.map((exchange) => (
              <MenuItem key={exchange.name} value={exchange.name} classes={{ root: 'py-3' }}>
                <ListItemIcon>
                  <MyexImage src={exchange.icon} alt={exchange.name} width={28} height={28} />
                </ListItemIcon>
                <ListItemText>{exchange.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
      name='name'
      defaultValue=''
      rules={{ required: 'Please select an exchange' }}
      control={control}
    />
  );
}
