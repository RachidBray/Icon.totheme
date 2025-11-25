// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
    catalogBox = document.querySelector('.catalog-box'),
    resetButton = document.querySelector('.reset');

// Hide catalog box by default (will show as popup)
catalogBox.style.display = 'none';

// Add a settings button to trigger the popup
let settingsButton = document.createElement('button');
settingsButton.innerHTML = '⚙️';
settingsButton.className = 'settings-button';
settingsButton.title = 'Customize Exercises';
document.querySelector('.cell').appendChild(settingsButton);

// Add event listener to show/hide the catalog box
settingsButton.addEventListener('click', function() {
    if (catalogBox.style.display === 'none') {
        catalogBox.style.display = 'flex';
        catalogBox.style.position = 'absolute';
        catalogBox.style.top = '50%';
        catalogBox.style.left = '50%';
        catalogBox.style.transform = 'translate(-50%, -50%)';
        catalogBox.style.zIndex = '100';
        catalogBox.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        catalogBox.style.padding = '20px';
        catalogBox.style.borderRadius = '10px';
    } else {
        catalogBox.style.display = 'none';
    }
});

// Define a default set of exercises
let catalog = {
  ex01: { name: 'Standing Glute Squeeze', reps: 10, type: 'reps', description: 'Stand tall, feet hip-width apart., Squeeze your glutes hard for 3 seconds, then relax.' },
  ex02: { name: 'Leg Swings', reps: 10, type: 'reps', description: '10 forward/back & 10 side-to-side per leg' },
  ex03: { name: 'Standing Back Extensions', reps: 10, type: 'reps', description: 'lace your hands on your lower back. Gently arch backward.' },
  ex04: { name: 'Hip CARs', reps: 3, type: 'reps', description: 'Slowly move your knee in a circle: up, out, around, and back – Each side' },
  ex05: { name: 'Walking Lunge', reps: 30, type: 'time', description: 'Jump while raising arms and separating legs to sides' },
  ex06: { name: 'Plank', reps: 30, type: 'time', description: 'Hold a push-up position with your body in a straight line' },
  ex07: { name: 'Wall Sit', reps: 45, type: 'time', description: 'Lean against wall with back flat, knees at 90 degrees' },
  ex08: { name: 'Standing Hip Flexor Stretch', reps: 30, type: 'time', description: 'Step one leg back into a gentle lunge – Each side' },
  ex09: { name: 'Cat Camel', reps: 7, type: 'reps', description: 'Move through 7–8 slow cycles of arching and rounding the back on all fours.' },
  ex10: { name: 'Psoas Stretch', reps: 6, type: 'reps', description: 'Perform 6 strides while engaging the hip flexors – focus on elongating the rear leg.' },
  ex11: { name: 'Hip Airplanes', reps: 3, type: 'reps', description: 'Balance on one leg, open and close the hip like airplane wings – 3 sets of 3 reps each side.' },
  ex12: { name: 'Spine Hygiene Stretch', reps: 20, type: 'time', description: 'Perform after prolonged sitting: gentle forward folds or thoracic extension stretches.' },
    ex13: { name: 'Calf Neural Mobilisation', reps: 60, type: 'time', description: 'Sit on the floor with one leg extended or use band.' },
    ex14: { name: 'Richard Simmons', reps: 60, type: 'time', description: 'Mark Green' },
};

// This is the working catalog that will be used
let localCatalog = {...catalog};

// Initialize the current exercise index and use a randomized approach
let currentExerciseIndex = -1; // Start with -1 so first call picks index 0
let exerciseIndices = []; // Will store shuffled indices
let isFirstLoad = true; // Track the very first load

// Generate a random but complete sequence of exercises
function shuffleExercises() {
  // Get all exercise keys
  const keys = Object.keys(localCatalog).sort();
  
  // Create an array of indices and shuffle them
  exerciseIndices = [];
  for (let i = 0; i < keys.length; i++) {
    exerciseIndices.push(i);
  }
  
  // Fisher-Yates shuffle
  for (let i = exerciseIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [exerciseIndices[i], exerciseIndices[j]] = [exerciseIndices[j], exerciseIndices[i]];
  }
  
  // Reset index to start of new sequence
  currentExerciseIndex = 0;
}

// This is what will be read for the final output to display
let output = {
  exercise: 0,
  reps: 0,
  type: 'reps',
  description: ''
};

// Click the 💪 to reset to defaults
resetButton.addEventListener('click', resetRefresh);

function resetRefresh() {
  // Reset to default catalog
  localCatalog = {...catalog};
  
  // Generate new shuffle
  shuffleExercises();
  
  // Display the results
  displayExercise();
  displayCatalog();
}

// Save changes upon each 'input' event in the catalog
catalogBox.addEventListener('keyup', function (event) {
  // Don't allow 'return' key to create new-lines
  if (event.keyCode === 13) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Grab the data-item names for elements being currently edited
  let focusedParentName = event.target.parentElement.getAttribute('data-item');
  let focusedChildName = event.target.getAttribute('data-item');

  // Update relevant datum within the catalog with user input/changes
  localCatalog[focusedParentName][focusedChildName] = event.target.textContent;
}, false);

