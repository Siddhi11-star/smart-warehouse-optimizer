/**
 * SHELF ARRANGEMENT OPTIMIZER INTERACTIVITY ENGINE
 * Pure Vanilla JavaScript Implementation
 */

// Dataset of inventory shifts
const allocationShifts = [
    {
        sku: "SKU-1001",
        name: "Ultralight Running Shoes",
        category: "Footwear / Rapid",
        demand: 1248,
        currentBay: "A4",
        currentDist: 42,
        optBay: "A1",
        optDist: 18,
        delta: -24,
        deltaPct: "-57%",
        rationale: "High Velocity Proximity",
        isShift: true,
        aisle: "aisle-a",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-0842",
        name: "Cotton Crew Shirts (Pack 3)",
        category: "Apparel / Staple",
        demand: 894,
        currentBay: "A3",
        currentDist: 36,
        optBay: "A2",
        optDist: 22,
        delta: -14,
        deltaPct: "-39%",
        rationale: "Secondary Runway Flow",
        isShift: true,
        aisle: "aisle-a",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-6602",
        name: "Smart Watches X9 Pro",
        category: "Electronics / Value",
        demand: 718,
        currentBay: "B2",
        currentDist: 39,
        optBay: "A3",
        optDist: 25,
        delta: -14,
        deltaPct: "-36%",
        rationale: "Convenience Infeed Relocation",
        isShift: true,
        aisle: "aisle-a",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-3129",
        name: "Winter Parka Jackets (Featherdown)",
        category: "Outerwear / Bulky",
        demand: 520,
        currentBay: "A1",
        currentDist: 18,
        optBay: "C2",
        optDist: 46,
        delta: 18,
        deltaPct: "+155%",
        rationale: "Seasonal / Freed Prime Bay Capacity",
        isShift: true,
        aisle: "aisle-c",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-3940",
        name: "Hydraulic Floor Jack 2-Ton",
        category: "Heavy Hardware (14kg)",
        demand: 185,
        currentBay: "C1",
        currentDist: 50,
        optBay: "C1",
        optDist: 50,
        delta: 0,
        deltaPct: "0%",
        rationale: "Weight Constraint: Ground Steel Tier",
        isShift: false,
        aisle: "aisle-c",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-2041",
        name: "Diagnostic Sensor Modules",
        category: "Electronics // Sensors",
        demand: 540,
        currentBay: "A2",
        currentDist: 32,
        optBay: "A4",
        optDist: 28,
        delta: -4,
        deltaPct: "-12%",
        rationale: "Consolidation Near Wave Gate",
        isShift: true,
        aisle: "aisle-a",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80"
    },
    {
        sku: "SKU-7718",
        name: "Wireless Tactical Headsets",
        category: "Electronics // Audio",
        demand: 420,
        currentBay: "B1",
        currentDist: 30,
        optBay: "B2",
        optDist: 34,
        delta: 4,
        deltaPct: "+13%",
        rationale: "Mid-Density Balance Reallocation",
        isShift: true,
        aisle: "aisle-a",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=80"
    }
];

let isOptimizedActive = false;

document.addEventListener('DOMContentLoaded', () => {
    initOptimizeAction();
    initResetAction();
    initTableInteractions();
    initModalControls();
    initFilterAndSearch();
});

/* 1. Optimize Button & Simulation Engine */
function initOptimizeAction() {
    const optBtn = document.getElementById('optimizeLayoutBtn');
    const badge = document.getElementById('engineStatusBadge');

    if (optBtn) {
        optBtn.addEventListener('click', () => {
            optBtn.disabled = true;
            optBtn.innerHTML = `
                <span class="btn-spinner"></span>
                <span>Optimizing Heuristic Matrix...</span>
            `;

            setTimeout(() => {
                isOptimizedActive = true;
                optBtn.disabled = false;
                optBtn.innerHTML = `
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>⚡ Re-Run Optimizer</span>
                `;

                if (badge) {
                    badge.textContent = "HEURISTIC CONVERGED (33.2% SAVINGS)";
                    badge.classList.remove('tsp-badge');
                    badge.classList.add('pill-green-sm');
                }

                // Animate KPI metrics
                document.getElementById('metricCurrentDist').textContent = "428";
                document.getElementById('metricOptDist').textContent = "286";
                document.getElementById('metricReductionPct').textContent = "33.2%";
                document.getElementById('metricReallocCount').textContent = "18";

                // Visual highlight on recommended pane
                const recommendedPane = document.getElementById('recommendedPane');
                if (recommendedPane) {
                    recommendedPane.classList.add('pulse-highlight');
                    setTimeout(() => recommendedPane.classList.remove('pulse-highlight'), 1200);
                }

                showToast("⚡ Optimization Complete", "Simulated Annealing + 2-Opt TSP found 18 inventory re-allocations saving 142m per picking wave.");
            }, 1000);
        });
    }
}

