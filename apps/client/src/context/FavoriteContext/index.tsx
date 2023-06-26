import { addToFav, getFavProducts } from "@/lib/Services";
import { useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
	Action,
	Actions,
	Favorite,
	FavoriteContextInterface,
	FavoriteProviderProps,
	UpdateProduct,
} from "./types";

const Context = createContext<FavoriteContextInterface | undefined>(undefined);

function FavoriteReducer(favorite: Favorite, action: Action) {
	switch (action.type) {
		case "update": {
			return { ...favorite, products: action.products! };
		}
		case "open": {
			return { ...favorite, isOpen: true };
		}
		case "close": {
			return { ...favorite, isOpen: false };
		}
		default: {
			throw new Error(`Unhandled action: ${action}`);
		}
	}
}

function FavoriteProvider({ children }: FavoriteProviderProps) {
	const [GetFavoriteProducts, { loading }] = useLazyQuery(getFavProducts);
	const [UpdateFavoriteProducts, { loading: updateLoading }] =
		useMutation(addToFav);
	const [favorite, dispatch] = useReducer(FavoriteReducer, {
		products: [],
		isOpen: false,
	});

	const init = async () => {
		const { data } = await GetFavoriteProducts();
		if (data) {
			dispatch({ type: "update", products: data.getFavoriteProducts });
		}
	};

	//#region Thigs that will deleted in prod
	useEffect(() => {
		console.log(favorite);
	}, [favorite]);
	//#endregion

	useEffect(() => {
		init();
	}, []);

	const favoriteController = async (
		action: Actions,
		product?: UpdateProduct
	) => {
		switch (action) {
			case "update":
				const { productId, type } = product!;
				let ids = favorite.products.map((e) => e.id);
				if (type === "add") {
					ids.push(productId);
				} else {
					ids.filter((e) => e !== productId);
				}
				const res = await UpdateFavoriteProducts({
					variables: { ids },
				});
				if (res.data) {
					dispatch({
						type: "update",
						products: res.data.updateFavoriteProducts,
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
	const onClose = () => favoriteController("close");
	const onOpen = () => favoriteController("open");
	const updateProduct = (product: UpdateProduct) =>
		favoriteController("update", product);
	//#endregion

	//#region Component props
	const drawerProp = {
		onClose,
		isOpen: favorite.isOpen,
		data: favorite.products,
		updateProduct,
		updateLoading,
	};
	const value = {
		favorite,
		loading,
		updateLoading,
		count: favorite.products.length,
		favoriteController,
		updateProduct,
		onClose,
		onOpen,
	};
	//#endregion

	return (
		<>
			<Context.Provider value={value}>{children}</Context.Provider>
		</>
	);
}

function useFavorite() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error("useFavorite must be used within a FavoriteProvider");
	}
	return context;
}

export { FavoriteProvider, useFavorite };
