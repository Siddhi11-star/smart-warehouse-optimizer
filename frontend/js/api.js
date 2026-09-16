const API_BASE_URL = 'http://localhost:5000/api';

const api = {
    async getStats() {
        const res = await fetch(`${API_BASE_URL}/stats`);
        return await res.json();
    },
    async getProducts() {
        const res = await fetch(`${API_BASE_URL}/products`);
        return await res.json();
    },
    async getWarehouseLayout() {
        const res = await fetch(`${API_BASE_URL}/warehouse/layout`);
        return await res.json();
    },
    async getOrders() {
        const res = await fetch(`${API_BASE_URL}/orders`);
        return await res.json();
    },
    async runShelfOptimization() {
        const res = await fetch(`${API_BASE_URL}/optimize/shelves`, { method: 'POST' });
        return await res.json();
    },
    async runPickingOptimization(orderId) {
        const res = await fetch(`${API_BASE_URL}/optimize/picking/${orderId}`, { method: 'POST' });
        return await res.json();
    }
};