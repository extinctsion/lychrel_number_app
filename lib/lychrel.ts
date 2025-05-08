/**
 * Checks if a number is a palindrome
 */
export function isPalindrome(num: number): boolean {
  const str = num.toString()
  return str === str.split("").reverse().join("")
}

/**
 * Reverses the digits of a number
 */
export function reverseNumber(num: number): number {
  return Number.parseInt(num.toString().split("").reverse().join(""))
}

/**
 * Checks if a number is a Lychrel number within a given number of iterations
 * Returns the number of iterations if it becomes a palindrome, or -1 if it's a suspected Lychrel number
 */
export function isLychrel(num: number, maxIterations = 100): number {
  let current = num
  let iterations = 0

  while (iterations < maxIterations) {
    const reversed = reverseNumber(current)
    current += reversed
    iterations++

    if (isPalindrome(current)) {
      return iterations
    }
  }

  // If we reach here, it's a suspected Lychrel number
  return -1
}

/**
 * Checks numbers from 1 to n to determine which are Lychrel numbers
 */
export async function checkLychrelNumbers(n: number, maxIterations = 100) {
  const lychrelNumbers: number[] = []
  const nonLychrelNumbers: number[] = []
  const iterationsData: { number: number; iterations: number }[] = []

  for (let i = 1; i <= n; i++) {
    const iterations = isLychrel(i, maxIterations)

    iterationsData.push({ number: i, iterations })

    if (iterations === -1) {
      lychrelNumbers.push(i)
    } else {
      nonLychrelNumbers.push(i)
    }
  }

  return {
    lychrelNumbers,
    nonLychrelNumbers,
    iterationsData,
  }
}
