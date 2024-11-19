'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  hardhat,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'cc9d5ebd580cd9f2af4056edfb834574',
  chains: [hardhat, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

import { ChakraProvider } from "@chakra-ui/react";
import Layout from '@/components/Layout';

export default function RootLayout({
  children}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider>
            <Layout>
              {children}
            </Layout>
          </ChakraProvider>
        </RainbowKitProvider>
        </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
