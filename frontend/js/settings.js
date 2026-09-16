/**
 * SETTINGS & APPLICATION CONFIGURATION ENGINE
 * Pure Vanilla JavaScript Implementation
 */

// State
let mockApiKeys = {
    "1": { name: "Warehouse Data API", key: "wh_live_a89f3c14d9b2447e908234f1", masked: "wh_live_••••••••••••••••34f1", revealed: false },
    "2": { name: "Analytics & Telemetry API", key: "an_live_c17e94bc028148dfa28466ab", masked: "an_live_••••••••••••••••66ab", revealed: false }
};

let currentActiveDangerAction = null;

document.addEventListener('DOMContentLoaded', () => {
    initSettingsTabsNav();
    initProfileForm();
    initAppearanceOptions();
    initEvalSlider();
    initApiKeyActions();
    initDangerZoneModals();
    initGlobalActionButtons();
});

/* 1. Settings Navigation Tabs */
function initSettingsTabsNav() {
    const tabs = document.querySelectorAll('.settings-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetSection.classList.add('pulse-focus');
                setTimeout(() => targetSection.classList.remove('pulse-focus'), 1200);
            }
        });
    });
}

/* 2. Profile Form Management */
function initProfileForm() {
    const form = document.getElementById('profileForm');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    const avatarBtn = document.getElementById('changeAvatarBtn');
    const avatarImg = document.getElementById('profileAvatarImg');

    const defaultProfile = {
        name: "Siddhi Borawake",
        email: "siddhi@example.com",
        role: "Warehouse Administrator",
        dept: "Operations"
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profFullName').value.trim();
            const email = document.getElementById('profEmail').value.trim();
            const dept = document.getElementById('profDept').value.trim();

            defaultProfile.name = name;
            defaultProfile.email = email;
            defaultProfile.dept = dept;

            const nameDisplay = document.getElementById('profileNameDisplay');
            if (nameDisplay) nameDisplay.textContent = name;

            showToast("Profile Updated", `Saved account credentials for ${name}.`);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('profFullName').value = defaultProfile.name;
            document.getElementById('profEmail').value = defaultProfile.email;
            document.getElementById('profDept').value = defaultProfile.dept;
            showToast("Changes Reverted", "Restored previous profile state.");
        });
    }

    if (avatarBtn && avatarImg) {
        avatarBtn.addEventListener('click', () => {
            const avatars = [
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
            ];
            const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
            avatarImg.src = randomAvatar;
            showToast("Avatar Updated", "Loaded administrator profile portrait.");
        });
    }
}

/* 3. Appearance & Theme Selection */
function initAppearanceOptions() {
    const themeCards = document.querySelectorAll('.theme-select-card');
    const accentChips = document.querySelectorAll('.accent-chip');
    const applyBtn = document.getElementById('applyAppearanceBtn');

    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            themeCards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.theme-check-circle').textContent = '○';
            });
            card.classList.add('active');
            card.querySelector('.theme-check-circle').textContent = '✓';
        });
    });

    accentChips.forEach(chip => {
        chip.addEventListener('click', () => {
            accentChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const selectedTheme = document.querySelector('.theme-select-card.active')?.getAttribute('data-theme') || 'dark';
            const selectedAccent = document.querySelector('.accent-chip.active')?.getAttribute('data-accent') || 'crimson';
            showToast("Appearance Applied", `Configured ${selectedTheme} theme with ${selectedAccent} accent.`);
        });
    }
}

/* 4. Evaluation Slider */
function initEvalSlider() {
    const slider = document.getElementById('evalThresholdSlider');
    const badge = document.getElementById('evalSliderVal');

    if (slider && badge) {
        slider.addEventListener('input', (e) => {
            badge.textContent = `${e.target.value}%`;
        });
    }

    const saveNotifBtn = document.getElementById('saveNotifBtn');
    if (saveNotifBtn) {
        saveNotifBtn.addEventListener('click', () => {
            showToast("Notification Preferences Saved", "Broadcast event filters updated for this console.");
        });
    }
}

