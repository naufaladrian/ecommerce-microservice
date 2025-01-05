import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        return {
            product
        };
    } catch (err) {
        console.error(err);
        throw error(404, 'Product not found');
    }
}