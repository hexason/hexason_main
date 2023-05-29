import { ShopCartIcon, HeartIcon } from "@/assets/icons";
import { HStack, Button, Badge } from "@chakra-ui/react";
import BadgeButton from "../BadgeButton";

export const BasketWithFavButton = () => {
	return (
		<HStack h="100%" alignItems="center" justifyContent="end">
			<BadgeButton badgeCount={2}>
				<HeartIcon fill="white" width={20} height={20} />
			</BadgeButton>
			<BadgeButton badgeCount={2}>
				<ShopCartIcon fill="white" width={20} height={20} />
			</BadgeButton>
		</HStack>
	);
};
