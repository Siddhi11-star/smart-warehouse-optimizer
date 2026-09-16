/**
 * WAREHOUSE LAYOUT & RACK MATRIX INTERACTIVITY ENGINE
 * Vanilla JavaScript Implementation
 */

// Mock Bay Dataset
let baysData = {
    "A1": {
        code: "A1",
        zone: "Zone A",
        zoneFull: "ZONE A — FAST DISPATCH",
        title: "Ultralight Running Shoes",
        sku: "SKU-1001",
        category: "Footwear // Athletic",
        demand: 1248,
        load: 92,
        capacity: 100,
        utilization: 92,
        gridPos: "Row A / Bay 1",
        structure: "4-Tier Steel Rack",
        dimensions: "2.4m W × 1.8m D × 4.2m H",
        distance: "18 meters (Fastest infeed loop)",
        status: "Active High Demand",
        statusType: "hot",
        unitWeight: "1.2 kg",
        totalWeight: "110.4 kg",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&auto=format&fit=crop&q=80",
        rationale: "Bay A1 is positioned 18m from the primary packing conveyor, minimizing picker transit by 38 meters per cycle compared to Zone C. Optimal positioning for high wave velocity items.",
        skus: [
            { sku: "SKU-1001", name: "Ultralight Running Shoes - Red/Black", qty: 60, weight: "1.2 kg" },
            { sku: "SKU-1001-B", name: "Ultralight Running Shoes - Blue", qty: 32, weight: "1.2 kg" }
        ]
    },
    "A2": {
        code: "A2",
        zone: "Zone A",
        zoneFull: "ZONE A — FAST DISPATCH",
        title: "Electronics Diagnostic Kits",
        sku: "SKU-2041",
        category: "Electronics // Sensors",
        demand: 540,
        load: 68,
        capacity: 100,
        utilization: 68,
        gridPos: "Row A / Bay 2",
        structure: "4-Tier Steel Rack",
        dimensions: "2.4m W × 1.8m D × 4.2m H",
        distance: "20 meters (Fast infeed runway)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "0.8 kg",
        totalWeight: "54.4 kg",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&auto=format&fit=crop&q=80",
        rationale: "Positioned on Runway 2 for immediate basket consolidation with high-speed items.",
        skus: [
            { sku: "SKU-2041", name: "Diagnostic Sensor Modules", qty: 68, weight: "0.8 kg" }
        ]
    },
    "A3": {
        code: "A3",
        zone: "Zone A",
        zoneFull: "ZONE A — FAST DISPATCH",
        title: "Cotton Crew Shirts",
        sku: "SKU-0842",
        category: "Apparel // Essentials",
        demand: 982,
        load: 84,
        capacity: 100,
        utilization: 84,
        gridPos: "Row A / Bay 3",
        structure: "4-Tier Steel Rack",
        dimensions: "2.4m W × 1.8m D × 4.2m H",
        distance: "22 meters (High velocity line)",
        status: "Active High Demand",
        statusType: "hot",
        unitWeight: "0.4 kg",
        totalWeight: "33.6 kg",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=160&auto=format&fit=crop&q=80",
        rationale: "High pickup density item allocated to Zone A runway minimizing human picking travel.",
        skus: [
            { sku: "SKU-0842", name: "Cotton Crew 3-Pack Heather", qty: 84, weight: "0.4 kg" }
        ]
    },
    "A4": {
        code: "A4",
        zone: "Zone A",
        zoneFull: "ZONE A — FAST DISPATCH",
        title: "Winter Parka Jackets",
        sku: "SKU-3129",
        category: "Outerwear // Thermal",
        demand: 520,
        load: 96,
        capacity: 100,
        utilization: 96,
        gridPos: "Row A / Bay 4",
        structure: "4-Tier Steel Rack",
        dimensions: "2.4m W × 1.8m D × 4.2m H",
        distance: "25 meters (Runway End)",
        status: "Near Capacity Warning",
        statusType: "amber",
        unitWeight: "1.8 kg",
        totalWeight: "172.8 kg",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=160&auto=format&fit=crop&q=80",
        rationale: "Near volumetric threshold (96%). Recommend splitting excess batches to Zone B overflow.",
        skus: [
            { sku: "SKU-3129", name: "Winter Parka Heavy Thermal XL", qty: 96, weight: "1.8 kg" }
        ]
    },
    "B1": {
        code: "B1",
        zone: "Zone B",
        zoneFull: "ZONE B — MID-DENSITY",
        title: "Tactical Headsets Pro",
        sku: "SKU-7718",
        category: "Electronics // Audio",
        demand: 420,
        load: 78,
        capacity: 100,
        utilization: 78,
        gridPos: "Row B / Bay 1",
        structure: "3-Tier Steel Rack",
        dimensions: "2.4m W × 1.5m D × 3.6m H",
        distance: "28 meters (Mid-Zone Line)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "0.5 kg",
        totalWeight: "39.0 kg",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80",
        rationale: "Secure mid-density allocation suited for high-value hardware items with RFID telemetry.",
        skus: [
            { sku: "SKU-7718", name: "Wireless Tactical Headsets", qty: 78, weight: "0.5 kg" }
        ]
    },
    "B2": {
        code: "B2",
        zone: "Zone B",
        zoneFull: "ZONE B — MID-DENSITY",
        title: "Smart Watches X9 Titanium",
        sku: "SKU-6602",
        category: "Electronics // Wearables",
        demand: 890,
        load: 86,
        capacity: 100,
        utilization: 86,
        gridPos: "Row B / Bay 2",
        structure: "3-Tier Steel Rack",
        dimensions: "2.4m W × 1.5m D × 3.6m H",
        distance: "30 meters (Mid-Zone Waypoint)",
        status: "Active High Demand",
        statusType: "hot",
        unitWeight: "0.2 kg",
        totalWeight: "17.2 kg",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&auto=format&fit=crop&q=80",
        rationale: "Active waypoint waypoint stop #3. High velocity wearable device requiring fast cart routing.",
        skus: [
            { sku: "SKU-6602", name: "Smart Watch X9 Titanium Edition", qty: 86, weight: "0.2 kg" }
        ]
    },
    "B3": {
        code: "B3",
        zone: "Zone B",
        zoneFull: "ZONE B — MID-DENSITY",
        title: "Field Diagnostic Lanterns",
        sku: "SKU-5521",
        category: "Hardware // Lighting",
        demand: 280,
        load: 60,
        capacity: 100,
        utilization: 60,
        gridPos: "Row B / Bay 3",
        structure: "3-Tier Steel Rack",
        dimensions: "2.4m W × 1.5m D × 3.6m H",
        distance: "33 meters (Mid-Zone)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "1.1 kg",
        totalWeight: "66.0 kg",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=160&auto=format&fit=crop&q=80",
        rationale: "Standard velocity hardware slotting with forklift clearance access.",
        skus: [
            { sku: "SKU-5521", name: "Rugged LED Field Lanterns", qty: 60, weight: "1.1 kg" }
        ]
    },
    "B4": {
        code: "B4",
        zone: "Zone B",
        zoneFull: "ZONE B — MID-DENSITY",
        title: "Stainless Flasks Heavy",
        sku: "SKU-9908",
        category: "Accessories // Utility",
        demand: 310,
        load: 74,
        capacity: 100,
        utilization: 74,
        gridPos: "Row B / Bay 4",
        structure: "3-Tier Steel Rack",
        dimensions: "2.4m W × 1.5m D × 3.6m H",
        distance: "35 meters (Mid-Zone End)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "0.6 kg",
        totalWeight: "44.4 kg",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&auto=format&fit=crop&q=80",
        rationale: "Optimal medium velocity staging near cross-aisle AGV junction.",
        skus: [
            { sku: "SKU-9908", name: "Insulated Flasks 1L", qty: 74, weight: "0.6 kg" }
        ]
    },
    "C1": {
        code: "C1",
        zone: "Zone C",
        zoneFull: "ZONE C — HEAVY & BULK HIGH-BAYS",
        title: "Heavy Tarpaulins & Covers",
        sku: "SKU-8820",
        category: "Tools // Heavy Reach",
        demand: 110,
        load: 42,
        capacity: 100,
        utilization: 42,
        gridPos: "Row C / Bay 1",
        structure: "5-Tier Heavy Duty Rack",
        dimensions: "3.0m W × 2.0m D × 5.5m H",
        distance: "42 meters (Zone C Reach)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "8.5 kg",
        totalWeight: "357.0 kg",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=160&auto=format&fit=crop&q=80",
        rationale: "Low dispatch velocity item stored in high-bay sector to conserve prime runway capacity.",
        skus: [
            { sku: "SKU-8820", name: "Reinforced 500GSM Tarps", qty: 42, weight: "8.5 kg" }
        ]
    },
    "C2": {
        code: "C2",
        zone: "Zone C",
        zoneFull: "ZONE C — HEAVY & BULK HIGH-BAYS",
        title: "Hydraulic Jacks 2T",
        sku: "SKU-3940",
        category: "Tools & Machinery",
        demand: 190,
        load: 65,
        capacity: 100,
        utilization: 65,
        gridPos: "Row C / Bay 2",
        structure: "5-Tier Heavy Duty Rack",
        dimensions: "3.0m W × 2.0m D × 5.5m H",
        distance: "45 meters (Zone C Heavy)",
        status: "Standard Occupied",
        statusType: "standard",
        unitWeight: "14.5 kg",
        totalWeight: "942.5 kg",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=160&auto=format&fit=crop&q=80",
        rationale: "Heavy machinery stored on ground-level tier to satisfy safety weight distribution rules.",
        skus: [
            { sku: "SKU-3940", name: "2-Ton Hydraulic Service Jacks", qty: 65, weight: "14.5 kg" }
        ]
    },
    "C3": {
        code: "C3",
        zone: "Zone C",
        zoneFull: "ZONE C — HEAVY & BULK HIGH-BAYS",
        title: "Thermal Insulation Panels",
        sku: "SKU-1192",
        category: "Construction // Bulky",
        demand: 240,
        load: 89,
        capacity: 100,
        utilization: 89,
        gridPos: "Row C / Bay 3",
        structure: "5-Tier Heavy Duty Rack",
        dimensions: "3.0m W × 2.0m D × 5.5m H",
        distance: "48 meters (Zone C)",
        status: "Active High Demand",
        statusType: "hot",
        unitWeight: "4.2 kg",
        totalWeight: "373.8 kg",
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=160&auto=format&fit=crop&q=80",
        rationale: "Bulky pallet items organized with high-reach forklift channel clearance.",
        skus: [
            { sku: "SKU-1192", name: "Foil-Faced Thermal Panels", qty: 89, weight: "4.2 kg" }
        ]
    },
    "C4": {
        code: "C4",
        zone: "Zone C",
        zoneFull: "ZONE C — HEAVY & BULK HIGH-BAYS",
        title: "Pallet Staging (Available)",
        sku: "UNASSIGNED",
        category: "Unallocated Bay",
        demand: 0,
        load: 0,
        capacity: 350,
        utilization: 0,
        gridPos: "Row C / Bay 4",
        structure: "5-Tier Heavy Duty Rack",
        dimensions: "3.0m W × 2.0m D × 5.5m H",
        distance: "50 meters (Open Staging)",
        status: "Available / Empty",
        statusType: "available",
        unitWeight: "0.0 kg",
        totalWeight: "0.0 kg",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80",
        rationale: "Unallocated open rack available for overflow reallocation or incoming PO pallet staging.",
        skus: []
    }
};

