/**
 * WAREHOUSE ORDERS & DISPATCH ENGINE
 * Pure Vanilla JavaScript Implementation
 */

// Mock Orders Database
let ordersData = [
    {
        id: "ORD-10241",
        itemsCount: 3,
        unitsCount: 4,
        skus: ["SKU-1001", "SKU-1003", "SKU-1002"],
        destination: "Zone A Fast Dispatch",
        priority: "URGENT",
        status: "Picking",
        time: "10:42 AM",
        createdAgo: "18 min ago",
        wave: "Wave 14",
        step: 3, // 1: Recv, 2: Queue, 3: Picking, 4: Packed, 5: Done
        distance: 86,
        timeEst: "3m 12s",
        agvRoute: "AGV Route #04",
        items: [
            {
                sku: "SKU-1001",
                name: "Ultralight Running Shoes",
                bay: "A1",
                zone: "Zone A",
                qty: 2,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1003",
                name: "Smart Watches X9 Pro",
                bay: "B2",
                zone: "Zone B",
                qty: 1,
                status: "Reserved",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1002",
                name: "Cotton Crew Shirts (Pack 3)",
                bay: "A3",
                zone: "Zone A",
                qty: 1,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10240",
        itemsCount: 5,
        unitsCount: 7,
        skus: ["SKU-1004", "SKU-1006", "SKU-1005"],
        destination: "Zone C Bulk High-Bay",
        priority: "HIGH",
        status: "Queued",
        time: "10:35 AM",
        createdAgo: "25 min ago",
        wave: "Wave 14",
        step: 2,
        distance: 142,
        timeEst: "5m 45s",
        agvRoute: "AGV Route #08",
        items: [
            {
                sku: "SKU-1004",
                name: "Winter Parka Jackets",
                bay: "A4",
                zone: "Zone A",
                qty: 3,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1006",
                name: "Hydraulic Floor Jack 2-Ton",
                bay: "C1",
                zone: "Zone C",
                qty: 2,
                status: "Reserved",
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1005",
                name: "Wireless Tactical Headsets",
                bay: "B1",
                zone: "Zone B",
                qty: 2,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10239",
        itemsCount: 2,
        unitsCount: 2,
        skus: ["SKU-1002", "SKU-1007"],
        destination: "Zone B Mid-Density",
        priority: "NORMAL",
        status: "Completed",
        time: "10:21 AM",
        createdAgo: "39 min ago",
        wave: "Wave 13",
        step: 5,
        distance: 74,
        timeEst: "2m 50s",
        agvRoute: "AGV Route #02",
        items: [
            {
                sku: "SKU-1002",
                name: "Cotton Crew Shirts",
                bay: "A3",
                zone: "Zone A",
                qty: 1,
                status: "Picked",
                image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1007",
                name: "Field Diagnostic Lanterns",
                bay: "B3",
                zone: "Zone B",
                qty: 1,
                status: "Picked",
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10238",
        itemsCount: 7,
        unitsCount: 11,
        skus: ["SKU-1001", "SKU-1004", "SKU-1008"],
        destination: "Zone A Fast Dispatch",
        priority: "HIGH",
        status: "Packed",
        time: "09:58 AM",
        createdAgo: "1 hr ago",
        wave: "Wave 13",
        step: 4,
        distance: 118,
        timeEst: "4m 15s",
        agvRoute: "AGV Route #05",
        items: [
            {
                sku: "SKU-1001",
                name: "Ultralight Running Shoes",
                bay: "A1",
                zone: "Zone A",
                qty: 4,
                status: "Packed",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1004",
                name: "Winter Parka Jackets",
                bay: "A4",
                zone: "Zone A",
                qty: 4,
                status: "Packed",
                image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1008",
                name: "Stainless Steel Flasks 1L",
                bay: "B4",
                zone: "Zone B",
                qty: 3,
                status: "Packed",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10237",
        itemsCount: 4,
        unitsCount: 4,
        skus: ["SKU-1003", "SKU-1005"],
        destination: "Zone B Mid-Density",
        priority: "NORMAL",
        status: "Completed",
        time: "09:44 AM",
        createdAgo: "1 hr 16m ago",
        wave: "Wave 12",
        step: 5,
        distance: 92,
        timeEst: "3m 35s",
        agvRoute: "AGV Route #03",
        items: [
            {
                sku: "SKU-1003",
                name: "Smart Watches X9 Pro",
                bay: "B2",
                zone: "Zone B",
                qty: 2,
                status: "Dispatched",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1005",
                name: "Wireless Tactical Headsets",
                bay: "B1",
                zone: "Zone B",
                qty: 2,
                status: "Dispatched",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10236",
        itemsCount: 6,
        unitsCount: 8,
        skus: ["SKU-1006", "SKU-1002", "SKU-1007"],
        destination: "Outbound Dock 02",
        priority: "URGENT",
        status: "Picking",
        time: "09:30 AM",
        createdAgo: "1 hr 30m ago",
        wave: "Wave 12",
        step: 3,
        distance: 106,
        timeEst: "4m 02s",
        agvRoute: "AGV Route #06",
        items: [
            {
                sku: "SKU-1006",
                name: "Hydraulic Floor Jack 2-Ton",
                bay: "C1",
                zone: "Zone C",
                qty: 2,
                status: "Picking",
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1002",
                name: "Cotton Crew Shirts",
                bay: "A3",
                zone: "Zone A",
                qty: 4,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80"
            },
            {
                sku: "SKU-1007",
                name: "Field Diagnostic Lanterns",
                bay: "B3",
                zone: "Zone B",
                qty: 2,
                status: "Staged",
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        id: "ORD-10235",
        itemsCount: 1,
        unitsCount: 1,
        skus: ["SKU-1004"],
        destination: "Zone A Fast Dispatch",
        priority: "NORMAL",
        status: "Queued",
        time: "09:15 AM",
        createdAgo: "1 hr 45m ago",
        wave: "Wave 11",
        step: 2,
        distance: 45,
        timeEst: "1m 40s",
        agvRoute: "AGV Route #01",
        items: [
            {
                sku: "SKU-1004",
                name: "Winter Parka Jackets",
                bay: "A4",
                zone: "Zone A",
                qty: 1,
                status: "Reserved",
                image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=100&auto=format&fit=crop&q=80"
            }
        ]
    }
];

let selectedOrderId = "ORD-10241";

document.addEventListener('DOMContentLoaded', () => {
    renderOrdersTable(ordersData);
    selectOrder("ORD-10241");
    initSearchAndFilters();
    initInspectorActions();
    initCreateOrderModal();
    initExportOrders();
});

/* 1. Render Orders Table */
function renderOrdersTable(data) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching orders found.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(order => {
        const isSelected = order.id === selectedOrderId;
        const priorityClass = order.priority === 'URGENT' ? 'urgent' : (order.priority === 'HIGH' ? 'high' : 'normal');
        const statusClass = order.status.toLowerCase();

        return `
            <tr class="order-table-row ${isSelected ? 'active-selected-order' : ''}" data-id="${order.id}">
                <td>
                    <div class="order-id-cell">
                        <span class="order-accent-bar ${priorityClass}"></span>
                        <strong class="order-id-text">${order.id}</strong>
                    </div>
                </td>
                <td>
                    <div class="order-items-cell">
                        <strong class="items-count-bold">${order.itemsCount} Items (${order.unitsCount} Units)</strong>
                        <span class="skus-list-sub">${order.skus.join(', ')}</span>
                    </div>
                </td>
                <td><span class="dest-text">${order.destination}</span></td>
                <td><span class="priority-pill-badge ${priorityClass}">${order.priority}</span></td>
                <td>
                    <span class="status-pill-badge ${statusClass}">
                        ${order.status === 'Completed' || order.status === 'Packed' ? '<span class="green-check-dot">✓</span>' : (order.status === 'Picking' ? '<span class="dot-crimson"></span>' : '<span class="dot-neutral"></span>')}
                        ${order.status}
                    </span>
                </td>
                <td><span class="time-text">${order.time}</span></td>
                <td style="text-align: right;"><strong class="dist-text">${order.distance} m</strong></td>
            </tr>
        `;
    }).join('');

    // Row click handlers
    document.querySelectorAll('.order-table-row').forEach(row => {
        row.addEventListener('click', () => {
            const id = row.getAttribute('data-id');
            selectOrder(id);
        });
    });
}

/* 2. Select Order & Synchronize Inspector Panel */
function selectOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    selectedOrderId = orderId;

    // Highlight row
    document.querySelectorAll('.order-table-row').forEach(r => {
        if (r.getAttribute('data-id') === orderId) {
            r.classList.add('active-selected-order');
        } else {
            r.classList.remove('active-selected-order');
        }
    });

    // Update Header & Tags
    const inspectOrderId = document.getElementById('inspectOrderId');
    const inspectMetaSub = document.getElementById('inspectMetaSub');
    const inspectPriorityBadge = document.getElementById('inspectPriorityBadge');
    const inspectStatusBadge = document.getElementById('inspectStatusBadge');

    if (inspectOrderId) inspectOrderId.textContent = order.id;
    if (inspectMetaSub) inspectMetaSub.textContent = `Created ${order.time} (${order.createdAgo}) • ${order.wave}`;

    if (inspectPriorityBadge) {
        inspectPriorityBadge.textContent = order.priority;
        inspectPriorityBadge.className = `priority-pill-badge ${order.priority.toLowerCase()}`;
    }

    if (inspectStatusBadge) {
        const dot = order.status === 'Completed' || order.status === 'Packed' ? '<span class="green-check-dot">✓</span>' : (order.status === 'Picking' ? '<span class="dot-crimson"></span>' : '<span class="dot-neutral"></span>');
        inspectStatusBadge.innerHTML = `${dot} ${order.status}`;
        inspectStatusBadge.className = `status-pill-badge ${order.status.toLowerCase()}`;
    }

    // Update Fulfillment Stepper
    updateStepper(order.step, order.status);

    // Update Staged Items List
    const inspectStagedTitle = document.getElementById('inspectStagedTitle');
    const inspectItemsList = document.getElementById('inspectItemsList');

    if (inspectStagedTitle) inspectStagedTitle.textContent = `STAGED PICK LIST (${order.items.length} SKUS)`;

    if (inspectItemsList) {
        inspectItemsList.innerHTML = order.items.map(item => `
            <div class="staged-item-card">
                <div class="staged-item-left">
                    <img src="${item.image}" alt="${item.name}" class="item-thumb-img">
                    <div class="item-meta-wrap">
                        <strong class="item-title">${item.name}</strong>
                        <span class="item-sku-bay">${item.sku} • Bay ${item.bay} (${item.zone})</span>
                    </div>
                </div>
                <div class="staged-item-right">
                    <span class="item-qty-badge">${item.qty}x</span>
                    <span class="item-status-text ${item.status === 'Staged' || item.status === 'Packed' || item.status === 'Picked' ? 'green-text' : 'muted-text'}">${item.status}</span>
                </div>
            </div>
        `).join('');
    }

    // Update Metrics
    const inspectDistanceVal = document.getElementById('inspectDistanceVal');
    const inspectTimeVal = document.getElementById('inspectTimeVal');
    const inspectAgvRoute = document.getElementById('inspectAgvRoute');

    if (inspectDistanceVal) inspectDistanceVal.textContent = `${order.distance} meters`;
    if (inspectTimeVal) inspectTimeVal.textContent = order.timeEst;
    if (inspectAgvRoute) inspectAgvRoute.textContent = order.agvRoute;
}

function updateStepper(stepNum, status) {
    const stepperNodes = document.querySelectorAll('#stepperTrack .step-node');
    const connectors = document.querySelectorAll('#stepperTrack .step-connector');

    stepperNodes.forEach(node => {
        const step = parseInt(node.getAttribute('data-step'), 10);
        const circle = node.querySelector('.step-circle');

        if (step < stepNum) {
            node.className = "step-node done";
            circle.textContent = "✓";
        } else if (step === stepNum) {
            node.className = "step-node active";
            circle.innerHTML = `<span class="active-dot-inner"></span>`;
        } else {
            node.className = "step-node";
            circle.textContent = step;
        }
    });

    connectors.forEach((conn, index) => {
        if (index + 1 < stepNum) {
            conn.className = "step-connector done";
        } else if (index + 1 === stepNum) {
            conn.className = "step-connector active";
        } else {
            conn.className = "step-connector";
        }
    });
}

/* 3. Search, Filter & Sort */
function initSearchAndFilters() {
    const searchInput = document.getElementById('orderSearchInput');
    const statusSelect = document.getElementById('statusFilterSelect');
    const prioritySelect = document.getElementById('priorityFilterSelect');
    const sortSelect = document.getElementById('sortOrderSelect');
    const clearBtn = document.getElementById('clearFiltersBtn');

    const applyFilters = () => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const statusVal = statusSelect ? statusSelect.value : 'all';
        const priorityVal = prioritySelect ? prioritySelect.value : 'all';
        const sortVal = sortSelect ? sortSelect.value : 'priority';

        let filtered = ordersData.filter(order => {
            const matchesQuery = order.id.toLowerCase().includes(query) ||
                                 order.destination.toLowerCase().includes(query) ||
                                 order.skus.some(s => s.toLowerCase().includes(query)) ||
                                 order.items.some(i => i.name.toLowerCase().includes(query));

            const matchesStatus = (statusVal === 'all' || order.status.toLowerCase() === statusVal.toLowerCase());
            const matchesPriority = (priorityVal === 'all' || order.priority === priorityVal);

            return matchesQuery && matchesStatus && matchesPriority;
        });

        // Sorting
        if (sortVal === 'priority') {
            const priorityWeight = { 'URGENT': 3, 'HIGH': 2, 'NORMAL': 1 };
            filtered.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
        } else if (sortVal === 'newest') {
            filtered.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortVal === 'oldest') {
            filtered.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortVal === 'distance') {
            filtered.sort((a, b) => a.distance - b.distance);
        }

        renderOrdersTable(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (statusSelect) statusSelect.addEventListener('change', applyFilters);
    if (prioritySelect) prioritySelect.addEventListener('change', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (statusSelect) statusSelect.value = 'all';
            if (prioritySelect) prioritySelect.value = 'all';
            if (sortSelect) sortSelect.value = 'priority';
            applyFilters();
            showToast("Filters Cleared", "Showing all 248 active warehouse orders.");
        });
    }
}

/* 4. Inspector Panel Actions */
function initInspectorActions() {
    const markPackedBtn = document.getElementById('inspectMarkPackedBtn');
    const cancelOrderBtn = document.getElementById('inspectCancelOrderBtn');
    const optimizeBtn = document.getElementById('inspectOptimizeBtn');
    const mapBayBtn = document.getElementById('inspectMapBayBtn');

    if (markPackedBtn) {
        markPackedBtn.addEventListener('click', () => {
            const order = ordersData.find(o => o.id === selectedOrderId);
            if (order) {
                order.status = "Packed";
                order.step = 4;
                order.items.forEach(i => i.status = "Packed");
                renderOrdersTable(ordersData);
                selectOrder(selectedOrderId);
                showToast("Order Marked as Packed", `${order.id} transferred to final dispatch staging conveyor.`);
            }
        });
    }

    if (cancelOrderBtn) {
        cancelOrderBtn.addEventListener('click', () => {
            const order = ordersData.find(o => o.id === selectedOrderId);
            if (order && confirm(`Are you sure you want to cancel ${order.id}?`)) {
                order.status = "Cancelled";
                order.step = 1;
                renderOrdersTable(ordersData);
                selectOrder(selectedOrderId);
                showToast("Order Cancelled", `Release hold placed on ${order.id}.`);
            }
        });
    }

    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', () => {
            showToast("Routing to Picking Optimizer", `Loading 2-Opt TSP trajectory for order ${selectedOrderId}...`);
            // Forward to picking optimizer anchor or future picking page
            setTimeout(() => {
                window.location.hash = "picking";
            }, 800);
        });
    }

    if (mapBayBtn) {
        mapBayBtn.addEventListener('click', () => {
            window.location.href = "layout.html";
        });
    }
}

/* 5. Create Order Modal */
function initCreateOrderModal() {
    const modal = document.getElementById('createOrderModal');
    const openBtn = document.getElementById('openCreateOrderBtn');
    const closeBtn = document.getElementById('closeCreateOrderModalBtn');
    const cancelBtn = document.getElementById('cancelCreateOrderBtn');
    const form = document.getElementById('createOrderForm');
    const addSkuBtn = document.getElementById('addAnotherSkuBtn');
    const prodsList = document.getElementById('newOrderProductsList');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            // Auto increment ID
            const newIdInput = document.getElementById('newOrderId');
            if (newIdInput) newIdInput.value = `ORD-${10242 + ordersData.length - 7}`;
            modal.classList.add('show');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    }
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => modal.classList.remove('show'));
    }

    if (addSkuBtn && prodsList) {
        addSkuBtn.addEventListener('click', () => {
            const newRow = document.createElement('div');
            newRow.className = "product-item-row";
            newRow.style.cssText = "display: grid; grid-template-columns: 2fr 1fr; gap: 0.5rem;";
            newRow.innerHTML = `
                <select class="form-select new-item-sku">
                    <option value="SKU-1001">SKU-1001 — Ultralight Running Shoes (A1)</option>
                    <option value="SKU-1002">SKU-1002 — Cotton Crew Shirts (A3)</option>
                    <option value="SKU-1003">SKU-1003 — Smart Watches X9 (B2)</option>
                    <option value="SKU-1004">SKU-1004 — Winter Parka Jackets (A4)</option>
                    <option value="SKU-1005">SKU-1005 — Tactical Headsets (B1)</option>
                </select>
                <input type="number" class="form-input new-item-qty" value="1" min="1" max="50">
            `;
            prodsList.appendChild(newRow);
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('newOrderId').value.trim();
            const priority = document.getElementById('newOrderPriority').value;
            const dest = document.getElementById('newOrderDest').value;

            const skuSelects = form.querySelectorAll('.new-item-sku');
            const qtyInputs = form.querySelectorAll('.new-item-qty');

            const items = [];
            const skus = [];
            let totalUnits = 0;

            const skuMap = {
                "SKU-1001": { name: "Ultralight Running Shoes", bay: "A1", zone: "Zone A", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80" },
                "SKU-1002": { name: "Cotton Crew Shirts", bay: "A3", zone: "Zone A", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80" },
                "SKU-1003": { name: "Smart Watches X9 Pro", bay: "B2", zone: "Zone B", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80" },
                "SKU-1004": { name: "Winter Parka Jackets", bay: "A4", zone: "Zone A", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=100&auto=format&fit=crop&q=80" },
                "SKU-1005": { name: "Wireless Tactical Headsets", bay: "B1", zone: "Zone B", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80" },
                "SKU-1006": { name: "Hydraulic Floor Jack 2-Ton", bay: "C1", zone: "Zone C", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80" }
            };

            skuSelects.forEach((sel, idx) => {
                const skuCode = sel.value;
                const qty = parseInt(qtyInputs[idx].value, 10) || 1;
                totalUnits += qty;
                skus.push(skuCode);

                const info = skuMap[skuCode] || { name: "Warehouse Staged Item", bay: "A1", zone: "Zone A", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80" };
                items.push({
                    sku: skuCode,
                    name: info.name,
                    bay: info.bay,
                    zone: info.zone,
                    qty: qty,
                    status: "Staged",
                    image: info.image
                });
            });

            const newOrder = {
                id,
                itemsCount: items.length,
                unitsCount: totalUnits,
                skus,
                destination: dest,
                priority,
                status: "Picking",
                time: "Just now",
                createdAgo: "1 min ago",
                wave: "Wave 14",
                step: 3,
                distance: 78 + Math.floor(Math.random() * 40),
                timeEst: "3m 10s",
                agvRoute: "AGV Route #09",
                items
            };

            ordersData.unshift(newOrder);

            // Update KPI
            const kpiTotal = document.getElementById('kpiTotalOrders');
            if (kpiTotal) kpiTotal.textContent = 248 + ordersData.length - 7;

            modal.classList.remove('show');
            form.reset();
            renderOrdersTable(ordersData);
            selectOrder(id);
            showToast("Order Created & Dispatched", `Order ${id} dispatched to picker carts.`);
        });
    }
}

/* 6. Export Orders to CSV */
function initExportOrders() {
    const exportBtn = document.getElementById('exportOrdersBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            let csv = "Order ID,Items,Units,Destination,Priority,Status,Time,Distance (m)\n";
            ordersData.forEach(o => {
                csv += `"${o.id}","${o.itemsCount}","${o.unitsCount}","${o.destination}","${o.priority}","${o.status}","${o.time}","${o.distance}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `warehouse_orders_manifest_${new Date().toISOString().slice(0, 10)}.csv`);
            a.click();
            showToast("Orders Exported", "Warehouse batch manifest CSV downloaded.");
        });
    }
}

/* Toast Helper */
let toastTimeout;
function showToast(title, msg) {
    const toast = document.getElementById('toastNotification');
    const tTitle = document.getElementById('toastTitle');
    const tMsg = document.getElementById('toastMessage');

    if (!toast) return;
    if (tTitle) tTitle.textContent = title;
    if (tMsg) tMsg.textContent = msg;

    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3800);
}
