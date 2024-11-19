'use client';
import Layout from "@/components/Layout";
import NotConnected from "@/components/NotConnected";
import Search from "@/components/Search";

import { Flex } from "@chakra-ui/react";

import { useAccount } from "wagmi";


export default function Home() {

  const { address, isConnected } = useAccount();

  return (
        <>
        <Search />
     
      </>
  );
}
