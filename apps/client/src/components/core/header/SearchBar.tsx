import { ContainerStyle } from "@/theme/common";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBar = ({
	provider,
	value,
}: {
	value?: string;
	provider?: string;
}) => {
	const style = { ...ContainerStyle, borderRadius: "full" };
	const [s, setS] = useState(value || "");
	const router = useRouter();

	const submitHandle = () => {
		if (provider) {
			router.push(`/shop?provider=${provider}&s=${s}`);
		} else {
			router.push(`/search?s=${s}`);
		}
	};
	return (
		<InputGroup {...style} size="lg" w="100%">
			<Input
				onKeyDown={(e) => e.code === "Enter" && submitHandle()}
				onChange={(e) => setS(e.target.value)}
				value={s}
				borderRadius="full"
			/>
			<InputRightElement w="100px" mr={1}>
				<Button
					onClick={submitHandle}
					borderRadius="full"
					colorScheme="hexmain"
					w="100%"
				>
					Хайх
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};
