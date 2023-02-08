import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaAccusoft, FaWallet } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import { useCurrencyFormat } from '../../utils/CurrencyFormat';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
 
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel opacity={0.5} fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          opacity={0.5}
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Balance() {
  const formatter = useCurrencyFormat()
  const {wallet, products} = useUser();
  return (
    <Box maxW="100%" mx={'auto'}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        pb={6}
        fontWeight={'bold'}>
        Your Status Champ 🏆
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Total Balance'}
          stat={formatter(wallet.balance, "short")}
          icon={<FaWallet size={'3em'} />}
        />
        <StatsCard
          title={'Investor Card'}
          stat={products.length.toString()}
          icon={<FaAccusoft size={'3em'} />}
        />
        <StatsCard
          title={'Total Earnings'}
          stat={formatter(wallet.total_earned, "short")}
          icon={<BsCurrencyDollar size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  );
}