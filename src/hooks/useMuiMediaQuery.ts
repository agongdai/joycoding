import { useTheme as useMuiTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMuiMediaQuery() {
  const muiTheme = useMuiTheme();
  const xlDown = useMediaQuery(muiTheme.breakpoints.down('xl'));
  const mdDown = useMediaQuery(muiTheme.breakpoints.down('md'));

  return {
    xlDown,
    mdDown,
  };
}