/* 5. API Keys Interactions */
function initApiKeyActions() {
    document.querySelectorAll('.btn-reveal').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const item = mockApiKeys[targetId];
            const display = document.getElementById(`keyVal${targetId}`);

            if (item && display) {
                item.revealed = !item.revealed;
                display.textContent = item.revealed ? item.key : item.masked;
                btn.textContent = item.revealed ? "Hide" : "Reveal";
            }
        });
    });

    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const item = mockApiKeys[targetId];
            if (item) {
                navigator.clipboard?.writeText(item.key).catch(() => {});
                const originalText = btn.textContent;
                btn.textContent = "Copied!";
                btn.style.color = "var(--color-green)";
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = "";
                }, 1500);
                showToast("Key Copied", `Copied ${item.name} credential to clipboard.`);
            }
        });
    });

    document.querySelectorAll('.btn-regen').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const item = mockApiKeys[targetId];
            if (item && confirm(`Regenerate credentials for ${item.name}? Existing integrations will need updating.`)) {
                const randomHash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
                const prefix = targetId === "1" ? "wh_live_" : "an_live_";
                item.key = `${prefix}${randomHash}`;
                item.masked = `${prefix}••••••••••••••••${randomHash.slice(-4)}`;
                
                const display = document.getElementById(`keyVal${targetId}`);
                if (display) display.textContent = item.revealed ? item.key : item.masked;
                showToast("API Key Regenerated", `Created new authentication key for ${item.name}.`);
            }
        });
    });

    // Add API Key Modal
    const addKeyModal = document.getElementById('addApiKeyModal');
    const openAddKeyBtn = document.getElementById('openAddApiKeyModalBtn');
    const closeAddKeyBtn = document.getElementById('closeAddApiKeyModalBtn');
    const cancelAddKeyBtn = document.getElementById('cancelAddApiKeyBtn');
    const addKeyForm = document.getElementById('addApiKeyForm');

    if (openAddKeyBtn && addKeyModal) {
        openAddKeyBtn.addEventListener('click', () => addKeyModal.classList.add('show'));
    }
    if (closeAddKeyBtn && addKeyModal) {
        closeAddKeyBtn.addEventListener('click', () => addKeyModal.classList.remove('show'));
    }
    if (cancelAddKeyBtn && addKeyModal) {
        cancelAddKeyBtn.addEventListener('click', () => addKeyModal.classList.remove('show'));
    }

    if (addKeyForm) {
        addKeyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newKeyName').value.trim();
            const env = document.getElementById('newKeyEnv').value;
            const newId = String(Object.keys(mockApiKeys).length + 1);
            const randomHash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            
            mockApiKeys[newId] = {
                name: name,
                key: `ext_live_${randomHash}`,
                masked: `ext_live_••••••••••••••••${randomHash.slice(-4)}`,
                revealed: false
            };

            const keysList = document.getElementById('apiKeysList');
            if (keysList) {
                const newKeyEl = document.createElement('div');
                newKeyEl.className = "api-key-item";
                newKeyEl.setAttribute('data-keyid', `key${newId}`);
                newKeyEl.innerHTML = `
                    <div class="key-head">
                        <div class="key-name-wrap">
                            <strong>${name}</strong>
                            <span class="pill-badge pill-green-sm">${env.toUpperCase()}</span>
                        </div>
                        <span class="key-created-tag">Created Just now</span>
                    </div>
                    <div class="key-input-row">
                        <div class="key-value-box">
                            <span class="key-val-display" id="keyVal${newId}">${mockApiKeys[newId].masked}</span>
                        </div>
                        <button class="btn btn-outline btn-sm btn-reveal" data-target="${newId}">Reveal</button>
                        <button class="btn btn-outline btn-sm btn-copy" data-target="${newId}">Copy</button>
                        <button class="btn btn-outline btn-sm btn-regen" data-target="${newId}">Regenerate</button>
                    </div>
                `;
                keysList.appendChild(newKeyEl);
                initApiKeyActions(); // Re-bind
            }

            const countBadge = document.getElementById('apiKeysCountBadge');
            if (countBadge) countBadge.textContent = `${Object.keys(mockApiKeys).length} / 4 Active`;

            addKeyModal.classList.remove('show');
            addKeyForm.reset();
            showToast("API Key Generated", `Provisioned ${name} key for ${env}.`);
        });
    }
}

