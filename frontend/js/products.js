/**
 * PRODUCTS CATALOG & SLOTTING INTERACTIVITY ENGINE
 * Vanilla JavaScript Implementation
 */

// Comprehensive Mock Products Dataset
let productsData = [
    {
        sku: "SKU-1001",
        name: "Ultralight Running Shoes",
        subtitle: "Men's Size 10 • Red/Black",
        category: "Footwear",
        categoryCrumb: "FOOTWEAR // ATHLETIC",
        demand: 1248,
        demandPct: 86,
        stock: 320,
        weight: 1.2,
        shelf: "Bay A1",
        shelfSub: "Aisle A • Runway 1",
        utilization: "78%",
        palletTotal: "384 kg",
        status: "Active • High Demand Waypoint",
        statusType: "healthy",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&auto=format&fit=crop&q=80",
        note: "Staged in Aisle A Bay A1 directly minimizes operator transit by 38 meters per pick cycle compared to Zone C.",
        proximityBadge: "Optimized (12m to Hub)",
        zone: "Zone A"
    },
    {
        sku: "SKU-1002",
        name: "Cotton Crew Shirts",
        subtitle: "Multi-pack 3x • Heather Gray",
        category: "Clothing",
        categoryCrumb: "APPAREL // ESSENTIALS",
        demand: 894,
        demandPct: 78,
        stock: 215,
        weight: 0.4,
        shelf: "Bay A3",
        shelfSub: "Aisle A • Runway 2",
        utilization: "65%",
        palletTotal: "86 kg",
        status: "Active • Normal Slotting",
        statusType: "healthy",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=160&auto=format&fit=crop&q=80",
        note: "Positioned in high-throughput Aisle A to facilitate multi-item basket picking speed.",
        proximityBadge: "Fast Line (18m to Hub)",
        zone: "Zone A"
    },
    {
        sku: "SKU-1003",
        name: "Smart Watches X9 Titanium",
        subtitle: "Midnight Black • GPS Enabled",
        category: "Electronics",
        categoryCrumb: "ELECTRONICS // WEARABLES",
        demand: 718,
        demandPct: 65,
        stock: 85,
        weight: 0.2,
        shelf: "Bay B2",
        shelfSub: "Aisle B • Mid-Density",
        utilization: "59%",
        palletTotal: "17 kg",
        status: "Low Stock Alert",
        statusType: "low",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&auto=format&fit=crop&q=80",
        note: "High-value electronics slotted in secure Zone B with multi-sensor RFID verification active.",
        proximityBadge: "Protected (24m to Hub)",
        zone: "Zone B"
    },
    {
        sku: "SKU-1004",
        name: "Winter Parka Jackets (Thermal)",
        subtitle: "Size XL • Windproof Shell",
        category: "Clothing",
        categoryCrumb: "OUTERWEAR // WINTER",
        demand: 520,
        demandPct: 48,
        stock: 140,
        weight: 1.8,
        shelf: "Bay A4",
        shelfSub: "Aisle A • Runway 3",
        utilization: "82%",
        palletTotal: "252 kg",
        status: "Active • Seasonal Flow",
        statusType: "healthy",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=160&auto=format&fit=crop&q=80",
        note: "High volume bulk storage with quick access pallet racking along Runway 3.",
        proximityBadge: "Standard (22m to Hub)",
        zone: "Zone A"
    },
    {
        sku: "SKU-1005",
        name: "Canvas Duffel Bags (Heavy-Duty)",
        subtitle: "65L Capacity • Olive Drab",
        category: "Accessories",
        categoryCrumb: "TRAVEL // ACCESSORIES",
        demand: 345,
        demandPct: 32,
        stock: 62,
        weight: 0.9,
        shelf: "Bay A5",
        shelfSub: "Aisle A • End Rack",
        utilization: "88%",
        palletTotal: "55.8 kg",
        status: "Low Stock Alert",
        statusType: "low",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&auto=format&fit=crop&q=80",
        note: "Fast fulfillment slot with direct conveyor dock transfer access.",
        proximityBadge: "Standard (26m to Hub)",
        zone: "Zone A"
    },
    {
        sku: "SKU-1006",
        name: "Industrial Hydraulic Jack 2T",
        subtitle: "Steel Chassis • Dual Piston",
        category: "Tools & Hardware",
        categoryCrumb: "TOOLS // HEAVY MACHINERY",
        demand: 185,
        demandPct: 16,
        stock: 44,
        weight: 14.5,
        shelf: "Bay C2",
        shelfSub: "Aisle C • Heavy High-Bay",
        utilization: "65%",
        palletTotal: "638 kg",
        status: "Active • Heavy Pallet",
        statusType: "healthy",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=160&auto=format&fit=crop&q=80",
        note: "Restricted to lower rack level in Zone C to prevent shelf stress overload and forklift transit friction.",
        proximityBadge: "High-Bay (48m to Hub)",
        zone: "Zone C"
    },
    {
        sku: "SKU-1007",
        name: "Ergonomic Wireless Barcode Scanner",
        subtitle: "2D Imager • Bluetooth Base",
        category: "Electronics",
        categoryCrumb: "HARDWARE // LOGISTICS",
        demand: 290,
        demandPct: 24,
        stock: 18,
        weight: 0.3,
        shelf: "Bay B1",
        shelfSub: "Aisle B • Picking Line",
        utilization: "76%",
        palletTotal: "5.4 kg",
        status: "Low Stock Alert",
        statusType: "low",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80",
        note: "High priority reorder recommended. Current velocity exceeds safety replenishment baseline.",
        proximityBadge: "Direct (20m to Hub)",
        zone: "Zone B"
    },
    {
        sku: "SKU-1008",
        name: "Neoprene Protective Knee Pads",
        subtitle: "Heavy Duty Gel • Reinforced Cap",
        category: "Safety Gear",
        categoryCrumb: "SAFETY // PPE GEAR",
        demand: 110,
        demandPct: 10,
        stock: 0,
        weight: 0.6,
        shelf: "Unassigned",
        shelfSub: "Awaiting Placement",
        utilization: "0%",
        palletTotal: "0 kg",
        status: "Out of Stock",
        statusType: "out",
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=160&auto=format&fit=crop&q=80",
        note: "Currently unallocated in active bays. Awaiting Shelf Optimizer slotting schedule upon PO receipt.",
        proximityBadge: "Unassigned",
        zone: "Unassigned"
    }
];

