<script lang="ts">
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

<h1>Product List</h1>

{#if products.length > 0}
	<ul>
		{#each products as product}
			<li>
				<strong>{product.name}</strong> - Rp {product.price}
			</li>
		{/each}
	</ul>
{:else}
	<p>No products available.</p>
{/if}
