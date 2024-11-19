const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Storage Tests", function () {

  let owner;
  let addr1;
  let addr2;
  let addr3;
  let storage;

  async function deployStorage() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    //je recupere le contract nommé Storage
    const Storage = await ethers.getContractFactory("Storage");
    // je recupere le contract et je le deploy
    const storage = await Storage.deploy();

    return {storage, owner, addr1, addr2, addr3};
  }
  // la fonction deployStorage est appelé à chaque test
  //tester le deployment du contract 

  //test par rapport au ployement, décrir les tests
  describe('Deployment',function(){
    beforeEach(async function(){
      const fixture  = await loadFixture(deployStorage);
      storage = fixture.storage;
      owner = fixture.owner;
      addr1 = fixture.addr1;
      addr2 = fixture.addr2;
      addr3 = fixture.addr3;


    })
    it('enregistrement correct', async function() {
      const vin = "123H";
      await storage.storeVehicule(vin, addr1.address);
      const hashVin = ethers.keccak256(ethers.toUtf8Bytes(vin));
      assert(await storage.getVehicleAddressByVINHash(hashVin) === addr1.address);
    });

    it('stockage multiple', async function() {
      const vin1 = "123H";
      await storage.storeVehicule(vin1, addr1.address);
      await storage.connect(addr1).storeData("1000");
      await storage.connect(addr1).storeData("2000");
      const vehicleData = await storage.getMileageByVIN(vin1);
      assert(vehicleData[0].mileage == 1000);
      assert(vehicleData[1].mileage == 2000);
      

  })
});
});
