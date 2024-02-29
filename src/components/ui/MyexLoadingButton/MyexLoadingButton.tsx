import React from 'react';

import { faSave } from '@fortawesome/pro-duotone-svg-icons';
import { LoadingButton } from '@mui/lab';
import AwesomeIcon from '@myex/components/AwesomeIcon';

interface Props {
  label?: string;
  loading: boolean;
}

function MyexLoadingButton({ label = 'Save', loading }: Props) {
  return (
    <LoadingButton
      loadingPosition='start'
      variant='contained'
      color='primary'
      type='submit'
      size='large'
      loading={loading}
      startIcon={<AwesomeIcon icon={faSave} />}
    >
      {label}
    </LoadingButton>
  );
}

export default React.memo(MyexLoadingButton);
