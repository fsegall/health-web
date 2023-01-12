import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import ICreateIndigenousOfflineInterviewDTO from '../Indigenous_Interview/dtos/ICreateIndigenousOfflineInterviewDTO';
import { Card } from './styles'

interface IndigenousCardProps {
  index: number;
  data: ICreateIndigenousOfflineInterviewDTO
  id: string
}

const IndigenousCard = ({ data, index, id }: IndigenousCardProps) => {
  const history = useHistory()
  return (
    <Card onClick={() => history.push(`indigenous-interview/${id}`)}>
      <i>#{index}</i>
      <p><strong>ID:</strong> {id?.toString()}</p>
      <p><strong>Projeto:</strong> {data?.indigenous_informacoes_basicas?.numero_projeto?.toString()}</p>
      <p><strong>Município:</strong> {data?.indigenous_informacoes_basicas?.municipio}</p>
      <p><strong>Aldeia:</strong> {data?.indigenous_informacoes_basicas?.aldeia_comunidade}</p>
      <p><strong>Chefe:</strong> {data?.indigenous_demografico?.moradores[0]?.nome}</p>
      <p><strong>Data:</strong> {new Date(data?.indigenous_informacoes_basicas?.data_entrevista).toLocaleDateString('pt-BR')}</p>
      <p style={{ marginTop: '5px', textAlign: 'end' }}><FiEdit /> Editar</p>
    </Card>
  )
}
export default IndigenousCard
