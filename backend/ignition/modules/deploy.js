const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("StorageModule", (m) => {
  

  const Storage = m.contract("Storage");

  return { Storage };
});
