import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import ReactModal from 'react-modal'

import { pxToRem } from '../../utils/utils'

export const MODAL_CLASS = 'modal_open'

export const SReactModal = styled(ReactModal)(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    max-height: ${pxToRem(620)};
    max-width: ${pxToRem(920)};
    margin: auto auto;
    flex: none;
    background-color: ${theme.color.white};

    :focus {
      outline: none;
    }
  `,
)

type Props = {
  style?: CSSStyleSheet
  isOpen: boolean
  onClose?(): void
  className?: string
}

export const Modal: React.FC<Props> = ({
  isOpen,
  style = {},
  className,
  onClose,
  children,
}) => {
  const {
    color: { darkOpa },
  } = useTheme()
  return (
    <SReactModal
      style={{
        overlay: {
          backgroundColor: darkOpa,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto',
          ...style,
        },
      }}
      onRequestClose={onClose}
      ariaHideApp={!isOpen}
      isOpen={isOpen}
      bodyOpenClassName={MODAL_CLASS}
      className={className}
    >
      {children}
    </SReactModal>
  )
}
Modal.displayName = 'Modal'
