import { createContext, useContext, useReducer } from "react";

type BasketProviderProps = { children: React.ReactNode };
type Product = {
	access_token: string | undefined;
	id_token: string | undefined;
	id: string | undefined;
};
type Action = {
	type: "login" | "logout";
	product?: Product;
};
type Dispatch = (action: Action) => void;

interface BasketContextInterface {
	product: Product;
	dispatch: Dispatch;
}

const UserContext = createContext<BasketContextInterface | undefined>(
	undefined
);

function BasketReducer(product: Product, action: Action) {
	switch (action.type) {
		case "login": {
			return {
				access_token: action.product?.access_token,
				id_token: action.product?.id_token,
				id: action.product?.id,
			};
		}
		case "logout": {
			return { access_token: undefined, id_token: undefined, id: undefined };
		}
		default: {
			throw new Error(`Unhandled action: ${action}`);
		}
	}
}

function BasketProvider({ children }: BasketProviderProps) {
	const [product, dispatch] = useReducer(BasketReducer, {
		access_token: undefined,
		id_token: undefined,
		id: undefined,
	});

	const value = { product, dispatch };
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
