"use client";
import { useCurrencyFormat } from "@/hooks/userCurrencyFormatter";
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
import { ProductI } from "pointes";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { ThreeDotsWave } from "@/components/animation";
import { QuantityController, ZoomImage } from "@/components/core";
import { getProductById } from "@/lib/Services";

export default function ProductDetail() {
	const formatter = useCurrencyFormat();
	const [allVariants, setAllVariants] = useState<{ [key: string]: any[] }>({});
	const { id } = useParams();
	const { loading, data } = useQuery<{ getProductById: ProductI }>(
		getProductById(id)
	);

	// HashMaping all variants
	useEffect(() => {
		const variations = data?.getProductById.items.reduce((variants, item) => {
			for (const conf of item.variations) {
				const configure = variants[conf.configName] || [];
				configure.push(conf);
				variants[conf.configName] = configure;
			}
			return variants;
		}, {});
		setAllVariants(variations);
	}, [data]);

	if (loading) return <ThreeDotsWave />;
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
									img={data?.getProductById.image}
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
									{data?.getProductById.title}
								</Text>
								{data?.getProductById.sold && (
									<Text fontSize={"1rem"} opacity={"0.5"}>
										{formatter(data?.getProductById.sold, "short")} зарагдсан
									</Text>
								)}
								<Tag fontWeight={"bold"} textTransform={"uppercase"} p={3}>
									<Avatar
										mr={3}
										src={data?.getProductById.supplier.logo}
										size={"sm"}
									/>
									{data?.getProductById.supplier.name}
								</Tag>
								<HStack spacing={"10px"}>
									<Text fontSize={"1.5rem"} color="hexmain.800">
										{formatter(data?.getProductById.price || 0, "short")} ₮
									</Text>
								</HStack>
							</Stack>
							<Stack>
								<Varaints allVariants={allVariants} />
								<Stack>
									<Text>Тоо ширхэг:</Text>
									<QuantityController />
								</Stack>
							</Stack>
							<HStack>
								<Button>Сагслах</Button>
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
					{data?.getProductById.images.map((img: any) => (
						<Image
							width={600}
							height={400}
							unoptimized
							key={img._id}
							src={img.url}
							alt={data?.getProductById.title + img._id}
						/>
					))}
				</Stack>
			</Stack>
		</Container>
	);
}

const Varaints = ({
	allVariants,
}: {
	allVariants: { [key: string]: any[] };
}) => {
	return (
		<Box>
			{Object.keys(allVariants || {}).map((key) => {
				return (
					<Stack key={key} alignItems={"start"}>
						<Text w="150px">{key}:</Text>
						<Wrap>
							{allVariants[key].map((item) => (
								<Tag key={item._id} bg="hexmain.500" mr={2}>
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
