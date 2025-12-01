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
  ex01: { name: 'Bird Dog', reps: 10, type: 'reps', image: 'https://www.docteur-fitness.com/wp-content/uploads/2022/04/bird-dog.gif' },
  ex02: { name: 'Hip Flexor Stretch', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex03: { name: 'Single-leg Balance', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex04: { name: 'Dead Bug', reps: 10, type: 'reps', image: 'https://www.docteur-fitness.com/wp-content/uploads/2022/11/dead-bug-meilleur-exercice-abdos.jpg' },
  ex05: { name: 'Neck Circles & Tilts', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex06: { name: 'Bulgarian Split Squat', reps: 10, type: 'reps', image: 'https://www.scienceforsport.com/wp-content/uploads/2023/12/Bulgarian_Split_Squat_1024x1024.webp' },
  ex07: { name: 'Lateral lunges', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex08: { name: 'Push-ups (or Bench Press)', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex09: { name: 'Foam Rolling Quad', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex10: { name: 'Standing Calf Raises', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex11: { name: 'Leg Swings', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex12: { name: 'Hip airplanes', reps: 6, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex13: { name: 'Squat Jumps', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex14: { name: 'Clamshells', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex15: { name: 'Walking Quad Pulls', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex16: { name: 'Romanian Deadlift', reps: 12, type: 'reps', image: 'https://burnfit.io/wp-content/uploads/2023/11/KB_SM_DL.gif' },
  ex17: { name: 'Jumping Lunges', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex18: { name: 'Banded Monster Walks', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex19: { name: 'Single Leg Hops', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex20: { name: 'Hip Openers', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex21: { name: 'Foam Rolling Calf', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex22: { name: 'Step-Ups', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex23: { name: '90/90 Hip Rotations', reps: 120, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex24: { name: 'kettlebell Squat', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex25: { name: 'Inchworms', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex26: { name: 'Hamstrings curl', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex27: { name: 'Torso Rotations', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex28: { name: 'Figure 4 stretch', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex29: { name: 'Pull-ups (or Band-Assisted)', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex30: { name: 'Big Toe Dissociation', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex31: { name: 'Ankle Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex32: { name: 'Wall Sit', reps: 40, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex33: { name: 'Sidelying Hip Abduction (against wall)', reps: 10, type: 'reps', image: 'https://iris.hattiesburgclinic.com/patadv/exkit/Tubing%20Exercises/Images/0210000209tl35m.png' },
  ex34: { name: 'Knee Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex35: { name: 'reactive neuromuscular training (RNT) with band', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex36: { name: 'Lunges (Backward, Forward)', reps: 12, type: 'reps', image: 'https://www.kindpng.com/picc/m/141-1415177_kettlebell-lunges-avatar-hd-png-download.png' },
  ex37: { name: 'Psoas Stretch', reps: 6, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex38: { name: 'Short Foot Exercise', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex39: { name: 'Single-Leg Glute Bridge', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex40: { name: 'Foam Rolling Glutes', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex41: { name: 'Walking Hamstring Reaches', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex42: { name: 'one arm rows', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex43: { name: 'Camel Cat', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex44: { name: 'Heal raise Walking', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex45: { name: 'Single-Leg Deadlift', reps: 10, type: 'reps', image: 'https://cdn.jefit.com/assets/img/exercises/gifs/482.gif' },
  ex46: { name: 'dips', reps: 12, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex47: { name: 'Banded Ankle Dorsiflexion Mobilisation', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex48: { name: 'copenhagen side plank', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex49: { name: 'Shoulder Circles & Shrugs', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex50: { name: 'Hip Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex51: { name: "World's Greatest Stretch", reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex53: { name: 'Standing Fire Hydrant', reps: 15, type: 'reps', image: 'https://i2.wp.com/theprehabguys.com/wp-content/uploads/2020/09/single-leg-fire-hydrant-band-vimeo-thumbnail-scaled.jpg' },
  ex54: { name: 'Walking Lunges with Rotation', reps: 8, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex55: { name: 'Plank forearm', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex56: { name: 'Side Plank (each side)', reps: 30, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex57: { name: 'Hip CAR (controlled articular rotation)', reps: 5, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex58: { name: 'Lateral Step-Downs', reps: 12, type: 'reps', image: 'https://s3.amazonaws.com/prod.skimble/assets/1310820/image_iphone.jpg' },
  ex59: { name: 'Foam Rolling Hamstrings', reps: 60, type: 'time', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex60: { name: 'Heel-toe Walks', reps: 15, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex61: { name: 'Arm Circles', reps: 10, type: 'reps', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' }
};

// This is the working catalog that will be used
let localCatalog = {...catalog};

let currentExerciseIndex = 0;
let exerciseCompleted = {};

// Robust storage helper with multiple fallbacks for better persistence
const AppStorage = {
  dbName: 'TimeoutMuscleDB',
  storeName: 'state',
  key: 'muscleState',
  
  save: async function(data) {
    // Try IndexedDB first
    try {
      const idbSuccess = await this.saveIndexedDB(data);
      if (idbSuccess) return true;
    } catch (e) {
      console.warn('IndexedDB save failed:', e);
    }
    
    // Fallback to localStorage
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      updateDebugDisplay('Save: localStorage');
      return true;
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
    
    // Fallback to sessionStorage
    try {
      sessionStorage.setItem(this.key, JSON.stringify(data));
      updateDebugDisplay('Save: sessionStorage');
      return true;
    } catch (e) {
      console.warn('sessionStorage save failed:', e);
    }
    
    // Fallback to cookies
    try {
      this.saveCookie(data);
      updateDebugDisplay('Save: Cookie');
      return true;
    } catch (e) {
      console.warn('Cookie save failed:', e);
    }
    
    // Fallback to URL hash
    try {
      this.saveHash(data);
      updateDebugDisplay('Save: Hash');
      return true;
    } catch (e) {
      console.warn('Hash save failed:', e);
    }
    
    updateDebugDisplay('Save: All Failed');
    return false;
  },
  
  load: async function() {
    // Try IndexedDB first
    try {
      const idbData = await this.loadIndexedDB();
      if (idbData) {
        updateDebugDisplay('Load: IDB');
        return idbData;
      }
    } catch (e) {
      console.warn('IndexedDB load failed:', e);
    }
    
    // Fallback to localStorage
    try {
      const lsData = localStorage.getItem(this.key);
      if (lsData) {
        updateDebugDisplay('Load: localStorage');
        return JSON.parse(lsData);
      }
    } catch (e) {
      console.warn('localStorage load failed:', e);
    }
    
    // Fallback to sessionStorage
    try {
      const ssData = sessionStorage.getItem(this.key);
      if (ssData) {
        updateDebugDisplay('Load: sessionStorage');
        return JSON.parse(ssData);
      }
    } catch (e) {
      console.warn('sessionStorage load failed:', e);
    }
    
    // Fallback to cookies
    try {
      const cookieData = this.loadCookie();
      if (cookieData) {
        updateDebugDisplay('Load: Cookie');
        return cookieData;
      }
    } catch (e) {
      console.warn('Cookie load failed:', e);
    }
    
    // Fallback to URL hash
    try {
      const hashData = this.loadHash();
      if (hashData) {
        updateDebugDisplay('Load: Hash');
        return hashData;
      }
    } catch (e) {
      console.warn('Hash load failed:', e);
    }
    
    updateDebugDisplay('Load: No Data');
    return null;
  },
  
  saveIndexedDB: function(data) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const putRequest = store.put(data, this.key);
        
        putRequest.onsuccess = () => resolve(true);
        putRequest.onerror = () => resolve(false);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  },
  
  loadIndexedDB: function() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const getRequest = store.get(this.key);
        
        getRequest.onsuccess = () => resolve(getRequest.result || null);
        getRequest.onerror = () => resolve(null);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  },
  
  saveCookie: function(data) {
    const json = JSON.stringify(data);
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Expire in 1 year
    document.cookie = `${this.key}=${encodeURIComponent(json)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },
  
  loadCookie: function() {
    const name = this.key + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        const json = cookie.substring(name.length);
        try {
          return JSON.parse(json);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  },
  
  saveHash: function(data) {
    const json = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(json)); // Base64 encode to make it URL-safe
    window.location.hash = encoded;
  },
  
  loadHash: function() {
    const hash = window.location.hash.substring(1); // Remove #
    if (!hash) return null;
    try {
      const decoded = decodeURIComponent(atob(hash));
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }
};

function updateDebugDisplay(status) {
  let debugEl = document.getElementById('debug-status');
  if (debugEl) {
    // Show both status and the current index for debugging
    debugEl.textContent = `${status} | Idx: ${currentExerciseIndex}`;
  }
}

async function loadState() {
  try {
    const loadedState = await AppStorage.load();
    if (loadedState) {
      const state = loadedState;
      
      let loadedIndex = parseInt(state.currentIndex);
      if (isNaN(loadedIndex)) loadedIndex = 0;
      
      currentExerciseIndex = loadedIndex;
      exerciseCompleted = state.completed || {};
      
      if (state.catalog) localCatalog = { ...state.catalog };
      
      const keys = Object.keys(localCatalog).sort();
      
      // Ensure the loaded index is valid within the current catalog size
      if (currentExerciseIndex >= keys.length) {
          currentExerciseIndex = 0;
      }
      
      updateDebugDisplay(`Load: IDB`);
    } else {
        // This runs if AppStorage.load() returns null
        updateDebugDisplay('Load: Reset to 0 (No Data)');
        currentExerciseIndex = 0;
        exerciseCompleted = {};
    }
  } catch (e) {
    // Fallback to initial values on error
    currentExerciseIndex = 0;
    exerciseCompleted = {};
    updateDebugDisplay('Load: FAILED (Reset)');
  }
}

async function saveState() {
  const state = {
    currentIndex: currentExerciseIndex,
    completed: exerciseCompleted,
    catalog: localCatalog
  };
  await AppStorage.save(state);
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
  // Double-check index wrap-around just before fetching
  if (currentExerciseIndex >= keys.length) currentExerciseIndex = 0;
  
  const prop = keys[currentExerciseIndex];
  output.exercise = localCatalog[prop].name;
  output.reps = localCatalog[prop].reps;
  output.type = localCatalog[prop].type || 'reps';
  output.description = localCatalog[prop].description || '';
  output.image = localCatalog[prop].image || '';
  
  updateDebugDisplay(`Displaying`); // Update debug with current index
}

function completeCurrentExercise() {
  const keys = Object.keys(localCatalog).sort();
  const currentKey = keys[currentExerciseIndex];
  
  exerciseCompleted[currentKey] = true;
  currentExerciseIndex++;
  // Increment index, then wrap around if necessary
  if (currentExerciseIndex >= keys.length) currentExerciseIndex = 0;
  
  saveState(); // Saves the NEXT index
  
  // Fade out current content
  const currentContent = document.querySelector('.exercise-content');
  if (currentContent) {
    currentContent.style.opacity = '0';
    setTimeout(() => {
      displayExercise();
      // Fade in new content
      setTimeout(() => {
        const newContent = document.querySelector('.exercise-content');
        if (newContent) newContent.style.opacity = '1';
      }, 10);
    }, 300);
  } else {
    displayExercise();
    setTimeout(() => {
      const newContent = document.querySelector('.exercise-content');
      if (newContent) newContent.style.opacity = '1';
    }, 10);
  }
}

function displayExercise() {
  getCurrentExercise();
  
  let exerciseContent = '<div class="exercise-content">';
  
  // 1. Progress
  let keys = Object.keys(localCatalog);
  exerciseContent += `<div class="progress-indicator"> ${keys.length} التمرين ${currentExerciseIndex + 1} من</div>`;

  // 2. Image
  if (output.image) {
    exerciseContent += `<div class="exercise-image">
      <img src="${output.image}" alt="${output.exercise}">
    </div>`;
  }
  

  // 3. Name
  exerciseContent += `<div class="exercise-name">${output.exercise}</div>`;

  // 4. Stats (Big Bold Text)
  let multiplierStr = output.type === 'time' ? 'ثانية' : 'تكرار';
  exerciseContent += `<div class="exercise-stats">
    <span class="exercise-meta">${output.reps}</span>
    <span class="multiplier">${multiplierStr}</span>
  </div>`;


  // 5. Description
  if (output.description) {
    exerciseContent += `<div class="exercise-description">${output.description}</div>`;
  }
  
  exerciseContent += '</div>';
  
  // 6. Buttons - Clean Structure, Classes Only
  exerciseContent += `
    <div class="action-buttons">
      <button id="complete-btn" class="action-button complete-button">
        أنهيت
      </button>
    </div>
  `;
  
  displayBox.innerHTML = exerciseContent;
  addActionButtonListeners();
}

function addActionButtonListeners() {
  const completeBtn = document.getElementById('complete-btn');

  if (completeBtn) {
    // Clone and replace is a good way to remove old listeners
    const newBtn = completeBtn.cloneNode(true); 
    completeBtn.parentNode.replaceChild(newBtn, completeBtn);
    newBtn.addEventListener('click', function() {
      newBtn.innerHTML = '<div class="spinner"></div>';
      newBtn.disabled = true;
      completeCurrentExercise(); 
    });
  }
}

// Init
async function init() {
  // 1. Load state FIRST, before any other logic.
  await loadState(); 
  // 2. Validate catalog size and index
  validateCatalog(); 
  // 3. Display the exercise based on the loaded index
  displayExercise();
  // 4. Fade in content
  setTimeout(() => {
    const content = document.querySelector('.exercise-content');
    if (content) content.style.opacity = '1';
  }, 10);
  // 5. Build catalog for settings popup
  displayCatalog();
}

// Call init
init();

// Add 'loaded' class
window.onload = function(e) {
  document.body.className = 'loaded';
};