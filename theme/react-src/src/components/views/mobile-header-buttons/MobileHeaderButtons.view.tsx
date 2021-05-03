import React from 'react';
import MobileHeaderButtonView from '../mobile-header-button/MobileHeaderButton.view';
import { TiThMenu } from 'react-icons/ti';
import { FiShare2 } from 'react-icons/fi';
import {
  toggleMobileNavState,
  toggleMobileShareState,
  selectMobileNavState,
  selectMobileShareState,
} from '../../../slices/app/app.slice';

const HEADER_ICON_SIZE = 20;
const HEADER_ICON_PADDING = '11 15';
const HEADER_ICON_COLOR = 'var(--brush-black)';

const iconProps = {
  size: HEADER_ICON_SIZE,
  style: {
    padding: HEADER_ICON_PADDING,
    color: HEADER_ICON_COLOR,
  },
};

const MobileHeaderButtonsView = () => {
  return (
    <>
      <MobileHeaderButtonView
        onClick={toggleMobileShareState}
        selector={selectMobileShareState}
      >
        <FiShare2 {...iconProps} />
      </MobileHeaderButtonView>
      <MobileHeaderButtonView
        onClick={toggleMobileNavState}
        selector={selectMobileNavState}
      >
        <TiThMenu {...iconProps} />
      </MobileHeaderButtonView>
    </>
  );
};

export default MobileHeaderButtonsView;
