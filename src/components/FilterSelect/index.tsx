import React, { useState } from "react";
import { Section, Select } from "./styles";

interface Props {
  name: string;
  label?: string;
  value: string;
  setValue: (value: React.SetStateAction<string>) => void
  options: Options[]
}

interface Options {
  value: string | number;
  label: string;
}

const FilterSelect: React.FC<Props> = ({
  name,
  label,
  value,
  setValue,
  options,
}: Props) => {
  const [hasFocus, setFocus] = useState(false);
  return (
    <Section>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        isFocused={hasFocus}
        >
        <option value="">Todos</option>
        {options?.map(i => (
          <option key={i?.value} value={i?.value}>{i?.label}</option>
          ))}
      </Select>
    </Section>
  )
}

export default FilterSelect;
