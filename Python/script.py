import json
from web3 import Web3

# URL du point d'entrée
node_url = "http://127.0.0.1:8545"

# Créer la connexion avec le noeud
web3 = Web3(Web3.HTTPProvider(node_url))

if not web3.is_connected():
    print("Connexion au noeud échouée")
    exit()

print("Connexion au noeud réussie")

# Adresse du contrat déployé et ABI
contract_address = web3.to_checksum_address('0x5fbdb2315678afecb367f032d93f642f64180aa3')
abi = json.loads('''[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "NoVehicule",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "VehiculeStore",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_vin",
          "type": "string"
        }
      ],
      "name": "getMileageByVIN",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "mileage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct Storage.VehicleData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_mileage",
          "type": "uint256"
        }
      ],
      "name": "storeData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_vin",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "addressVehicule",
          "type": "address"
        }
      ],
      "name": "storeVehicule",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]''')

# J'instancie le contrat
contract = web3.eth.contract(address=contract_address, abi=abi)

# Adresse qui va appeler la fonction et signer la transaction
public_key = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
private_key = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"

for i in range(1000, 5001, 1000):
    # Construire la transaction
    transaction = contract.functions.storeData(i).build_transaction({
        'from': public_key,
        'nonce': web3.eth.get_transaction_count(public_key),
        'gas': 2000000,
        'gasPrice': web3.to_wei('50', 'gwei')
    })
    
    # Signer la transaction
    signed_txn = web3.eth.account.sign_transaction(transaction, private_key)
    
    # Envoyer la transaction
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    # Attendre que la transaction soit minée
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    print(f'Transaction {i} minée: {receipt.transactionHash.hex()}')


