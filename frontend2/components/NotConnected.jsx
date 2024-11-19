'use client'
import { Alert, AlertIcon, Flex, Box } from "@chakra-ui/react";

import React from 'react'

const NotConnected = () => {
    return (
        <Flex
        flex='1' direction="column" justify="center" align="center">
            <Box >
        <Alert status='warning'>
            <AlertIcon />
            Please Connect your Wallet
        </Alert>
        </Box>
        </Flex>
    )
}

export default NotConnected