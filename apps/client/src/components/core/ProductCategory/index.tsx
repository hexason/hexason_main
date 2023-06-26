import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Highlight from "./Highlight";
import { HighlightCard, HomeHighlightType } from "./type";
import CategiorySection from "./CategiorySection";
import { useQuery } from "@apollo/client";
import { getHighestViewedProductGQL } from "@/lib/Services";
import { Product } from "@/lib/types";

const array: Array<HighlightCard> = [
  {
    id: "1",
    name: "Element 1",
    imgUrl: "https://picsum.photos/300",
  },
  {
    id: "2",
    name: "Element 2",
    imgUrl: "https://picsum.photos/300",
  },
  {
    id: "3",
    name: "Element 3",
    imgUrl: "https://picsum.photos/300",
  },
  {
    id: "4",
    name: "Element 4",
    imgUrl: "https://picsum.photos/300",
  },
  {
    id: "5",
    name: "Element 5",
    imgUrl: "https://picsum.photos/300",
  },
];

const Test1: HomeHighlightType = {
  name1: "Test1",
  name2: "Test1-2",
  color: "red",
  size: 2,
  data: array,
};

const Test2: HomeHighlightType = {
  name1: "Test2",
  name2: "Test2-2",
  color: "red",
  size: 5,
  data: array,
};

const ProductCategory = () => {
  const { data, loading } = useQuery<{ getHighestViewedProduct: Product[] }>(getHighestViewedProductGQL)

  return (
    <SimpleGrid columns={7}>
      <GridItem colSpan={2}>
        <CategiorySection />
      </GridItem>
      <GridItem p={4} colSpan={5}>
        <SimpleGrid columns={2} spacing={4}>
          <GridItem>
            <Highlight data={
              {
                name1: "Онцлох",
                name2: "Эрэлттэй",
                color: "red",
                size: 2,
                data: data?.getHighestViewedProduct.map(el => ({ id: el.id, name: el.id, imgUrl: el.image })) || []
              }
            }
            />
          </GridItem>
          <GridItem>
            <Highlight data={
              {
                name1: "Онцлох",
                name2: "Санал болгох",
                color: "blue",
                size: 2,
                data: data?.getHighestViewedProduct.map(el => ({ id: el.id, name: el.id, imgUrl: el.image })) || []
              }
            } />
          </GridItem>
          <GridItem colSpan={2}>
            <Highlight data={
              {
                name1: "Таньд",
                name2: "Санал болгох",
                color: "red",
                size: 5,
                data: data?.getHighestViewedProduct.map(el => ({ id: el.id, name: el.id, imgUrl: el.image })) || []
              }
            } />
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProductCategory;
