/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { usePagination, useSortBy, useTable } from 'react-table';
import CustomPagination from './CustomPagination';
import './CustomTable.css';

const CustomTable = ({
  columns,
  data,
  display,
  bgcolor,
  border,
  pageList,
  textAlign,
  totalLength,
  pageIndex,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  loading,
  cell,
}) => {
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   prepareRow,
  //   page, // Access the current page
  //   state: { pageIndex, pageSize },
  //   gotoPage,
  //   canNextPage,
  //   canPreviousPage,
  //   pageOptions,
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount: internalPageCount,
    gotoPage: internalGotoPage,
    canPreviousPage: internalCanPreviousPage,
    canNextPage: internalCanNextPage,
    state: { pageIndex: internalPageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, // Initial page index
        pageSize: pageList || 10, // Initial page size
      },
    },
    useSortBy, // Add sorting functionality
    usePagination // Add pagination functionality
  );

  const activePageIndex = pageIndex !== undefined ? pageIndex : internalPageIndex;
  const activePageCount = totalLength !== undefined && !isNaN(totalLength)
    ? Math.ceil(totalLength / (pageList || 10))
    : internalPageCount;
  const activeGotoPage = gotoPage !== undefined ? gotoPage : internalGotoPage;
  const activeCanPreviousPage = canPreviousPage !== undefined ? canPreviousPage : internalCanPreviousPage;
  const activeCanNextPage = canNextPage !== undefined ? canNextPage : internalCanNextPage;

  return (
    <Box
      sx={{
        '.table-header': {
          bgcolor: bgcolor || 'var(--bgcolor)',
        },
        tbody: {
          border: border || '',
          borderColor: bgcolor || 'var(--stroke)',
        },
        'tbody tr': {
          border: border || '',
          borderColor: bgcolor || 'var(--bgcolor)',
        },
        '.table-cell': {
          textAlign: cell || 'center',
        },
        '.table-cell:first-of-type': {
          textAlign: textAlign || 'center',
        },
      }}
    >
      <div className="table-container">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr
                key={i}
                {...headerGroup.getHeaderGroupProps()}
                className="table-header"
              >
                {headerGroup.headers.map((column, j) => (
                  <th
                    key={j}
                    {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting on column header click
                    className="table-cell"
                  >
                    {column.render('Header')}
                    {/* <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="table-row">
                  {row.cells.map((cell, j) => (
                    <td key={j} {...cell.getCellProps()} className="table-cell">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(totalLength > 0 || activePageCount > 1) && (
        <Box sx={{
          mt: 2,
          display: display || 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <CustomPagination
            pageIndex={activePageIndex}
            pageCount={activePageCount}
            gotoPage={activeGotoPage}
            canPreviousPage={activeCanPreviousPage}
            canNextPage={activeCanNextPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomTable;
