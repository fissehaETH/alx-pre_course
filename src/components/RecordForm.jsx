import React, { useState } from "react";

const formatLabel = (value) => value.replace(/_/g, " ");

const RecordForm = ({ sheetName, columns, onSubmit, disabled }) => {
  const [formData, setFormData] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column] = "";
      return acc;
    }, {})
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h3>Add {sheetName} Record</h3>
          <p>Send a new record to Google Sheets via Apps Script.</p>
        </div>
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Save Record
        </button>
      </div>
      <div className="form-grid">
        {columns.map((column) => (
          <label key={column}>
            {formatLabel(column)}
            <input
              name={column}
              value={formData[column]}
              onChange={handleChange}
              placeholder={`Enter ${formatLabel(column)}`}
            />
          </label>
        ))}
      </div>
    </form>
  );
};

export default RecordForm;
