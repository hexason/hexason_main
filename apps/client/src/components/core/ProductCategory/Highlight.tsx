import {
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { HomeHighlightType } from "./type";
import HighlightCard from "./HighlightCard";
import Link from "next/link";

const Highlight = ({
  data: { name1, name2, color, data, size },
}: {
  data: HomeHighlightType;
}) => {
  const localData = data.slice(0, size);
  return (
    <Stack p={4} borderRadius="xl" bg="hexhighligth.200">
      <HStack>
        <Text>{name1}</Text>
        <Tag colorScheme={color}>{name2}</Tag>
      </HStack>
      <SimpleGrid columns={size} spacing={4}>
        {localData.map((e) => (
          <GridItem as={Link} href={"/shop/" + e.id} key={e.id}>
            <HighlightCard data={e} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Highlight;
