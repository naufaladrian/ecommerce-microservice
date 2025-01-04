<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex items-center justify-between bg-gray-800 p-4 text-white">
	<div class="text-2xl font-bold">Toko PSS</div>
	<ul class="flex space-x-4">
		<li>
			<a href="/" class="cursor-pointer hover:underline"> Home </a>
		</li>
		<li>
			<a href="/add-product" class="cursor-pointer hover:underline"> Add Product </a>
		</li>
		<li>
			<a href="/cart" class="cursor-pointer hover:underline"> Keranjang </a>
		</li>
	</ul>
</nav>
{@render children()}

<!-- footer -->
<footer class="bg-gray-800 text-white p-4 text-center">&copy; 2025 Toko PSS</footer>
