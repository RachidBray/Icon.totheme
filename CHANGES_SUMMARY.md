# Changes Summary

## Exercise Catalog Reorganization

- **Previous State**: 61 individual exercises (ex01 through ex61), displayed one per break.
- **Current State**: 36 exercises organized into 12 cycles/groups, with 3 exercises displayed per break.

### Key Changes:
- Exercises grouped by muscle groups and training focus (e.g., Foot & Ankle Foundation, Hip Stability, etc.)
- Added detailed descriptions for each exercise explaining their purpose.
- Changed display to show multiple exercises simultaneously instead of one at a time.
- Reduced total number of exercise breaks from 61 to 12 groups.

### Code Changes:
- Modified `EXERCISES_PER_BREAK` from 1 to 3.
- Reorganized the `catalog` object with new exercise selection and descriptions.
- Updated display logic to show exercise groups instead of single exercises.
- Enhanced CSS for group display layout.

### Impact:
- Users now complete 3 related exercises per break instead of 1.
- Faster progression through the routine (12 breaks vs 61).
- Better thematic grouping of exercises for training focus.


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