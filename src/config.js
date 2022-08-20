import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiHost: process.env.REACT_APP_API_HOST,
  siteTitle: process.env.REACT_APP_SITE_TITLE,
  globalOngkir: process.env.REACT_APP_GLOBAL_ONGKIR,
  owner: process.env.REACT_APP_OWNER,
  contact: process.env.REACT_APP_CONTACT,
  billing: {
    account_no: process.env.REACT_APP_API_HOST,
    bank_name: process.env.REACT_APP_BILLING_BANK,
  },
};

export default config;
