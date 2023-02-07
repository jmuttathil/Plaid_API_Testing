const { expect } = require('chai');
const Api = require('../../src/api');
const moment = require('moment');
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

describe('User verifies github scenarios', async () => {
  before(async () => {
    //Actions to perform before each tests
    api = new Api();
  });
  after(async () => {
    //Actions to perform after each tests
  });

  it('can verify search repositories', async () => {
    const resp = await api.searchRepositories('postman', 'asc', '1');
    // console.log(
    //     '\x1b[36m### Resp: %s\x1b[0m',
    //     JSON.stringify(resp, null, 2)
    //   );

    expect(resp.total_count).to.be.greaterThan(32550);
    expect(resp.incomplete_results).to.be.false;
    expect(resp.items).to.be.an('array');
    expect(resp.items[0].node_id).to.equal('MDEwOlJlcG9zaXRvcnkyNjU3ODI5NzM=');
  });

  it('can verify topics values', async () => {
    const resp = await api.searchRepositories('postman', 'asc', '1');
    //TODO Verify topics array to have 2 values and values should be [chinese, postman]

    const topics = resp.items[0].topics;
    expect(topics).to.be.an('array');
    expect(topics).to.have.lengthOf(2);

    const expectedTopics = ['chinese', 'postman'];
    expect(topics).to.deep.equal(expectedTopics);
  });

  it('can verify user login details', async () => {
    const resp = await api.getUserInfo('mmuntakim15');

    expect(resp.login).to.equal('mmuntakim15');
    //TODO verify id value
  });

  it('can verify user login details', async () => {
    const resp = await api.getUserInfo('mmuntakim15');

    expect(resp.login).to.equal('mmuntakim15');
    //TODO verify id value
  });

  it('Verify created date timestamp', async () => {
    const resp = await api.searchRepositories('postman', 'asc', '1');

    const item = resp.items[0];

    let createdAt = moment(item.created_at);
    let updatedAt = moment(item.updated_at);

    let isAfter = updatedAt.isAfter(createdAt);
    expect(isAfter).to.be.true;
  });

  it('Verify user is able to create new repo', async () => {
    const resp = await api.createNewRepo('Hello-World-42');
    expect(resp.owner.login).to.equal(process.env.USERNAME);
    //TODO verify id value
    expect(resp.owner.id).to.equal(114625281);
  });

  it('Verify user is able to update a repo', async () => {
    let owner = 'jmuttathil';
    let oldRepoName = 'Hello-World-43';
    let newRepoName = 'Hello-World-42';

    const resp = await api.updateRepo(owner, oldRepoName, newRepoName);
    console.log(resp);
    expect(resp.name).to.equal(newRepoName);
  });

  it.only('Verify current balance is not greater than available balance', async () => {
    let resp = transaction;
    //TODO Write your test here
resp.forEach(

    let currentBal = resp.accounts.balances.current;
    let availableBal = resp.accounts.balances.available;
    if (currentBal <= availableBal) {
      let verifyBalance = true;
    } else {
      let verifyBalance = false;
    }
    expect(verifyBalance).to.be.true;
  });
)
  it('Verify valid iso_currency_code code for each transaction', async () => {
    let validCurrencyCode = ['USD', 'EU', 'GBP'];
    let resp = transaction;

    //TODO Write your test here
  });
});

/*

Homework #1
1. Create new test file and import all necessary files and library you need to build and execute your tests
2. Write a new test which validates search repository created_at date is not greater than updated_at date
https://momentjs.com/docs/ 

Homework#2
1. Implement basic authentication on api.js file
2. Implement POST create repository endpoint which takes body parameters

*/
