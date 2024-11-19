require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  networks: {
    solana: {
      url: "https://api.mainnet-beta.solana.com",
      accounts: [],
    },
  },
  

  gasReporter: {
    enabled:true,
    currency:"USD",
    outputFile:"gas-report-eth.txt",
    noColors:true,
    coinmarketcap:"2fa33512-6728-4004-8b6c-0df1f54111d2",
    token:"ETH"
  },
};
