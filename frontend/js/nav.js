/**
 * Smart Warehouse Layout & Order Picking Optimization System
 * Unified Route & Navigation Manager
 */

(function () {
    'use strict';

    // Route configuration mapping
    const ROUTE_MAP = {
        'dashboard': { file: 'index.html', path: '/dashboard', label: 'Dashboard' },
        'products': { file: 'products.html', path: '/products', label: 'Products' },
        'layout': { file: 'layout.html', path: '/warehouse', label: 'Warehouse Layout' },
        'shelf-optimizer': { file: 'shelf-optimizer.html', path: '/shelf-optimizer', label: 'Shelf Optimizer' },
        'orders': { file: 'orders.html', path: '/orders', label: 'Orders' },
        'picking': { file: 'picking.html', path: '/picking-optimizer', label: 'Picking Optimizer' },
        'analytics': { file: 'analytics.html', path: '/analytics', label: 'Analytics' },
        'settings': { file: 'settings.html', path: '/settings', label: 'Settings' }
    };

    // Determine current active page key
    function detectActivePage() {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();

        if (path.endsWith('products.html') || path.includes('/products') || hash.includes('products')) {
            return 'products';
        }
        if (path.endsWith('layout.html') || path.includes('/warehouse') || path.includes('/layout') || hash.includes('layout')) {
            return 'layout';
        }
        if (path.endsWith('shelf-optimizer.html') || path.includes('/shelf-optimizer') || hash.includes('shelf')) {
            return 'shelf-optimizer';
        }
        if (path.endsWith('orders.html') || path.includes('/orders') || hash.includes('orders')) {
            return 'orders';
        }
        if (path.endsWith('picking.html') || path.includes('/picking-optimizer') || path.includes('/picking') || hash.includes('picking')) {
            return 'picking';
        }
        if (path.endsWith('analytics.html') || path.includes('/analytics') || hash.includes('analytics')) {
            return 'analytics';
        }
        if (path.endsWith('settings.html') || path.includes('/settings') || hash.includes('settings')) {
            return 'settings';
        }
        return 'dashboard';
    }

    // Initialize navigation listeners & active highlights
    function initNavigation() {
        const activeKey = detectActivePage();

        // Highlight matching sidebar nav item
        const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
        navItems.forEach(item => {
            const navKey = item.getAttribute('data-nav');
            if (navKey === activeKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Ensure sidebar brand navigates to Dashboard
        const brand = document.querySelector('.sidebar-brand');
        if (brand) {
            brand.style.cursor = 'pointer';
            brand.addEventListener('click', function (e) {
                if (!brand.getAttribute('href') || brand.getAttribute('href') === '#') {
                    e.preventDefault();
                    window.location.href = 'index.html';
                }
            });
        }

        // Global search shortcut handler (Cmd/Ctrl + K)
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('globalSearchInput') || document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();
