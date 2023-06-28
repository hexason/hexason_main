import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
	return (
		<Tabs>
			<TabList>
				<Tab>Orders</Tab>
				<Tab>Account</Tab>
			</TabList>
			{children}
		</Tabs>
	);
};

export default UserLayout;
