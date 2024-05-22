import React from 'react';

import { faSave } from '@fortawesome/pro-duotone-svg-icons';
import { LoadingButton } from '@mui/lab';
import AwesomeIcon from '@myex/components/AwesomeIcon';

interface Props {
  label?: string;
  loading: boolean;
  formId?: string;
}

function MyexLoadingButton({ label = 'Save', loading, formId }: Props) {
  return (
    <LoadingButton
      loadingPosition='start'
      variant='contained'
      color='primary'
      type='submit'
      loading={loading}
      form={formId}
      startIcon={<AwesomeIcon icon={faSave} />}
    >
      {label}
    </LoadingButton>
  );
}

export default React.memo(MyexLoadingButton);
