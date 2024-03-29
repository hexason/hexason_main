// Custom hook
export const useCurrencyFormat = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MNT",
  });

  function nFormatter(num: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: ",000" },
      { value: 1e6, symbol: " сая" },
      { value: 1e9, symbol: "тербум" },
      { value: 1e12, symbol: "t" },
      { value: 1e15, symbol: "p" },
      { value: 1e18, symbol: "e" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(item.value > 1e3 ? 2 : 0).replace(rx, "$1") +
          item.symbol
      : "0";
  }

  return (num: number, type: "normal" | "standard" | "short" = "normal") => {
    switch (type) {
      case "normal":
        return formatter.format(num);
      case "standard":
        return (
          formatter.format(num).replace("MNT", "").replace(/\..*/, "") + "₮"
        );
      case "short":
        return nFormatter(num);
      default:
        return formatter.format(num);
    }
  };
};
