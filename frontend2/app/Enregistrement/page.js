'use client';
import Layout from "@/components/Layout";
import NotConnected from "@/components/NotConnected";
import Enregistrement from "@/components/Enregistrement";

import { useAccount } from "wagmi";

import { Flex } from "@chakra-ui/react";


export default function Home() {

  const { address, isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <Enregistrement />
      ) : (

        <NotConnected />
      )}
    </>
  );
}
