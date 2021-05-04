import { FC } from 'react';
import React from 'react';
import { MOBILE_MENU_PADDING } from '../../../config';

interface MobileMenuSectionTitleViewProps {}
const MobileMenuSectionTitleView: FC<MobileMenuSectionTitleViewProps> = ({
  children,
}) => (
  <h5
    style={{
      marginLeft: MOBILE_MENU_PADDING.horizontal,
      marginTop: 'calc(var(--spacing) * 2)',
      marginBottom: '0.6em',
    }}
  >
    {children}
  </h5>
);
export default MobileMenuSectionTitleView;
