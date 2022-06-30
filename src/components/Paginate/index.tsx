import React, { useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import { Paginator } from 'primereact/paginator';
import './styles.css';

interface PaginatorPageState {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface PaginationProps {
  onPageChange: (e: PaginatorPageState) => void;
  totalCards: number;
  first?: number;
  rows?: number;
}

const Paginate: React.FC<{ children: React.ReactNode } & PaginationProps> = ({ onPageChange, totalCards, first = 0, rows = 10 }) => {
  const [basicFirst, setBasicFirst] = useState(first);
  const [basicRows, setBasicRows] = useState(rows);

  const onBasicPageChange = (event: PaginatorPageState) => {
    onPageChange(event);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
  }

  return (
    <div className="paginator-demo">
      <div className="card">
        <Paginator first={basicFirst} rows={basicRows} totalRecords={totalCards} onPageChange={onBasicPageChange} rowsPerPageOptions={[10, 20, 30, 40]} style={{ backgroundColor: '#dedede5c' }} ></Paginator>
      </div>
    </div>
  );
}

export default Paginate
