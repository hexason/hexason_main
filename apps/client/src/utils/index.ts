export const statusViewer = (statusCode: number) => {
  switch (statusCode) {
    case 12:
      return { colorSchema: "green", txt: "Active" };
    case 0:
      return { colorSchema: "orange", txt: "Pending" };
    default:
      return { colorSchema: "gray", txt: "Unknown" };
  }
};
