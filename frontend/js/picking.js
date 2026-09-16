/**
 * PICKING ROUTE OPTIMIZER & 2D GRAPH TSP SIMULATOR
 * Pure Vanilla JavaScript Implementation
 */

// Dataset of Pick Waves
const ordersRoutingData = {
    "ORD-10241": {
        id: "ORD-10241",
        priority: "URGENT BATCH",
        priorityClass: "urgent",
        status: "Picking Active",
        payload: "3 SKUs / 4 Units",
        zone: "Sector 01 Fast Deck",
        fifoDist: 188,
        fifoTime: "4m 30s",
        fifoSeq: "DOCK ➔ A1 ➔ A3 ➔ B2 ➔ PACK",
        optDist: 142,
        optTime: "3m 12s",
        optSeq: "DOCK ➔ A1 ➔ B2 ➔ A3 ➔ PACK",
        savingsDist: 46,
        savingsPct: "24.4%",
        savingsTime: "1 min 18 sec saved",
        stopsCount: 3,
        avgHop: "35.5 m",
        skus: [
            {
                sku: "SKU-1001",
                name: "Ultralight Running Shoes",
                bay: "A1",
                zone: "Runway",
                qty: 2,
                status: "PICKED",
                waypoint: 1,
                distLeg: 18.0,
                desc: "Pick 2 units • Barcode scanned",
                transitSub: "Transverse corridor to Aisle B: 36m"
            },
            {
                sku: "SKU-1003",
                name: "Smart Watch X9 Pro",
                bay: "B2",
                zone: "Mid",
                qty: 1,
                status: "CURRENT",
                waypoint: 2,
                distLeg: 54.0,
                desc: "Pick 1 unit • Current picker position",
                transitSub: "Runway cross-cut back to Aisle A: 24m"
            },
            {
                sku: "SKU-1002",
                name: "Cotton Crew Shirt (Pack 3)",
                bay: "A3",
                zone: "Runway",
                qty: 1,
                status: "QUEUED",
                waypoint: 3,
                distLeg: 78.0,
                desc: "Pick 1 unit • Final pick bay",
                transitSub: "Direct outbound arterial corridor: 64m"
            }
        ],
        // Node coordinates relative to 760x480 SVG viewbox
        waypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A1", label: "Bay A1", x: 190, y: 130 },
            { code: "B2", label: "Bay B2", x: 330, y: 250 },
            { code: "A3", label: "Bay A3", x: 380, y: 130 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ],
        fifoWaypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A1", label: "Bay A1", x: 190, y: 130 },
            { code: "A3", label: "Bay A3", x: 380, y: 130 },
            { code: "B2", label: "Bay B2", x: 330, y: 250 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ]
    },
    "ORD-10240": {
        id: "ORD-10240",
        priority: "HIGH PRIORITY",
        priorityClass: "high",
        status: "Queued",
        payload: "5 SKUs / 7 Units",
        zone: "Sector 02 High-Bay",
        fifoDist: 215,
        fifoTime: "5m 45s",
        fifoSeq: "DOCK ➔ A4 ➔ B1 ➔ C1 ➔ C2 ➔ PACK",
        optDist: 165,
        optTime: "4m 10s",
        optSeq: "DOCK ➔ A4 ➔ B1 ➔ C2 ➔ C1 ➔ PACK",
        savingsDist: 50,
        savingsPct: "23.3%",
        savingsTime: "1 min 35 sec saved",
        stopsCount: 4,
        avgHop: "41.2 m",
        skus: [
            {
                sku: "SKU-1004",
                name: "Winter Parka Jackets",
                bay: "A4",
                zone: "Runway",
                qty: 3,
                status: "QUEUED",
                waypoint: 1,
                distLeg: 28.0,
                desc: "Pick 3 units • Volumetric bay",
                transitSub: "North transfer into Aisle B: 30m"
            },
            {
                sku: "SKU-1005",
                name: "Tactical Headsets Pro",
                bay: "B1",
                zone: "Mid",
                qty: 2,
                status: "QUEUED",
                waypoint: 2,
                distLeg: 58.0,
                desc: "Pick 2 units • Security tag scan",
                transitSub: "Heavy reach descent to Aisle C: 45m"
            },
            {
                sku: "SKU-3129",
                name: "Outerwear Shell XL",
                bay: "C2",
                zone: "Bulk",
                qty: 1,
                status: "QUEUED",
                waypoint: 3,
                distLeg: 103.0,
                desc: "Pick 1 unit • Bulk high-bay",
                transitSub: "Ground tier shift: 18m"
            },
            {
                sku: "SKU-1006",
                name: "Hydraulic Floor Jack 2T",
                bay: "C1",
                zone: "Heavy",
                qty: 1,
                status: "QUEUED",
                waypoint: 4,
                distLeg: 121.0,
                desc: "Pick 1 unit (14kg) • Ground tier",
                transitSub: "Outbound transfer to Packing: 44m"
            }
        ],
        waypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A4", label: "Bay A4", x: 470, y: 130 },
            { code: "B1", label: "Bay B1", x: 235, y: 250 },
            { code: "C2", label: "Bay C2", x: 330, y: 370 },
            { code: "C1", label: "Bay C1", x: 235, y: 370 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ],
        fifoWaypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A4", label: "Bay A4", x: 470, y: 130 },
            { code: "B1", label: "Bay B1", x: 235, y: 250 },
            { code: "C1", label: "Bay C1", x: 235, y: 370 },
            { code: "C2", label: "Bay C2", x: 330, y: 370 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ]
    },
    "ORD-10239": {
        id: "ORD-10239",
        priority: "NORMAL BATCH",
        priorityClass: "normal",
        status: "Completed",
        payload: "2 SKUs / 2 Units",
        zone: "Sector 01 Express",
        fifoDist: 110,
        fifoTime: "3m 10s",
        fifoSeq: "DOCK ➔ A3 ➔ B3 ➔ PACK",
        optDist: 88,
        optTime: "2m 15s",
        optSeq: "DOCK ➔ A3 ➔ B3 ➔ PACK",
        savingsDist: 22,
        savingsPct: "20.0%",
        savingsTime: "55 sec saved",
        stopsCount: 2,
        avgHop: "29.3 m",
        skus: [
            {
                sku: "SKU-1002",
                name: "Cotton Crew Shirt",
                bay: "A3",
                zone: "Runway",
                qty: 1,
                status: "PICKED",
                waypoint: 1,
                distLeg: 22.0,
                desc: "Pick 1 unit",
                transitSub: "Corridor to Aisle B: 28m"
            },
            {
                sku: "SKU-1007",
                name: "Field Diagnostic Lanterns",
                bay: "B3",
                zone: "Mid",
                qty: 1,
                status: "PICKED",
                waypoint: 2,
                distLeg: 50.0,
                desc: "Pick 1 unit",
                transitSub: "Direct vector to Packing: 38m"
            }
        ],
        waypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A3", label: "Bay A3", x: 380, y: 130 },
            { code: "B3", label: "Bay B3", x: 425, y: 250 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ],
        fifoWaypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A3", label: "Bay A3", x: 380, y: 130 },
            { code: "B3", label: "Bay B3", x: 425, y: 250 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ]
    },
    "ORD-10238": {
        id: "ORD-10238",
        priority: "HIGH PRIORITY",
        priorityClass: "high",
        status: "Packed",
        payload: "7 SKUs / 11 Units",
        zone: "Sector 01 Fast Deck",
        fifoDist: 240,
        fifoTime: "6m 10s",
        fifoSeq: "DOCK ➔ A1 ➔ A4 ➔ B4 ➔ PACK",
        optDist: 172,
        optTime: "4m 20s",
        optSeq: "DOCK ➔ A1 ➔ A4 ➔ B4 ➔ PACK",
        savingsDist: 68,
        savingsPct: "28.3%",
        savingsTime: "1 min 50 sec saved",
        stopsCount: 3,
        avgHop: "43.0 m",
        skus: [
            {
                sku: "SKU-1001",
                name: "Ultralight Running Shoes",
                bay: "A1",
                zone: "Runway",
                qty: 4,
                status: "PICKED",
                waypoint: 1,
                distLeg: 18.0,
                desc: "Pick 4 units",
                transitSub: "East along Runway A: 32m"
            },
            {
                sku: "SKU-1004",
                name: "Winter Parka Jackets",
                bay: "A4",
                zone: "Runway",
                qty: 4,
                status: "PICKED",
                waypoint: 2,
                distLeg: 50.0,
                desc: "Pick 4 units",
                transitSub: "Cross-aisle south to B4: 40m"
            },
            {
                sku: "SKU-1008",
                name: "Stainless Steel Flasks 1L",
                bay: "B4",
                zone: "Mid",
                qty: 3,
                status: "PICKED",
                waypoint: 3,
                distLeg: 90.0,
                desc: "Pick 3 units",
                transitSub: "Outbound packing transfer: 82m"
            }
        ],
        waypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A1", label: "Bay A1", x: 190, y: 130 },
            { code: "A4", label: "Bay A4", x: 470, y: 130 },
            { code: "B4", label: "Bay B4", x: 520, y: 250 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ],
        fifoWaypoints: [
            { code: "DOCK", label: "Entry Dock", x: 260, y: 35 },
            { code: "A1", label: "Bay A1", x: 190, y: 130 },
            { code: "A4", label: "Bay A4", x: 470, y: 130 },
            { code: "B4", label: "Bay B4", x: 520, y: 250 },
            { code: "PACK", label: "Packing Hub", x: 540, y: 440 }
        ]
    }
};