let selectedBayCode = "A1";
let currentZoom = 1.0;

document.addEventListener('DOMContentLoaded', () => {
    initShelfClickHandlers();
    initZoneFiltering();
    initMapControls();
    initModals();
    initTooltips();
    selectBay("A1");
});

/* 1. Shelf Selection & Inspector Sync */
function selectBay(bayCode) {
    if (!baysData[bayCode]) return;
    selectedBayCode = bayCode;
    const bay = baysData[bayCode];

    // Highlight rack card
    document.querySelectorAll('.rack-bay-card').forEach(card => {
        if (card.getAttribute('data-bay') === bayCode) {
            card.classList.add('active-selected-bay');
        } else {
            card.classList.remove('active-selected-bay');
        }
    });

    // Update Right Inspector Panel
    const inspectZoneTitle = document.getElementById('inspectZoneTitle');
    const inspectBayCode = document.getElementById('inspectBayCode');
    const inspectStatusPill = document.getElementById('inspectStatusPill');
    const inspectGridPos = document.getElementById('inspectGridPos');
    const inspectStructure = document.getElementById('inspectStructure');
    const inspectDimensions = document.getElementById('inspectDimensions');
    const inspectPackingDist = document.getElementById('inspectPackingDist');
    const inspectUtilPct = document.getElementById('inspectUtilPct');
    const inspectUtilBar = document.getElementById('inspectUtilBar');
    const inspectLoadVal = document.getElementById('inspectLoadVal');
    const inspectCapVal = document.getElementById('inspectCapVal');
    const inspectSkuImg = document.getElementById('inspectSkuImg');
    const inspectSkuCode = document.getElementById('inspectSkuCode');
    const inspectSkuName = document.getElementById('inspectSkuName');
    const inspectSkuCat = document.getElementById('inspectSkuCat');
    const inspectVelocityVal = document.getElementById('inspectVelocityVal');
    const inspectWeightVal = document.getElementById('inspectWeightVal');
    const inspectTotalWeightVal = document.getElementById('inspectTotalWeightVal');
    const inspectRationale = document.getElementById('inspectRationale');

    if (inspectZoneTitle) inspectZoneTitle.textContent = bay.zoneFull;
    if (inspectBayCode) inspectBayCode.textContent = bay.code;

    if (inspectStatusPill) {
        inspectStatusPill.innerHTML = `<span>${bay.status}</span>`;
        if (bay.statusType === 'hot') {
            inspectStatusPill.className = "shelf-status-pill pill-hot-status";
        } else if (bay.statusType === 'available') {
            inspectStatusPill.className = "shelf-status-pill pill-available-status";
        } else if (bay.statusType === 'amber') {
            inspectStatusPill.className = "shelf-status-pill pill-amber-status";
        } else {
            inspectStatusPill.className = "shelf-status-pill pill-standard-status";
        }
    }

    if (inspectGridPos) inspectGridPos.textContent = bay.gridPos;
    if (inspectStructure) inspectStructure.textContent = bay.structure;
    if (inspectDimensions) inspectDimensions.textContent = bay.dimensions;
    if (inspectPackingDist) inspectPackingDist.textContent = bay.distance;

    if (inspectUtilPct) inspectUtilPct.textContent = `${bay.utilization}%`;
    if (inspectUtilBar) {
        inspectUtilBar.style.width = `${bay.utilization}%`;
        inspectUtilBar.className = `util-bar-fill ${bay.statusType === 'hot' ? 'fill-hot' : (bay.statusType === 'amber' ? 'fill-amber' : (bay.statusType === 'available' ? 'fill-green' : 'fill-normal'))}`;
    }

    if (inspectLoadVal) inspectLoadVal.textContent = `${bay.load} units`;
    if (inspectCapVal) inspectCapVal.textContent = `${bay.capacity} units`;

    if (inspectSkuImg) inspectSkuImg.src = bay.image;
    if (inspectSkuCode) inspectSkuCode.textContent = bay.sku;
    if (inspectSkuName) inspectSkuName.textContent = bay.title;
    if (inspectSkuCat) inspectSkuCat.textContent = `Category: ${bay.category}`;

    if (inspectVelocityVal) inspectVelocityVal.textContent = `${bay.demand.toLocaleString()} picks/mo`;
    if (inspectWeightVal) inspectWeightVal.textContent = bay.unitWeight;
    if (inspectTotalWeightVal) inspectTotalWeightVal.textContent = `Total Bay: ${bay.totalWeight}`;

    if (inspectRationale) {
        inspectRationale.innerHTML = `<strong>Optimizer Rationale:</strong> ${bay.rationale}`;
    }
}

