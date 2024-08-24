import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'

import { BackButton } from '@/components/BackButton'
import { ContinueButton } from '@/components/buttons/ContinueButton'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { ProgressBar } from '@/components/ProgressBar'
import { useGetExamsQuery, useSaveExamsMutation } from '@/graphql/generated'
import {
  convertQueryDataToState,
  getTest1Data,
  Option,
  QuestionType,
  transformArrayToOptions,
  transformArrayToQuestion,
} from '@/modules/exam1/utils'

const getIsEnabled = (question: QuestionType | null, selectedChoices: string[] | null, isHalfway: boolean) => {
  if (isHalfway) {
    return true
  }

  if (!question || !selectedChoices) {
    return false
  }

  const l = selectedChoices.length

  if (question.optionsCount === l) {
    return true
  }
  if (question.maxOptionsCount && question.minOptionsCount) {
    if (l < question.maxOptionsCount && question.minOptionsCount > l) {
      return true
    }
  }

  if (question.maxOptionsCount) {
    if (l < question.maxOptionsCount) {
      return true
    }
  }

  if (question.minOptionsCount) {
    if (question.minOptionsCount > l) {
      return true
    }
  }
}

export const Test1: React.FC = () => {
  const router = useRouter()

  const [selectedChoices, setSelectedChoices] = useState<string[] | null>(null)
  const [options, setOptions] = useState<Option[] | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [questionId, setQuestionId] = useState<number | undefined>(101)
  const [isHalfway, setIsHalfway] = useState<boolean>(false)
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | undefined>(undefined)
  const [dataToSave, setDataToSave] = useState<{ id: number; selectedOptions: string }[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getTest1Data()
      if (!data?.questions) {
        return
      }

      if (data?.options && questionId) {
        setNumberOfQuestions(data.questions ? parseInt(data.questions[data.questions.length - 1][1]) : undefined)

        setOptions(transformArrayToOptions(data.options.find((row) => row[0] === String(questionId))))
        setQuestion(transformArrayToQuestion(data.questions.find((row) => row[1] === String(questionId))))
      }
    }

    load()
  }, [questionId])

  const handleChoice = (choice: string) => {
    if (question?.optionsCount === 1) {
      if (choice === selectedChoices?.[0]) {
        setSelectedChoices(null)
        return
      } else {
        setSelectedChoices([choice])
        return
      }
    }

    if (selectedChoices && selectedChoices.includes(choice)) {
      setSelectedChoices((prev) => prev?.filter((x) => x != choice) || null)
      return
    } else {
      setSelectedChoices((prev) => (prev === null ? [choice] : [...prev, choice]))
      return
    }
  }

  const handleContinue = () => {
    if (!selectedChoices || selectedChoices.length === 0) {
      console.error('Error with selectedChoices', selectedChoices)
      return
    }

    if (!questionId) {
      console.error('Error with questionId', questionId)
      return
    }

    const newItemToSave = { id: questionId, selectedOptions: selectedChoices.join('') }

    const dts = [...dataToSave.filter((existingDat) => existingDat.id !== questionId), newItemToSave]
    handleSaveExams(dts)
    setDataToSave((prev) => [...prev.filter((existingDat) => existingDat.id !== questionId), newItemToSave])
    setSelectedChoices(null)

    if (!isHalfway && questionId === 10) {
      setIsHalfway(true)
      return
    }
    if (isHalfway) {
      setIsHalfway(false)
    }

    if (numberOfQuestions === (questionId || 0)) {
      router.push('/')
      return
    }

    // select next question if it's saved
    const nextQuestionOptions = dataToSave.find(({ id }) => id === questionId + 1)?.selectedOptions
    if (nextQuestionOptions) {
      setSelectedChoices(nextQuestionOptions.split(''))
    }

    setQuestionId((p) => (p ? p + 1 : p))
  }

  // console.log('dataToSave', dataToSave)
  // console.log('selectedChoices', selectedChoices)

  const { data, loading: isLoading } = useGetExamsQuery({
    onCompleted: (response) => {
      console.log('response', response.exams)

      const dts = convertQueryDataToState(response.exams)
      setDataToSave(dts)
      const thisQuestionOptions = dts.find(({ id }) => id === questionId)?.selectedOptions
      if (thisQuestionOptions) {
        setSelectedChoices(thisQuestionOptions.split(''))
      }
    },
    onError: (err) => {
      console.log('Graphql get err', err)
    },
    variables: {},
  })

  const [saveExamsMutation, { data: saveData, loading: saveLoading, error: saveError }] = useSaveExamsMutation()

  const handleSaveExams = async (
    dts: {
      id: number
      selectedOptions: string
    }[],
  ) => {
    try {
      const response = await saveExamsMutation({
        variables: {
          examAnswers: dts, // Replace `dataToSave` with your actual data
        },
      })
      // Handle the response as needed
      console.log('Exams saved:', response.data)
    } catch (err) {
      // Handle errors as needed
      console.error('Error saving exams:', err)
    }
  }

  if (!question) {
    return null
  }
  const isDisabled = !getIsEnabled(question, selectedChoices, isHalfway)

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        {isLoading && <LoadingOverlay isLoading={isLoading} />}

        {questionId && numberOfQuestions ? (
          <>
            <View style={styles.progressButtons}>
              <View>
                <BackButton
                  isDark
                  backCallback={
                    questionId === 101
                      ? undefined
                      : () => {
                          // select prev question if it's saved
                          const prevQuestionOptions = dataToSave.find(
                            ({ id }) => id === questionId - 1,
                          )?.selectedOptions
                          if (prevQuestionOptions) {
                            setSelectedChoices(prevQuestionOptions.split(''))
                          }
                          setQuestionId((p) => (!p ? p : p - 1))
                        }
                  }
                  buttonStyles={styles.backButtonStyles}
                />
              </View>
              <Text style={styles.progressText}>
                {questionId - 100}/{numberOfQuestions - 100}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <ProgressBar progressCurrent={questionId} progressMax={numberOfQuestions} />
            </View>
          </>
        ) : null}

        {isHalfway ? (
          <View style={styles.halfway}>
            <Text style={styles.halfwayTitle}>Halfway there!</Text>
            <View style={styles.halfwayFlexibleSpace} />
            <Text style={styles.halfwayText}>Great job! Keep up the fantastic work – you&lsquo;re doing amazing!</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>{question.title1}</Text>
            {question.title2 ? <Text style={styles.title}>{question.title2}</Text> : null}

            {question.note ? (
              <View>
                <Text style={styles.note}>{question.note}</Text>
              </View>
            ) : null}

            <View key={questionId} style={styles.optionsContainer}>
              {options?.map((option) => (
                <TouchableOpacity
                  key={(questionId || 0) + option.id}
                  style={[styles.option, !option.imgUrl && styles.hidden]}
                  onPress={() => handleChoice(option.id)}
                >
                  <View
                    style={[
                      styles.imageContainer,
                      selectedChoices?.includes(option.id) && styles.selectedImageContainer,
                    ]}
                  >
                    <Image
                      resizeMode="cover"
                      source={{ uri: option.imgUrl + '.jpg' }}
                      style={[styles.image, selectedChoices?.includes(option.id) && styles.selectedImage]}
                    />
                  </View>
                  {option.text ? <Text style={styles.optionText}>{option.text}</Text> : null}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      <View style={styles.flexibleSpace} />

      <View style={styles.continueButtonWrapper}>
        <ContinueButton
          disabled={isDisabled}
          textStyle={styles.continueButtonText}
          title="CONTINUE"
          onPress={handleContinue}
        />
      </View>
    </ScrollView>
  )
}

// const calculateAspectRatio = async (imageUrl: string): Promise<number> => {
//   return new Promise((resolve, reject) => {
//     Image.getSize(
//       imageUrl,
//       (width, height) => {
//         const aspectRatio = width / height
//         resolve(aspectRatio)
//       },
//       (error) => {
//         reject(error)
//       },
//     )
//   })
// }

const styles = StyleSheet.create({
  backButtonStyles: { left: 'auto', padding: 2, position: 'relative', top: 'auto' },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  continueButtonWrapper: {
    alignSelf: 'center',
    marginBottom: 60,
    marginTop: 0,
    width: '88%',
  },
  flexibleSpace: {
    flexGrow: 2,
  },
  halfway: {},
  halfwayFlexibleSpace: {
    height: '40%',
  },
  halfwayText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    textAlign: 'center',
  },
  halfwayTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 35.2,
    marginTop: 20,
    textAlign: 'center',
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  image: {
    aspectRatio: 0.75,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
  },
  imageContainer: {
    marginBottom: -10,
    width: '100%',
  },
  note: {
    color: 'rgba(161, 161, 161, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    lineHeight: 15.8,
  },
  option: {
    alignItems: 'center',
    marginBottom: 24,
    width: '48%',
  },
  optionText: {
    color: 'rgba(109, 109, 109, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 14.3,
    marginBottom: -5,
    marginTop: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%',
  },
  progressButtons: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  progressText: {
    color: 'rgba(63, 134, 255, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    lineHeight: 24,
  },
  scrollContainer: {
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  selectedImage: {
    borderColor: 'rgba(63, 134, 255, 1)',
  },
  selectedImageContainer: {
    borderColor: 'rgba(63, 134, 255, 1)',
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.15,
    lineHeight: 17.6,
    marginBottom: 20,
    textAlign: 'center',
    width: '90%',
  },
})