/* 2. Reset Baseline Action */
function initResetAction() {
    const resetBtn = document.getElementById('resetBaselineBtn');
    const badge = document.getElementById('engineStatusBadge');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            isOptimizedActive = false;
            if (badge) {
                badge.textContent = "OPTIMIZATION ENGINE READY";
                badge.className = "pill-badge tsp-badge";
            }

            // Clear highlights
            document.querySelectorAll('.mini-shelf-slot').forEach(slot => {
                slot.classList.remove('slot-highlighted');
            });

            // Reset table filter
            const allFilter = document.querySelector('.filter-pill[data-filter="all"]');
            if (allFilter) allFilter.click();

            const searchInput = document.getElementById('allocTableSearch');
            if (searchInput) {
                searchInput.value = '';
                filterTable('', 'all');
            }

            showToast("Baseline Restored", "Reset warehouse arrangement to initial layout state.");
        });
    }
}

/* 3. Table Rows & Shelf Sync Highlighting */
function initTableInteractions() {
    const tableRows = document.querySelectorAll('.alloc-row');

    tableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.inspect-shift-btn')) return; // Handled separately
            
            const currentBay = row.getAttribute('data-current');
            const optBay = row.getAttribute('data-opt');
            const sku = row.getAttribute('data-sku');

            highlightShelves(currentBay, optBay);
        });
    });

    // Inspect buttons
    document.querySelectorAll('.inspect-shift-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sku = btn.getAttribute('data-sku');
            openShiftModal(sku);
        });
    });
}

function highlightShelves(currentBay, optBay) {
    // Clear previous highlight
    document.querySelectorAll('.mini-shelf-slot').forEach(slot => {
        slot.classList.remove('slot-highlighted');
    });

    // Find and highlight in Left (Current)
    const currentSlots = document.querySelectorAll(`#currentFloorMatrix .mini-shelf-slot[data-shelf="${currentBay}"]`);
    currentSlots.forEach(s => s.classList.add('slot-highlighted'));

    // Find and highlight in Right (Recommended)
    const optSlots = document.querySelectorAll(`#recommendedFloorMatrix .mini-shelf-slot[data-shelf="${optBay}"]`);
    optSlots.forEach(s => s.classList.add('slot-highlighted'));

    showToast("Shelf Bay Located", `Highlighting source Bay ${currentBay} → destination Bay ${optBay}.`);
}

/* 4. Filter & Search */
function initFilterAndSearch() {
    const searchInput = document.getElementById('allocTableSearch');
    const filterPills = document.querySelectorAll('.filter-pill');
    let currentFilter = 'all';

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterTable(e.target.value.toLowerCase(), currentFilter);
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter');
            filterTable(searchInput ? searchInput.value.toLowerCase() : '', currentFilter);
        });
    });

    // Export Manifest
    const exportBtn = document.getElementById('exportManifestBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showToast("Manifest Exported", "Generated automated slotting batch manifest (CSV/JSON dispatched).");
        });
    }
}