function initShelfClickHandlers() {
    const rackCards = document.querySelectorAll('.rack-bay-card');
    rackCards.forEach(card => {
        card.addEventListener('click', () => {
            const bay = card.getAttribute('data-bay');
            selectBay(bay);
        });
    });
}

/* 2. Zone Filtering */
function initZoneFiltering() {
    const zonePills = document.querySelectorAll('.layout-zone-pill');
    const aisleContainers = document.querySelectorAll('.floor-aisle-container');

    zonePills.forEach(pill => {
        pill.addEventListener('click', () => {
            zonePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const selectedZone = pill.getAttribute('data-zone');

            aisleContainers.forEach(container => {
                const zone = container.getAttribute('data-zone');
                if (selectedZone === 'all' || zone === selectedZone) {
                    container.classList.remove('dimmed-zone');
                    container.style.opacity = '1';
                } else {
                    container.classList.add('dimmed-zone');
                    container.style.opacity = '0.2';
                }
            });

            // Select first bay in active zone
            if (selectedZone === 'a') selectBay('A1');
            if (selectedZone === 'b') selectBay('B1');
            if (selectedZone === 'c') selectBay('C1');
        });
    });
}

/* 3. Map View Controls & Zoom */
function initMapControls() {
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const fitViewBtn = document.getElementById('fitViewBtn');
    const resetBtn = document.getElementById('resetLayoutViewBtn');
    const floorViewport = document.getElementById('floorViewport');

    const updateZoom = () => {
        if (floorViewport) {
            floorViewport.style.transform = `scale(${currentZoom})`;
            floorViewport.style.transformOrigin = 'top left';
            floorViewport.style.transition = 'transform 0.2s ease';
        }
    };

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < 1.3) {
                currentZoom += 0.1;
                updateZoom();
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > 0.8) {
                currentZoom -= 0.1;
                updateZoom();
            }
        });
    }

    if (fitViewBtn) {
        fitViewBtn.addEventListener('click', () => {
            currentZoom = 1.0;
            updateZoom();
            showToast("Camera Adjusted", "Fit to default warehouse 2D matrix.");
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentZoom = 1.0;
            updateZoom();
            const allZonesPill = document.querySelector('.layout-zone-pill[data-zone="all"]');
            if (allZonesPill) allZonesPill.click();
            selectBay("A1");
            showToast("Layout Reset", "Reset zoom and zone isolation.");
        });
    }
}

