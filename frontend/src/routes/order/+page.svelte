<script lang="ts">
	import { onMount } from 'svelte';

	interface CartItem {
		id: number;
		product_id: number;
		quantity: number;
	}

	let cartItems: CartItem[] = [];
	let totalAmount = 0;

	// Fungsi untuk mengambil data keranjang dari API
	async function fetchCart() {
		const response = await fetch('http://localhost:3000/cart');
		if (response.ok) {
			cartItems = await response.json();
			await calculateTotal();
		} else {
			console.error('Failed to fetch cart items');
		}
	}

	// Menghitung total harga
	async function calculateTotal() {
		totalAmount = 0;
		for (const item of cartItems) {
			const productResponse = await fetch(`http://localhost:3000/products/${item.product_id}`);
			if (productResponse.ok) {
				const product = await productResponse.json();
				totalAmount += product.price * item.quantity;
			}
		}
	}

	// Fungsi untuk mengonfirmasi pesanan
	async function placeOrder() {
		const response = await fetch('http://localhost:3000/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: cartItems }) // Mengirimkan item keranjang sebagai pesanan
		});

		if (response.ok) {
			alert('Order placed successfully!');
			// Setelah memesan, Anda mungkin ingin mengosongkan keranjang atau mengarahkan pengguna ke halaman lain
		} else {
			alert('Failed to place order.');
		}
	}

	// Mengambil data keranjang saat komponen dimuat
	onMount(() => {
		fetchCart();
	});
</script>

<h1>Order Confirmation</h1>

{#if cartItems.length > 0}
	<ul>
		{#each cartItems as item}
			<li>
				Product ID: {item.product_id} - Quantity: {item.quantity}
			</li>
		{/each}
	</ul>
	<h2>Total Amount: Rp {totalAmount || 'loading'}</h2>
	<button on:click={placeOrder} class="mt-4 bg-green-500 text-white py-2 px-4 rounded">
		Place Order
	</button>
{:else}
	<p>Your cart is empty. Please add items to your cart before placing an order.</p>
{/if}