function filterTable(query, filter) {
    const rows = document.querySelectorAll('.alloc-row');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowFilter = row.getAttribute('data-filter') || 'all';
        const matchesQuery = text.includes(query);
        const matchesFilter = (filter === 'all' || rowFilter === filter);

        if (matchesQuery && matchesFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/* 5. Modals Controls */
function initModalControls() {
    const reviewModal = document.getElementById('reviewChangesModal');
    const reviewBtn = document.getElementById('reviewChangesBtn');
    const closeBtn = document.getElementById('closeReviewModalBtn');
    const dismissBtn = document.getElementById('dismissReviewModalBtn');
    const applyBtn = document.getElementById('applyLayoutBtn');
    const modalApplyBtn = document.getElementById('modalApplyLayoutBtn');

    if (reviewBtn && reviewModal) {
        reviewBtn.addEventListener('click', () => {
            renderReviewModalBody();
            reviewModal.classList.add('show');
        });
    }

    if (closeBtn && reviewModal) {
        closeBtn.addEventListener('click', () => reviewModal.classList.remove('show'));
    }
    if (dismissBtn && reviewModal) {
        dismissBtn.addEventListener('click', () => reviewModal.classList.remove('show'));
    }

    const handleApply = () => {
        if (reviewModal) reviewModal.classList.remove('show');
        showToast("✓ Recommended Layout Applied", "Updated mock warehouse slot assignments. Mobile wave pickers notified of new coordinates.");
    };

    if (applyBtn) applyBtn.addEventListener('click', handleApply);
    if (modalApplyBtn) modalApplyBtn.addEventListener('click', handleApply);
}

function openShiftModal(sku) {
    const shift = allocationShifts.find(s => s.sku === sku);
    if (!shift) return;

    const modal = document.getElementById('reviewChangesModal');
    const title = document.getElementById('reviewModalTitle');
    const body = document.getElementById('reviewModalBody');

    if (title) title.textContent = `Shift Details: ${shift.name}`;
    if (body) {
        body.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center; background: #17070A; border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                <img src="${shift.image}" alt="${shift.name}" style="width: 64px; height: 64px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-subtle);">
                <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-crimson); font-weight: 700;">${shift.sku}</span>
                    <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 2px 0;">${shift.name}</h4>
                    <span style="font-size: 12px; color: var(--text-muted);">${shift.category}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
                <div style="background: #1F0A0E; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.85rem;">
                    <span style="font-size: 11px; color: var(--text-muted);">Current Slot Location</span>
                    <div style="font-family: var(--font-mono); font-size: 16px; font-weight: 800; color: var(--text-primary); margin-top: 3px;">Bay ${shift.currentBay} (${shift.currentDist}m)</div>
                </div>
                <div style="background: rgba(32, 214, 161, 0.08); border: 1px solid rgba(32, 214, 161, 0.3); border-radius: 8px; padding: 0.85rem;">
                    <span style="font-size: 11px; color: var(--color-green);">Recommended Target Slot</span>
                    <div style="font-family: var(--font-mono); font-size: 16px; font-weight: 800; color: var(--color-green); margin-top: 3px;">Bay ${shift.optBay} (${shift.optDist}m)</div>
                </div>
            </div>

            <div style="background: #18070B; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.85rem;">
                <span style="font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: var(--text-muted);">ALGORITHMIC RATIONALE</span>
                <p style="font-size: 12px; color: var(--text-secondary); margin: 4px 0 0 0; line-height: 1.5;">
                    ${shift.rationale}. Reduces picker transit by <strong>${Math.abs(shift.delta)} meters</strong> (${shift.deltaPct}) per dispatch cycle based on ${shift.demand.toLocaleString()} monthly picks.
                </p>
            </div>
        `;
    }

    if (modal) modal.classList.add('show');
}

function renderReviewModalBody() {
    const title = document.getElementById('reviewModalTitle');
    const body = document.getElementById('reviewModalBody');

    if (title) title.textContent = "Review Recommended Shelf Reallocations";
    if (body) {
        body.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${allocationShifts.filter(s => s.isShift).map(item => `
                    <div style="background: #17070A; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
                            <div>
                                <strong style="font-size: 13px; color: var(--text-primary); display: block;">${item.name}</strong>
                                <span style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);">${item.sku} • ${item.demand.toLocaleString()} picks/mo</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="font-family: var(--font-mono); font-size: 12px;">
                                <span style="color: var(--text-muted);">Bay ${item.currentBay}</span>
                                <span style="color: var(--color-crimson); margin: 0 4px;">➔</span>
                                <span style="color: var(--color-green); font-weight: 700;">Bay ${item.optBay}</span>
                            </div>
                            <span class="delta-badge ${item.delta < 0 ? 'delta-green' : 'delta-amber'}">${item.delta > 0 ? '+' : ''}${item.delta}m</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

/* Helper Toast */
let toastTimer;
function showToast(title, msg) {
    const toast = document.getElementById('toastNotification');
    const tTitle = document.getElementById('toastTitle');
    const tMsg = document.getElementById('toastMessage');

    if (!toast) return;
    if (tTitle) tTitle.textContent = title;
    if (tMsg) tMsg.textContent = msg;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3800);
}
