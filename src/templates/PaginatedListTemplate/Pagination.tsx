import React from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { PaginationButton, SelectPagination } from './styles';

interface PaginationType {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ page, hasNextPage, hasPreviousPage, setPage, limit, setLimit }: PaginationType) => {

  const buttonsToRender = []

  const pageLimit = hasNextPage ? page + 1 : page

  for (let i = 1; i <= pageLimit; i++) {
    buttonsToRender.push(i)
  }

  return(
    <div style={{ display: 'flex', gap: '20px', padding: '0px 30px' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <PaginationButton onClick={() => setPage(page - 1)} disabled={!hasPreviousPage}>
          <GrFormPrevious color="black" />
        </PaginationButton>
        {buttonsToRender?.map((b: number) => (
          <PaginationButton
            key={b} onClick={() => setPage(b)}
            current={b === page}
          >
            {b}
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
          <GrFormNext color="black" />
        </PaginationButton>
      </div>
      <div>
        <SelectPagination onChange={(v) => setLimit(Number(v?.target?.value))} value={limit}>
          <option value={5}>{5}</option>
          <option value={10}>{10}</option>
          <option value={20}>{20}</option>
          <option value={30}>{30}</option>
        </SelectPagination>
      </div>
  </div>
  )
}
export default Pagination
