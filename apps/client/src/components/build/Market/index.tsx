"use client";
import { useSearchParams } from "next/navigation";
import { Frame } from "../SearchFrame/Frame";
import { SearchBar } from "@/components/core";
import { Stack } from "@chakra-ui/react";

export const MarketPlace = () => {
	const searchParams = useSearchParams();

	return (
		<>
			<Stack p={3}>
				<SearchBar
					provider={searchParams.get("provider") || "local"}
					value={searchParams.get("s") || ""}
				/>
			</Stack>
			<Frame
				query={searchParams.get("s") || ""}
				provider={searchParams.get("provider") || "local"}
				limit={30}
				infinite={true}
			/>
		</>
	);
};
