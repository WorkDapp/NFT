'use client';

import { Flex, Text, Box, Button} from "@chakra-ui/react";


import { useAccount } from "wagmi";

import NextLink from 'next/link';




export default function Home() {

  return (
    <Flex
      flex='1'
      direction="column" justify="center" align="center"
      bgGradient='linear(to-bl, #eaf9f1,  #f8e2f6 )'
    >
      <Text 
      bgGradient='linear(to-r, #bae5fc,  #44a06e )'
      bgClip='text'
      fontSize='6xl'
      fontWeight='extrabold'
      align="center"
      p="2rem"
      >
        Application decentralisée pour la vente de véhicule d'occasion
      </Text>
      <Box>
      <Button as={NextLink} href="/Recherche" colorScheme='teal' variant='outline' size='lg' marginRight="40px">
      Rechercher
    </Button>
    <Button as={NextLink} href="/Enregistrement" colorScheme='teal' variant='outline' size='lg'>
    Enregistrer
  </Button>
      </Box>
    </Flex>

  );
}
