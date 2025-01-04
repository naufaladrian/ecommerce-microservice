<script>
	import { goto } from '$app/navigation';
</script>

<h1>Welcome to E-commerce App</h1>
<button on:click={() => goto('/')}>Home</button>
<button on:click={() => goto('/add-product')}>Add Product</button>
<slot />
<!-- Tautan ke halaman produk -->
