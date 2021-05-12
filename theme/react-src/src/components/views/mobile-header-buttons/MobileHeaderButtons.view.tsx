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
import {
  HEADER_ICON_MOBILE_SIZE,
  HEADER_ICON_MOBILE_VERTICAL_PADDING,
} from '../../../config';

// const HEADER_ICON_SIZE = 20;
const HEADER_ICON_PADDING = `11px ${HEADER_ICON_MOBILE_VERTICAL_PADDING}`;
const HEADER_ICON_COLOR = 'var(--brush-black)';

const iconProps = {
  size: HEADER_ICON_MOBILE_SIZE,
  style: {
    padding: HEADER_ICON_PADDING,
    color: HEADER_ICON_COLOR,
    // type casting fixes type issue with react-icons
    boxSizing: 'content-box' as 'content-box',
  },
};

const MobileHeaderButtonsView = () => {
  return (
    <>
      <MobileHeaderButtonView
        onClick={toggleMobileShareState}
        selector={selectMobileShareState}
        listPosition={0}
        listLength={2}
      >
        <FiShare2 {...iconProps} />
      </MobileHeaderButtonView>
      <MobileHeaderButtonView
        onClick={toggleMobileNavState}
        selector={selectMobileNavState}
        listPosition={1}
        listLength={2}
      >
        <TiThMenu {...iconProps} />
      </MobileHeaderButtonView>
    </>
  );
};

export default MobileHeaderButtonsView;