let selectedSku = "SKU-1001";

document.addEventListener('DOMContentLoaded', () => {
    renderProductsTable();
    initFiltersAndSearch();
    initModal();
    initExportCsv();
    initGlobalShortcuts();
    initLiveTelemetry();
});

/* 1. Render Products Table */
function renderProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    const paginationSummary = document.getElementById('paginationSummary');
    if (!tableBody) return;

    const filtered = getFilteredProducts();

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    No products found matching your filter criteria.
                </td>
            </tr>
        `;
        if (paginationSummary) paginationSummary.textContent = "Showing 0 of 0 products";
        return;
    }

    filtered.forEach(p => {
        const isSelected = p.sku === selectedSku;
        const isHot = p.demandPct >= 60;
        
        let stockClass = "stock-healthy";
        if (p.stock === 0) {
            stockClass = "stock-out";
        } else if (p.stock < 100) {
            stockClass = "stock-low";
        }

        const tr = document.createElement('tr');
        tr.className = `product-row ${isSelected ? 'active-row' : ''}`;
        tr.setAttribute('data-sku', p.sku);

        tr.innerHTML = `
            <td>
                <div class="sku-cell">
                    ${isHot ? '<span class="hot-indicator-dot"></span>' : ''}
                    <span class="sku-code-text ${isHot ? 'hot-sku' : ''}">${p.sku}</span>
                </div>
            </td>
            <td>
                <div class="product-info-cell">
                    <span class="prod-name">${p.name}</span>
                    <span class="prod-sub">${p.subtitle}</span>
                </div>
            </td>
            <td>
                <span class="category-pill">${p.category}</span>
            </td>
            <td>
                <div class="demand-cell">
                    <div class="demand-meta">
                        <span class="demand-num">${p.demand.toLocaleString()} <span class="unit">/ mo</span></span>
                        <span class="demand-pct ${isHot ? 'hot' : ''}">${p.demandPct}%</span>
                    </div>
                    <div class="demand-progress-bar">
                        <div class="demand-bar-fill ${isHot ? 'fill-hot' : 'fill-normal'}" style="width: ${p.demandPct}%;"></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="stock-cell">
                    <span class="stock-qty ${stockClass}">${p.stock}</span>
                    <span class="stock-unit">units</span>
                </div>
            </td>
            <td>
                <span class="weight-text ${p.weight > 10 ? 'heavy-weight' : ''}">${p.weight} kg</span>
            </td>
        `;

        tr.addEventListener('click', () => {
            selectProduct(p.sku);
        });

        tableBody.appendChild(tr);
    });

    if (paginationSummary) {
        paginationSummary.textContent = `Showing 1-${filtered.length} of ${productsData.length} products`;
    }

    // Refresh KPI summary counters
    updateKpiCounters();
}

/* 2. Select Product & Populate Inspection Panel */
function selectProduct(sku) {
    selectedSku = sku;
    const p = productsData.find(item => item.sku === sku);
    if (!p) return;

    // Highlight row
    document.querySelectorAll('.product-row').forEach(row => {
        if (row.getAttribute('data-sku') === sku) {
            row.classList.add('active-row');
        } else {
            row.classList.remove('active-row');
        }
    });

    // Populate Right Inspection Panel
    const inspectSkuHeader = document.getElementById('inspectSkuHeader');
    const inspectTitle = document.getElementById('inspectTitle');
    const inspectCategoryCrumb = document.getElementById('inspectCategoryCrumb');
    const inspectImg = document.getElementById('inspectImg');
    const inspectBadgeTag = document.getElementById('inspectBadgeTag');
    const inspectStockVal = document.getElementById('inspectStockVal');
    const inspectStockSub = document.getElementById('inspectStockSub');
    const inspectDemandVal = document.getElementById('inspectDemandVal');
    const inspectDemandSub = document.getElementById('inspectDemandSub');
    const inspectShelfVal = document.getElementById('inspectShelfVal');
    const inspectShelfSub = document.getElementById('inspectShelfSub');
    const inspectUtilVal = document.getElementById('inspectUtilVal');
    const inspectUtilSub = document.getElementById('inspectUtilSub');
    const inspectWeightVal = document.getElementById('inspectWeightVal');
    const inspectPalletVal = document.getElementById('inspectPalletVal');
    const inspectProxBadge = document.getElementById('inspectProxBadge');
    const inspectBayBox = document.getElementById('inspectBayBox');

    if (inspectSkuHeader) inspectSkuHeader.textContent = p.sku;
    if (inspectTitle) inspectTitle.textContent = p.name;
    if (inspectCategoryCrumb) inspectCategoryCrumb.textContent = p.categoryCrumb || `${p.category.toUpperCase()} // INVENTORY`;
    if (inspectImg) inspectImg.src = p.image;

    if (inspectBadgeTag) {
        if (p.statusType === 'healthy') {
            inspectBadgeTag.innerHTML = `<span class="green-dot"></span> <span>${p.status}</span>`;
            inspectBadgeTag.className = "inspect-status-tag tag-healthy";
        } else if (p.statusType === 'low') {
            inspectBadgeTag.innerHTML = `<span class="amber-dot"></span> <span>${p.status}</span>`;
            inspectBadgeTag.className = "inspect-status-tag tag-amber";
        } else {
            inspectBadgeTag.innerHTML = `<span class="crimson-dot"></span> <span>${p.status}</span>`;
            inspectBadgeTag.className = "inspect-status-tag tag-crimson";
        }
    }

    if (inspectStockVal) {
        inspectStockVal.innerHTML = `${p.stock} <span class="sub-unit">units</span>`;
    }
    if (inspectStockSub) {
        if (p.stock === 0) {
            inspectStockSub.textContent = "✖ Out of Stock (Reorder Required)";
            inspectStockSub.className = "tile-sub crimson-sub";
        } else if (p.stock < 100) {
            inspectStockSub.textContent = "⚠ Below Safety Minimum";
            inspectStockSub.className = "tile-sub amber-sub";
        } else {
            inspectStockSub.textContent = "✔ Healthy (Min: 100)";
            inspectStockSub.className = "tile-sub green-sub";
        }
    }

    if (inspectDemandVal) {
        inspectDemandVal.innerHTML = `${p.demand.toLocaleString()} <span class="sub-unit">picks</span>`;
    }
    if (inspectDemandSub) {
        inspectDemandSub.textContent = p.demandPct >= 70 ? "Top 1% Velocity" : `${p.demandPct}% Velocity Index`;
    }

    if (inspectShelfVal) {
        inspectShelfVal.textContent = p.shelf;
        if (p.shelf === "Unassigned") {
            inspectShelfVal.className = "tile-value-strong crimson-text";
        } else {
            inspectShelfVal.className = "tile-value-strong crimson-text";
        }
    }
    if (inspectShelfSub) inspectShelfSub.textContent = p.shelfSub;
    if (inspectUtilVal) inspectUtilVal.textContent = p.utilization;
    if (inspectUtilSub) inspectUtilSub.textContent = `${p.stock} / 410 Max Units`;
    if (inspectWeightVal) inspectWeightVal.textContent = `${p.weight} kg / unit`;
    if (inspectPalletVal) inspectPalletVal.textContent = `Pallet Total: ${p.palletTotal}`;
    if (inspectProxBadge) inspectProxBadge.textContent = p.proximityBadge;
    if (inspectBayBox) inspectBayBox.textContent = p.shelf !== "Unassigned" ? p.shelf.toUpperCase() : "UNSLOTTED";
}

