import { TabPanel, TabPanels } from "@chakra-ui/react";
import UserLayout from "./Layout";

const UserPage = () => {
	return (
		<UserLayout>
			<TabPanels>
				<TabPanel>
					<p>one!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
			</TabPanels>
		</UserLayout>
	);
};

export default UserPage;
