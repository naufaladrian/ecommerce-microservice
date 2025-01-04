<script lang="ts">
	import { onMount } from 'svelte';

	interface CartItem {
		id: number;
		product_id: number;
		quantity: number;
	}

	let cartItems: CartItem[] = [];

	// Fungsi untuk mengambil data keranjang dari API
	async function fetchCart() {
		const response = await fetch('http://localhost:3000/cart');
		if (response.ok) {
			cartItems = await response.json();
		} else {
			console.error('Failed to fetch cart items');
		}
	}

	// Mengambil data keranjang saat komponen dimuat
	onMount(() => {
		fetchCart();
	});
</script>

<main class="container mx-auto mt-10 p-6 rounded-lg min-h-screen">
	<h1 class="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
	{#if cartItems.length > 0}
		<ul class="space-y-4">
			{#each cartItems as item}
				<li class="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
					<div>
						<p class="text-lg font-semibold">Product ID: {item.product_id}</p>
						<p class="text-gray-700">Quantity: {item.quantity}</p>
					</div>
					<button
						class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
					>
						Remove
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-500">Your cart is empty.</p>
	{/if}
</main>
