const handleValueLabelOption = (obj: any) => {
    return Object.entries(obj).map?.((i: any) => ({
        value: i[0],
        label: i[1],
    }))
}

// Sim,não ns-nr
export const yesOrNoOptions = {
    true: 'Sim',
    false: 'Não',
    'ns-nr': 'NS/NR'
}
export const yesOrNoOptionsArray = handleValueLabelOption(yesOrNoOptions)

