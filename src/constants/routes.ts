export enum ROUTES {
  // !----- User Endpoints ------
  LOGIN = "auth/login",
  REGISTER = "auth/register",
  TOKEN_REFRESH = "auth/refresh",
  RESET_PASSWORD = "auth/password/reset",
  CHANGE_PASSWORD = "auth/password/change",
  SEND_PASSWORD_CODE = "auth/password/code",
  CREATE_NEW_PASSWORD = "auth/password/create-password",

  PROJECT = "project/",
  JOBS = "jobs/",
  CANDIDATES = "candidates/",
  WEBSITE = "website/",
  // !----- Company Endpoints ------
  USER = "user/",
  // !----- All Endpoints ------
  SUPPLIER = "supplier/",
  CUSTOMER = "customer/",
  TENDER = "tender/",
  TENDER_ADD = "group/tender/add/",
  TENDER_REMOVE = "group/tender/remove/",
  INVENTORY = "inventory/",
  INVENTORY_ITEMS = "inventory/items/",
  INVENTORY_ITEM = "inventory_item/",
  NOTIFICATIONS = "notifications/"
}
