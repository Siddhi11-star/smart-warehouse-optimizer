/**
 * WAREHOUSE ANALYTICS & STATISTICAL TELEMETRY ENGINE
 * Pure Vanilla JavaScript Implementation
 */

// Datasets for 7D, 30D, and 90D
const analyticsDatasets = {
    "7": {
        totalOrders: "1,824",
        completedOrders: "1,756",
        avgDist: "142",
        avgTime: "4m 58s",
        utilPct: "85.2%",
        sla: "97.1%",
        days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        completed: [240, 265, 230, 280, 310, 290, 241],
        pending: [15, 22, 18, 14, 25, 19, 12],
        pickTime: ["5m 45s", "5m 30s", "5m 12s", "4m 55s", "5m 02s", "4m 50s", "4m 42s"]
    },
    "30": {
        totalOrders: "7,842",
        completedOrders: "7,516",
        avgDist: "146",
        avgTime: "5m 12s",
        utilPct: "84.5%",
        sla: "96.2%",
        days: ["Day 1", "Day 4", "Day 8", "Day 12", "Day 16", "Day 20", "Day 24", "Day 28", "Day 30"],
        completed: [180, 210, 245, 230, 260, 284, 270, 310, 325],
        pending: [25, 28, 22, 18, 20, 16, 24, 15, 18],
        pickTime: ["6m 15s", "5m 50s", "5m 40s", "5m 30s", "5m 20s", "5m 34s", "5m 10s", "4m 55s", "4m 50s"]
    },
    "90": {
        totalOrders: "24,680",
        completedOrders: "23,890",
        avgDist: "152",
        avgTime: "5m 38s",
        utilPct: "83.8%",
        sla: "95.5%",
        days: ["Wk 1", "Wk 2", "Wk 4", "Wk 6", "Wk 8", "Wk 10", "Wk 12"],
        completed: [1420, 1650, 1890, 2100, 2250, 2400, 2580],
        pending: [140, 165, 130, 110, 125, 95, 105],
        pickTime: ["6m 40s", "6m 20s", "5m 55s", "5m 40s", "5m 30s", "5m 18s", "5m 05s"]
    }
};

let currentDays = "30";

document.addEventListener('DOMContentLoaded', () => {
    renderChart("30");
    initChartControls();
    initDateRangeDropdown();
    initRefreshAction();
    initExportAction();
    initTableSearch();
    initInsightCardClicks();
});

