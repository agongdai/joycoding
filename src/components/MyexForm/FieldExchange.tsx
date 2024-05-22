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

import Select from './Select';

type FormWithExchange = {
  exchanges?: string | null;
};

interface Props<T> {
  // @github https://github.com/orgs/react-hook-form/discussions/11170#discussioncomment-9130442
  control: T extends FormWithExchange ? Control<T> : never;
  error: string | undefined;
}

export default function FieldExchange<T extends FormWithExchange>({ control, error }: Props<T>) {
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
              <MenuItem key={exchange.name} value={exchange.exchangeId} classes={{ root: 'py-3' }}>
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
      name='exchanges'
      defaultValue=''
      rules={{ required: 'Please select an exchange' }}
      control={control}
    />
  );
}
