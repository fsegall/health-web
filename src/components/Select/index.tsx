import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<Props> = ({ name, options, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.value) {
          return '';
        }
        return ref.value;
      },
      setValue: (ref, value) => {
        ref.value = value
      }
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.value);
  }, []);

  return (
    <>
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        <select
          ref={selectRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ width: '100%', padding: '10px' }}
          name={name}
        >
          <option disabled selected></option>
          {options?.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      </Container>
    </>
  )
};

export default Select;
