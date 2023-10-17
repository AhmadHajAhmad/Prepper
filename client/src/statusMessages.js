export function getStatusMessage(calories, water) {
  let calorieCase
  let foodMessage
  let waterCase
  let waterMessage

  if (calories <= 1) {
    calorieCase = 1
  } else if (calories <= 5) {
    calorieCase = 2
  } else if (calories <= 11) {
    calorieCase = 3
  }

  if (water <= 1) {
    waterCase = 1
  } else if (water <= 5) {
    waterCase = 2
  } else if (water <= 11) {
    waterCase = 3
  }

  switch (calorieCase) {
    case 1:
      foodMessage = "Critical Alert: You're on the edge! Food is dangerously low."
      break
    case 2:
      foodMessage = 'Warning: Food supply is nearly depleted. You should go to Willys and pick some food up.'
      break
    case 3:
      foodMessage = 'You are on the way to a great stockpile, but just in case you should add some more food.'
      break
    default:
      foodMessage = 'Wow you have so much food, you can call yourself a real prepper now!'
      break
  }

  switch (waterCase) {
    case 1:
      waterMessage = 'Critical Alert: OH NO NO NO! Water is dangerously low.'
      break
    case 2:
      waterMessage = 'Warning: Humans are almost all water. You should REALLY get some more.'
      break
    case 3:
      waterMessage = 'You are on the right path, but just in case you should add some more water as well.'
      break
    default:
      waterMessage = 'Holy moly, Bear Grylls would be envious of all that juicy water!'
      break
  }

  return foodMessage + ' ' + waterMessage
}
