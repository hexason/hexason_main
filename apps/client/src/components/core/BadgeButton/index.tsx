import { Button, Badge, ButtonProps } from "@chakra-ui/react";

interface BadgeButton extends ButtonProps {
	children: React.ReactNode;
	badgeCount: number;
	badgeColorScheme?: string;
}

const BadgeButton = ({
	children,
	badgeCount,
	badgeColorScheme = "hexhighligth",
	...props
}: BadgeButton) => {
	return (
		<Button pos="relative" {...props}>
			{children}
			<Badge
				position="absolute"
				top={-1}
				right={-1}
				borderRadius="full"
				colorScheme={badgeColorScheme}
			>
				{badgeCount}
			</Badge>
		</Button>
	);
};

export default BadgeButton;
