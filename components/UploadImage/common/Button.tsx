import styled, { css } from 'styled-components'
import React from 'react'

import { pxToRem } from '../../../utils/utils'

export const Button = styled.button(
  ({ theme }) => css`
    background-color: transparent;
    box-shadow: none;
    text-align: center;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    border: 0.25rem solid transparent;
    border-radius: ${theme.radius.small};

    :focus {
      outline: none;
    }

    :focus-visible {
      border-color: ${theme.color.dark};
    }

    :hover {
      background-color: ${theme.color.darkOpa};
    }

    :disabled {
      cursor: default;
      background-color: ${theme.color.gray};
      :hover {
        background-color: ${theme.color.gray};
      }
    }
  `,
)

export const BlueButton = styled(Button)(
  ({ theme }) => css`
    background-color: ${theme.color.blue};
    color: ${theme.color.white};
    font-weight: ${theme.font.weight.bold};
    font-size: ${pxToRem(16)};
    text-align: center;
    padding: 0.9375rem 5.625rem;
    width: max-content;

    :hover {
      background-color: ${theme.color.lightBlue};
    }

    :focus-visible {
      border-color: ${theme.color.dark};
    }
  `,
)

export const LightButton = styled(Button)(
  ({ theme }) => css`
    background-color: transparent;
    border: 0.0625rem solid ${theme.color.medium};
    margin: 0.0625rem;
    color: ${theme.color.medium};
    font-weight: ${theme.font.weight.bold};
    font-size: ${pxToRem(16)};
    text-align: center;
    padding: ${pxToRem(15, 90)};

    :hover:not(:disabled) {
      background-color: ${theme.color.gray};
      color: ${theme.color.white};
    }

    :focus-visible {
      color: ${theme.color.dark};
      border-color: ${theme.color.dark};
    }
  `,
)
