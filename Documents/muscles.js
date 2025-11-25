
// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
    catalogBox = document.querySelector('.catalog-box'),
    resetButton = document.querySelector('.reset');

// Hide catalog box by default (will show as popup)
catalogBox.style.display = 'none';

// Add a settings button to trigger the popup
// Check if button already exists to avoid duplication on reload
if (!document.querySelector('.settings-button')) {
    let settingsButton = document.createElement('button');
    settingsButton.innerHTML = '⚙';
    settingsButton.className = 'settings-button';
    settingsButton.title = 'Customize Exercises';
    document.querySelector('.cell').appendChild(settingsButton);

    // Add event listener to show/hide the catalog box
    settingsButton.addEventListener('click', function() {
        if (catalogBox.style.display === 'none') {
            catalogBox.style.display = 'block'; // CSS handles positioning
        } else {
            catalogBox.style.display = 'none';
        }
    });
}

// Define a default set of exercises
let catalog = {
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

// This is the working catalog that will be used
let localCatalog = {...catalog};

let currentExerciseIndex = 0;
let exerciseCompleted = {};

// Robust storage helper
const AppStorage = {
  key: 'muscle-break-state',
  
  save: function(data) {
    const value = JSON.stringify(data);
    let saved = false;
    
    // Try localStorage
    try {
      localStorage.setItem(this.key, value);
      saved = true;
    } catch (e) {}

    // Try cookie
    try {
      const date = new Date();
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
      document.cookie = `${this.key}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
      saved = true;
    } catch (e) {}
    
    updateDebugDisplay(saved ? 'Saved' : 'Save Failed');
    return saved;
  },
  
  load: function() {
    let data = null;
    let source = 'None';

    try {
      const fromLocal = localStorage.getItem(this.key);
      if (fromLocal) {
        data = JSON.parse(fromLocal);
        source = 'LS';
      }
    } catch (e) {}
    
    if (!data) {
      try {
        const nameEQ = this.key + "=";
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
          let c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) {
            data = JSON.parse(decodeURIComponent(c.substring(nameEQ.length,c.length)));
            source = 'Cookie';
            break;
          }
        }
      } catch (e) {}
    }
    
    updateDebugDisplay(data ? `${source}` : 'No Data');
    return data;
  }
};

function updateDebugDisplay(status) {
  let debugEl = document.getElementById('debug-status');
  if (debugEl) {
    debugEl.textContent = `Idx: ${currentExerciseIndex}`;
  }
}

function loadState() {
  try {
    const state = AppStorage.load();
    if (state) {
      currentExerciseIndex = parseInt(state.currentIndex);
      if (isNaN(currentExerciseIndex)) currentExerciseIndex = 0;
      exerciseCompleted = state.completed || {};
      if (state.catalog) localCatalog = { ...state.catalog };
      
      const keys = Object.keys(localCatalog).sort();
      if (currentExerciseIndex >= keys.length) currentExerciseIndex = 0;
    }
  } catch (e) {
    currentExerciseIndex = 0;
    exerciseCompleted = {};
  }
}

function saveState() {
  const state = {
    currentIndex: currentExerciseIndex,
    completed: exerciseCompleted,
    catalog: localCatalog
  };
  AppStorage.save(state);
}

// Validation
function validateCatalog() {
  if (Object.keys(localCatalog).length === 0) {
    localCatalog = { ...catalog };
    currentExerciseIndex = 0;
    saveState();
  }
}

function validateCurrentExercise() {
  const keys = Object.keys(localCatalog).sort();
  if (currentExerciseIndex >= keys.length) {
    currentExerciseIndex = 0;
    saveState();
  }
}

let output = {
  exercise: 0,
  reps: 0,
  type: 'reps',
  description: '',
  image: ''
};

if (resetButton) {
  resetButton.addEventListener('click', function() {
    localCatalog = {...catalog};
    currentExerciseIndex = 0;
    exerciseCompleted = {};
    saveState();
    displayExercise();
    displayCatalog();
  });
}

// Create HTML elements for catalog
function displayCatalog() {
  // Clear existing dl elements
  let existingDls = catalogBox.querySelectorAll('dl');
  existingDls.forEach(el => el.remove());

  // Check if close button exists, if not create it
  if (!catalogBox.querySelector('.close-button')) {
    let closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', function() {
      catalogBox.style.display = 'none';
    });
    catalogBox.appendChild(closeButton);
  }

  for (var item in localCatalog) {
    if (typeof localCatalog[item] !== 'function') {
      let exerciseSet = document.createElement('dl'),
        nameBox = document.createElement('dt'),
        repsBox = document.createElement('dd'),
        typeBox = document.createElement('dd'),
        descBox = document.createElement('dd');

      exerciseSet.setAttribute('data-item', item);

      nameBox.contentEditable = true;
      repsBox.contentEditable = true;
      typeBox.contentEditable = true;
      descBox.contentEditable = true;

      nameBox.setAttribute('data-item', 'name');
      repsBox.setAttribute('data-item', 'reps');
      typeBox.setAttribute('data-item', 'type');
      descBox.setAttribute('data-item', 'description');

      nameBox.textContent = localCatalog[item].name;
      repsBox.textContent = localCatalog[item].reps;
      typeBox.textContent = localCatalog[item].type || 'reps';
      descBox.textContent = localCatalog[item].description || 'Desc';
      
      // Catalog styling logic is now handled by CSS classes mostly
      exerciseSet.appendChild(nameBox);
      exerciseSet.appendChild(repsBox);
      exerciseSet.appendChild(typeBox);
      exerciseSet.appendChild(descBox);
      catalogBox.appendChild(exerciseSet);
    }
  }
  
  // Update button logic (prevent duplication)
  if (!catalogBox.querySelector('.add-button')) {
    let addButton = document.createElement('button');
    addButton.innerHTML = '+ ADD NEW';
    addButton.className = 'action-button complete-button add-button'; // Reuse classes
    addButton.style.marginTop = '20px'; // Minor adjustment
    
    addButton.addEventListener('click', function() {
      let keys = Object.keys(localCatalog);
      let highestNum = 0;
      keys.forEach(key => {
        let num = parseInt(key.replace('ex', ''));
        if (num > highestNum) highestNum = num;
      });
      let newId = 'ex' + (highestNum + 1).toString().padStart(2, '0');
      localCatalog[newId] = { name: 'New Exercise', reps: 10, type: 'reps', description: 'Desc', image: '' };
      saveState();
      displayCatalog();
    });
    catalogBox.appendChild(addButton);
  }
}

function getCurrentExercise() {
  validateCatalog();
  validateCurrentExercise();
  const keys = Object.keys(localCatalog).sort();
  if (currentExerciseIndex >= keys.length) currentExerciseIndex = 0;
  
  const prop = keys[currentExerciseIndex];
  output.exercise = localCatalog[prop].name;
  output.reps = localCatalog[prop].reps;
  output.type = localCatalog[prop].type || 'reps';
  output.description = localCatalog[prop].description || '';
  output.image = localCatalog[prop].image || '';
}

function completeCurrentExercise() {
  const keys = Object.keys(localCatalog).sort();
  const currentKey = keys[currentExerciseIndex];
  
  exerciseCompleted[currentKey] = true;
  currentExerciseIndex++;
  if (currentExerciseIndex >= keys.length) currentExerciseIndex = 0;
  
  saveState();
  // Simply update UI, let App handle window closing via its own triggers
  displayExercise();
}

function displayExercise() {
  getCurrentExercise();
  
  let exerciseContent = '';
  
  // 1. Progress
  let keys = Object.keys(localCatalog);
  exerciseContent += `<div class="progress-indicator">EXERCISE ${currentExerciseIndex + 1} / ${keys.length}</div>`;

  // 2. Image
  if (output.image) {
    exerciseContent += `<div class="exercise-image">
      <img src="${output.image}" alt="${output.exercise}">
    </div>`;
  }
  

  // 3. Name
  exerciseContent += `<div class="exercise-name">${output.exercise}</div>`;

  // 4. Stats (Big Bold Text)
  let multiplierStr = output.type === 'time' ? 'SEC' : 'REPS';
  exerciseContent += `<div class="exercise-stats">
    <span class="exercise-meta">${output.reps}</span>
    <span class="multiplier">${multiplierStr}</span>
  </div>`;


  // 5. Description
  if (output.description) {
    exerciseContent += `<div class="exercise-description">${output.description}</div>`;
  }
  
  // 6. Buttons - Clean Structure, Classes Only
  exerciseContent += `
    <div class="action-buttons">
      <button id="complete-btn" class="action-button complete-button">
        Done
      </button>
    </div>
  `;
  
  displayBox.innerHTML = exerciseContent;
  addActionButtonListeners();
}

function addActionButtonListeners() {
  const completeBtn = document.getElementById('complete-btn');

  if (completeBtn) {
    const newBtn = completeBtn.cloneNode(true); 
    completeBtn.parentNode.replaceChild(newBtn, completeBtn);
    newBtn.addEventListener('click', function() {
      completeCurrentExercise(); 
    });
  }
}

// Init
loadState(); 
validateCatalog(); 
displayExercise();
displayCatalog();

// Add 'loaded' class
window.onload = function(e) {
  document.body.className = 'loaded';
};