/* 4. Modals and Interactions */
function initModals() {
    // Add Shelf Modal
    const addShelfModal = document.getElementById('addShelfModal');
    const openAddShelfBtn = document.getElementById('openAddShelfModalBtn');
    const closeAddShelfBtn = document.getElementById('closeAddShelfModalBtn');
    const cancelAddShelfBtn = document.getElementById('cancelAddShelfBtn');
    const addShelfForm = document.getElementById('addShelfForm');

    if (openAddShelfBtn && addShelfModal) {
        openAddShelfBtn.addEventListener('click', () => addShelfModal.classList.add('show'));
    }
    if (closeAddShelfBtn && addShelfModal) {
        closeAddShelfBtn.addEventListener('click', () => addShelfModal.classList.remove('show'));
    }
    if (cancelAddShelfBtn && addShelfModal) {
        cancelAddShelfBtn.addEventListener('click', () => addShelfModal.classList.remove('show'));
    }

    if (addShelfForm) {
        addShelfForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('newShelfCode').value.trim().toUpperCase();
            const zone = document.getElementById('newShelfZone').value;
            const cap = parseInt(document.getElementById('newShelfCapacity').value, 10) || 100;
            const load = parseInt(document.getElementById('newShelfLoad').value, 10) || 0;
            const product = document.getElementById('newShelfProduct').value.trim() || "Unallocated Payload";
            const statusType = document.getElementById('newShelfStatus').value;

            const occ = Math.round((load / cap) * 100);

            baysData[code] = {
                code,
                zone: zone.includes('Zone A') ? 'Zone A' : (zone.includes('Zone B') ? 'Zone B' : 'Zone C'),
                zoneFull: zone.toUpperCase(),
                title: product,
                sku: `SKU-NEW-${code}`,
                category: "Custom Storage",
                demand: 350,
                load,
                capacity: cap,
                utilization: occ,
                gridPos: `Row ${code.charAt(0)} / Bay ${code.slice(1)}`,
                structure: "4-Tier Steel Rack",
                dimensions: "2.4m W × 1.8m D × 4.2m H",
                distance: "28 meters (Configured)",
                status: statusType === 'active' ? 'Active High Demand' : (statusType === 'available' ? 'Available / Empty' : 'Standard Occupied'),
                statusType: statusType === 'active' ? 'hot' : (statusType === 'available' ? 'available' : 'standard'),
                unitWeight: "1.0 kg",
                totalWeight: `${load} kg`,
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80",
                rationale: `Registered shelf bay ${code} into ${zone}.`,
                skus: [{ sku: `SKU-NEW-${code}`, name: product, qty: load, weight: "1.0 kg" }]
            };

            // Inject into DOM
            const targetAisleGrid = zone.includes('Zone A') ? document.querySelector('#aisleAContainer .rack-bays-grid') : (zone.includes('Zone B') ? document.querySelector('#aisleBContainer .rack-bays-grid') : document.querySelector('#aisleCContainer .rack-bays-grid'));

            if (targetAisleGrid) {
                const newCard = document.createElement('div');
                newCard.className = `rack-bay-card ${statusType === 'active' ? 'high-demand' : (statusType === 'available' ? 'empty' : 'standard')}`;
                newCard.setAttribute('data-bay', code);
                newCard.innerHTML = `
                    <div class="rack-top">
                        <span class="rack-code">${code}</span>
                        <span class="rack-occ ${statusType === 'active' ? 'hot' : ''}">${occ}% OCC</span>
                    </div>
                    <div class="rack-product-title">${product.slice(0, 14)}...</div>
                    <div class="rack-meta-row">
                        <span class="rack-sku">SKU-NEW</span>
                        <span class="rack-velocity">${load} units</span>
                    </div>
                    <div class="rack-progress-track">
                        <div class="rack-progress-fill ${statusType === 'active' ? 'fill-hot' : 'fill-normal'}" style="width: ${occ}%;"></div>
                    </div>
                `;
                newCard.addEventListener('click', () => selectBay(code));
                targetAisleGrid.appendChild(newCard);
            }

            addShelfModal.classList.remove('show');
            addShelfForm.reset();
            selectBay(code);
            showToast("Shelf Bay Registered", `Bay ${code} added to ${zone}.`);
        });
    }

    // View All SKUs Modal
    const viewSkusModal = document.getElementById('viewSkusModal');
    const inspectViewSkusBtn = document.getElementById('inspectViewSkusBtn');
    const closeViewSkusBtn = document.getElementById('closeViewSkusModalBtn');
    const doneViewSkusBtn = document.getElementById('doneViewSkusBtn');

    if (inspectViewSkusBtn && viewSkusModal) {
        inspectViewSkusBtn.addEventListener('click', () => {
            const bay = baysData[selectedBayCode];
            if (!bay) return;

            document.getElementById('viewSkusModalTitle').textContent = `Stored SKUs on Bay ${bay.code}`;
            const listContent = document.getElementById('viewSkusListContent');

            if (bay.skus.length === 0) {
                listContent.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 1.5rem;">No SKUs currently stored on this bay.</p>`;
            } else {
                listContent.innerHTML = bay.skus.map(item => `
                    <div style="background: #17070A; border: 1px solid var(--card-border); border-radius: 8px; padding: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: var(--accent-red-bright); font-family: var(--font-mono); font-size: 12.5px;">${item.sku}</strong>
                            <div style="color: var(--text-pure); font-size: 13px; margin-top: 2px;">${item.name}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-family: var(--font-mono); font-weight: 700; color: var(--text-pure); font-size: 14px;">${item.qty} units</div>
                            <span style="font-size: 11px; color: var(--text-muted);">${item.weight}/unit</span>
                        </div>
                    </div>
                `).join('');
            }

            viewSkusModal.classList.add('show');
        });
    }

    if (closeViewSkusBtn && viewSkusModal) {
        closeViewSkusBtn.addEventListener('click', () => viewSkusModal.classList.remove('show'));
    }
    if (doneViewSkusBtn && viewSkusModal) {
        doneViewSkusBtn.addEventListener('click', () => viewSkusModal.classList.remove('show'));
    }

    // Reassign Bay Modal
    const reassignModal = document.getElementById('reassignBayModal');
    const inspectReassignBtn = document.getElementById('inspectReassignBtn');
    const closeReassignBtn = document.getElementById('closeReassignModalBtn');
    const cancelReassignBtn = document.getElementById('cancelReassignBtn');
    const reassignForm = document.getElementById('reassignBayForm');

    if (inspectReassignBtn && reassignModal) {
        inspectReassignBtn.addEventListener('click', () => {
            document.getElementById('reassignModalTitle').textContent = `Reassign Bay ${selectedBayCode}`;
            reassignModal.classList.add('show');
        });
    }

    if (closeReassignBtn && reassignModal) {
        closeReassignBtn.addEventListener('click', () => reassignModal.classList.remove('show'));
    }
    if (cancelReassignBtn && reassignModal) {
        cancelReassignBtn.addEventListener('click', () => reassignModal.classList.remove('show'));
    }

    if (reassignForm) {
        reassignForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const destBay = document.getElementById('targetBaySelect').value;
            const current = baysData[selectedBayCode];
            reassignModal.classList.remove('show');
            showToast("Bay Payload Reassigned", `Transferred ${current.sku} (${current.load} units) from Bay ${selectedBayCode} to Bay ${destBay}.`);
        });
    }

    // Edit Shelf Allocation Action
    const editShelfBtn = document.getElementById('inspectEditShelfBtn');
    if (editShelfBtn) {
        editShelfBtn.addEventListener('click', () => {
            showToast("Shelf Re-Allocation Mode", `Ready to edit SKU placement rules for Bay ${selectedBayCode}.`);
        });
    }

    // Edit Layout Button
    const editLayoutBtn = document.getElementById('editLayoutBtn');
    if (editLayoutBtn) {
        editLayoutBtn.addEventListener('click', () => {
            showToast("CAD Layout Mode", "Interactive drag-and-drop grid repositioning enabled.");
        });
    }
}

/* 5. Tooltips on Hover */
function initTooltips() {
    const rackCards = document.querySelectorAll('.rack-bay-card');
    rackCards.forEach(card => {
        const bayCode = card.getAttribute('data-bay');
        card.setAttribute('title', `Click to inspect Bay ${bayCode} (${baysData[bayCode]?.title || 'Rack'})`);
    });
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
