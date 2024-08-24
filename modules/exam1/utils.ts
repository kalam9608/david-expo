import { parseTsvContent } from '@/app/lib/file-utils'
import { numberToChar } from '@/app/lib/string-utils'
import { testPhotosOptionsTsv } from '@/assets/test1/test-photos-options'
import { testPhotosQuestionsTsv } from '@/assets/test1/test-photos-questions'
import { GetExamsQuery } from '@/graphql/generated'

export const getTest1Data = async () => {
  const options = await parseTsvContent(testPhotosOptionsTsv)
  const questions = await parseTsvContent(testPhotosQuestionsTsv)

  // console.log('options', options)
  // console.log('questions', questions)
  return { options, questions }
}

export type Option = {
  id: string
  imgUrl: string | undefined
  text: string | undefined
}

/**
 * Example output:
 *   const options = [
    {
      id: 1,
      imgUrl: 'https://jpg',
      text: 'The quick, direct route',
    },
    {
      id: 2,
      imgUrl: 'https://jpg',
      text: 'The long way to happiness',
    },
  ]
 */
export const transformArrayToOptions = (arr: string[] | undefined): Option[] => {
  if (!arr) {
    console.log('no options')
    return []
  }

  const baseUrl = 'https://s3.eu-central-1.amazonaws.com/img/q/original/'
  const options: Option[] = []

  for (let i = 1; i < arr.length; i += 2) {
    const text = arr[i]
    const imgFile = arr[i + 1]

    if (imgFile) {
      const id = (i + 1) / 2

      const option: Option = {
        id: numberToChar(id),
        imgUrl: `${baseUrl}${imgFile}`,
        text: text,
      }
      options.push(option)
    }
  }

  if (options.length % 2 === 0) {
    return options
  }
  return [...options, { id: 999999, imgUrl: undefined, text: undefined }]
}

export type QuestionType = {
  maxOptionsCount?: number
  minOptionsCount?: number
  note: string
  optionsCount?: number
  title1: string
  title2: string
}

export const transformArrayToQuestion = (arr: string[] | undefined): QuestionType | null => {
  if (!arr) {
    console.log('no questions')
    return null
  }

  // optionsCount: can be a number, then the required count is strict. Can be <n, for example <3, then there can be up to 2 options. Can be >3, then there must be 4 or more options. Can be <4>2 or >2<4 that is equal to 3.
  const question = {
    maxOptionsCount: arr[5].includes('<') ? Number(arr[5][arr[5].indexOf('<') + 1]) : undefined,
    minOptionsCount: arr[5].includes('>') ? Number(arr[5][arr[5].indexOf('>') + 1]) : undefined,
    note: arr[4],
    optionsCount: !arr[5].includes('>') && !arr[5].includes('<') ? Number(arr[5]) : undefined,
    title1: arr[2],
    title2: arr[3],
  }

  return question
}

export const convertQueryDataToState = (
  response: GetExamsQuery['exams'],
): { id: number; selectedOptions: string }[] => {
  return response.map((r) => {
    return {
      id: Number(r.id),
      selectedOptions: r.selectedOptions,
    }
  })
}
