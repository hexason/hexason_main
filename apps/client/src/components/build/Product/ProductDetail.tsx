"use client";
import { useCurrencyFormat, useSelectedVariations } from "@/hooks";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Stack,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { QuantityController, ZoomImage } from "@/components/core";
import { useEffect, useState } from "react";
import { useBasket } from "@/context/BasketContext";
import { Product, Variation } from "@/lib/types";
import { useSupabaseClient, useUser } from "@/lib/supabase-react";
import { useOrder } from "@/context/OrderContext";
import { VendorScore } from "@/components/core/VendorScore";

export default function ProductDetail({ product }: { product: Product }) {
  const { updateProduct, updateLoading } = useBasket();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { openModal } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);
  const { selectedVariations, handleVariationSelect } = useSelectedVariations(
    product.items.length > 0 ? product.items[0].variations : []
  );
  const formatter = useCurrencyFormat();
  const getMatchingItem = () => {
    return (
      product.items.find((item) => {
        return item.variations.every((itemVariation) =>
          selectedVariations.some(
            (selectedVariation) =>
              selectedVariation.configId === itemVariation.configId &&
              selectedVariation.valueId === itemVariation.valueId
          )
        );
      }) || ({} as Record<string, any>)
    );
  };

  const customHandleVariant = (variation: Variation) => {
    setSelectedImage(variation?.mainImage);
    handleVariationSelect(variation);
  }

  const orderQuick = async () => {
    if (!user) {
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            (process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000") +
            "/shop/" +
            product.id,
        },
      });
      return;
    }
    if (!getMatchingItem()) return;
    openModal([
      {
        SKU: getMatchingItem().SKU,
        quantity,
      },
    ]);
  };

  return (
    <Container maxW="container.xl" my={3}>
      <Stack spacing={6} bg="#ffffffAB" p="3" borderRadius={"20px"}>
        <Grid gap="3" templateColumns={["repeat(1,1fr)", "repeat(6, 1fr)"]}>
          <GridItem colSpan={2}>
            <Stack position={"sticky"} top={5} right={0} bottom={0}>
              <AspectRatio ratio={1} borderRadius={"20px"} overflow={"hidden"}>
                <Box w="100%">
                  <ZoomImage
                    img={selectedImage || product.image}
                    zoomScale={3}
                    width={379}
                    height={379}
                  />
                </Box>
              </AspectRatio>
            </Stack>
          </GridItem>
          <GridItem as={Stack} p={3} colSpan={3}>
            <Stack h="100%" spacing={6}>
              <Stack>
                <Text color="black" fontSize={"1.5rem"} fontWeight={"bold"}>
                  {product.title}
                </Text>
                {product.sold && (
                  <Text fontSize={"1rem"} opacity={"0.5"}>
                    {formatter(product.sold, "short")} зарагдсан
                  </Text>
                )}
                <Tag fontWeight={"bold"} textTransform={"uppercase"} p={3}>
                  <Avatar mr={3} src={product.supplier.logo} size={"sm"} />
                  {product.supplier.name}
                </Tag>
                <HStack spacing={"10px"}>
                  <Text fontSize={"1.5rem"} color="hexmain.800">
                    {formatter(
                      getMatchingItem()?.price || product.price,
                      "short"
                    )}{" "}
                    ₮
                  </Text>
                </HStack>
              </Stack>
              <Stack>
                <Varaints
                  selectedVariations={selectedVariations}
                  handleVariationSelect={customHandleVariant}
                  product={product}
                />
                <Stack>
                  <Text>Тоо ширхэг:</Text>
                  <QuantityController
                    value={quantity}
                    onChange={(value) => setQuantity(value as number)}
                  />
                </Stack>
              </Stack>
              <HStack>
                <Button
                  onClick={() => {
                    updateProduct({
                      productId: product.id,
                      quantity,
                    });
                  }}
                >
                  Сагслах
                </Button>
                <Button onClick={orderQuick}>Шууд захиалах</Button>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem h="100%" colSpan={1}>
            <Box
              position={"sticky"}
              top={5}
              right={0}
              bottom={0}
              h="200px"
              w="100%"
              borderRadius={"5px"}
              bg="gray.200"
            >
              <Stack p={3}>
                <Box>{product.vendorDisplayName}</Box>
                <VendorScore score={parseInt(product?.vendorScore as any || 1)} />
              </Stack>
            </Box>
            {/* </Stack> */}
          </GridItem>
        </Grid>
        <Divider />
        <Stack alignItems={"center"} spacing={"0"}>
          {product.images.map((img, i) => (
            <Image
              width={600}
              height={400}
              unoptimized
              key={img.url + i}
              src={img.url}
              alt={product.title + `desc-${i}`}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

const Varaints = ({
  selectedVariations,
  handleVariationSelect,
  product,
}: any) => {
  const [allVariants, setAllVariants] = useState<Record<string, Variation[]>>(
    {}
  );
  // HashMaping all variants
  useEffect(() => {
    const variations = product.variations.reduce(
      (variants: any, variant: any) => {
        const configure = variants[variant.configName] || [];
        configure.push(variant);
        variants[variant.configName] = configure;
        return variants;
      },
      {}
    );
    setAllVariants(variations);
  }, [product]);

  if (!product) return null;
  return (
    <Box>
      {Object.keys(allVariants || {}).map((key: string) => {
        return (
          <Stack key={key} alignItems={"start"}>
            <Text w="150px">{key}:</Text>
            <Wrap>
              {allVariants[key].map((item) => (
                <Tag
                  key={item.configId + item.valueId}
                  cursor={"pointer"}
                  bg="hexmain.500"
                  mr={2}
                  opacity={
                    selectedVariations.some(
                      (v: any) =>
                        v.configId === item.configId &&
                        v.valueId === item.valueId
                    )
                      ? 1
                      : 0.5
                  }
                  onClick={() => handleVariationSelect(item)}
                >
                  {item.icon ? (
                    <Image
                      width={50}
                      height={50}
                      alt={item.value || ""}
                      unoptimized
                      src={item.icon || ""}
                    />
                  ) : (
                    item.value
                  )}
                </Tag>
              ))}
            </Wrap>
          </Stack>
        );
      })}
    </Box>
  );
};
