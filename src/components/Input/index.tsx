import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isDisabled?: boolean;
  onMount?: (inputValue: any) => void;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, isDisabled = false, onMount, ...rest }) => {
  const InputRef = useRef<HTMLInputElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, error, registerField, defaultValue } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!InputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (isDisabled) {
      if (InputRef && InputRef.current) {
        InputRef.current.value = ''
      }
    }
  }, [isDisabled])

  const onInputMount = useCallback(() => {
    if (InputRef.current) {
      const inputValue = InputRef.current.value || "";
      if (onMount) {
        onMount(inputValue);
      }
    }
  }, [onMount]);


  useEffect(() => {
    onInputMount();
  }, [onInputMount]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && (
        <Icon color={isFocused || isFilled ? '#cccc00' : '#666360'} size={20} />
      )}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        style={{ opacity: isDisabled ? '0.5' : 1 }}
        ref={InputRef}
        disabled={isDisabled}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
