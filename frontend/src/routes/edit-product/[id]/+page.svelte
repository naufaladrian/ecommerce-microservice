<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: { product: { id: number; name: string; price: number } };

	let productId = data.product.id;
	let name = data.product.name;
	let price = data.product.price;

	// Update product details
	async function updateProduct() {
		const response = await fetch(`http://localhost:3000/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, price })
		});

		if (response.ok) {
			alert('Product updated successfully!');
			goto('/manage');
		} else {
			alert('Failed to update product.');
		}
	}
</script>

<main class=" min-h-screen">
	<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
		<h1 class="text-2xl font-bold mb-6 text-center">Edit Product</h1>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="name">Product Name</label>
			<input
				type="text"
				id="name"
				bind:value={name}
				placeholder="Product Name"
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="price">Product Price</label>
			<input
				type="number"
				id="price"
				bind:value={price}
				placeholder="Product Price"
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<button
			on:click={updateProduct}
			class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Update Product
		</button>
	</div>
</main>
