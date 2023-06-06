"use client";
import { ProductList } from "@/components/build";
import HomeHeader from "@/components/build/Headers/HomeHeader";
import SearchHeader from "@/components/build/Headers/SearchHeader";

export default function Home() {
	return (
		<>
			<SearchHeader />
			<HomeHeader />
			<ProductList />
		</>
	);
}
