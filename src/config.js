export const APP_CONFIG = {
  name: "Solomon Building Materials Shop",
  appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL ||
    "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
};

export const SHEETS = {
  Products: {
    label: "Products",
    columns: [
      "product_id",
      "product_name",
      "category",
      "unit",
      "unit_price",
      "stock_qty",
      "min_stock",
      "created_at"
    ]
  },
  Sales: {
    label: "Sales",
    columns: [
      "sale_id",
      "date",
      "product_id",
      "product_name",
      "quantity",
      "unitPrice",
      "customer_name",
      "payment_method",
      "recorded_by"
    ]
  },
  Purchases: {
    label: "Purchases",
    columns: [
      "purchase_id",
      "date",
      "product_id",
      "quantity",
      "unit_cost",
      "total_cost"
    ]
  },
  Customers: {
    label: "Customers",
    columns: [
      "customer_id",
      "customer_name",
      "phone",
      "address",
      "created_at"
    ]
  },
  Users: {
    label: "Users",
    columns: [
      "user_id",
      "username",
      "password",
      "role",
      "created_at"
    ]
  }
};