let activeOrderId = "ORD-10241";
let currentGoal = "tsp"; // "tsp" or "fifo"
let activePickingStepIndex = 1; // 0-based for SKUs list

document.addEventListener('DOMContentLoaded', () => {
    // Check if query param specified order
    const params = new URLSearchParams(window.location.search);
    const orderParam = params.get('order');
    if (orderParam && ordersRoutingData[orderParam]) {
        activeOrderId = orderParam;
    }

    initOrderSelector();
    initGoalSwitch();
    initOptimizeButton();
    initPickingWaveExecution();
    initSecondaryActions();

    renderActiveOrder(activeOrderId);
});

/* 1. Render Active Order State */
function renderActiveOrder(orderId) {
    const order = ordersRoutingData[orderId];
    if (!order) return;
    activeOrderId = orderId;

    // 1. Selector bar highlights
    document.querySelectorAll('.order-select-pill').forEach(btn => {
        if (btn.getAttribute('data-order') === orderId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Metadata info
    const manifestStatus = document.getElementById('manifestStatus');
    const manifestPriority = document.getElementById('manifestPriority');
    const manifestPayload = document.getElementById('manifestPayload');
    const manifestZone = document.getElementById('manifestZone');

    if (manifestStatus) manifestStatus.innerHTML = `<span class="dot-green"></span> ${order.status}`;
    if (manifestPriority) {
        manifestPriority.textContent = order.priority;
        manifestPriority.className = `s-v ${order.priorityClass === 'urgent' ? 'crimson-text' : (order.priorityClass === 'high' ? 'amber-text' : 'muted-text')}`;
    }
    if (manifestPayload) manifestPayload.textContent = order.payload;
    if (manifestZone) manifestZone.textContent = order.zone;

    // 3. Telemetry values
    const telemOrderCode = document.getElementById('telemOrderCode');
    const telemTotalStops = document.getElementById('telemTotalStops');
    const telemTotalDist = document.getElementById('telemTotalDist');
    const telemDistDelta = document.getElementById('telemDistDelta');
    const telemEstTime = document.getElementById('telemEstTime');
    const telemAvgLeg = document.getElementById('telemAvgLeg');

    const distToShow = currentGoal === 'tsp' ? order.optDist : order.fifoDist;
    const timeToShow = currentGoal === 'tsp' ? order.optTime : order.fifoTime;

    if (telemOrderCode) telemOrderCode.textContent = order.id;
    if (telemTotalStops) telemTotalStops.textContent = `${order.stopsCount} Waypoints`;
    if (telemTotalDist) telemTotalDist.innerHTML = `${distToShow} <small>m</small>`;
    if (telemDistDelta) telemDistDelta.textContent = currentGoal === 'tsp' ? `-${order.savingsPct} vs Baseline` : "Baseline FIFO";
    if (telemEstTime) telemEstTime.textContent = timeToShow;
    if (telemAvgLeg) telemAvgLeg.innerHTML = `${order.avgHop} <small>m</small>`;

    // 4. Benchmark section
    const benchOptDist = document.getElementById('benchOptDist');
    const benchOptSeq = document.getElementById('benchOptSeq');
    const benchOptImprove = document.getElementById('benchOptImprove');
    const benchOptTime = document.getElementById('benchOptTime');

    if (benchOptDist) benchOptDist.innerHTML = `${order.optDist} <small>m</small>`;
    if (benchOptSeq) benchOptSeq.textContent = order.optSeq;
    if (benchOptImprove) benchOptImprove.textContent = `-${order.savingsDist} m (-${order.savingsPct})`;
    if (benchOptTime) benchOptTime.textContent = order.savingsTime;

    // 5. Execution Banner
    const execDescText = document.getElementById('execDescText');
    if (execDescText) {
        execDescText.innerHTML = `Order <strong>${order.id}</strong> saves <strong>${order.savingsDist}m</strong> and <strong>${order.savingsTime}</strong> over standard sequential traversal.`;
    }

    // 6. Manifest SKUs list
    renderManifestSKUs(order);

    // 7. Turn-by-Turn sequence
    renderTurnByTurn(order);

    // 8. 2D Floor Routing Graph SVG Path
    renderSvgRoutingGraph(order);
}

/* 2. Render Staged SKUs */
function renderManifestSKUs(order) {
    const list = document.getElementById('manifestItemsList');
    const badge = document.getElementById('manifestVerifiedBadge');
    if (!list) return;

    const pickedCount = order.skus.filter(s => s.status === 'PICKED').length;
    if (badge) badge.textContent = `${pickedCount} of ${order.skus.length} Verified`;

    list.innerHTML = order.skus.map((item, idx) => {
        const isPicked = item.status === 'PICKED';
        const isCurrent = item.status === 'CURRENT';

        return `
            <div class="m-sku-item ${isCurrent ? 'active-item' : ''}" data-bay="${item.bay}" data-idx="${idx}">
                <div class="m-sku-left">
                    <div class="m-status-icon ${isPicked ? 'icon-picked' : (isCurrent ? 'icon-current' : 'icon-queued')}">
                        ${isPicked ? '✓' : (isCurrent ? '●' : '○')}
                    </div>
                    <div class="m-sku-text-wrap">
                        <strong class="m-sku-name">${item.name}</strong>
                        <div class="m-sku-coords">
                            <span class="sku-code-tag">${item.sku}</span>
                            <span class="bay-loc-tag">• Bay ${item.bay} (${item.zone})</span>
                        </div>
                    </div>
                </div>
                <div class="m-sku-right">
                    <span class="m-qty-val">Qty: ${item.qty}x</span>
                    <span class="m-state-pill ${isPicked ? 'pill-picked' : (isCurrent ? 'pill-current' : 'pill-queued')}">${item.status}</span>
                </div>
            </div>
        `;
    }).join('');

    // Clicking SKU highlights shelf on graph
    list.querySelectorAll('.m-sku-item').forEach(el => {
        el.addEventListener('click', () => {
            const bay = el.getAttribute('data-bay');
            highlightBayNode(bay);
        });
    });
}

/* 3. Render Turn-by-Turn List */
function renderTurnByTurn(order) {
    const tbtList = document.getElementById('turnSequenceList');
    if (!tbtList) return;

    let html = `
        <div class="tbt-step-item start-step">
            <div class="tbt-dot start-dot"></div>
            <div class="tbt-info-wrap">
                <div class="tbt-head-line">
                    <strong>START: Entry Dock (Gate D-01)</strong>
                    <span class="tbt-dist-tag">0.0m</span>
                </div>
                <p class="tbt-desc-text">Traverse north corridor into Runway A (18m)</p>
            </div>
        </div>
    `;

    order.skus.forEach((item, idx) => {
        const isPicked = item.status === 'PICKED';
        const isCurrent = item.status === 'CURRENT';
        const waypointNum = idx + 1;

        html += `
            <div class="tbt-step-item waypoint-step ${isCurrent ? 'current-step' : (isPicked ? 'picked-step' : '')}" data-bay="${item.bay}">
                <div class="tbt-waypoint-circle ${isPicked ? 'circle-picked' : (isCurrent ? 'circle-current' : '')}">
                    ${isPicked ? '✓' : waypointNum}
                </div>
                <div class="tbt-info-wrap">
                    <div class="tbt-head-line">
                        <strong>STOP ${waypointNum}: Bay ${item.bay} — ${item.name}</strong>
                        <span class="tbt-dist-tag">${item.distLeg}m</span>
                    </div>
                    <p class="tbt-desc-text">${item.desc}</p>
                    <span class="tbt-sub-lane">↳ ${item.transitSub}</span>
                </div>
            </div>
        `;
    });

    html += `
        <div class="tbt-step-item finish-step">
            <div class="tbt-dot finish-dot"></div>
            <div class="tbt-info-wrap">
                <div class="tbt-head-line">
                    <strong>FINISH: Outbound Packing Hub</strong>
                    <span class="tbt-dist-tag">${currentGoal === 'tsp' ? order.optDist : order.fifoDist}m</span>
                </div>
                <p class="tbt-desc-text">Weight check & automatic scan sorter handoff</p>
            </div>
        </div>
    `;

    tbtList.innerHTML = html;

    // Click to highlight
    tbtList.querySelectorAll('.waypoint-step').forEach(step => {
        step.addEventListener('click', () => {
            const bay = step.getAttribute('data-bay');
            highlightBayNode(bay);
        });
    });
}

/* 4. Render 2D SVG Routing Graph */
function renderSvgRoutingGraph(order) {
    const svg = document.getElementById('routingSvgLayer');
    if (!svg) return;

    const waypoints = currentGoal === 'tsp' ? order.waypoints : order.fifoWaypoints;

    // Construct Manhattan step path points
    let pathD = `M ${waypoints[0].x} ${waypoints[0].y}`;

    for (let i = 0; i < waypoints.length - 1; i++) {
        const p1 = waypoints[i];
        const p2 = waypoints[i + 1];

        // Manhattan corridor turn
        const midY = p1.y + (p2.y - p1.y) * 0.5;
        pathD += ` L ${p1.x} ${midY} L ${p2.x} ${midY} L ${p2.x} ${p2.y}`;
    }

    const pathColor = currentGoal === 'tsp' ? '#E83A4B' : '#E8A33A';
    const glowColor = currentGoal === 'tsp' ? 'rgba(232, 58, 75, 0.4)' : 'rgba(232, 163, 58, 0.4)';

    svg.innerHTML = `
        <defs>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#20D6A1" />
                <stop offset="50%" stop-color="#E83A4B" />
                <stop offset="100%" stop-color="#FF405F" />
            </linearGradient>
        </defs>

        <!-- Background Route Glow -->
        <path d="${pathD}" fill="none" stroke="${glowColor}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Main Routing Path Line -->
        <path class="animated-route-line" d="${pathD}" fill="none" stroke="${currentGoal === 'tsp' ? 'url(#routeGradient)' : '#E8A33A'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6,4" />

        <!-- Waypoint Nodes on Path -->
        ${waypoints.map((wp, idx) => `
            <circle cx="${wp.x}" cy="${wp.y}" r="${idx === 0 || idx === waypoints.length - 1 ? 6 : 5}" fill="${idx === 0 ? '#20D6A1' : (idx === waypoints.length - 1 ? '#FF405F' : '#E83A4B')}" stroke="#FFFFFF" stroke-width="1.5" />
        `).join('')}
    `;

    // Highlight bays on map
    document.querySelectorAll('.graph-bay-node').forEach(node => {
        const bayCode = node.getAttribute('data-bay');
        const matchSku = order.skus.find(s => s.bay === bayCode);

        if (matchSku) {
            node.classList.add('active-target-waypoint');
            if (matchSku.status === 'CURRENT') {
                node.classList.add('current-picker-bay');
            } else {
                node.classList.remove('current-picker-bay');
            }
        } else {
            node.classList.remove('active-target-waypoint', 'current-picker-bay');
        }
    });

    const graphTspBadge = document.getElementById('graphTspBadge');
    if (graphTspBadge) {
        graphTspBadge.textContent = currentGoal === 'tsp' ? `● TSP PATH: ${order.optDist}M ACTIVE` : `● FIFO PATH: ${order.fifoDist}M ACTIVE`;
    }
}

/* 5. Highlight Bay Node */
function highlightBayNode(bayCode) {
    document.querySelectorAll('.graph-bay-node').forEach(node => {
        if (node.getAttribute('data-bay') === bayCode) {
            node.classList.add('pulse-focus');
            setTimeout(() => node.classList.remove('pulse-focus'), 1500);
        }
    });

    showToast("Waypoint Focused", `Targeting Shelf Bay ${bayCode}.`);
}

/* 6. Order Selector Events */
function initOrderSelector() {
    const pills = document.querySelectorAll('.order-select-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const orderId = pill.getAttribute('data-order');
            renderActiveOrder(orderId);
            showToast("Order Manifest Loaded", `Loaded picking wave ${orderId}.`);
        });
    });
}

