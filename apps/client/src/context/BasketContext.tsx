import { getBasketProducts } from "@/lib/Services";
import { useLazyQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useReducer } from "react";

type BasketProviderProps = { children: React.ReactNode };

type Product = {
	info: {
		id: string;
		title: string;
	};
	price: string;
	quantity: number;
};

type Action = {
	type: "update" | "open" | "close";
	products?: Array<Product>;
};

type Dispatch = (action: Action) => void;

type Basket = {
	products: Array<Product>;
	isOpen: boolean;
};

interface BasketContextInterface {
	basket: Basket;
	basketController: (action: Action) => void;
	isLoading: boolean;
}

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
	const [basket, dispatch] = useReducer(BasketReducer, {
		products: [],
		isOpen: false,
	});

	const init = async () => {
		const res = await GetBasketProducts();
		console.log(res);
	};

	useEffect(() => {
		init();
	}, []);

	const basketController = async (action: Action) => {
		switch (action.type) {
			case "update":
				break;
			default:
				dispatch(action);
		}
	};

	const value = { basket, basketController, isLoading: loading };
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useBasket() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useBasket must be used within a BasketProvider");
	}
	return context;
}

export { BasketProvider, useBasket };