/* 3. Filtering & Sorting Logic */
function getFilteredProducts() {
    const searchVal = (document.getElementById('productSearchInput')?.value || '').toLowerCase().trim();
    const categoryVal = document.getElementById('categoryFilter')?.value || 'all';
    const zoneVal = document.getElementById('zoneFilter')?.value || 'all';
    const stockVal = document.getElementById('stockFilter')?.value || 'all';
    const sortVal = document.getElementById('sortFilter')?.value || 'demand_desc';

    return productsData.filter(p => {
        // Search query matching
        const matchesSearch = !searchVal || 
            p.name.toLowerCase().includes(searchVal) || 
            p.sku.toLowerCase().includes(searchVal) || 
            p.subtitle.toLowerCase().includes(searchVal) || 
            p.category.toLowerCase().includes(searchVal);

        // Category filter
        const matchesCat = categoryVal === 'all' || p.category === categoryVal;

        // Zone filter
        const matchesZone = zoneVal === 'all' || p.zone === zoneVal;

        // Stock status filter
        let matchesStock = true;
        if (stockVal === 'healthy') matchesStock = p.stock >= 100;
        if (stockVal === 'low') matchesStock = p.stock > 0 && p.stock < 100;
        if (stockVal === 'out') matchesStock = p.stock === 0;

        return matchesSearch && matchesCat && matchesZone && matchesStock;
    }).sort((a, b) => {
        if (sortVal === 'demand_desc') return b.demand - a.demand;
        if (sortVal === 'demand_asc') return a.demand - b.demand;
        if (sortVal === 'stock_desc') return b.stock - a.stock;
        if (sortVal === 'stock_asc') return a.stock - b.stock;
        if (sortVal === 'sku_asc') return a.sku.localeCompare(b.sku);
        return 0;
    });
}

