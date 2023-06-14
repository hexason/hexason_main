import { createContext, useContext, useReducer } from "react";

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
	type: "update";
	products: Product[];
};
type Dispatch = (action: Action) => void;

interface BasketContextInterface {
	products: Product[];
	dispatch: Dispatch;
}

const UserContext = createContext<BasketContextInterface | undefined>(
	undefined
);

function BasketReducer(products: Product[], action: Action) {
	switch (action.type) {
		case "update": {
			return action.products;
		}

		default: {
			throw new Error(`Unhandled action: ${action}`);
		}
	}
}

function BasketProvider({ children }: BasketProviderProps) {
	const [products, dispatch] = useReducer(BasketReducer, []);

	const value = { products, dispatch };
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
