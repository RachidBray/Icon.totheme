/**
 * MUSCLE BREAK APP - FINAL LOGIC
 * Behavior: Persistence + Deterministic Order.
 * Window Management: Handled by external App (No window.close() calls).
 */

// --- 1. CONFIGURATION & DATA ---

const defaultCatalog = {
  ex01: { name: 'Neck Circles & Tilts', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex02: { name: 'Shoulder Circles & Shrugs', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex03: { name: 'Arm Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex04: { name: 'Torso Rotations', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex05: { name: 'Hip Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex06: { name: 'Knee Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex07: { name: 'Ankle Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex08: { name: 'Camel Cat', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex09: { name: "World's Greatest Stretch", reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex10: { name: 'Leg Swings (forward/back)', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex11: { name: 'Leg Swings (lateral)', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex12: { name: 'Walking Lunges with Rotation', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex13: { name: 'Walking Quad Pulls', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex14: { name: 'Walking Hamstring Reaches', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex15: { name: 'Hip Openers', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex16: { name: 'Inchworms', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex17: { name: 'Banded Monster Walks', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex18: { name: 'Single-leg Balance', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex19: { name: 'Short Foot Exercise', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex20: { name: 'Big Toe Dissociation', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex21: { name: 'Heel-toe Walks', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex22: { name: '90/90 Hip Rotations', reps: 2, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex23: { name: 'Clamshells', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex24: { name: 'Hip CAR (controlled articular rotation)', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex25: { name: 'Glute Bridge', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex26: { name: 'Standing Calf Raises', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex27: { name: 'Hip Flexor Stretch', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex28: { name: 'Barbell Back Squat', reps: 0, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex29: { name: 'Plank forearm', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex30: { name: 'Side Plank (each side)', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex31: { name: 'copenhagen side plank', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex32: { name: 'Bulgarian Split Squat', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex33: { name: 'Romanian Deadlift', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex34: { name: 'hamstrings curl', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex35: { name: 'Wall Sit', reps: 40, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex36: { name: 'Pull-ups (or Band-Assisted)', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex37: { name: 'Push-ups (or Bench Press)', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex38: { name: 'Squat Jumps', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex39: { name: 'Single-Leg Deadlift (DL)', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex40: { name: 'Banded Ankle Dorsiflexion Mobilisation', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex41: { name: 'Lunges (Backward, Forward)', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex42: { name: 'Step-Ups', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex43: { name: 'Jumping Lunges', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex44: { name: 'Single Leg Hops', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex45: { name: 'Dead Bug', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex46: { name: 'Bird Dog', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex47: { name: 'Romanian Deadlifts', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex48: { name: 'Sidelying Hip Abduction (against wall)', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex49: { name: 'Standing Fire Hydrant', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex50: { name: 'Lateral Step-Downs', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex51: { name: 'reactive neuromuscular training (RNT) with band', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex52: { name: 'dips', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex53: { name: 'Lateral lunges', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex54: { name: 'one arm rows', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex55: { name: 'Figure 4 stretch', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex56: { name: 'Heal raise Walking', reps: 1, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex57: { name: 'Hip airplanes', reps: 6, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' },
  ex58: { name: 'Psoas Stretch', reps: 6, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/2548/2548532.png' }
};

// Global State
let state = {
    currentIndex: 0,
    catalog: { ...defaultCatalog }
};

// --- 2. STORAGE MANAGER (Persistence Logic) ---
// Tries LocalStorage first, falls back to Cookies.

const StorageManager = {
    KEY: 'muscle_break_v2_data',

    save: function(dataObj) {
        const jsonString = JSON.stringify(dataObj);
        let status = [];

        // Method 1: LocalStorage
        try {
            localStorage.setItem(this.KEY, jsonString);
            status.push("LS: OK");
        } catch (e) {
            status.push("LS: Fail");
        }

        // Method 2: Cookies (Backup)
        try {
            const date = new Date();
            date.setTime(date.getTime() + (365*24*60*60*1000));
            document.cookie = `${this.KEY}=${encodeURIComponent(jsonString)}; expires=${date.toUTCString()}; path=/`;
            status.push("Cookie: OK");
        } catch (e) {
            status.push("Cookie: Fail");
        }

        this.log(`Saved (Index ${dataObj.currentIndex}) | ${status.join(', ')}`);
    },

    load: function() {
        let loadedData = null;
        let source = "";

        // Try LocalStorage
        try {
            const lsData = localStorage.getItem(this.KEY);
            if (lsData) {
                loadedData = JSON.parse(lsData);
                source = "LS";
            }
        } catch(e) {}

        // Try Cookies
        if (!loadedData) {
            try {
                const nameEQ = this.KEY + "=";
                const ca = document.cookie.split(';');
                for(let i=0;i < ca.length;i++) {
                    let c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) {
                        loadedData = JSON.parse(decodeURIComponent(c.substring(nameEQ.length,c.length)));
                        source = "Cookie";
                        break;
                    }
                }
            } catch(e) {}
        }

        if (loadedData) {
            this.log(`Loaded Index: ${loadedData.currentIndex} (${source})`);
            return loadedData;
        } else {
            this.log(`No saved data. Starting Index 0.`);
            return null;
        }
    },

    log: function(msg) {
        console.log(msg);
        const bar = document.getElementById('debug-bar');
        if (bar) bar.textContent = msg;
    }
};

// --- 3. APP LOGIC ---

function init() {
    const loaded = StorageManager.load();
    if (loaded) {
        state = loaded;
        const keys = Object.keys(state.catalog);
        if (state.currentIndex >= keys.length) state.currentIndex = 0;
    }
    renderUI();
    document.body.classList.add('loaded');
}

function renderUI() {
    // 1. Get current exercise
    const keys = Object.keys(state.catalog).sort(); 
    const currentKey = keys[state.currentIndex];
    const exercise = state.catalog[currentKey];

    // 2. DOM Elements
    const container = document.querySelector('.current-exercise');
    const actions = document.getElementById('action-container');

    // 3. Build HTML
    const multiplier = exercise.type === 'time' ? 'sec' : '×';
    
    container.innerHTML = `
        <img src="${exercise.image}" class="exercise-img" alt="Exercise">
        <div class="exercise-text">
            ${exercise.reps} <span class="multiplier">${multiplier}</span> ${exercise.name}
        </div>
        <div style="font-size: 0.5em; margin-top:10px; color:#aaa;">
            Exercise ${state.currentIndex + 1} of ${keys.length}
        </div>
    `;

    // 4. Buttons
    actions.innerHTML = `
        <button id="btn-complete" class="btn btn-complete">✓ Complete</button>
        <button id="btn-postpone" class="btn btn-postpone">⏰ Postpone</button>
        <button id="btn-skip" class="btn btn-skip">⏭ Skip</button>
    `;

    // 5. Listeners
    document.getElementById('btn-complete').addEventListener('click', handleComplete);
    document.getElementById('btn-postpone').addEventListener('click', handlePostpone);
    document.getElementById('btn-skip').addEventListener('click', handleSkip);
}

// --- 4. ACTION HANDLERS ---

function handleComplete() {
    // 1. Advance Index
    const keys = Object.keys(state.catalog).sort();
    state.currentIndex++;
    if (state.currentIndex >= keys.length) state.currentIndex = 0;

    // 2. Save
    StorageManager.save(state);

    // 3. Refresh UI immediately (User sees next exercise)
    // We do NOT close the window. The App handles that.
    renderUI();
}

function handlePostpone() {
    // No index change. No save needed. No window close.
    StorageManager.log("Postponed. Waiting for App to close...");
}

function handleSkip() {
    // Same as postpone per requirements.
    StorageManager.log("Skipped. Waiting for App to close...");
}

// --- 5. CATALOG EDITOR (Minimal) ---
const settingsBtn = document.querySelector('.settings-button');
if (!settingsBtn) {
    const btn = document.createElement('button');
    btn.innerHTML = '⚙️';
    btn.className = 'settings-button';
    document.querySelector('.cell').appendChild(btn);
    btn.addEventListener('click', () => {
        const cat = document.querySelector('.catalog-box');
        cat.style.display = cat.style.display === 'flex' ? 'none' : 'flex';
        renderCatalog();
    });
}

function renderCatalog() {
    const box = document.querySelector('.catalog-box');
    box.innerHTML = '<h3 class="catalog-title">Exercises</h3><button class="close-button" onclick="this.parentElement.style.display=\'none\'">×</button>';
    for (let key in state.catalog) {
        const item = state.catalog[key];
        const div = document.createElement('div');
        div.style.color = 'white';
        div.style.borderBottom = '1px solid #333';
        div.style.padding = '5px';
        div.style.fontSize = '0.5em';
        div.textContent = `${item.name} (${item.reps})`;
        box.appendChild(div);
    }
}

window.onload = init;