function initFiltersAndSearch() {
    const searchInput = document.getElementById('productSearchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const zoneFilter = document.getElementById('zoneFilter');
    const stockFilter = document.getElementById('stockFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearBtn = document.getElementById('clearFiltersBtn');

    [searchInput, categoryFilter, zoneFilter, stockFilter, sortFilter].forEach(el => {
        if (el) {
            el.addEventListener('input', () => renderProductsTable());
            el.addEventListener('change', () => renderProductsTable());
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (zoneFilter) zoneFilter.value = 'all';
            if (stockFilter) stockFilter.value = 'all';
            if (sortFilter) sortFilter.value = 'demand_desc';
            renderProductsTable();
            showToast("Filters Cleared", "Showing all catalog inventory items.");
        });
    }

    // Inspect action buttons
    const editShelfBtn = document.getElementById('editShelfAllocationBtn');
    if (editShelfBtn) {
        editShelfBtn.addEventListener('click', () => {
            showToast("Shelf Re-Allocation Mode", `Ready to re-assign ${selectedSku} on warehouse grid.`);
        });
    }

    const printBarcodeBtn = document.getElementById('printBarcodeBtn');
    if (printBarcodeBtn) {
        printBarcodeBtn.addEventListener('click', () => {
            showToast("Print Queue", `Generated Code-128 Barcode for ${selectedSku}.`);
        });
    }

    const adjustStockBtn = document.getElementById('adjustStockBtn');
    if (adjustStockBtn) {
        adjustStockBtn.addEventListener('click', () => {
            const current = productsData.find(p => p.sku === selectedSku);
            if (current) {
                const addQty = 50;
                current.stock += addQty;
                if (current.stock >= 100) {
                    current.status = "Active • Normal Slotting";
                    current.statusType = "healthy";
                }
                renderProductsTable();
                selectProduct(selectedSku);
                showToast("Stock Adjusted", `Added ${addQty} units to ${selectedSku}. New Total: ${current.stock}`);
            }
        });
    }

    const closeInspectPanelBtn = document.getElementById('closeInspectPanelBtn');
    const panel = document.getElementById('productInspectionPanel');
    if (closeInspectPanelBtn && panel) {
        closeInspectPanelBtn.addEventListener('click', () => {
            panel.classList.toggle('collapsed');
        });
    }
}

/* 4. Add Product Modal Handlers */
function initModal() {
    const modal = document.getElementById('addProductModal');
    const openBtn = document.getElementById('openAddProductModalBtn');
    const closeBtn = document.getElementById('closeAddProductModalBtn');
    const cancelBtn = document.getElementById('cancelAddProductBtn');
    const form = document.getElementById('addProductForm');

    if (!modal) return;

    const openModal = () => {
        modal.classList.add('show');
        document.getElementById('newProductName')?.focus();
    };

    const closeModal = () => {
        modal.classList.remove('show');
        form?.reset();
    };

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('newProductName').value.trim();
            const sku = document.getElementById('newProductSku').value.trim().toUpperCase();
            const category = document.getElementById('newProductCategory').value;
            const subtitle = document.getElementById('newProductSubtext').value.trim() || `${category} Standard Pack`;
            const demand = parseInt(document.getElementById('newProductDemand').value, 10) || 0;
            const stock = parseInt(document.getElementById('newProductStock').value, 10) || 0;
            const weight = parseFloat(document.getElementById('newProductWeight').value) || 1.0;
            const shelf = document.getElementById('newProductShelf').value;

            const demandPct = Math.min(Math.round((demand / 1400) * 100), 99);
            const zone = shelf.includes('Bay A') ? 'Zone A' : (shelf.includes('Bay B') ? 'Zone B' : (shelf.includes('Bay C') ? 'Zone C' : 'Unassigned'));

            let status = "Active • Normal Slotting";
            let statusType = "healthy";
            if (stock === 0) {
                status = "Out of Stock";
                statusType = "out";
            } else if (stock < 100) {
                status = "Low Stock Alert";
                statusType = "low";
            }

            const newProduct = {
                sku,
                name,
                subtitle,
                category,
                categoryCrumb: `${category.toUpperCase()} // INVENTORY`,
                demand,
                demandPct,
                stock,
                weight,
                shelf,
                shelfSub: shelf !== "Unassigned" ? "Configured Slot" : "Awaiting Placement",
                utilization: `${Math.min(Math.round((stock / 400) * 100), 100)}%`,
                palletTotal: `${(stock * weight).toFixed(1)} kg`,
                status,
                statusType,
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80",
                note: `Registered to catalog. Allocated to ${shelf}.`,
                proximityBadge: shelf.includes('Bay A') ? "Fast Line (15m)" : "Standard (30m)",
                zone
            };

            productsData.unshift(newProduct);
            closeModal();
            renderProductsTable();
            selectProduct(sku);
            showToast("Product Registered", `${sku} (${name}) has been added to inventory.`);
        });
    }
}

