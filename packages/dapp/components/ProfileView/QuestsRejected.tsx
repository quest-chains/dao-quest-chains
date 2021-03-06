import { WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { UploadProof } from '@/components/UploadProof';
import { QuestStatusInfoFragment } from '@/graphql/types';
import { useUserQuestsRejectedForAllChains } from '@/hooks/useUserQuestsRejectedForAllChains';

export const QuestRejectedStatus: React.FC<{
  quest: QuestStatusInfoFragment;
  address: string;
  refresh: () => void;
}> = ({ quest, address, refresh }) => (
  <Box background="rgba(180, 83, 9, 0.3)" p={8} maxW="32rem">
    <Flex alignItems="center" mb={3}>
      <WarningTwoIcon color="#F59E0B" mr={3} />

      <Text fontWeight="bold" fontSize={16}>
        Submission in {quest.questChain.name} rejected
      </Text>
    </Flex>
    <Text>
      Your submission of proof for {quest.quest.name} was rejected, with the
      following explanation:{' '}
    </Text>
    <Text fontWeight="bold" mb={3}>
      {quest.reviews.slice(-1)[0].description}
    </Text>
    <UploadProof
      address={address}
      questId={quest.quest.questId}
      questChainId={quest.questChain.chainId}
      questChainAddress={quest.questChain.address}
      name={quest.quest.name}
      refresh={refresh}
      profile
    />
  </Box>
);

export const QuestsRejected: React.FC<{
  address: string;
}> = ({ address }) => {
  const {
    results: questsRejected,
    fetching,
    refresh,
  } = useUserQuestsRejectedForAllChains(address);

  const {
    isOpen: isOpenSeeAll,
    onOpen: onOpenSeeAll,
    onClose: onCloseSeeAll,
  } = useDisclosure();

  return (
    <VStack spacing={4} align="stretch">
      {fetching ? (
        <Spinner color="main" ml={4} />
      ) : (
        <>
          {questsRejected.length === 0 && (
            <Text color="white" ml={4}>
              No rejected quests
            </Text>
          )}
          {questsRejected.length > 2 && (
            <Button
              variant="ghost"
              whiteSpace="nowrap"
              fontWeight="bold"
              color="main"
              borderRadius="3xl"
              onClick={onOpenSeeAll}
            >
              SEE ALL
            </Button>
          )}
          <SimpleGrid gap={8} columns={{ base: 1, md: 2 }}>
            {questsRejected.slice(0, 2).map(quest => (
              <QuestRejectedStatus
                key={quest.id}
                quest={quest}
                address={address}
                refresh={refresh}
              />
            ))}
          </SimpleGrid>
        </>
      )}

      <Modal isOpen={isOpenSeeAll} onClose={onCloseSeeAll}>
        <ModalOverlay />
        <ModalContent maxW="72rem">
          <ModalHeader>My Submissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid gap={8} columns={{ base: 1, md: 2 }}>
              {questsRejected.slice(0, 2).map(quest => (
                <QuestRejectedStatus
                  key={quest.id}
                  quest={quest}
                  address={address}
                  refresh={refresh}
                />
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
