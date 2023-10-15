export const handleValueLabelOption = (obj: any) => {
  return Object.entries(obj).map?.((i: any) => ({
      value: i[0],
      label: i[1],
  }))
}
