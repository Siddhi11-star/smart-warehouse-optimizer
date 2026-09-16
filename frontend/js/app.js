/**
 * SMART WAREHOUSE OPERATIONS CENTER - INTERACTIVITY ENGINE
 * Burgundy / Crimson Theme Compliant
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initZoneFiltering();
    initBayInteractivity();
    initOrderRouteHighlighting();
    initRouteRecalculation();
    initSearchAndShortcuts();
    initLiveTelemetryHeartbeat();
});

/* 1. Sidebar Navigation Switcher */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const targetNav = item.getAttribute('data-nav');
            showToast(`Navigated to ${item.querySelector('span').innerText}`, `Active context switched to ${targetNav} view.`);
        });
    });
}

/* 2. Zone Filter Tabs */
function initZoneFiltering() {
    const zoneTabs = document.querySelectorAll('.zone-tab');
    const aisleBlocks = document.querySelectorAll('.aisle-block');

    zoneTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            zoneTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedZone = tab.getAttribute('data-zone');

            aisleBlocks.forEach(block => {
                const blockZone = block.getAttribute('data-zone');
                if (selectedZone === 'all' || blockZone === selectedZone) {
                    block.classList.remove('dimmed-zone');
                } else {
                    block.classList.add('dimmed-zone');
                }
            });

            // Adjust SVG path visibility if zone is isolated
            const pathElement = document.getElementById('pickVectorPath');
            if (pathElement) {
                if (selectedZone === 'c') {
                    pathElement.style.opacity = '0.15';
                } else {
                    pathElement.style.opacity = '1';
                }
            }
        });
    });
}

/* 3. Interactive Bay Selection & Active Inspector */
function initBayInteractivity() {
    const bayCells = document.querySelectorAll('.bay-cell');
    const inspectBay = document.getElementById('inspectBay');
    const inspectVelocity = document.getElementById('inspectVelocity');
    const inspectStatus = document.getElementById('inspectStatus');

    bayCells.forEach(cell => {
        cell.addEventListener('click', () => {
            bayCells.forEach(c => c.classList.remove('active-selected-bay'));
            cell.classList.add('active-selected-bay');

            const bayCode = cell.getAttribute('data-bay');
            const productName = cell.getAttribute('data-name');
            const velocity = cell.getAttribute('data-velocity');

            if (inspectBay) inspectBay.textContent = `Bay ${bayCode} (${productName})`;
            if (inspectVelocity) inspectVelocity.textContent = `${velocity}%`;

            if (inspectStatus) {
                if (cell.classList.contains('waypoint-stop')) {
                    inspectStatus.textContent = 'Active Optimal Waypoint';
                    inspectStatus.parentElement.style.color = '#20D6A1';
                } else if (cell.classList.contains('empty')) {
                    inspectStatus.textContent = 'Available Unallocated Bay';
                    inspectStatus.parentElement.style.color = '#20D6A1';
                } else {
                    inspectStatus.textContent = 'Standard Storage Allocation';
                    inspectStatus.parentElement.style.color = '#B99DA2';
                }
            }
        });
    });

    // Velocity items right-side list click sync
    const velocityItems = document.querySelectorAll('.velocity-item');
    velocityItems.forEach(item => {
        item.addEventListener('click', () => {
            const bay = item.getAttribute('data-bay');
            const matchingBay = document.getElementById(`bay-${bay}`) || document.querySelector(`.bay-cell[data-bay="${bay}"]`);
            if (matchingBay) {
                matchingBay.click();
                matchingBay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

/* 4. Active Manifest Table Order Route Highlighting */
function initOrderRouteHighlighting() {
    const viewButtons = document.querySelectorAll('.view-route-btn');
    const tableRows = document.querySelectorAll('#manifestTable tbody tr');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const row = btn.closest('tr');
            tableRows.forEach(r => r.classList.remove('active-row'));
            row.classList.add('active-row');

            const orderId = row.getAttribute('data-order');
            const distance = row.getAttribute('data-distance');
            const routeBays = row.getAttribute('data-route').split(',');

            // Dynamic SVG path change simulation
            animateRouteVector(routeBays);

            showToast(`Loaded Route for ${orderId}`, `Pick Distance: ${distance} across ${routeBays.length} waypoints.`);
        });
    });

    // Manifest search filter
    const manifestSearch = document.getElementById('manifestSearchInput');
    const counterBadge = document.getElementById('visibleCounterBadge');

    if (manifestSearch) {
        manifestSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let count = 0;
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                    count++;
                } else {
                    row.style.display = 'none';
                }
            });
            if (counterBadge) {
                counterBadge.textContent = `${count} of 34 Visible`;
            }
        });
    }
}

/* Helper: Animate SVG Path coordinates according to waypoints */
function animateRouteVector(waypoints) {
    const path = document.getElementById('pickVectorPath');
    if (!path) return;

    path.style.transition = 'all 0.4s ease';
    path.style.stroke = '#20D6A1';
    setTimeout(() => {
        path.style.stroke = 'url(#pathGradient)';
    }, 500);
}

/* 5. Recalculate Pick Routes Button Simulation */
function initRouteRecalculation() {
    const recalcBtn = document.getElementById('recalculateRoutesBtn');
    const exportBtn = document.getElementById('exportManifestBtn');
    const algoConvergence = document.getElementById('algoConvergenceVal');
    const algoIterations = document.getElementById('algoIterations');

    if (recalcBtn) {
        recalcBtn.addEventListener('click', () => {
            recalcBtn.disabled = true;
            recalcBtn.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span>Solving 2-Opt TSP...</span>
            `;

            setTimeout(() => {
                recalcBtn.disabled = false;
                recalcBtn.innerHTML = `
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>Recalculate Pick Routes</span>
                `;

                if (algoConvergence) algoConvergence.textContent = '96.2%';
                if (algoIterations) algoIterations.textContent = '1,450';

                showToast('TSP Optimization Converged', 'Pick traversal distance reduced by 26.1% (New Avg: 139m).');
            }, 800);
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showToast('Manifest Export Generated', 'Download ready: warehouse_manifest_wave14.csv');
        });
    }
}

/* 6. Global Search & Keyboard Shortcuts (⌘K / Ctrl+K) */
function initSearchAndShortcuts() {
    const globalSearch = document.getElementById('globalSearchInput');

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (globalSearch) {
                globalSearch.focus();
                globalSearch.select();
            }
        }
    });
}

/* 7. Live Heartbeat Pulse */
function initLiveTelemetryHeartbeat() {
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
