import { Flex, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
	return (
		<Flex>
			<Stack>
				<div>a</div>
			</Stack>
		</Flex>
	);
};

export default UserLayout;
