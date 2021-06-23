import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import ReactModal from 'react-modal'

import { pxToRem } from '../../../utils/utils'
import { X } from '../icons/X'

export const MODAL_CLASS = 'modal_open'

export const SReactModal = styled(ReactModal)(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    max-height: ${pxToRem(620)};
    max-width: ${pxToRem(920)};
    margin: auto auto;
    overflow: auto;
    flex: none;
    background-color: ${theme.color.white};

    :focus {
      outline: none;
    }
  `,
)

const XButton = styled.button(
  ({ theme }) => css`
    width: ${pxToRem(40)};
    height: ${pxToRem(40)};
    background-color: ${theme.color.white};
    position: absolute;
    cursor: pointer;
    border-radius: 50%;
    border: 0.125rem solid transparent;
    box-shadow: none;
    top: ${pxToRem(20)};
    right: ${pxToRem(20)};

    :focus,
    :active {
      outline: none;
    }

    :focus-visible {
      border: 0.125rem solid ${theme.color.dark};
    }
  `,
)

const XIcon = styled(X)`
  width: 0.875rem;
  height: 0.875rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

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
      <XButton aria-label="Close modal" onClick={onClose}>
        <XIcon />
      </XButton>
    </SReactModal>
  )
}
Modal.displayName = 'Modal'
