<script lang="ts">
	import { onMount } from 'svelte';
	import reloadPage from '$lib/reloadPage';

	interface CartItem {
		id: number;
		product_id: number;
		quantity: number;
		product_name: string;
		product_price: number;
	}

	let cartItems: CartItem[] = [];
	let totalAmount = 0;
	const userId = 21; // Default user ID

	// Fungsi untuk mengambil data keranjang dari API
	async function fetchCart() {
		try {
			const response = await fetch(`http://localhost:3000/cart?user_id=${userId}`);
			console.log('Fetch cart response:', response); // Debugging log
			if (response.ok) {
				const items = await response.json();
				for (const item of items) {
					const productResponse = await fetch(`http://localhost:3000/products/${item.product_id}`);
					console.log('Fetch product response:', productResponse); // Debugging log
					if (productResponse.ok) {
						const product = await productResponse.json();
						item.product_name = product.name;
						item.product_price = product.price;
					}
				}
				cartItems = items;
				calculateTotal();
			} else {
				console.error('Failed to fetch cart items');
			}
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}

	// Menghitung total harga
	function calculateTotal() {
		totalAmount = cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
	}

	// Fungsi untuk mengonfirmasi pesanan
	async function placeOrder() {
		try {
			console.log('pre order');
			console.log(userId, totalAmount);

			const response = await fetch('http://localhost:3000/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ user_id: userId, total_price: totalAmount }) // Mengirimkan user_id dan total_price
			});
			console.log('Place order response:', response); // Debugging log

			if (response.ok) {
				alert('Order placed successfully!');
				reloadPage();
			} else {
				alert('Failed to place order.');
			}
		} catch (error) {
			console.error('Error placing order:', error);
		}
	}

	// Mengambil data keranjang saat komponen dimuat
	onMount(() => {
		fetchCart();
	});
</script>

<main class="min-h-screen">
	<div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
		<h1 class="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>

		{#if cartItems.length > 0}
			<table class="min-w-full bg-white">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">Product Name</th>
						<th class="py-2 px-4 border-b">Quantity</th>
						<th class="py-2 px-4 border-b">Price</th>
						<th class="py-2 px-4 border-b">Total</th>
					</tr>
				</thead>
				<tbody>
					{#each cartItems as item}
						<tr>
							<td class="py-2 px-4 border-b">{item.product_name}</td>
							<td class="py-2 px-4 border-b">{item.quantity}</td>
							<td class="py-2 px-4 border-b">Rp {item.product_price}</td>
							<td class="py-2 px-4 border-b">Rp {item.product_price * item.quantity}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<h2 class="text-xl font-bold mt-6">Total Amount: Rp {totalAmount}</h2>
			<button
				on:click={placeOrder}
				class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
			>
				Order Now
			</button>
		{:else}
			<p class="text-center text-gray-500">
				Your cart is empty. Please add items to your cart before placing an order.
			</p>
		{/if}
	</div>
</main>
