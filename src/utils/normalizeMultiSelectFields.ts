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

