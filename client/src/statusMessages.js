export function getFoodStatusMessage(calories) {
  if (calories <= 3) return 'Urgent: Food supply is critically low!'
  if (calories <= 6) return 'Caution: Only a few days of food remaining.'
  return 'Good: Food supply is in a comfortable range.'
}

export function getWaterStatusMessage(water) {
  if (water <= 3) return 'Urgent: Water supply is critically low!'
  if (water <= 6) return 'Caution: Only a few days of water remaining.'
  return 'Good: Water supply is in a comfortable range.'
}