/* 7. Goal Switch Events */
function initGoalSwitch() {
    const btns = document.querySelectorAll('.goal-toggle-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGoal = btn.getAttribute('data-goal');

            renderActiveOrder(activeOrderId);
            showToast("Algorithm Goal Switched", currentGoal === 'tsp' ? "2-Opt TSP active (142m)" : "Standard FIFO sequential path (188m)");
        });
    });
}

/* 8. Optimize Button Action */
function initOptimizeButton() {
    const optBtn = document.getElementById('optimizePickingBtn');
    const resetBtn = document.getElementById('resetRouteBtn');

    if (optBtn) {
        optBtn.addEventListener('click', () => {
            optBtn.disabled = true;
            optBtn.innerHTML = `
                <span class="btn-spinner"></span>
                <span>Calculating 2-Opt Graph Vectors...</span>
            `;

            setTimeout(() => {
                optBtn.disabled = false;
                optBtn.innerHTML = `
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>⚡ Re-Optimize Picking Route</span>
                `;

                // Switch to TSP if not already
                currentGoal = "tsp";
                const tspBtn = document.querySelector('.goal-toggle-btn[data-goal="tsp"]');
                if (tspBtn) {
                    document.querySelectorAll('.goal-toggle-btn').forEach(b => b.classList.remove('active'));
                    tspBtn.classList.add('active');
                }

                renderActiveOrder(activeOrderId);
                showToast("Route Optimized Successfully", `Generated ${ordersRoutingData[activeOrderId].optDist}m deterministic picking route saving ${ordersRoutingData[activeOrderId].savingsDist}m.`);
            }, 900);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const order = ordersRoutingData[activeOrderId];
            if (order) {
                // Reset statuses
                order.skus.forEach((s, idx) => {
                    s.status = idx === 0 ? "CURRENT" : "QUEUED";
                });
                renderActiveOrder(activeOrderId);
                showToast("Route Reset", "Restored initial pick wave sequence.");
            }
        });
    }
}

