import { TrashIcon } from "@/assets/icons";
import { Product, UpdateProduct } from "@/context/FavoriteContext/types";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	DrawerProps,
	HStack,
	IconButton,
	Image,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";

function FavoriteDrawer({
	isOpen,
	onClose,
	data,
	updateLoading,
	updateProduct,
	...rest
}: Omit<DrawerProps, "children"> & {
	data: Array<Product>;
	updateProduct: (product: UpdateProduct) => void;
	updateLoading: boolean;
}) {
	const props = {
		updateLoading,
		updateProduct,
	};
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} {...rest}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Favorite</DrawerHeader>
				<DrawerBody>
					<Stack>
						{data.map((e) => (
							<BasketCard key={e.id} data={e} {...props} />
						))}
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

const BasketCard = ({
	data,
	updateProduct,
	updateLoading,
}: {
	data: Product;
	updateProduct: (product: UpdateProduct) => void;
	updateLoading: boolean;
}) => {
	const remove = () => {
		updateProduct({
			productId: data.id,
			type: "remove",
		});
	};
	return (
		<HStack>
			<Image w="40%" src={data.image} alt={data.title} />
			<Stack>
				<Text variant="body" noOfLines={2}>
					{data.title}
				</Text>
				<HStack>
					<Spacer />
					<IconButton
						isLoading={updateLoading}
						onClick={remove}
						size="sm"
						colorScheme="red"
						aria-label="remove"
						icon={<TrashIcon fill="white" width={14} height={14} />}
					/>
				</HStack>
			</Stack>
		</HStack>
	);
};

export default FavoriteDrawer;
