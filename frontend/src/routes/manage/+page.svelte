<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface Product {
		id: number;
		name: string;
		price: number;
	}

	let products: Product[] = [];

	// Fetch products from the API
	async function fetchProducts() {
		const response = await fetch('http://localhost:3000/products');
		if (response.ok) {
			products = await response.json();
		} else {
			console.error('Failed to fetch products');
		}
	}

	// Delete a product by ID
	async function deleteProduct(id: number) {
		const response = await fetch(`http://localhost:3000/products/${id}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			products = products.filter((product) => product.id !== id);
		} else {
			console.error('Failed to delete product');
		}
	}

	// Fetch products when the component mounts
	onMount(() => {
		fetchProducts();
	});
</script>

<main class="min-h-screen">
	<div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
		<h1 class="text-3xl font-bold mb-6 text-center">Manage Products</h1>
		<div class="mb-4 flex justify-end">
			<button
				on:click={() => goto('/add-product')}
				class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Add Product
			</button>
		</div>
		<table class="min-w-full bg-white">
			<thead>
				<tr>
					<th class="py-2 px-4 border-b">ID</th>
					<th class="py-2 px-4 border-b">Name</th>
					<th class="py-2 px-4 border-b">Price</th>
					<th class="py-2 px-4 border-b">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each products as product}
					<tr>
						<td class="py-2 px-4 border-b">{product.id}</td>
						<td class="py-2 px-4 border-b">{product.name}</td>
						<td class="py-2 px-4 border-b">Rp {product.price}</td>
						<td class="py-2 px-4 border-b">
							<button
								on:click={() => goto(`/edit-product/${product.id}`)}
								class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
							>
								Edit
							</button>
							<button
								on:click={() => deleteProduct(product.id)}
								class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
