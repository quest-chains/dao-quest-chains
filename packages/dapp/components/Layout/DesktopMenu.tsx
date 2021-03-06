import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ConnectWallet } from '@/components/Layout/ConnectWallet';
import { WalletDisplay } from '@/components/Layout/WalletDisplay';
import { useWallet } from '@/web3';

export const DesktopMenu: React.FC<{ onSearchOpen: () => void }> = ({
  onSearchOpen,
}) => {
  const { address, isConnected } = useWallet();
  const router = useRouter();

  const isSmallerScreen = useBreakpointValue({ base: true, xl: false });

  return (
    <Flex zIndex={2} justify="space-between" w="full" pl={10}>
      <Button
        color="whiteAlpha.800"
        bgColor="whiteAlpha.200"
        border="none"
        borderRadius="8px"
        fontWeight="light"
        onClick={onSearchOpen}
        minW="7.5rem"
        justifyContent="flex-start"
        px={8}
      >
        <SearchIcon color="white" mr={3} />
        <Text fontSize="xs" fontWeight="700" color="whiteAlpha.600">
          {isSmallerScreen ? 'search' : 'search chains by name or description'}
        </Text>
      </Button>

      <HStack gap={2}>
        {isConnected && (
          <NextLink href={`/profile/${address}`} passHref>
            <Text
              px={1}
              cursor="pointer"
              boxShadow={
                router.query.address === address
                  ? '0 4px 2px -2px #1f7165'
                  : 'none'
              }
              fontWeight="700"
              color="main"
            >
              {isSmallerScreen ? 'Profile' : 'My Profile'}
            </Text>
          </NextLink>
        )}
        <NextLink href="/explore" passHref>
          <Text
            px={1}
            cursor="pointer"
            boxShadow={
              router.pathname === '/explore' ? '0 4px 2px -2px #1f7165' : 'none'
            }
            color="main"
            fontWeight="700"
          >
            {isSmallerScreen ? 'Explore' : 'Explore'}
          </Text>
        </NextLink>
        <NextLink href="/create" passHref>
          <Button
            borderWidth={1}
            borderColor="white"
            px={5}
            py={2}
            borderRadius="full"
            bgColor={router.pathname === '/create' ? '#1f716540' : 'none'}
          >
            <Text cursor="pointer" fontWeight="700" color="white">
              {isSmallerScreen ? 'Create' : 'Create a chain'}
            </Text>
          </Button>
        </NextLink>
        <Flex pl={10}>
          {isConnected ? <WalletDisplay /> : <ConnectWallet />}
        </Flex>
      </HStack>
    </Flex>
  );
};
