import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, options, initialValue, isDisabled = false, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value) => {
        const selectedOption = ref.props.options.find((v: any) => v.value === value)
        if (selectedOption) {
          ref.state.value = selectedOption
        } else {
          const splittedValue = value.split(',')
          const selectedOptions = ref.props.options.filter((v: any) => splittedValue.includes(v.value))
          ref.state.value = selectedOptions
        }
      }
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <ReactSelect
      ref={selectRef}
      options={options}
      isDisabled={isDisabled}
      placeholder="Selecione"
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

export default Select;
