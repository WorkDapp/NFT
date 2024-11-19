'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Box
} from '@chakra-ui/react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddress, contractAbi } from '@/constants';

const Search = () => {
  const [vin, setVin] = useState('');
  const [enable, setEnable] = useState(false);
  const { address } = useAccount();

  const { data: dataVehicle, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getMileageByVIN',
    args: [vin],
    query: {
      enabled: enable,
    },
  });

  const handleSearch = async () => {
    setEnable(true);
    await refetch();
    setEnable(false);
  };

  const data = dataVehicle && {
    labels: dataVehicle.map((data) => new Date(Number(data.timestamp) * 1000).toLocaleString()),
    datasets: [
      {
        label: 'Kilométrage',
        data: dataVehicle.map((data) => Number(data.mileage)),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historique du kilométrage',
      },
    },
  };

  return (
    <Flex flex='1' direction="column" justify="center" align="center" p="2rem">
      <Text
        p="2rem"
        bgGradient="linear(to-r, #bae5fc,  #44a06e )"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        align="center"
      >
        Rechercher le kilométrage d'un véhicule
      </Text>
      <InputGroup size="md" w="500px">
        <Input
          placeholder="Veuillez écrire le VIN du véhicule"
          size="md"
          onChange={(e) => setVin(e.target.value)}
        />
        <InputRightElement width="auto">
          <Button size="md" colorScheme="teal" onClick={handleSearch}>
            Rechercher
          </Button>
        </InputRightElement>
      </InputGroup>

      {dataVehicle && dataVehicle.length > 0 && (
        <Box w="600px" mt="4">
          <Line data={data} options={options} />
        </Box>
      )}
    </Flex>
  );
};

export default Search;
