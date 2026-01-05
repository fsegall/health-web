/**
 * Aplica máscara de data no formato DD/MM/YYYY
 * @param value - Valor do input
 * @returns Valor com máscara aplicada
 */
export const maskDate = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Limita a 8 dígitos (DDMMYYYY)
  const limitedNumbers = numbers.slice(0, 8);

  // Aplica a máscara
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 4) {
    return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`;
  } else {
    return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4, 8)}`;
  }
};

/**
 * Remove a máscara de data, retornando apenas números
 * @param value - Valor com máscara
 * @returns Valor sem máscara
 */
export const unmaskDate = (value: string): string => {
  return value.replace(/\D/g, '');
};

