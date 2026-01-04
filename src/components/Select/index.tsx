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
  const { fieldName, registerField, defaultValue } = useField(name);

  // Efeito para aplicar defaultValue quando o componente monta
  useEffect(() => {
    if (defaultValue && selectRef.current && options && options.length > 0) {
      const ref: any = selectRef.current;
      if (!ref.state) return;
      
      if (rest.isMulti) {
        const valueArray = Array.isArray(defaultValue) ? defaultValue : (typeof defaultValue === 'string' ? defaultValue.split(',') : []);
        const selectedOptions = options.filter((v: any) => valueArray.includes(String(v.value)));
        if (selectedOptions.length > 0) {
          ref.state.value = selectedOptions;
        }
      } else {
        const selectedOption = options.find((v: any) => String(v.value) === String(defaultValue));
        if (selectedOption) {
          ref.state.value = selectedOption;
        }
      }
    }
  }, [defaultValue, options, rest.isMulti]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref || !ref.state) {
          return rest.isMulti ? [] : '';
        }
        if (rest.isMulti) {
          if (!ref.state.value || (Array.isArray(ref.state.value) && ref.state.value.length === 0)) {
            return [];
          }
          // Garante que retorna array de valores mesmo se value for array de objetos
          return ref.state.value.map((option: OptionTypeBase) => option?.value || option);
        }
        if (!ref.state.value) {
          return '';
        }
        // Garante que retorna o valor mesmo se value for objeto
        return ref.state.value?.value || ref.state.value || '';
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
          // Retry após as options estarem disponíveis - tenta várias vezes
          let retryCount = 0;
          const maxRetries = 10; // Tenta até 500ms (10 * 50ms)
          const retryInterval = setInterval(() => {
            retryCount++;
            if (ref && ref.props && ref.props.options && ref.props.options.length) {
              clearInterval(retryInterval);
              // Re-executa a lógica de setValue
              if (rest.isMulti && Array.isArray(value)) {
                const selectedOptions = ref.props.options.filter((v: any) => value.includes(v.value));
                if (ref.state) {
                  ref.state.value = selectedOptions;
                  console.log(`[Select ${fieldName}] Valor setado após retry (array):`, selectedOptions);
                }
              } else if (rest.isMulti && typeof value === 'string') {
                const splittedValue = value.split(',').filter((v: string) => v.trim() !== '');
                if (splittedValue.length > 0) {
                  const selectedOptions = ref.props.options.filter((v: any) => splittedValue.includes(String(v.value)));
                  if (ref.state) {
                    ref.state.value = selectedOptions;
                    console.log(`[Select ${fieldName}] Valor setado após retry (string->array):`, selectedOptions);
                  }
                }
              } else if (!rest.isMulti) {
                const selectedOption = ref.props.options.find((v: any) => String(v.value) === String(value));
                if (ref.state) {
                  ref.state.value = selectedOption || null;
                  console.log(`[Select ${fieldName}] Valor setado após retry (single):`, selectedOption);
                }
              }
            } else if (retryCount >= maxRetries) {
              clearInterval(retryInterval);
              console.warn(`[Select ${fieldName}] Não foi possível setar valor após ${maxRetries} tentativas. Options não disponíveis.`);
            }
          }, 50);
          return;
        }
        
        // Se é multi-select e value é array, processa diretamente
        if (rest.isMulti && Array.isArray(value)) {
          const selectedOptions = ref.props.options.filter((v: any) => value.includes(v.value));
          ref.state.value = selectedOptions;
          console.log(`[Select ${fieldName}] Valor setado (array):`, selectedOptions, 'de', value);
          return;
        }
        
        // Se é multi-select e value é string, faz split
        if (rest.isMulti && typeof value === 'string' && value.trim() !== '') {
          const splittedValue = value.split(',').filter((v: string) => v.trim() !== '');
          if (splittedValue.length > 0) {
            const selectedOptions = ref.props.options.filter((v: any) => splittedValue.includes(String(v.value)));
            ref.state.value = selectedOptions;
            console.log(`[Select ${fieldName}] Valor setado (string->array):`, selectedOptions, 'de', value);
          }
          return;
        }
        
        // Para select simples, busca a opção
        if (!rest.isMulti) {
          const selectedOption = ref.props.options.find((v: any) => String(v.value) === String(value));
          ref.state.value = selectedOption || null;
          console.log(`[Select ${fieldName}] Valor setado (single):`, selectedOption, 'de', value);
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
