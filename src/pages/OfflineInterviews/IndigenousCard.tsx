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
  const isIncomplete = !data?.indigenous_apoio_protecao_social
  return (
    <Card onClick={() => history.push(`indigenous-interview/${id}`)}>
      <i>#{index} {isIncomplete && ' - Entrevista Incompleta'}</i>
      <p><strong>ID:</strong> {id?.toString()}</p>
      <p><strong>Projeto:</strong> {data?.indigenous_informacoes_basicas?.projeto_numero?.toString()}</p>
      <p><strong>DSI:</strong> {data?.indigenous_informacoes_basicas?.distrito_sanitario_indigena}</p>
      <p><strong>Município:</strong> {data?.indigenous_informacoes_basicas?.municipio}</p>
      <p><strong>Aldeia:</strong> {data?.indigenous_informacoes_basicas?.aldeia_comunidade}</p>
      <p><strong>Data:</strong> {new Date(data?.indigenous_informacoes_basicas?.data_entrevista).toLocaleDateString('pt-BR')}</p>
      <p style={{ marginTop: '5px', textAlign: 'end' }}><FiEdit /> Editar</p>
    </Card>
  )
}
export default IndigenousCard
