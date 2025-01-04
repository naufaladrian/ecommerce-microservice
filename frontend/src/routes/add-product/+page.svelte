<script>
	let name = '';
	let price = '';

	async function addProduct() {
		const response = await fetch('http://localhost:3000/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, price: parseFloat(price) })
		});

		if (response.ok) {
			alert('Product added successfully!');
			name = '';
			price = '';
		} else {
			alert('Failed to add product.');
		}
	}
</script>

<main class="min-h-screen grid place-items-center">
	<div class="min-w-[50%] max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md m-8">
		<h1 class="text-2xl font-bold mb-6 text-center">Add Product</h1>
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
			on:click={addProduct}
			class="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-grau-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
		>
			Add Product
		</button>
	</div>
</main>
