<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface CartItem {
		id: number;
		product_id: number;
		quantity: number;
		product_name: string;
		product_price: number;
	}

	let cartItems: CartItem[] = [];
	const userId = 21; // Default user ID

	// Fungsi untuk mengambil data keranjang dari API
	async function fetchCart(userId: number) {
		try {
			const response = await fetch(`http://localhost:3000/cart?user_id=${userId}`);
			if (response.ok) {
				const items = await response.json();
				for (const item of items) {
					const productResponse = await fetch(`http://localhost:3000/products/${item.product_id}`);
					if (productResponse.ok) {
						const product = await productResponse.json();
						item.product_name = product.name;
						item.product_price = product.price;
					}
				}
				cartItems = items;
			} else {
				console.error('Failed to fetch cart items');
			}
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}

	// Fungsi untuk menghapus item dari keranjang
	async function removeFromCart(itemId: number) {
		try {
			const response = await fetch(`http://localhost:3000/cart/${itemId}?user_id=${userId}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				cartItems = cartItems.filter((item) => item.id !== itemId);
			} else {
				console.error('Failed to remove item from cart');
			}
		} catch (error) {
			console.error('Error removing item from cart:', error);
		}
	}

	// Fungsi untuk mengonfirmasi pesanan
	async function placeOrder() {
		goto('/order?user_id=21');
	}
	// Mengambil data keranjang saat komponen dimuat
	onMount(() => {
		fetchCart(userId);
	});

	// Fungsi untuk mengarahkan ke halaman order
	function goToOrderPage() {
		placeOrder();
	}
</script>

<main class="container mx-auto mt-10 p-6 rounded-lg min-h-screen">
	<h1 class="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
	{#if cartItems.length > 0}
		<ul class="space-y-4">
			{#each cartItems as item}
				<li class="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
					<div>
						<p class="text-lg font-semibold">Product Name: {item.product_name}</p>
						<p class="text-gray-700">Quantity: {item.quantity}</p>
						<p class="text-gray-700">Price: Rp {item.product_price}</p>
					</div>
					<button
						on:click={() => removeFromCart(item.id)}
						class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
					>
						Remove
					</button>
				</li>
			{/each}
		</ul>
		<div class="mt-6 flex justify-end">
			<button
				on:click={goToOrderPage}
				class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Proceed to Order
			</button>
		</div>
	{:else}
		<p class="text-center text-gray-500">Your cart is empty.</p>
	{/if}
</main>