/* 1. Render Multi-Series SVG Performance Chart */
function renderChart(daysKey) {
    const data = analyticsDatasets[daysKey] || analyticsDatasets["30"];
    const svg = document.getElementById('analyticsChartSvg');
    if (!svg) return;

    const width = 960;
    const height = 260;
    const padX = 60;
    const padY = 30;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const n = data.completed.length;
    const maxVal = Math.max(...data.completed) * 1.2;
    const minVal = 0;

    // Calculate (x, y) coordinates
    const pointsCompleted = data.completed.map((val, idx) => {
        const x = padX + (idx / (n - 1)) * chartW;
        const y = padY + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
        return { x, y, val };
    });

    const maxPending = Math.max(...data.pending) * 2.5;
    const pointsPending = data.pending.map((val, idx) => {
        const x = padX + (idx / (n - 1)) * chartW;
        const y = padY + chartH - (val / maxPending) * (chartH * 0.45);
        return { x, y, val };
    });

    // Inverted duration curve
    const pointsDuration = data.completed.map((val, idx) => {
        const x = padX + (idx / (n - 1)) * chartW;
        const y = padY + (idx / (n - 1)) * (chartH * 0.35) + 60;
        return { x, y };
    });

    // Generate Smooth SVG Bezier curves
    const completedPath = createSmoothPath(pointsCompleted);
    const completedArea = `${completedPath} L ${pointsCompleted[n - 1].x} ${padY + chartH} L ${pointsCompleted[0].x} ${padY + chartH} Z`;

    const pendingPath = createSmoothPath(pointsPending);
    const durationPath = createSmoothPath(pointsDuration);

    svg.innerHTML = `
        <defs>
            <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E83A4B" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#E83A4B" stop-opacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#8F1523" />
                <stop offset="50%" stop-color="#E83A4B" />
                <stop offset="100%" stop-color="#FF405F" />
            </linearGradient>
        </defs>

        <!-- Horizontal Grid Lines -->
        <line x1="${padX}" y1="${padY}" x2="${padX + chartW}" y2="${padY}" stroke="rgba(66, 20, 27, 0.4)" stroke-dasharray="4,4" />
        <line x1="${padX}" y1="${padY + chartH * 0.33}" x2="${padX + chartW}" y2="${padY + chartH * 0.33}" stroke="rgba(66, 20, 27, 0.4)" stroke-dasharray="4,4" />
        <line x1="${padX}" y1="${padY + chartH * 0.66}" x2="${padX + chartW}" y2="${padY + chartH * 0.66}" stroke="rgba(66, 20, 27, 0.4)" stroke-dasharray="4,4" />
        <line x1="${padX}" y1="${padY + chartH}" x2="${padX + chartW}" y2="${padY + chartH}" stroke="rgba(66, 20, 27, 0.8)" />

        <!-- Y-Axis Labels -->
        <text x="${padX - 12}" y="${padY + 4}" fill="#806A70" font-size="10" font-family="monospace" text-anchor="end">350</text>
        <text x="${padX - 12}" y="${padY + chartH * 0.33 + 4}" fill="#806A70" font-size="10" font-family="monospace" text-anchor="end">250</text>
        <text x="${padX - 12}" y="${padY + chartH * 0.66 + 4}" fill="#806A70" font-size="10" font-family="monospace" text-anchor="end">150</text>
        <text x="${padX - 12}" y="${padY + chartH + 4}" fill="#806A70" font-size="10" font-family="monospace" text-anchor="end">0</text>

        <!-- X-Axis Labels -->
        ${data.days.map((day, idx) => {
            const x = padX + (idx / (n - 1)) * chartW;
            return `<text x="${x}" y="${padY + chartH + 20}" fill="#806A70" font-size="10" font-family="monospace" text-anchor="middle">${day}</text>`;
        }).join('')}

        <!-- Area Fill -->
        <path d="${completedArea}" fill="url(#chartAreaGrad)" />

        <!-- Completed Line -->
        <path d="${completedPath}" fill="none" stroke="url(#lineGrad)" stroke-width="3" stroke-linecap="round" />

        <!-- Pending Dashed Line -->
        <path d="${pendingPath}" fill="none" stroke="#E8A33A" stroke-width="2" stroke-dasharray="5,4" stroke-linecap="round" />

        <!-- Duration Green Curve -->
        <path d="${durationPath}" fill="none" stroke="#20D6A1" stroke-width="2" stroke-linecap="round" />

        <!-- Interactive Points -->
        ${pointsCompleted.map((pt, idx) => `
            <circle class="chart-point" data-idx="${idx}" cx="${pt.x}" cy="${pt.y}" r="4" fill="#E83A4B" stroke="#FFFFFF" stroke-width="1.5" />
        `).join('')}
    `;

    // Tooltip & Mouse Tracking
    initChartTooltipTracking(pointsCompleted, data);
}

function createSmoothPath(points) {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cx1 = p0.x + (p1.x - p0.x) * 0.5;
        const cy1 = p0.y;
        const cx2 = p0.x + (p1.x - p0.x) * 0.5;
        const cy2 = p1.y;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
    return d;
}

/* 2. Chart Tooltip Tracking */
function initChartTooltipTracking(points, data) {
    const viewport = document.getElementById('chartViewport');
    const tooltip = document.getElementById('chartTooltip');
    const marker = document.getElementById('chartHoverMarker');

    if (!viewport || !tooltip || !marker) return;

    viewport.onmousemove = (e) => {
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const scaleX = 960 / rect.width;
        const currentSvgX = mouseX * scaleX;

        // Find closest point
        let closestIdx = 0;
        let minDiff = Infinity;
        points.forEach((pt, idx) => {
            const diff = Math.abs(pt.x - currentSvgX);
            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
            }
        });

        const pt = points[closestIdx];
        const pxPercent = (pt.x / 960) * 100;

        marker.style.display = 'block';
        marker.style.left = `${pxPercent}%`;

        tooltip.style.display = 'block';
        tooltip.style.left = `${Math.min(Math.max(pxPercent, 15), 85)}%`;
        tooltip.style.top = `${(pt.y / 260) * 100 - 35}%`;

        document.getElementById('ttDate').textContent = `${data.days[closestIdx]} (Shift 02)`;
        document.getElementById('ttCompleted').textContent = data.completed[closestIdx];
        document.getElementById('ttPending').textContent = data.pending[closestIdx];
        document.getElementById('ttTime').textContent = data.pickTime[closestIdx] || "5m 12s";
    };

    viewport.onmouseleave = () => {
        tooltip.style.display = 'none';
        marker.style.display = 'none';
    };
}

