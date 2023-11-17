const { faker } = require("@faker-js/faker");

module.exports = {
  tvl: {
    value: faker.finance.amount({
      min: 1000000000,
      max: 10000000000,
      dec: 2,
      symbol: "$",
    }),
    shift: "-3.44%",
  },
  avg_price: {
    value: faker.finance.amount({
      min: 9,
      max: 15,
      dec: 2,
      symbol: "$",
    }),
    shift: "-10.1%",
  },
  token_holders: { value: "56791", shift: "0.8%" },
  active_wallets: { value: "12777", shift: "2.7%" },
  transactions: { value: "923910", shift: "1.66%" },
  fees: { value: "85151.9571ETH", shift: "4.03%" },
  avg_fee: { value: "0.09ETH", shift: "0.07%" },
  staked_tokens: { value: "7500000ETH", shift: "-1.11%" },
  curculated_tokens: { value: "2500000ETH", shift: "1.48%" },
  supplied_tokens: { value: "10000000ETH", shift: "0%" },
  total_tokens: { value: "infinit", shift: "0%" },
  inflation: { value: "0.7%", shift: "0%" },
  ratio_apr: { value: "1.5%", shift: "15.09%" },
  validators: { value: "85100", shift: "0.04%" },
  staking_reward: { value: "4.9%", shift: "-0.73%" },
};
