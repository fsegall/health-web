import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { useField } from '@unform/core';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  rows?: number;
  cols?: number;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<TextAreaProps> = ({ name, icon: Icon, rows, cols, ...rest }) => {
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, error, registerField } = useField(name);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!TextAreaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: TextAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && (
        <Icon color={isFocused || isFilled ? '#cccc00' : '#666360'} size={20} />
      )}
      <textarea
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        ref={TextAreaRef}
        {...rest}
        style={{ border: 'none' }}
        rows={rows}
        cols={cols}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
