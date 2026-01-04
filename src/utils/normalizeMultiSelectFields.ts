/**
 * Normaliza campos multi-select que podem vir como string separada por vírgulas
 * do localStorage para arrays, que é o formato esperado pelos componentes Select
 */
export const normalizeMultiSelectField = (value: any): any => {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.split(',').filter((v: string) => v.trim() !== '');
  }
  return value;
};

/**
 * Normaliza múltiplos campos multi-select de um objeto
 */
export const normalizeMultiSelectFields = (
  data: any,
  fields: string[]
): any => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const normalized = { ...data };
  
  fields.forEach((field) => {
    if (normalized[field] !== undefined) {
      normalized[field] = normalizeMultiSelectField(normalized[field]);
    }
  });

  return normalized;
};

/**
 * Preserva valores de campos multi-select que podem estar vazios no formulário
 * mas existem em initialValues, prevenindo perda de dados ao resubmeter
 */
export const preserveMultiSelectValues = (
  formValues: any,
  initialValues: any,
  fields: string[]
): any => {
  if (!initialValues || !formValues) {
    return formValues;
  }

  const preserved = { ...formValues };
  
  fields.forEach((field) => {
    // Se o campo está vazio no formulário mas existe em initialValues, preserva
    if (!preserved[field] || (Array.isArray(preserved[field]) && preserved[field].length === 0)) {
      if (initialValues[field]) {
        preserved[field] = Array.isArray(initialValues[field])
          ? initialValues[field]
          : (typeof initialValues[field] === 'string'
              ? initialValues[field].split(',').filter((v: string) => v.trim() !== '')
              : []);
      }
    }
  });

  return preserved;
};

