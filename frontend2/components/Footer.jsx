'use client'

import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="2rem"
    >
      <Text>Anti-Fraud Corporate - Business Angel : Sam Altman - No copyrights &copy;
        {new Date().getFullYear()}
      </Text>


    </Flex>
  )
}

export default Footer