/* 6. Danger Zone Confirmation Modals */
function initDangerZoneModals() {
    const dangerModal = document.getElementById('dangerConfirmModal');
    const closeBtn = document.getElementById('closeDangerModalBtn');
    const cancelBtn = document.getElementById('cancelDangerModalBtn');
    const confirmBtn = document.getElementById('confirmDangerModalBtn');

    const resetDemoBtn = document.getElementById('dangerResetDemoBtn');
    const clearOptBtn = document.getElementById('dangerClearOptBtn');
    const deleteAccountBtn = document.getElementById('dangerDeleteAccountBtn');

    const modalTitle = document.getElementById('dangerModalTitle');
    const modalSubtitle = document.getElementById('dangerModalSubtitle');
    const modalMsg = document.getElementById('dangerModalMessage');

    const openDanger = (type, title, sub, msg) => {
        currentActiveDangerAction = type;
        if (modalTitle) modalTitle.textContent = title;
        if (modalSubtitle) modalSubtitle.textContent = sub;
        if (modalMsg) modalMsg.textContent = msg;
        if (dangerModal) dangerModal.classList.add('show');
    };

    if (resetDemoBtn) {
        resetDemoBtn.addEventListener('click', () => {
            openDanger(
                'reset_demo',
                'Reset Demo Data?',
                'Simulation data will be reinitialized.',
                'This will restore all mock products, bays, orders and warehouse allocations to initial starter values.'
            );
        });
    }

    if (clearOptBtn) {
        clearOptBtn.addEventListener('click', () => {
            openDanger(
                'clear_opt',
                'Clear Optimization History?',
                'Purge local heuristic simulation logs.',
                'This will clear stored 2-Opt TSP graphs, slotting iteration tables and previous wave cache from local memory.'
            );
        });
    }

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            openDanger(
                'delete_account',
                'Deactivate Administrator Profile?',
                'Security credential revocation.',
                'Are you sure you want to deactivate Siddhi Borawake (UID 994-ADMIN-044)? This will revoke terminal sessions.'
            );
        });
    }

    if (closeBtn && dangerModal) {
        closeBtn.addEventListener('click', () => dangerModal.classList.remove('show'));
    }
    if (cancelBtn && dangerModal) {
        cancelBtn.addEventListener('click', () => dangerModal.classList.remove('show'));
    }

    if (confirmBtn && dangerModal) {
        confirmBtn.addEventListener('click', () => {
            dangerModal.classList.remove('show');
            if (currentActiveDangerAction === 'reset_demo') {
                showToast("Demo Data Reset", "Restored all 842 products, 96 bays and order queues.");
            } else if (currentActiveDangerAction === 'clear_opt') {
                showToast("History Purged", "Cleared 248 cached optimization matrices.");
            } else if (currentActiveDangerAction === 'delete_account') {
                showToast("Account Revocation Simulated", "Simulated profile deactivation.");
            }
        });
    }

    // Plan button
    const managePlanBtn = document.getElementById('managePlanBtn');
    if (managePlanBtn) {
        managePlanBtn.addEventListener('click', () => {
            showToast("Subscription Portal", "Enterprise plan billing gateway simulated.");
        });
    }
}

/* 7. Global Header Action Buttons */
function initGlobalActionButtons() {
    const saveAllBtn = document.getElementById('saveAllSettingsBtn');
    const discardBtn = document.getElementById('discardSettingsBtn');

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => {
            showToast("All Settings Saved", "Updated profile, appearance, evaluation heuristics and notification rules.");
        });
    }

    if (discardBtn) {
        discardBtn.addEventListener('click', () => {
            showToast("Changes Discarded", "Reverted all unsaved form fields.");
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
