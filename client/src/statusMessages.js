export function getStatusMessage(calories, water) {
  let currentCase

  if (calories <= 1 && water <= 1) {
    currentCase = 1
  } else if (calories <= 1) {
    currentCase = 2
  } else if (water <= 1) {
    currentCase = 3
  } else if (calories <= 5 && water <= 5) {
    currentCase = 4
  } else if (calories <= 5) {
    currentCase = 5
  } else if (water <= 5) {
    currentCase = 6
  } else if (calories <= 7 || water <= 7) {
    currentCase = 7
  } else if (calories > 11 && water > 11) {
    currentCase = 8
  } else {
    currentCase = 9 // Both food and water are in comfortable ranges.
  }

  switch (currentCase) {
    case 1:
      return "Critical Alert: You're on the edge! Both food and water are at dangerous lows. Act now!"
    case 2:
      return 'Warning: Food supply is nearly depleted, and your water level is getting low. Consider restocking both.'
    case 3:
      return 'Warning: Your water reserve is almost nonexistent, but you have sufficient food.'
    case 4:
      return 'Alert: Both your food and water levels are less than 1/3. Consider restocking soon.'
    case 5:
      return 'Notice: Your food level is less than 1/3. Restock soon.'
    case 6:
      return 'Notice: Your water level is less than 1/3. Top up soon.'
    case 7:
      return "Heads Up: Either your food or water is around half way. It's a good time to restock."
    case 8:
      return 'Fantastic! Both your food and water reserves are in a comfortable state. Great planning!'
    default:
      return 'Good job! Both your food and water are above critical levels. Continue monitoring.'
  }
}
