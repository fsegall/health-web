import React from 'react'
import { Card } from './styles'
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

interface InterviewCardProps {
  index: number;
  data: ICreateOfflineInterviewDTO
  id: string
}

const InterviewCard = ({ data, index, id }: InterviewCardProps) => {
  const isIncomplete = !data?.interview?.project_number
  return (
    <Card backgroundColor='rgb(89, 116, 140, 0.5)'>
      <i>#{index} {isIncomplete && ' - Entrevista Incompleta'}</i>
      <p><strong>ID:</strong> {id?.toString()}</p>
      <p><strong>Entrevistado:</strong> {data?.person?.nome}</p>
      <p><strong>Projeto:</strong> {data?.interview?.project_number || '--'}</p>
      <p><strong>Cidade:</strong> {data?.address?.city || '--'}</p>
      <p><strong>Rua:</strong> {data?.address?.street_or_location || '--'}</p>
    </Card>
  )
}
export default InterviewCard