/* 5. Export CSV Generator */
function initExportCsv() {
    const exportBtn = document.getElementById('exportProductsCsvBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', () => {
        const headers = ["SKU", "Product Name", "Category", "Monthly Demand", "Stock Quantity", "Unit Weight (kg)", "Current Shelf", "Status"];
        const rows = productsData.map(p => [
            `"${p.sku}"`,
            `"${p.name}"`,
            `"${p.category}"`,
            p.demand,
            p.stock,
            p.weight,
            `"${p.shelf}"`,
            `"${p.status}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `warehouse_products_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast("CSV Export Complete", `Downloaded catalog manifest (${productsData.length} records).`);
    });
}

/* 6. Update KPI Counters */
function updateKpiCounters() {
    const kpiTotal = document.getElementById('kpiTotalProducts');
    const kpiActive = document.getElementById('kpiActiveSkus');
    const kpiLow = document.getElementById('kpiLowStock');
    const kpiUnassigned = document.getElementById('kpiUnassigned');

    if (kpiTotal) kpiTotal.textContent = (1420 + productsData.length - 8).toLocaleString();
    if (kpiActive) {
        const activeCount = productsData.filter(p => p.shelf !== "Unassigned").length;
        kpiActive.textContent = (942 + activeCount - 7).toLocaleString();
    }
    if (kpiLow) {
        const lowCount = productsData.filter(p => p.stock > 0 && p.stock < 100).length;
        kpiLow.textContent = (28 + lowCount - 3).toLocaleString();
    }
    if (kpiUnassigned) {
        const unCount = productsData.filter(p => p.shelf === "Unassigned").length;
        kpiUnassigned.textContent = (14 + unCount - 1).toLocaleString();
    }
}

/* 7. Global Keyboard Shortcuts (⌘K / Ctrl+K) */
function initGlobalShortcuts() {
    const search = document.getElementById('globalSearchInput') || document.getElementById('productSearchInput');

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (search) {
                search.focus();
                search.select();
            }
        }
    });
}

/* 8. Live Heartbeat Pulse */
function initLiveTelemetry() {
    setInterval(() => {
        const dot = document.querySelector('.telemetry-dot');
        if (dot) {
            dot.style.opacity = dot.style.opacity === '0.4' ? '1' : '0.4';
        }
    }, 1200);
}

/* Helper Toast Notification */
let toastTimeout;
function showToast(title, message) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