/* 9. Picking Wave Execution Step Tracker */
function initPickingWaveExecution() {
    const waveBtn = document.getElementById('startPickingWaveBtn');
    const btnText = document.getElementById('startPickingBtnText');

    if (waveBtn) {
        waveBtn.addEventListener('click', () => {
            const order = ordersRoutingData[activeOrderId];
            if (!order) return;

            // Find first non-picked sku
            const currentItem = order.skus.find(s => s.status === 'CURRENT');
            const queuedItem = order.skus.find(s => s.status === 'QUEUED');

            if (currentItem) {
                // Complete current
                currentItem.status = 'PICKED';

                if (queuedItem) {
                    queuedItem.status = 'CURRENT';
                    showToast("Stop Verified & Scanned", `Picked ${currentItem.name} at Bay ${currentItem.bay}. Next: Bay ${queuedItem.bay}.`);
                } else {
                    // All picked!
                    order.status = "Completed";
                    if (btnText) btnText.textContent = "Wave Complete ✓";
                    waveBtn.classList.add('btn-green-solid');
                    showToast("🎉 Wave Pick Completed", `All items verified for ${order.id}. Routing cart to Packing Hub.`);
                }
            } else if (queuedItem) {
                queuedItem.status = 'CURRENT';
                if (btnText) btnText.textContent = "✓ Complete Stop & Next";
                showToast("Wave Execution Started", `Proceed to Bay ${queuedItem.bay} for first item.`);
            }

            renderActiveOrder(activeOrderId);
        });
    }
}

/* 10. Secondary Actions */
function initSecondaryActions() {
    const layoutBtn = document.getElementById('viewLayoutMapBtn');
    const scanBtn = document.getElementById('pickBarcodeScanBtn');

    if (layoutBtn) {
        layoutBtn.addEventListener('click', () => {
            window.location.href = "layout.html";
        });
    }

    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            showToast("Barcode Scanner Active", "Simulated laser optical reader ready for SKU scan.");
        });
    }
}

/* Helper Toast */
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
