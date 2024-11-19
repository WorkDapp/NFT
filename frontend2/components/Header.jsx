'use client'

import { Flex, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Image } from "@chakra-ui/react";
import NextLink from 'next/link';


const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="2rem"
      borderBottom="1px solid black"
    >
      <Button as={NextLink} href="/" p={0} bg="transparent" border="none">
      <Image borderRadius='full' boxSize='100px' src="https://images.pexels.com/photos/3158136/pexels-photo-3158136.jpeg?auto=compress&cs=tinysrgb&w=400" alt="logo" />
      </Button>
      <Button as={NextLink} href="/Recherche" colorScheme='teal' variant='outline'>
        Recherche
      </Button>
      <Button as={NextLink} href="/Enregistrement" colorScheme='teal' variant='outline'>
        Enregistrement
      </Button>
      <ConnectButton />
    </Flex>
  )
}

export default Header