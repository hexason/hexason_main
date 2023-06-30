import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UserLayout from "./Layout";

const UserPage = () => {
	return (
		<UserLayout>
			<Tabs>
				<TabList>
					<Tab>Orders</Tab>
					<Tab>Account</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<p>one!</p>
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</UserLayout>
	);
};

export default UserPage;
