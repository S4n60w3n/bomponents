import styled, { css } from 'styled-components'

export const ButtonLink = styled.button(
  ({ theme }) => css`
    color: ${theme.color.dark};
    font-weight: inherit;
    display: inline;
    font-size: inherit;
    margin: 0;
    padding: 0;
    border: none;
    text-decoration: none;

    :hover {
      background-color: transparent;
      text-decoration: underline;
    }
  `,
)