/* 3. Controls: 7D / 30D / 90D */
function initChartControls() {
    const btns = document.querySelectorAll('.chart-time-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const days = btn.getAttribute('data-days');
            currentDays = days;

            // Sync date range select
            const dateSelect = document.getElementById('analyticsDateRange');
            if (dateSelect) dateSelect.value = days;

            updateAnalyticsState(days);
        });
    });
}

function initDateRangeDropdown() {
    const dateSelect = document.getElementById('analyticsDateRange');
    if (dateSelect) {
        dateSelect.addEventListener('change', () => {
            const days = dateSelect.value;
            currentDays = days;

            // Sync chart buttons
            document.querySelectorAll('.chart-time-btn').forEach(btn => {
                if (btn.getAttribute('data-days') === days) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            updateAnalyticsState(days);
        });
    }
}

function updateAnalyticsState(days) {
    const data = analyticsDatasets[days] || analyticsDatasets["30"];

    // Update KPI numbers
    document.getElementById('kpiTotalOrders').textContent = data.totalOrders;
    document.getElementById('kpiCompletedOrders').textContent = data.completedOrders;
    document.getElementById('kpiAvgDist').textContent = data.avgDist;
    document.getElementById('kpiAvgTime').innerHTML = `${data.avgTime.split('m')[0]}<small>m</small> ${data.avgTime.split('m')[1]}<small>s</small>`;
    document.getElementById('kpiUtilPct').textContent = data.utilPct;
    document.getElementById('kpiFulfillSla').textContent = data.sla;

    const sub = document.getElementById('chartRangeSubtitle');
    if (sub) {
        sub.textContent = `Daily completion volume vs. pending backlog over the last ${days} days across operational shifts.`;
    }

    renderChart(days);
    showToast("Analytics Telemetry Updated", `Loaded ${days}-day aggregated telemetry dataset.`);
}

/* 4. Refresh Action */
function initRefreshAction() {
    const btn = document.getElementById('refreshAnalyticsBtn');
    const text = document.getElementById('refreshBtnText');
    const syncBadge = document.getElementById('analyticsSyncBadge');
    const healthCalc = document.getElementById('healthLastCalc');

    if (btn) {
        btn.addEventListener('click', () => {
            btn.disabled = true;
            if (text) text.textContent = "Syncing...";

            setTimeout(() => {
                btn.disabled = false;
                if (text) text.textContent = "Refresh Data";
                if (syncBadge) syncBadge.innerHTML = `<span class="dot-green"></span> DATA SYNCED: JUST NOW`;
                if (healthCalc) healthCalc.textContent = `Just now (11ms runtime)`;
                showToast("Data Sync Complete", "Real-time socket data synced across 7,842 historical order vectors.");
            }, 800);
        });
    }
}

/* 5. Export Report */
function initExportAction() {
    const exportBtn = document.getElementById('exportReportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = analyticsDatasets[currentDays] || analyticsDatasets["30"];
            let csv = "Time Period,Orders Completed,Pending Backlog,Average Pick Duration\n";
            data.days.forEach((d, idx) => {
                csv += `"${d}","${data.completed[idx]}","${data.pending[idx]}","${data.pickTime[idx]}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `warehouse_analytics_report_${currentDays}d_${new Date().toISOString().slice(0, 10)}.csv`);
            a.click();
            showToast("Report Exported", `Generated executive ${currentDays}-day analytics CSV export.`);
        });
    }
}

/* 6. Table Search */
function initTableSearch() {
    const input = document.getElementById('topProductsSearch');
    if (input) {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const rows = document.querySelectorAll('#topProductsTableBody .sku-table-row');
            rows.forEach(r => {
                const text = r.textContent.toLowerCase();
                r.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
}

/* 7. Insight Card Clicks */
function initInsightCardClicks() {
    document.querySelectorAll('.insight-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('pulse-focus');
            setTimeout(() => card.classList.remove('pulse-focus'), 1200);
            const title = card.querySelector('.insight-title')?.textContent || "Insight Selected";
            showToast("Insight Highlighted", title);
        });
    });
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
