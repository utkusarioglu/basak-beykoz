import { useMediaQuery } from 'react-responsive';
import { W_XS, W_SM, W_MD, W_LG, W_XL } from '../config';

interface UseResponsiveWidthReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

/**
 * Returns a record of booleans indicating whether the screen minWidth
 * hits app breakpoints.
 * @returns a record of booleans
 */
export function useResponsiveWidth(): UseResponsiveWidthReturn {
  return {
    xs: useMediaQuery({ minWidth: W_XS }),
    sm: useMediaQuery({ minWidth: W_SM }),
    md: useMediaQuery({ minWidth: W_MD }),
    lg: useMediaQuery({ minWidth: W_LG }),
    xl: useMediaQuery({ minWidth: W_XL }),
  };
}
