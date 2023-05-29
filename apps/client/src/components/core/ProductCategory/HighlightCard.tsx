import { AspectRatio, Grid, Image } from "@chakra-ui/react";
import { HighlightCard } from "./type";

const HighlightCard = ({ data: { imgUrl, name } }: { data: HighlightCard }) => {
	return (
		<AspectRatio ratio={1}>
			<Grid
				borderRadius="lg"
				overflow="hidden"
				pos="relative"
				placeItems="center"
			>
				<Image alt={name} src={imgUrl} />
			</Grid>
		</AspectRatio>
	);
};

export default HighlightCard;
