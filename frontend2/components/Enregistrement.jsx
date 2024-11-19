'use client'

import { useState, useEffect } from "react";

import {Flex, Text, Button, Spinner, useToast, InputGroup, Input, InputRightElement, Card} from "@chakra-ui/react";

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi} from "@/constants";

import Information from "@/components/Information";





const Enregistrement = () => {

  const [addressVehicule, setAddress] = useState('');
  const [vin, setVin] = useState('');

  const { address } = useAccount();

  const { data: hash, isPending, error, writeContract } = useWriteContract();


  const handleRegister = async() => {

    
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName:'storeVehicule',
      args: [vin, addressVehicule],
      account: address
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({ hash })

  return (
    
    <Flex flex='1' direction="column" justify="center" align="center" >
      <Text p="4rem" bgGradient='linear(to-r, #bae5fc,  #44a06e )'
      bgClip='text'
      fontSize='6xl'
      fontWeight='extrabold'
      align="center">
        Ajouter un véhicule à la blockchain
      </Text>
    <InputGroup p="2rem" size="md" w="500px">
      <Input
        placeholder="Veuillez ecrire l'addresse du véhicule"
        size="md"
        onChange={(e) => setAddress(e.target.value)}
      />
    </InputGroup>

    <InputGroup p="2rem" size="md" w="500px">
      <Input
        placeholder="Veuillez ecrire le VIN du véhicule"
        size="md"
        onChange={(e) => setVin(e.target.value)}
      />
    </InputGroup>
    <Button colorScheme="teal" onClick={handleRegister} disabled={isPending}>
          {isPending ? 'Enregistrement..' : 'Enregistrer'}
    </Button>

    <Information p="2rem" hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed}
      error={error}/>

  </Flex>

  )
}

export default Enregistrement