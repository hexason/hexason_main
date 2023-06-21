import { Badge } from "@chakra-ui/react";

export const StatusViewer = ({
  statusIndicator,
}: {
  statusIndicator: number;
}) => {
  switch (statusIndicator) {
    case 0:
      return <Badge>pending</Badge>;
    case 1:
      return <Badge>verified</Badge>;
    case 2:
      return <Badge>Ordered</Badge>;
    case 3:
      return <Badge>on delivery</Badge>;
    case 4:
      return <Badge>Arrived</Badge>;
    case 5:
      return <Badge>Delivered</Badge>;
    case 10:
      return <Badge>Closed</Badge>;
    case 20:
      return <Badge colorScheme="red">Cancel</Badge>;
    default:
      return <Badge>unknown</Badge>;
  }
};
