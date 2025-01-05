<script lang="ts">
	import { onMount } from 'svelte';

	interface Order {
		id: number;
		user_id: number;
		total_price: number;
		order_date: string;
	}

	let orders: Order[] = [];
	const userId = 21; // Default user ID

	// Fungsi untuk mengambil riwayat pesanan dari API
	async function fetchOrderHistory() {
		try {
			const response = await fetch(`http://localhost:3000/orders?user_id=${userId}`);
			if (response.ok) {
				orders = await response.json();
			} else {
				console.error('Failed to fetch order history');
			}
		} catch (error) {
			console.error('Error fetching order history:', error);
		}
	}

	// Mengambil riwayat pesanan saat komponen dimuat
	onMount(() => {
		fetchOrderHistory();
	});
</script>

<main class="min-h-screen">
	<div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
		<h1 class="text-3xl font-bold mb-6 text-center">Order History</h1>

		{#if orders.length > 0}
			<table class="min-w-full bg-white">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">Order ID</th>
						<th class="py-2 px-4 border-b">Order Date</th>
						<th class="py-2 px-4 border-b">Total Price</th>
					</tr>
				</thead>
				<tbody>
					{#each orders as order}
						<tr>
							<td class="py-2 px-4 border-b">{order.id}</td>
							<td class="py-2 px-4 border-b">{new Date(order.order_date).toLocaleString()}</td>
							<td class="py-2 px-4 border-b">Rp {order.total_price}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-center text-gray-500">You have no order history.</p>
		{/if}
	</div>
</main>
