import Papa, { ParseError, ParseResult } from 'papaparse'

export const parseTsvContent = async (fileContent: string): Promise<string[][] | undefined> => {
  try {
    // Parse the TSV content
    return new Promise((resolve, reject) => {
      Papa.parse<string[]>(fileContent, {
        // Use tab delimiter for TSV
        complete: (result: ParseResult<string[]>) => {
          resolve(result.data) // Resolve the promise with the parsed data
        },
        delimiter: '\t',
        error: (error: ParseError) => {
          reject(error) // Reject the promise if there’s an error
        },
      })
    })
  } catch (error) {
    console.error('Error reading the file', error)
    return undefined
  }
}
