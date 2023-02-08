const { expect } = require('chai');
const Api = require('../../src/api');
let api;

const transaction = {
  accounts: [
    {
      account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
      balances: {
        available: 110,
        current: 110,
        iso_currency_code: 'USD',
        limit: null,
        unofficial_currency_code: null,
      },
      mask: '0000',
      name: 'Plaid Checking',
      official_name: 'Plaid Gold Standard 0% Interest Checking',
      subtype: 'checking',
      type: 'depository',
    },
  ],
  transactions: [
    {
      account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
      amount: 2307.21,
      iso_currency_code: 'USD',
      unofficial_currency_code: null,
      category: ['Shops', 'Computers and Electronics'],
      category_id: '19013000',
      check_number: null,
      date: '2017-01-29',
      datetime: '2017-01-27T11:00:00Z',
      authorized_date: '2017-01-27',
      authorized_datetime: '2017-01-27T10:34:50Z',
      location: {
        address: '300 Post St',
        city: 'San Francisco',
        region: 'CA',
        postal_code: '94108',
        country: 'US',
        lat: 40.740352,
        lon: -74.001761,
        store_number: '1235',
      },
      name: 'Apple Store',
      merchant_name: 'Apple',
      payment_meta: {
        by_order_of: null,
        payee: null,
        payer: null,
        payment_method: null,
        payment_processor: null,
        ppd_id: null,
        reason: null,
        reference_number: null,
      },
      payment_channel: 'in store',
      pending: false,
      pending_transaction_id: null,
      account_owner: null,
      transaction_id: 'lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDjk',
      transaction_code: null,
      transaction_type: 'place',
    },
    {
      account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
      amount: 2307.21,
      iso_currency_code: 'USD',
      unofficial_currency_code: null,
      category: ['Shops', 'Computers and Electronics'],
      category_id: '19013000',
      check_number: null,
      date: '2017-01-29',
      datetime: '2017-01-27T11:00:00Z',
      authorized_date: '2017-01-27',
      authorized_datetime: '2017-01-27T10:34:50Z',
      location: {
        address: '300 Post St',
        city: 'San Francisco',
        region: 'CA',
        postal_code: '94108',
        country: 'US',
        lat: 40.740352,
        lon: -74.001761,
        store_number: '1235',
      },
      name: 'Apple Store',
      merchant_name: 'Apple',
      payment_meta: {
        by_order_of: null,
        payee: null,
        payer: null,
        payment_method: null,
        payment_processor: null,
        ppd_id: null,
        reason: null,
        reference_number: null,
      },
      payment_channel: 'in store',
      pending: false,
      pending_transaction_id: null,
      account_owner: null,
      transaction_id: 'lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje',
      transaction_code: null,
      transaction_type: 'place',
    },
  ],
  item: {
    available_products: ['balance', 'identity', 'investments'],
    billed_products: ['assets', 'auth', 'liabilities', 'transactions'],
    consent_expiration_time: null,
    error: null,
    institution_id: 'ins_3',
    item_id: 'eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6',
    update_type: 'background',
    webhook: 'https://www.genericwebhookurl.com/webhook',
  },
  total_transactions: 2,
  request_id: '45QSn',
};

describe('User verifies Plaid API', async () => {
  before(async () => {
    //Actions to perform before each tests
    api = new Api();
  });
  after(async () => {
    //Actions to perform after each tests
  });

  it('Verify current balance is not greater than available balance', async () => {
    let resp = transaction;

    resp.accounts.forEach(function (accountData, index) {
      let verifyBalance;
      let currentBal = accountData.balances.current;
      console.log(`account[${index}]currentBal = ${currentBal}`);
      let availableBal = accountData.balances.available;
      console.log(`account[${index}]availableBal = ${availableBal}`);

      if (currentBal <= availableBal) {
        verifyBalance = true;
      } else {
        verifyBalance = false;
      }
      expect(verifyBalance).to.be.true;
    });
  });

  it('Verify valid iso_currency_code code for each transaction', async () => {
    let validCurrencyCode = ['USD', 'EU', 'GBP'];
    let isValidCurrencyCode = false;
    let resp = transaction;

    resp.transactions.forEach(function (transactionData, index) {
      let transCurrency = transactionData.iso_currency_code;
      console.log(`transCurrency[${index}] = ${transCurrency}`);
      expect(validCurrencyCode).to.include(transCurrency);
    });
  });

  it('Verify each payment_meta property set to null inside of each transaction', async () => {
    let resp = transaction;

    resp.transactions.forEach(function (transactionData, index) {
      console.log(`transaction[${index}]paymentMetaData:`);
      let paymentMetaData = transactionData.payment_meta;
      for (const key in paymentMetaData) {
        console.log(`     ${key} is ${paymentMetaData[key]}`);
        expect(paymentMetaData[key]).to.be.null;
      }
    });
  });
});

it('Verify valid available product types', async () => {
  let expectedProducts = ['balance', 'identity', 'investments'];
  let resp = transaction;

  let availableProducts = resp.item.available_products;
  console.log(`availableProducts = ${availableProducts}`);
  console.log(`expectedProducts = ${expectedProducts}`);

  expect(availableProducts).to.deep.equal(expectedProducts);
});

it('Verify webhook link is a valid link type', async () => {
  let resp = transaction;

  let webhookProtocol = resp.item.webhook.substring(0, 6);
  console.log(`webhookProtocol = ${webhookProtocol}`);
  expect(webhookProtocol).to.equal('https:');
});
