import { ShopCartIcon, HeartIcon } from "@/assets/icons";
import { HStack, Button, Badge } from "@chakra-ui/react";
import BadgeButton from "../BadgeButton";
import { useBasket } from "@/context/BasketContext";
import { useFavorite } from "@/context/FavoriteContext";

export const BasketWithFavButton = () => {
	const { onOpen, count } = useBasket();
	const { onOpen: openFav, count: countFav } = useFavorite();
	return (
		<HStack h="100%" alignItems="center" justifyContent="end">
			<BadgeButton onClick={openFav} badgeCount={countFav}>
				<HeartIcon fill="white" width={20} height={20} />
			</BadgeButton>
			<BadgeButton onClick={onOpen} badgeCount={count}>
				<ShopCartIcon fill="white" width={20} height={20} />
			</BadgeButton>
		</HStack>
	);
};
