<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	interface Product {
		id: number;
		name: string;
		description: string;
		price: number;
		image_url: string;
	}

	let product: Product | null = null;
	let productId: number;

	// Fungsi untuk mengambil detail produk dari API
	async function fetchProductDetails() {
		try {
			const response = await fetch(`http://localhost:3000/products/${productId}`);
			if (response.ok) {
				product = await response.json();
			} else {
				console.error('Failed to fetch product details');
			}
		} catch (error) {
			console.error('Error fetching product details:', error);
		}
	}

	// Mengambil ID produk dari URL saat komponen dimuat
	onMount(() => {
		const urlParams = get(page).params;
		productId = parseInt(urlParams.id, 10);
		fetchProductDetails();
	});
</script>

<main class="min-h-screen">
	<h1 class="text-3xl font-bold text-center my-8">Product Detail</h1>

	{#if product}
		<div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<img
				src="/placeholder.webp"
				alt={product.name}
				class="w-full h-64 object-cover rounded-lg mb-6"
			/>
			<h2 class="text-2xl font-bold mb-4">{product.name}</h2>
			<p class="text-gray-700 mb-4">{product.description}</p>
			<p class="text-xl font-semibold mb-4">Price: Rp {product.price}</p>
		</div>
	{:else}
		<p class="text-center text-gray-500">Loading product details...</p>
	{/if}
</main>