// Create HTML elements for each exercise + reps based on data
function displayCatalog() {
  // Get current list of <dl> exercises
  let catalogChildren = document.querySelectorAll('dl');
  // Remove existing children to start fresh
  if (catalogChildren) {
    catalogChildren.forEach(function(child) {
      catalogBox.removeChild(child);
    });
  }

  // Add close button to the catalog box
  let closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.className = 'close-button';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'transparent';
  closeButton.style.fontSize = '1.2em';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', function() {
    catalogBox.style.display = 'none';
  });
  catalogBox.appendChild(closeButton);

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
      descBox.textContent = localCatalog[item].description || 'Add description here';
      
      // Style the boxes
      nameBox.style.width = '70%';
      repsBox.style.width = '15%';
      typeBox.style.width = '15%';
      descBox.style.width = '100%';
      descBox.style.background = 'rgba(150, 150, 150, 0.5)';
      descBox.style.fontSize = '0.8em';
      descBox.style.padding = '5px';
      descBox.style.boxSizing = 'border-box';
      
      // Style the type box to distinguish it
      typeBox.style.background = 'rgba(30, 170, 241, 0.7)';

      exerciseSet.appendChild(nameBox);
      exerciseSet.appendChild(repsBox);
      exerciseSet.appendChild(typeBox);
      exerciseSet.appendChild(descBox);

      catalogBox.appendChild(exerciseSet);
    }
  }
  
  // Add a new exercise button
  let addButton = document.createElement('button');
  addButton.innerHTML = '+ Add Exercise';
  addButton.className = 'add-button';
  addButton.style.width = '100%';
  addButton.style.padding = '10px';
  addButton.style.margin = '10px 0';
  addButton.style.backgroundColor = 'var(--current-exercise)';
  addButton.style.border = 'none';
  addButton.style.borderRadius = '5px';
  addButton.style.cursor = 'pointer';
  
  addButton.addEventListener('click', function() {
    // Find the highest ex number
    let keys = Object.keys(localCatalog);
    let highestNum = 0;
    
    keys.forEach(key => {
      let num = parseInt(key.replace('ex', ''));
      if (num > highestNum) highestNum = num;
    });
    
    // Create a new exercise ID
    let newId = 'ex' + (highestNum + 1).toString().padStart(2, '0');
    
    // Add new exercise to local catalog
    localCatalog[newId] = { name: 'New Exercise', reps: 10, type: 'reps', description: 'Add description here' };
    
    // Generate new shuffle when adding exercises
    shuffleExercises();
    
    // Refresh the display
    displayCatalog();
  });
  
  catalogBox.appendChild(addButton);
  
  // Add a reshuffle exercises button
  let reshuffleButton = document.createElement('button');
  reshuffleButton.innerHTML = '🔄 Shuffle Exercises';
  reshuffleButton.className = 'reshuffle-button';
  reshuffleButton.style.width = '100%';
  reshuffleButton.style.padding = '10px';
  reshuffleButton.style.margin = '10px 0';
  reshuffleButton.style.backgroundColor = '#888';
  reshuffleButton.style.color = 'white';
  reshuffleButton.style.border = 'none';
  reshuffleButton.style.borderRadius = '5px';
  reshuffleButton.style.cursor = 'pointer';
  
  reshuffleButton.addEventListener('click', function() {
    // Generate new random sequence
    shuffleExercises();
    
    // Display first exercise in new sequence
    displayExercise();
    
    alert('Exercises have been shuffled into a new random sequence.');
  });
  
  catalogBox.appendChild(reshuffleButton);
}

// Picks the next exercise in the shuffled sequence
function pickNextExercise() {
  // Generate the initial shuffle if this is first time
  if (isFirstLoad) {
    shuffleExercises();
    isFirstLoad = false;
  }
  
  // Get all exercise keys in sorted order
  const keys = Object.keys(localCatalog).sort();
  
  // When we've shown all exercises, reshuffle the deck
  if (currentExerciseIndex >= exerciseIndices.length) {
    shuffleExercises();
  }
  
  // Get the current shuffled index
  const shuffledIndex = exerciseIndices[currentExerciseIndex];
  
  // Get the exercise key at this index
  const prop = keys[shuffledIndex];
  
  // Increment index for next time
  currentExerciseIndex++;
  
  // Output the exercise details
  output.exercise = localCatalog[prop].name;
  output.reps = localCatalog[prop].reps;
  output.type = localCatalog[prop].type || 'reps';
  output.description = localCatalog[prop].description || '';
}

// Displays the 'output' values in the large, center HTML .displayBox
function displayExercise() {
  pickNextExercise();
  
  // Display differently based on exercise type
  let exerciseContent = '';
  if (output.type === 'time') {
    exerciseContent = `${output.reps} <span class="multiplier">sec</span> ${output.exercise}`;
  } else {
    exerciseContent = `${output.reps} <span class="multiplier">×</span> ${output.exercise}`;
  }

  // Add progress indicator showing current position in rotation
  // Fixed: Show the correct exercise number (currentExerciseIndex) out of total exercises
  let keys = Object.keys(localCatalog);
  let progressText = `<div class="progress-indicator">${currentExerciseIndex} / ${keys.length}</div>`;
  exerciseContent += progressText;
    
  // Add description below exercise name
  if (output.description) {
    exerciseContent += `<div class="exercise-description">${output.description}</div>`;
  }
  
  displayBox.innerHTML = exerciseContent;
}

// Initialize the app
displayExercise();
displayCatalog(); // Create the catalog but keep it hidden initially

// Log info to console for debugging
console.log('FlexBreak loaded with', Object.keys(localCatalog).length, 'exercises');
console.log('Current exercise index:', currentExerciseIndex);

// Add the 'loaded' class upon successful document load
window.onload = function(e) {
  document.querySelector('body').className = 'loaded';
};