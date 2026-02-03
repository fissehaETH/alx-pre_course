# Solomon Building Materials Shop

A React-based sales and inventory dashboard that connects to Google Sheets via Apps Script. Use it to manage products, sales, purchases, customers, and users for **Solomon Building Materials Shop**.

## Features

- Google Sheets connection status + manual refresh
- Dedicated workspaces for Products, Sales, Purchases, Customers, and Users
- Quick summary metrics for stock, sales revenue, and purchases
- Form-driven data entry that posts to Apps Script

## Quick start

```bash
npm install
npm run dev
```

## Configure Google Sheets

1. Create an Apps Script web app that exposes your Google Sheets.
2. Set an environment variable with your deployment URL:

```bash
VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

3. Ensure your script accepts requests in the following format:
   - `GET ?sheet=Products&action=list` returns JSON data.
   - `POST ?sheet=Products&action=create` accepts a JSON body for new rows.
   - `PUT ?sheet=Products&action=update` updates rows.
   - `DELETE ?sheet=Products&action=delete` removes rows.

## Sheet schemas

- **Products**: product_id, product_name, category, unit, unit_price, stock_qty, min_stock, created_at
- **Sales**: sale_id, date, product_id, product_name, quantity, unitPrice, customer_name, payment_method, recorded_by
- **Purchases**: purchase_id, date, product_id, quantity, unit_cost, total_cost
- **Customers**: customer_id, customer_name, phone, address, created_at
- **Users**: user_id, username, password, role, created_at
