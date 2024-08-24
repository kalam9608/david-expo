export const numberToChar = (number: number): string | null => {
  // Ensure the number is between 1 and 26
  if (number >= 1 && number <= 26) {
    // Convert the number to its corresponding lowercase character
    return String.fromCharCode(number + 96) // 'a' is 97 in ASCII
  } else {
    return null // Return null for numbers outside the range
  }
}
