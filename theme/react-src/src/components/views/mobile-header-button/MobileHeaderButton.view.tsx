import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import ConcaveCornerView from '../concave-corner/ConcaveCorner.view';
import {
  MENU_DECORATION_COLOR,
  MENU_VERTICAL_DECORATION_HEIGHT,
} from '../../../config';
import { useResponsiveWidth } from '../../../utils/responsive.util';

interface MobileHeaderButtonViewProps {
  onClick: () => void;
  selector: (state: any) => boolean;
  listPosition: number;
  listLength: number;
}

const MobileHeaderButtonView: FC<MobileHeaderButtonViewProps> = ({
  onClick,
  children,
  selector,
  listLength,
  listPosition,
}) => {
  const selected = useSelector(selector);
  const isLast = listPosition === listLength - 1;
  const isW = useResponsiveWidth();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {selected && (
        // You could need an "!isFirst" check above if the
        // lists weren't all facing left
        <>
          <ConcaveCornerView
            className="has-responsive-size-for-decoration-block"
            fill={MENU_DECORATION_COLOR}
            horizontalDirection="left"
            verticalDirection="down"
            style={{
              position: 'absolute',
              top: MENU_VERTICAL_DECORATION_HEIGHT,
              zIndex: 115,
              left: 'calc(var(--sp) * -1)',

              ...(isW.xs && {
                left: 'calc(var(--sp) * -1 * 1.5)',
              }),

              ...(isW.sm && {
                left: 'calc(var(--sp) * -1 * 2)',
              }),
            }}
          />
          <div
            /**
             * TODO
             *
             * This is my _div of shame_
             * when the breakpoint reaches md, the selected header buttons
             * start to show gap between all the border radius that is
             * going on all over the place. This shameful div is there
             * to cover some ugliness.
             *
             * There are better solutions to this that involve increasing the
             * height of the menu buttons when one is selected. But these
             * require some rewrites that can make this project go overtime.
             *
             * This solution will hold fine, even though it's an ugly and
             * shameful hack.
             */
            className="has-responsive-right-for-blocks"
            style={{
              position: 'fixed',
              bottom: `calc(var(--height-header-mobile) - ${MENU_VERTICAL_DECORATION_HEIGHT})`,
              width: 20,
              height: 20,
              backgroundColor: isLast
                ? 'var(--brush-yellow-dark)'
                : 'var(--brush-white)',
            }}
          />
        </>
      )}

      <button
        className="has-responsive-border-radius"
        onClick={onClick}
        style={{
          border: 0,
          padding: 0,
          margin: 0,
          height: '100%',
          width: '100%',
          background: 'transparent',
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,

          ...(selected && {
            background: MENU_DECORATION_COLOR,
          }),
        }}
      >
        {children}
      </button>

      {selected && !isLast && (
        <ConcaveCornerView
          className="has-responsive-size-for-decoration-block"
          fill={MENU_DECORATION_COLOR}
          horizontalDirection="right"
          verticalDirection="down"
          style={{
            position: 'absolute',
            top: 'var(--sp)',
            zIndex: 115,
            right: `calc(var(--sp) * -1)`,

            ...(isW.xs && {
              right: 'calc(var(--sp) * -1 * 1.5)',
            }),

            ...(isW.sm && {
              right: 'calc(var(--sp) * -1 * 2)',
            }),
          }}
        />
      )}
    </div>
  );
};

export default MobileHeaderButtonView;
