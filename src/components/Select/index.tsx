import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, options, initialValue, isDisabled = false, onChange, ...rest }) => {
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
        // Se value é null ou undefined, limpa o campo (mesmo sem options)
        if (!value) {
          if (ref && ref.state) {
            ref.state.value = rest.isMulti ? [] : null;
          }
          return;
        }
        
        // Se options não estão disponíveis, tenta novamente após um pequeno delay
        if (!ref || !ref.props || !ref.props.options || !ref.props.options.length) {
          // Retry após as options estarem disponíveis
          setTimeout(() => {
            if (ref && ref.props && ref.props.options && ref.props.options.length) {
              // Re-executa a lógica de setValue
              if (rest.isMulti && Array.isArray(value)) {
                const selectedOptions = ref.props.options.filter((v: any) => value.includes(v.value));
                if (ref.state) ref.state.value = selectedOptions;
              } else if (rest.isMulti && typeof value === 'string') {
                const splittedValue = value.split(',');
                if (splittedValue.length > 0) {
                  const selectedOptions = ref.props.options.filter((v: any) => splittedValue.includes(String(v.value)));
                  if (ref.state) ref.state.value = selectedOptions;
                }
              } else if (!rest.isMulti) {
                const selectedOption = ref.props.options.find((v: any) => String(v.value) === String(value));
                if (ref.state) ref.state.value = selectedOption || null;
              }
            }
          }, 50);
          return;
        }
        
        // Se é multi-select e value é array, processa diretamente
        if (rest.isMulti && Array.isArray(value)) {
          const selectedOptions = ref.props.options.filter((v: any) => value.includes(v.value));
          ref.state.value = selectedOptions;
          return;
        }
        
        // Se é multi-select e value é string, faz split
        if (rest.isMulti && typeof value === 'string') {
          const splittedValue = value.split(',');
          if (splittedValue.length > 0) {
            const selectedOptions = ref.props.options.filter((v: any) => splittedValue.includes(String(v.value)));
            ref.state.value = selectedOptions;
          }
          return;
        }
        
        // Para select simples, busca a opção
        if (!rest.isMulti) {
          const selectedOption = ref.props.options.find((v: any) => String(v.value) === String(value));
          ref.state.value = selectedOption || null;
        }
      }
    });
  }, [fieldName, registerField, rest.isMulti, options]);

  // Garante que o onChange personalizado seja chamado quando o valor mudar
  const handleChange = (selectedOption: any, actionMeta: any) => {
    // Chama o onChange customizado se existir
    if (onChange) {
      onChange(selectedOption, actionMeta);
    }
  };

  return (
    <ReactSelect
      ref={selectRef}
      options={options}
      isDisabled={isDisabled}
      placeholder="Selecione"
      classNamePrefix="react-select"
      {...rest}
      onChange={handleChange}
    />
  );
};

export default Select;
