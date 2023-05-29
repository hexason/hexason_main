export type HomeHighlightType = {
	name1: string;
	name2: string;
	color: string;
	size: number;
	data: Array<HighlightCard>;
};
export type HighlightCard = {
	id: number;
	name: string;
	imgUrl: string;
};
