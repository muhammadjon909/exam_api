import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiFilter } from 'react-icons/fi';
import '../styles/dataTable.css';
import { TableData } from '../types';

interface DataTableProps {
  title: string;
  data: TableData[];
}

const DataTable: React.FC<DataTableProps> = ({ title, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="data-table-container" data-aos="fade-up" data-aos-duration="600">
      <div className="table-header">
        <h2 className="table-title">{title}</h2>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>F.I.O</th>
              <th>TELEFON RAQAMI</th>
              <th>ROLE</th>
              <th>KELGAN SANA/VAQT</th>
              <th>VAQTINCHA SHOGIRD VAQTI</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{item.avatar}</div>
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td>{item.date + ' ' + item.time}</td>
                <td>00:00-00:00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination-info">
          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} dari {data.length} ta
        </div>
        <div className="pagination-controls">
          <button 
            onClick={() => paginate(1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FiChevronsLeft />
          </button>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FiChevronLeft />
          </button>
          <span className="pagination-page">{currentPage}</span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            className="pagination-button"
          >
            <FiChevronRight />
          </button>
          <button 
            onClick={() => paginate(Math.ceil(data.length / itemsPerPage))} 
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            className="pagination-button"
          >
            <FiChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;