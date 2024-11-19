// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

error VehiculeStore();
error NoVehicule();

contract Storage is Ownable {
    
    struct VehicleData {
        uint256 mileage;
        uint256 timestamp;
    }

    mapping(bytes32 => address) private vinToAddress;
    mapping(address => VehicleData[]) private vehicleData;
    
    constructor() Ownable(msg.sender) {

    }

    function storeVehicule(
        string memory _vin,
        address addressVehicule
    ) public onlyOwner {

        bytes32 hashVin = keccak256(abi.encodePacked(_vin));
        if (vinToAddress[hashVin] != address(0)){
            revert VehiculeStore();
        }
        vinToAddress[hashVin] = addressVehicule;
    }

    function storeData(uint256 _mileage) external {
        vehicleData[msg.sender].push(VehicleData(_mileage, block.timestamp));
    }

    function getMileageByVIN(string memory _vin) public view returns (VehicleData[] memory) {

        bytes32 hashVin = keccak256(abi.encodePacked(_vin));
        address vehicleAddress = vinToAddress[hashVin];

        if (vehicleAddress == address(0)){
            revert NoVehicule();
        }
        return vehicleData[vehicleAddress];
    }
    function getVehicleAddressByVINHash(bytes32 hashVin) public view returns (address) {
        return vinToAddress[hashVin];
    }

    function getVehicleDataByAddress(address vehicleAddress) public view returns (VehicleData[] memory) {
        return vehicleData[vehicleAddress];
    }
}
