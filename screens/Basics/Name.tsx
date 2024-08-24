import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { useRouter } from 'expo-router'

import { BackButton } from '@/components/BackButton'
import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import { ContinueButton } from '@/components/buttons/ContinueButton'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { PATH } from '@/constants/constants'
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/graphql/generated'

export const Name: React.FC = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMaxLengthError, setIsMaxLengthError] = useState<boolean>(false)
  const [signupError, setSignupError] = useState<null | Record<string, string>>(null)
  const [errorText, setErrorText] = useState<null | string>(null)

  const setFirstNameFn = (firstNameArg: string) => {
    setValue('firstName', firstNameArg, { shouldDirty: true, shouldValidate: true })
  }

  const { data: getUserData, loading: isGetUserLoading } = useGetUserByIdQuery({
    onCompleted: (response) => {
      console.log('response', response.getUserById)
      if (response.getUserById?.firstName) {
        setFirstNameFn(response.getUserById?.firstName)
      }
    },
    onError: (err) => {
      console.log('Graphql get user by id err', err)
    },
  })
  const [updateUserMutation, { data: saveData, loading: saveLoading, error: saveError }] = useUpdateUserMutation()

  const handleSaveUserFirstName = async (firstNameArg: string): Promise<boolean> => {
    try {
      if (!firstNameArg || firstNameArg.trim() === '' || firstNameArg === 'A') {
        console.error('Invalid first name provided')
        setErrorText('FirstName cannot be empty')
        return false
      }

      const response = await updateUserMutation({
        variables: {
          updateUserInput: {
            firstName: firstNameArg,
          },
        },
      })
      // Handle the response as needed
      console.log('User updated:', response.data)

      return true
    } catch (err) {
      // Handle errors as needed
      console.error('Error updating user:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      setErrorText('Error updating user: ' + err?.message)
      return false
    }
  }

  const handleContinue = async () => {
    const isSuccess = await handleSaveUserFirstName(watch('firstName'))
    if (isSuccess) {
      router.push(PATH.BASICS_DONE)
    }
  }

  const onSubmit = () => {
    handleContinue()
  }

  return (
    <BackgroundImageWrapper isNoBg>
      <BackButton isDark />
      <View style={styles.top} />
      <View style={styles.main}>
        <View style={styles.headlineWrapper}>
          <Text style={styles.headline}>What’s your first name?</Text>
        </View>
      </View>

      <View style={styles.between} />

      <View style={styles.buttonContainer}>
        <>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="rgba(109, 109, 109, 1)"
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(e) => {
                        if (e.length <= 32) {
                          setIsMaxLengthError(false)
                          onChange(e)
                          clearErrors('firstName')
                          setSignupError(null)
                          setErrorText(null)
                        } else {
                          setIsMaxLengthError(true)
                        }
                      }}
                    />
                  </>
                )}
                rules={{
                  required: 'First Name is required',
                }}
              />
            </View>
            {errors.firstName || isMaxLengthError ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {(errors?.firstName?.message && String(errors?.firstName?.message)) ||
                    (isMaxLengthError && `Name is too long`)}
                </Text>
              </View>
            ) : (
              <View style={styles.errorNone} />
            )}
          </View>
        </>
      </View>

      <View style={styles.between} />

      <ContinueButton
        disabled={!(watch('firstName') || '').trim() || isMaxLengthError} // Disable button if input is empty
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
        title="CONTINUE"
        onPress={handleSubmit(onSubmit)}
      />
      <View style={styles.bottom}>
        {errorText ? (
          <View style={[styles.errorViewSmall, ...(errorText ? [styles.signupError] : [])]}>
            <Text style={[styles.errorText, styles.errorColorBottom]}>{errorText}</Text>
          </View>
        ) : (
          <View style={styles.errorNone} />
        )}
      </View>

      {isLoading && <LoadingOverlay isLoading={isLoading} />}
    </BackgroundImageWrapper>
  )
}

const styles = StyleSheet.create({
  between: {
    flex: 1.5,
    width: '80%',
  },
  // bottom: {
  //   height: 40,
  //   paddingLeft: 15,
  //   width: '90%',
  // },
  buttonContainer: {
    display: 'flex',
    gap: 16,
    marginBottom: 30,
    width: '80%',
  },
  continueButton: {
    width: '80%',
  },
  continueButtonText: {
    color: '#fff',
  },
  errorColorBottom: {
    color: 'rgba(222, 96, 255, 1)',
  },
  errorNone: {
    height: 16,
    marginTop: 6,
  },
  errorText: {
    color: 'rgba(222, 96, 255, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'left',
  },

  errorView: {
    display: 'flex',
    height: 16,
    marginTop: 6,
    width: '100%',
  },
  errorViewSmall: {
    display: 'flex',
    paddingTop: 10,
    width: '90%',
  },

  formContainer: {
    alignItems: 'center',
    backgroundColor: 'linear-gradient(180deg, #FF70A3 0%, #FFD25F 100%)',
    justifyContent: 'center',
  },
  headline: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
  },
  headlineWrapper: {},

  input: {
    color: '#000',
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 19.5,
    padding: 10,
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomColor: 'rgba(161, 161, 161, 1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 36,
    paddingRight: 10,
  },
  main: {
    height: '15%',
    width: '80%',
  },
  signupError: {},
  top: {
    height: '20%',
  },
})
