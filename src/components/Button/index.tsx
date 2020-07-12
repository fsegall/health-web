import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
import { boolean } from 'yup';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>{loading ? 'Carregando ...' : children}</Container>
  );
};

export default Button;
