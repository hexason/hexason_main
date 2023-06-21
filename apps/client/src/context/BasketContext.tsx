import BasketDrawer from "@/components/core/BasketDrawer";
import { addToBasket, getBasketProducts } from "@/lib/Services";
import { useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  Action,
  Actions,
  Basket,
  BasketContextInterface,
  BasketProviderProps,
  UpdateProduct,
} from "./Basket.types";

const UserContext = createContext<BasketContextInterface | undefined>(
  undefined
);

function BasketReducer(basket: Basket, action: Action) {
  switch (action.type) {
    case "update": {
      return { ...basket, products: action.products! };
    }
    case "open": {
      return { ...basket, isOpen: true };
    }
    case "close": {
      return { ...basket, isOpen: false };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function BasketProvider({ children }: BasketProviderProps) {
  const [GetBasketProducts, { loading }] = useLazyQuery(getBasketProducts);
  const [UpdateBasketProducts, { loading: updateLoading }] =
    useMutation(addToBasket);
  const [basket, dispatch] = useReducer(BasketReducer, {
    products: [],
    isOpen: false,
  });

  const init = async () => {
    const { data } = await GetBasketProducts();
    if (data) {
      dispatch({ type: "update", products: data.getBasketProducts });
    }
  };

  //#region Thigs that will deleted in prod
  useEffect(() => {
    console.log(basket);
  }, [basket]);
  //#endregion

  useEffect(() => {
    init();
  }, []);

  const basketController = async (action: Actions, product?: UpdateProduct) => {
    switch (action) {
      case "update":
        const { productId, quantity } = product!;
        const res = await UpdateBasketProducts({
          variables: { productId, quantity },
        });
        if (res.data) {
          dispatch({
            type: "update",
            products: res.data.addToBasket,
          });
          dispatch({ type: "open" });
        }
        if (res.errors) {
        }
        break;
      default:
        dispatch({ type: action });
    }
  };

  //#region Common functions
  const onClose = () => basketController("close");
  const onOpen = () => basketController("open");
  const updateProduct = (product: UpdateProduct) =>
    basketController("update", product);
  //#endregion

  //#region Component props
  const drawerProp = {
    onClose,
    isOpen: basket.isOpen,
    data: basket.products,
    updateProduct,
    updateLoading,
  };
  const value = {
    basket,
    loading,
    updateLoading,
    count: basket.products.length,
    basketController,
    updateProduct,
    onClose,
    onOpen,
  };
  //#endregion

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
      <BasketDrawer {...drawerProp} />
    </>
  );
}

function useBasket() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}

export { BasketProvider, useBasket };
