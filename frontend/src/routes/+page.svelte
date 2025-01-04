<script lang="ts">
	import ProductCard from '$lib/ProductCard.svelte';
	import { onMount } from 'svelte';

	interface Product {
		id: number;
		name: string;
		price: number;
	}

	let products: Product[] = [];

	// Fungsi untuk mengambil data produk dari API
	async function fetchProducts() {
		const response = await fetch('http://localhost:3000/products');
		if (response.ok) {
			products = await response.json();
			console.log(products); // Tambahkan log untuk memeriksa data
		} else {
			console.error('Failed to fetch products');
		}
	}

	// Mengambil data produk saat komponen dimuat
	onMount(() => {
		fetchProducts();
	});
</script>

<main class="container mx-auto p-8">
	<h1 class="text-3xl font-bold text-center my-8">Product List</h1>

	{#if products.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<p class="text-center text-gray-500">No products available</p>
	{/if}
</main>
