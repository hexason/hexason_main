import { ShopCartIcon, HeartIcon } from "@/assets/icons";
import { HStack, Button, Badge } from "@chakra-ui/react";
import BadgeButton from "../BadgeButton";
import { useBasket } from "@/context/BasketContext";

export const BasketWithFavButton = () => {
	const { onOpen, count } = useBasket();
	return (
		<HStack h="100%" alignItems="center" justifyContent="end">
			<BadgeButton badgeCount={2}>
				<HeartIcon fill="white" width={20} height={20} />
			</BadgeButton>
			<BadgeButton onClick={onOpen} badgeCount={count}>
				<ShopCartIcon fill="white" width={20} height={20} />
			</BadgeButton>
		</HStack>
	);
};
