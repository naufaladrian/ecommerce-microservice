<script lang="ts">
	import { goto } from '$app/navigation';

	export let product: { id: number; name: string; price: number };

	// Fungsi untuk menambahkan produk ke keranjang
	async function addToCart() {
		const response = await fetch('http://localhost:3000/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ productId: product.id, quantity: 1 }) // Menambahkan produk dengan quantity 1
		});

		if (response.ok) {
			alert('Product added to cart successfully!');
		} else {
			alert('Failed to add product to cart.');
		}
	}
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-md">
	<img src="/placeholder.webp" alt={product.name} class="h-48 w-full object-cover" />
	<div class="p-4">
		<h2 class="text-xl font-bold">{product.name}</h2>
		<p class="text-gray-700">Rp {product.price}</p>
		<div>
			<button on:click={addToCart} class="mt-2 text-sm bg-gray-700 text-white py-1 px-2 rounded">
				Add to Cart
			</button>
			<button
				on:click={() => goto(`/product-detail/${product.id}`)}
				class="mt-2 text-sm bg-green-600 text-white py-1 px-2 rounded"
			>
				Detail
			</button>
		</div>
	</div>
</div>
