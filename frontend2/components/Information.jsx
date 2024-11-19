'use client'

import { Alert, AlertIcon, Flex } from "@chakra-ui/react";


const Information = ({ hash, isConfirming, isConfirmed, error }) => {
    
  return (
    <Flex
    flex='1'
    >
    

    {isConfirming &&
    <Alert status='warning'>
    <AlertIcon />
    La transaction est entrain d'être confirmée.
    </Alert>
    }

    {isConfirmed &&
    <Alert status='warning'>
    <AlertIcon />
    La transaction a été confirmée.
    </Alert>
    }

    {error &&
    <Alert status='warning'>
    <AlertIcon />
        Erreur : {error.shortMessage || error.message}
    </Alert>
    }



    </Flex>
  )
}

export default Information