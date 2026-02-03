import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import SheetTable from "./components/SheetTable.jsx";
import RecordForm from "./components/RecordForm.jsx";
import { APP_CONFIG, SHEETS } from "./config.js";
import { createSheetRecord, fetchSheetData } from "./services/googleSheetsApi.js";

const SAMPLE_DATA = {
  Products: [
    {
      product_id: "P-001",
      product_name: "Portland Cement",
      category: "Cement",
      unit: "bag",
      unit_price: 10.5,
      stock_qty: 420,
      min_stock: 120,
      created_at: "2024-10-01"
    },
    {
      product_id: "P-002",
      product_name: "Iron Rod 12mm",
      category: "Steel",
      unit: "piece",
      unit_price: 7.25,
      stock_qty: 90,
      min_stock: 150,
      created_at: "2024-10-06"
    }
  ],
  Sales: [
    {
      sale_id: "S-101",
      date: "2024-10-15",
      product_id: "P-001",
      product_name: "Portland Cement",
      quantity: 45,
      unitPrice: 10.5,
      customer_name: "Grace Construction",
      payment_method: "Mobile Money",
      recorded_by: "Solomon"
    }
  ],
  Purchases: [
    {
      purchase_id: "PR-210",
      date: "2024-10-10",
      product_id: "P-002",
      quantity: 200,
      unit_cost: 6.5,
      total_cost: 1300
    }
  ],
  Customers: [
    {
      customer_id: "C-014",
      customer_name: "Grace Construction",
      phone: "+233 555 010 244",
      address: "Kumasi, Ghana",
      created_at: "2024-09-20"
    }
  ],
  Users: [
    {
      user_id: "U-001",
      username: "solomon",
      password: "********",
      role: "Admin",
      created_at: "2024-09-01"
    }
  ]
};

const statusBadge = (message, variant) => (
  <span className={`status ${variant}`}>{message}</span>
);

const App = () => {
  const [activeSheet, setActiveSheet] = useState("Products");
  const [sheetData, setSheetData] = useState(SAMPLE_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState("Never");

  const columns = SHEETS[activeSheet].columns;

  const summaryStats = useMemo(() => {
    const products = sheetData.Products || [];
    const sales = sheetData.Sales || [];
    const purchases = sheetData.Purchases || [];

    const lowStockCount = products.filter(
      (product) => Number(product.stock_qty) <= Number(product.min_stock)
    ).length;

    const salesTotal = sales.reduce(
      (acc, sale) => acc + Number(sale.quantity || 0) * Number(sale.unitPrice || 0),
      0
    );

    const purchaseTotal = purchases.reduce(
      (acc, purchase) => acc + Number(purchase.total_cost || 0),
      0
    );

    return [
      { label: "Products in Catalog", value: products.length, trend: 8 },
      { label: "Low Stock Alerts", value: lowStockCount, trend: -5 },
      { label: "Sales Revenue", value: `$${salesTotal.toFixed(2)}`, trend: 12 },
      { label: "Purchases Spend", value: `$${purchaseTotal.toFixed(2)}`, trend: 4 }
    ];
  }, [sheetData]);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = { ...sheetData };
      const sheetNames = Object.keys(SHEETS);

      await Promise.all(
        sheetNames.map(async (sheetName) => {
          const response = await fetchSheetData(APP_CONFIG.appsScriptUrl, sheetName);
          updatedData[sheetName] = response.data || response;
        })
      );

      setSheetData(updatedData);
      setLastSync(new Date().toLocaleString());
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createSheetRecord(
        APP_CONFIG.appsScriptUrl,
        activeSheet,
        payload
      );

      const nextRecords = [
        ...(sheetData[activeSheet] || []),
        response.data || payload
      ];
      setSheetData((prev) => ({
        ...prev,
        [activeSheet]: nextRecords
      }));
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className="app">
      <Header
        title={APP_CONFIG.name}
        subtitle="Track products, sales, purchases, customers, and staff in one place."
      />

      <section className="info-panel">
        <div>
          <h2>Google Sheets Connection</h2>
          <p>
            Update <strong>VITE_APPS_SCRIPT_URL</strong> in your environment to connect
            with your Apps Script deployment.
          </p>
        </div>
        <div className="status-group">
          {error
            ? statusBadge("Sync failed", "error")
            : statusBadge("Connected", "success")}
          <button
            className="btn btn-outline"
            type="button"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Sheets"}
          </button>
        </div>
        <p className="last-sync">Last sync: {lastSync}</p>
      </section>

      <SummaryCards stats={summaryStats} />

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Data Workspace</h2>
            <p>Manage data across Products, Sales, Purchases, Customers, and Users.</p>
          </div>
        </div>

        <Navigation
          items={Object.keys(SHEETS)}
          activeItem={activeSheet}
          onSelect={setActiveSheet}
        />

        {error && <div className="alert">{error}</div>}

        <div className="panel-content">
          <SheetTable
            columns={columns}
            rows={sheetData[activeSheet] || []}
            emptyMessage={`No ${activeSheet.toLowerCase()} records yet.`}
          />

          <RecordForm
            sheetName={activeSheet}
            columns={columns}
            onSubmit={handleCreateRecord}
            disabled={loading}
          />
        </div>
      </section>

      <section className="footer-note">
        <h3>Apps Script payload format</h3>
        <p>
          Expect JSON payloads that map to the sheet columns. Example for Sales:
          <code>{"{ sale_id, date, product_id, product_name, quantity, unitPrice, customer_name, payment_method, recorded_by }"}</code>
        </p>
      </section>
    </div>
  );
};

export default App;
