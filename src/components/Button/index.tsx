import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
const Button: React.FC<ButtonProps> = ({ children, loading = false, ...rest }) => {
  return (
    <Container {...rest} disabled={loading}>{loading ? 'Carregando ...' : children}</Container>
  );
};

export default Button;
