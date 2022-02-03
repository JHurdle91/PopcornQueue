import styled from 'styled-components/native';

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const title = (theme) => `
  font-size: ${theme.fontSizes.h5};
  font-family: ${theme.fonts.title};
`;

const heading = (theme) => `
  font-size: ${theme.fontSizes.body};
  font-family: ${theme.fonts.heading};
`;

const pageHeader = (theme) => `
  font-size: ${theme.fontSizes.title};
  font-family: ${theme.fonts.info};
`;

const body = (theme) => `
  font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
  font-size: ${theme.fontSizes.body};
  font-family: ${theme.fonts.info};
`;

const error = (theme) => `
  font-size: ${theme.fontSizes.caption};
  color: ${theme.colors.text.error};
`;

const caption = (theme) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
  font-family: ${theme.fonts.info};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

const cardTitle = (theme) => `
  font-family: ${theme.fonts.info};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.bold};
`;

const variants = {
  title,
  heading,
  pageHeader,
  body,
  label,
  caption,
  error,
  hint,
  cardTitle,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: 'body',
};
