"use client";
import { ProductList } from "@/components/build";
import HomeHeader from "@/components/build/Headers/HomeHeader";
import SearchHeader from "@/components/build/Headers/SearchHeader";
import { GeneralLayout } from "@/components/layout";

export default function Home() {
	return (
		<GeneralLayout spacing={10}>
			<SearchHeader />
			<HomeHeader />
			<ProductList />
		</GeneralLayout>
	);
}
