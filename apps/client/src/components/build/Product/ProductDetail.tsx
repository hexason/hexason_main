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
import { useMutation } from "@apollo/client";
import { createOrderGQL } from "@/lib/Services";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product }: { product: any }) {
	const { updateProduct, updateLoading } = useBasket();
	const { selectedVariations, handleVariationSelect } = useSelectedVariations(
		product.items.length > 0 ? product.items[0].variations : []
	);
	const formatter = useCurrencyFormat();
	const getMatchingItem = () => {
		return (
			product.items.find((item: any) => {
				return item.variations.every((itemVariation: any) =>
					selectedVariations.some(
						(selectedVariation) =>
							selectedVariation.configId === itemVariation.configId &&
							selectedVariation.valueId === itemVariation.valueId
					)
				);
			}) || {}
		);
	};

	return (
		<Container maxW="container.xl" my={3}>
			<Stack spacing={6} bg="#ffffffAB" p="3" borderRadius={"20px"}>
				<Grid gap="3" templateColumns={["repeat(1,1fr)", "repeat(6, 1fr)"]}>
					<GridItem colSpan={2} as={Stack}>
						<AspectRatio
							position={"relative"}
							ratio={1}
							borderRadius={"20px"}
							overflow={"hidden"}
						>
							<Box position={"absolute"} w="100%">
								<ZoomImage
									img={product.image}
									zoomScale={3}
									width={379}
									height={379}
								/>
							</Box>
						</AspectRatio>
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
											getMatchingItem().price || product.price,
											"short"
										)}{" "}
										₮
									</Text>
								</HStack>
							</Stack>
							<Stack>
								<Varaints
									selectedVariations={selectedVariations}
									handleVariationSelect={handleVariationSelect}
									product={product}
								/>
								<Stack>
									<Text>Тоо ширхэг:</Text>
									<QuantityController />
								</Stack>
							</Stack>
							<HStack>
								<Button>Fav</Button>
								<Button
									isLoading={updateLoading}
									onClick={() => {
										updateProduct({
											productId: product.id,
											quantity: 1,
										});
									}}
								>
									Сагслах
								</Button>
								<Button>Шууд захиалах</Button>
							</HStack>
						</Stack>
					</GridItem>
					<GridItem colSpan={1}>
						<Stack h="100%" borderRadius={"5px"} bg="gray.200">
							{/* Supplier information here */}
						</Stack>
					</GridItem>
				</Grid>
				<Divider />
				<Stack alignItems={"center"} spacing={"0"}>
					{product.images.map((img: any) => (
						<Image
							width={600}
							height={400}
							unoptimized
							key={img._id}
							src={img.url}
							alt={product.title + img._id}
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
	const [allVariants, setAllVariants] = useState<any>({});
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
							{allVariants[key].map((item: any) => (
								<Tag
									key={item._id}
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
