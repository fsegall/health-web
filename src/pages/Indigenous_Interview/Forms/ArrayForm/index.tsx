import React, { useRef } from "react"
import { useState } from "react"
import { Scope } from "@unform/core";
import Input from "../../../../components/Input";
import * as Yup from 'yup';
import {
    StyledForm,
    Label
  } from '../form-styles';
import Button from "../../../../components/Button";
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from "../../../../hooks/toast";


const ArrayForm: React.FC = () => {
    const ResidentsFormRef = useRef<any>(null);
    const baseForm = (id: number) => {
        return {
            id: id,
            name: ''
        }
    }
    const { addToast } = useToast();
    const schema = Yup.object().shape({
        residents: Yup.array().of(
            Yup.object().shape({
            name: Yup.string().required("Campo obrigatório"),
            age: Yup.number().required("Campo obrigatório"),
          })
        )
      });
    const [residentsGrid, setResidentsGrid] = useState<any[]>([baseForm(Math.floor(Math.random() * 1000))]);

    const addForm = () => {
        const id = Math.floor(Math.random() * 1000)
        setResidentsGrid((prev: any) => [...prev, baseForm(id)])
      };
    const removeForm = (id: number) => {
        setResidentsGrid((prev: any) => prev.filter((p: any) => p.id !== id));
    };


    const handleSubmit = async (data: any) => {
        try {
          ResidentsFormRef.current.setErrors({});
    
          await schema.validate(data, {
            abortEarly: false
          });
    
          console.log(data);
        } catch(error) {
          if (error instanceof Yup.ValidationError) {
            console.log(error);
            const errors = getValidationErrors(error);
    
            ResidentsFormRef.current?.setErrors(errors);
    
            addToast({
              type: 'error',
              title: error.message,
              description: 'Todos os campos devem estar selecionados',
            });
          }
      };
    }
    return (
        <StyledForm ref={ResidentsFormRef} onSubmit={handleSubmit}>
            {residentsGrid?.map((item: any, index: number) => (
                <Scope path={`moradores[${index}]`} key={item.id}>
                    <Label>
                        <Label>Residente #{index+1}:</Label>
                        Name:
                        <Input name="name" type="text" />
                    </Label>
                    <Label>
                        Idade:
                        <Input name="age" type="number" />
                    </Label>
                    
                    <Button type="button" onClick={() => removeForm(item.id)}>
                        Remover
                    </Button>
                </Scope>
            ))}
            <Button
                onClick={() => addForm()}
                type="button"
            >
                Adicionar
            </Button>
            <Button type="submit">
                Salvar
            </Button>
        </StyledForm>
    )
}

export default ArrayForm