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
  settingsButton.addEventListener('click', function () {
    if (catalogBox.style.display === 'none') {
      catalogBox.style.display = 'block'; // CSS handles positioning
    } else {
      catalogBox.style.display = 'none';
    }
  });
}

const EXERCISES_PER_BREAK = 3; // Number of exercises shown per break

// Define a default set of exercises
let catalog = {
  // Cycle 1: Spine & Upper Body (Desk Detox)
  ex05: { name: 'Neck Circles & Tilts', reps: 5, type: 'reps', description: 'Why: Releases tension in the upper traps and cervical spine. Benefit: Reduces "tech-neck" stiffness and improves range of motion for better posture.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex61: { name: 'Arm Circles', reps: 10, type: 'reps', description: 'Why: Mobilizes the shoulder capsule and opens the chest. Benefit: Counters the slumped-forward posture from desk work and improves overhead mobility.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex43: { name: 'Camel Cat', reps: 10, type: 'reps', description: 'Why: Flexes and extends the entire spine. Benefit: Lubricates vertebral discs and releases tension in the lower and middle back.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 2: Hip Mobility (Openers)
  ex57: { name: 'Hip CARs', reps: 5, type: 'reps', description: 'Why: Controlled Articular Rotations move the hip joint through its full range. Benefit: Improves joint health and identifies "sticky" spots in hip mobility.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex23: { name: '90/90 Hip Rotations', reps: 60, type: 'time', description: 'Why: Targets internal and external rotation of the femur. Benefit: Critical for hip health in runners and cyclists to prevent compensations in the knees.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex20: { name: 'Hip Openers', reps: 8, type: 'reps', description: 'Why: Stretches the adductors and deep hip flexors. Benefit: Reverses the shortening effects of prolonged sitting and improves stride length.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 3: Glute Activation
  ex14: { name: 'Clamshells', reps: 20, type: 'reps', description: 'Why: Isolates the gluteus medius. Benefit: Essential for knee stability; prevents the "knee cave" (valgus) during running and cycling.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex39: { name: 'Single-Leg Glute Bridge', reps: 15, type: 'reps', description: 'Why: Teaches the glutes to extend the hip without using the lower back. Benefit: Improves running power and protects the lumbar spine from overworking.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex18: { name: 'Banded Monster Walks', reps: 12, type: 'reps', description: 'Why: Provides lateral resistance to the hip abductors. Benefit: Improves pelvic stability and single-leg balance during the running gait.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 4: Foot & Ankle Foundation
  ex30: { name: 'Big Toe Dissociation', reps: 60, type: 'time', description: 'Why: Teaches independent control of the big toe. Benefit: The big toe is the anchor of the arch; strengthening it prevents overpronation and plantar fasciitis.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex38: { name: 'Short Foot Exercise', reps: 60, type: 'time', description: 'Why: Contracts the intrinsic muscles of the foot arch. Benefit: Builds a "stiff" foot for better energy return and impact absorption.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex10: { name: 'Standing Calf Raises', reps: 30, type: 'time', description: 'Why: Strengthens the gastrocnemius and soleus. Benefit: Increases ankle power for "push-off" and protects the Achilles tendon.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 5: Core Stability (Anti-Rotation)
  ex04: { name: 'Dead Bug', reps: 10, type: 'reps', description: 'Why: Trains the core to remain stable while the limbs move. Benefit: Improves "pelvic tuck" and prevents lower back arching during high-fatigue running.', image: 'https://www.docteur-fitness.com/wp-content/uploads/2022/11/dead-bug-meilleur-exercice-abdos.jpg' },
  ex01: { name: 'Bird Dog', reps: 10, type: 'reps', description: 'Why: Strengthens the posterior chain and cross-body stability. Benefit: Improves coordination and lumbar stability for a balanced, efficient stride.', image: 'https://www.docteur-fitness.com/wp-content/uploads/2022/04/bird-dog.gif' },
  ex35: { name: 'RNT with Band', reps: 15, type: 'reps', description: 'Why: Reactive Neuromuscular Training forces the body to stabilize against a pull. Benefit: Automatically corrects movement patterns like knee instability.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 6: Lateral Stability
  ex56: { name: 'Side Plank', reps: 30, type: 'time', description: 'Why: Strengthens the obliques and quadratus lumborum. Benefit: Prevents "hip drop" during running, which causes IT band and knee issues.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex48: { name: 'Copenhagen Side Plank', reps: 30, type: 'time', description: 'Why: Specifically targets the hip adductors (inner thighs). Benefit: Critical for groin health and pelvic stability in multidirectional movements.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex33: { name: 'Sidelying Hip Abduction', reps: 10, type: 'reps', description: 'Why: Pure glute medius isolation. Benefit: The most direct way to strengthen the "hip levelers" that keep you stable on one leg.', image: 'https://iris.hattiesburgclinic.com/patadv/exkit/Tubing%20Exercises/Images/0210000209tl35m.png' },

  // Cycle 7: Linear Motion
  ex11: { name: 'Leg Swings', reps: 12, type: 'reps', description: 'Why: Dynamic stretch for the hamstrings and hip flexors. Benefit: Prepares the muscles for the full range of motion used in high-speed running.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex25: { name: 'Inchworms', reps: 5, type: 'reps', description: 'Why: Combines hamstring flexibility with shoulder and core stability. Benefit: Builds a "strong through length" posterior chain.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex15: { name: 'Walking Quad Pulls', reps: 8, type: 'reps', description: 'Why: Dynamic stretch for the quadriceps and psoas. Benefit: Opens the front of the body to allow for better hip extension in the running stride.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 8: Multi-Planar Motion
  ex51: { name: "World's Greatest Stretch", reps: 5, type: 'reps', description: 'Why: Hits the thoracic spine, hips, and hamstrings in one flow. Benefit: The "gold standard" for full-body mobility before any workout.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex54: { name: 'Walking Lunges with Rotation', reps: 8, type: 'reps', description: 'Why: Combines lower body strength with thoracic (mid-back) mobility. Benefit: Controls the rotation of the torso while the legs are under load.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex41: { name: 'Walking Hamstring Reaches', reps: 8, type: 'reps', description: 'Why: Dynamic posterior chain stretch. Benefit: Increases hamstring elasticity to prevent pulls and strains.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 9: Squat Pattern
  ex06: { name: 'Bulgarian Split Squat', reps: 10, type: 'reps', description: 'Why: Intense unilateral leg strength. Benefit: Bridges the gap between bilateral strength and the single-leg demands of running.', image: 'https://www.scienceforsport.com/wp-content/uploads/2023/12/Bulgarian_Split_Squat_1024x1024.webp' },
  ex24: { name: 'Kettlebell Squat', reps: 15, type: 'reps', description: 'Why: Fundamental bilateral lower body strength. Benefit: Builds overall force production in the quads and glutes.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex32: { name: 'Wall Sit', reps: 40, type: 'time', description: 'Why: Isometric endurance for the quadriceps. Benefit: Improves the muscle\'s ability to tolerate long-duration tension.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 10: Lunge Pattern
  ex36: { name: 'Lunges (Backward/Forward)', reps: 12, type: 'reps', description: 'Why: Trains deceleration and coordination. Benefit: Replicates the landing and push-off phases of the gait cycle.', image: 'https://www.kindpng.com/picc/m/141-1415177_kettlebell-lunges-avatar-hd-png-download.png' },
  ex07: { name: 'Lateral Lunges', reps: 10, type: 'reps', description: 'Why: Strengthens the legs in the frontal plane. Benefit: Prevents injuries by strengthening muscles often neglected in pure forward motion sports.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex22: { name: 'Step-Ups', reps: 15, type: 'reps', description: 'Why: Pure hip extension power against gravity. Benefit: Directly translates to climbing hills and stairs with power.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 11: Hinge Pattern (Posterior Chain)
  ex16: { name: 'Romanian Deadlift', reps: 12, type: 'reps', description: 'Why: Trains the "hip hinge" and strengthens the hamstrings. Benefit: Builds a powerful posterior chain that protects the knees.', image: 'https://burnfit.io/wp-content/uploads/2023/11/KB_SM_DL.gif' },
  ex45: { name: 'Single-Leg Deadlift', reps: 10, type: 'reps', description: 'Why: Combines the hinge pattern with extreme balance. Benefit: Critical for stabilizing the ankle and hip while generating power on one leg.', image: 'https://cdn.jefit.com/assets/img/exercises/gifs/482.gif' },
  ex26: { name: 'Hamstrings Curl', reps: 10, type: 'reps', description: 'Why: Isolated knee flexion strength. Benefit: Balances the quads to prevent muscular imbalances that lead to knee pain.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 12: Plyometrics (Power)
  ex19: { name: 'Single Leg Hops', reps: 10, type: 'reps', description: 'Why: Trains "stiffness" in the lower leg and ankle. Benefit: Improves running economy by making your feet more like springs.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex13: { name: 'Squat Jumps', reps: 10, type: 'reps', description: 'Why: Develops explosive power in the lower body. Benefit: Increases your "ceiling" for power production and fast-twitch fiber recruitment.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex17: { name: 'Jumping Lunges', reps: 10, type: 'reps', description: 'Why: Explosive power from a split-stance position. Benefit: Improves stability and power during high-speed directional changes.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 13: Upper Body (Runner's Carriage)
  ex08: { name: 'Push-ups', reps: 15, type: 'reps', description: 'Why: Overall upper body and core stability. Benefit: A strong upper body maintains form and prevents fatigue-related slouching in long runs.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex42: { name: 'One Arm Rows', reps: 12, type: 'reps', description: 'Why: Strengthens the mid-back and rhomboids. Benefit: Reverses desk-job posture and improves the "arm drive" during running.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex46: { name: 'Dips', reps: 12, type: 'reps', description: 'Why: Strengthens the triceps and stabilizes the shoulder. Benefit: Complements the pulling muscles to ensure balanced upper body tension.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 14: Single Leg Control
  ex12: { name: 'Hip Airplanes', reps: 6, type: 'reps', description: 'Why: Trains rotational control of the hip on a stable leg. Benefit: The ultimate "prehab" for hip stability and pelvic alignment.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex58: { name: 'Lateral Step-Downs', reps: 12, type: 'reps', description: 'Why: Eccentric control of the knee and hip. Benefit: Specifically prevents "runner\'s knee" by training the glutes to control the knee\'s path.', image: 'https://s3.amazonaws.com/prod.skimble/assets/1310820/image_iphone.jpg' },
  ex03: { name: 'Single-leg Balance', reps: 30, type: 'time', description: 'Why: Proprioceptive training for the foot and ankle. Benefit: Reduces the risk of ankle sprains by improving the body\'s awareness of joint position.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 15: Foam Rolling (Tissue Quality)
  ex09: { name: 'Foam Rolling Quad', reps: 60, type: 'time', description: 'Why: Myofascial release for the front of the thigh. Benefit: Reduces muscle tightness and improves blood flow to recovery areas.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex59: { name: 'Foam Rolling Hamstrings', reps: 60, type: 'time', description: 'Why: Myofascial release for the back of the thigh. Benefit: Relieves pressure on the lower back caused by tight hamstrings.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex21: { name: 'Foam Rolling Calf', reps: 60, type: 'time', description: 'Why: Myofascial release for the lower leg. Benefit: Prevents calf cramps and reduces tension on the Achilles tendon.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 16: Deep Stretching (Static Anti-Sit)
  ex37: { name: 'Psoas Stretch', reps: 6, type: 'reps', description: 'Why: Targets the deep hip flexor that pulls the spine forward. Benefit: The single most important stretch for reversing the "sitting" posture.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex28: { name: 'Figure 4 Stretch', reps: 30, type: 'time', description: 'Why: Releases the piriformis and external rotators of the hip. Benefit: Relieves pressure on the sciatic nerve and improves hip comfort.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex27: { name: 'Torso Rotations', reps: 10, type: 'reps', description: 'Why: Restores rotation to the lumbar and thoracic spine. Benefit: "Defrags" the spine after a long day of static sitting.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },

  // Cycle 17: Feet & Calves Recovery
  ex47: { name: 'Banded Ankle Mobilisation', reps: 60, type: 'time', description: 'Why: Uses a band to pull the talus bone back. Benefit: Directly improves "ankle dorsiflexion" (the ability to pull the toes up), which is crucial for a healthy stride.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex60: { name: 'Heel-toe Walks', reps: 15, type: 'reps', description: 'Why: Trains the coordination of the lower leg muscles. Benefit: Strengthens the tibialis anterior and calves for improved foot landing.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' },
  ex31: { name: 'Ankle Circles', reps: 10, type: 'reps', description: 'Why: Improves synovial fluid flow in the ankle joint. Benefit: Reduces morning stiffness and improves joint health.', image: 'https://cdn-icons-png.flaticon.com/512/680/680598.png' }
};

// This is the working catalog that will be used
let localCatalog = { ...catalog };

let currentExerciseIndex = 0; // Tracks the current exercise group index
let exerciseCompleted = {};

// Robust storage helper with multiple fallbacks for better persistence
const AppStorage = {
  dbName: 'TimeoutMuscleDB',
  storeName: 'state',
  key: 'muscleState',

  save: async function (data) {
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

  load: async function () {
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

    return null;
  },

  // Helper methods for IndexedDB
  saveIndexedDB: function (data) {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.put(data, this.key);
        transaction.oncomplete = () => {
          updateDebugDisplay('Save: IDB');
          resolve(true);
        };
        transaction.onerror = () => resolve(false);
      };
      request.onerror = () => resolve(false);
    });
  },

  loadIndexedDB: function () {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const getRequest = store.get(this.key);
        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    });
  },

  // Cookie fallback
  saveCookie: function (data) {
    const expired = new Date();
    expired.setFullYear(expired.getFullYear() + 1);
    document.cookie = `${this.key}=${encodeURIComponent(JSON.stringify(data))}; expires=${expired.toUTCString()}; path=/`;
  },

  loadCookie: function () {
    const name = this.key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') { c = c.substring(1); }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return null;
  },

  // URL Hash fallback
  saveHash: function (data) {
    window.location.hash = encodeURIComponent(JSON.stringify(data));
  },
  loadHash: function () {
    if (!window.location.hash) return null;
    try {
      return JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
    } catch (e) {
      return null;
    }
  }
};

function updateDebugDisplay(msg) {
  let debug = document.querySelector('.debug-save');
  if (!debug) {
    debug = document.createElement('div');
    debug.className = 'debug-save';
    debug.style.cssText = 'position:fixed; bottom:5px; right:5px; font-size:8px; opacity:0.3; pointer-events:none;';
    document.body.appendChild(debug);
  }
  debug.textContent = msg;
}

async function saveState() {
  const state = {
    catalog: localCatalog,
    index: currentExerciseIndex,
    completed: exerciseCompleted
  };
  await AppStorage.save(state);
}

async function loadState() {
  const savedState = await AppStorage.load();
  if (savedState) {
    localCatalog = savedState.catalog || localCatalog;
    currentExerciseIndex = savedState.index || 0;
    exerciseCompleted = savedState.completed || {};

    // Check if the current catalog matches the default catalog structure
    // If we've added new default exercises, we should merge them in
    let hasChanges = false;
    for (const key in catalog) {
      if (!localCatalog[key]) {
        localCatalog[key] = { ...catalog[key] };
        hasChanges = true;
      }
    }

    if (hasChanges) {
      saveState();
    }
  }
}

function getCatalogKeys() {
  return Object.keys(localCatalog).filter(key => typeof localCatalog[key] !== 'function');
}

function getTotalGroups() {
  const keys = getCatalogKeys();
  return Math.ceil(keys.length / EXERCISES_PER_BREAK);
}

function validateCatalog() {
  const keys = getCatalogKeys();
  if (keys.length === 0) {
    localCatalog = { ...catalog };
    currentExerciseIndex = 0;
    saveState();
  }
}

function validateCurrentExercise() {
  const totalGroups = getTotalGroups();
  if (currentExerciseIndex >= totalGroups) {
    currentExerciseIndex = 0;
    saveState();
  }
}

if (resetButton) {
  resetButton.addEventListener('click', function () {
    localCatalog = { ...catalog };
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
    closeButton.addEventListener('click', function () {
      catalogBox.style.display = 'none';
    });
    catalogBox.appendChild(closeButton);
  }

  const keys = getCatalogKeys();
  keys.forEach(item => {
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

    // Dynamic update logic
    [nameBox, repsBox, typeBox, descBox].forEach(box => {
      box.addEventListener('blur', function () {
        const field = this.getAttribute('data-item');
        localCatalog[item][field] = this.textContent;
        saveState();
        displayExercise(); // Update main display too
      });
    });
  });

  // Update button logic (prevent duplication)
  if (!catalogBox.querySelector('.add-button')) {
    let addButton = document.createElement('button');
    addButton.innerHTML = '+ ADD NEW';
    addButton.className = 'action-button complete-button add-button'; // Reuse classes
    addButton.style.marginTop = '20px'; // Minor adjustment

    addButton.addEventListener('click', function () {
      let keys = getCatalogKeys();
      let highestNum = 0;
      keys.forEach(key => {
        let num = parseInt(key.replace('ex', ''));
        if (!isNaN(num) && num > highestNum) highestNum = num;
      });
      let newId = 'ex' + (highestNum + 1).toString().padStart(2, '0');
      localCatalog[newId] = { name: 'New Exercise', reps: 10, type: 'reps', description: 'Desc', image: '' };
      saveState();
      displayCatalog();
    });
    catalogBox.appendChild(addButton);
  }
}

function getCurrentExerciseGroup() {
  validateCatalog();
  validateCurrentExercise();

  const keys = getCatalogKeys();
  const startIndex = currentExerciseIndex * EXERCISES_PER_BREAK;
  const group = [];

  for (let i = 0; i < EXERCISES_PER_BREAK; i++) {
    const key = keys[startIndex + i];
    if (!key) break;

    const exercise = localCatalog[key] || {};
    group.push({
      id: key,
      name: exercise.name,
      reps: exercise.reps,
      type: exercise.type || 'reps',
      description: exercise.description || '',
      image: exercise.image || ''
    });
  }

  updateDebugDisplay('Displaying Group');
  return group;
}

function completeCurrentExercise() {
  const keys = getCatalogKeys();
  if (keys.length === 0) {
    return;
  }

  const startIndex = currentExerciseIndex * EXERCISES_PER_BREAK;
  for (let i = 0; i < EXERCISES_PER_BREAK; i++) {
    const key = keys[startIndex + i];
    if (!key) break;
    exerciseCompleted[key] = true;
  }

  currentExerciseIndex++;
  const totalGroups = getTotalGroups();
  if (currentExerciseIndex >= totalGroups) {
    currentExerciseIndex = 0;
  }

  saveState(); // Saves the NEXT group index

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
  const currentGroup = getCurrentExerciseGroup();
  const totalGroups = getTotalGroups();
  const allKeys = getCatalogKeys();

  let exerciseContent = '<div class="exercise-content">';
  exerciseContent += `<div class="progress-indicator">مجموعة ${currentExerciseIndex + 1} من ${totalGroups}</div>`;

  if (currentGroup.length === 0) {
    exerciseContent += '<div class="exercise-empty">No exercises configured. Add some in settings.</div>';
  } else {
    exerciseContent += '<div class="exercise-list">';

    currentGroup.forEach((exercise, index) => {
      const sequenceNumber = currentExerciseIndex * EXERCISES_PER_BREAK + index + 1;
      const multiplierStr = exercise.type === 'time' ? 'ثانية' : 'تكرار';
      const repsDisplay = (exercise.reps === undefined || exercise.reps === null) ? '' : exercise.reps;

      exerciseContent += '<div class="exercise-item">';
      exerciseContent += `<div class="exercise-sequence">${sequenceNumber} / ${allKeys.length}</div>`;

      if (exercise.image) {
        exerciseContent += `<div class="exercise-image">
          <img src="${exercise.image}" alt="${exercise.name}">
        </div>`;
      }

      exerciseContent += `<div class="exercise-name">${exercise.name}</div>`;

      if (exercise.reps || exercise.type) {
        exerciseContent += `<div class="exercise-stats">
          <span class="exercise-meta">${repsDisplay}</span>
          <span class="multiplier">${multiplierStr}</span>
        </div>`;
      }

      if (exercise.description) {
        exerciseContent += `<div class="exercise-description">${exercise.description}</div>`;
      }

      exerciseContent += '</div>'; // .exercise-item
    });

    exerciseContent += '</div>'; // .exercise-list
  }

  exerciseContent += '</div>'; // .exercise-content

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
    newBtn.addEventListener('click', function () {
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
window.onload = function (e) {
  document.body.className = 'loaded';
};
