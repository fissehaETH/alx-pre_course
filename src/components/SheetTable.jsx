import React from "react";

const SheetTable = ({ columns, rows, emptyMessage }) => (
  <div className="table-card">
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={`${row.id || row[columns[0]] || index}-${index}`}>
                {columns.map((column) => (
                  <td key={column}>{row[column] ?? "-"}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default SheetTable;
