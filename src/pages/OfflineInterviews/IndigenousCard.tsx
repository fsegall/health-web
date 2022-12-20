import React from 'react'
import ICreateIndigenousOfflineInterviewDTO from '../Indigenous_Interview/dtos/ICreateIndigenousOfflineInterviewDTO';
import { Card } from './styles'

interface IndigenousCardProps {
  index: number;
  data: ICreateIndigenousOfflineInterviewDTO
}

const IndigenousCard = ({ data, index }: IndigenousCardProps) => {
  return (
    <Card>
      <i>#{index}</i>
      <p><strong>Projeto:</strong> {data.indigenous_informacoes_basicas.numero_projeto}</p>
      <p><strong>Município:</strong> {data.indigenous_informacoes_basicas.municipio}</p>
      <p><strong>Aldeia:</strong> {data.indigenous_informacoes_basicas.aldeia_comunidade}</p>
      <p><strong>Chefe:</strong> {data.indigenous_demografico.moradores[0].nome}</p>
      <p><strong>Data:</strong> {new Date(data.indigenous_informacoes_basicas.data_entrevista).toLocaleDateString('pt-BR')}</p>
    </Card>
  )
}
export default IndigenousCard
