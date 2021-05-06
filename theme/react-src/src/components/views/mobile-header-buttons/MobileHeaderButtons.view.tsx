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
