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

<h1>Add Product</h1>
<input type="text" bind:value={name} placeholder="Product Name" />
<input type="number" bind:value={price} placeholder="Product Price" />
<button on:click={addProduct}>Add Product</button>
