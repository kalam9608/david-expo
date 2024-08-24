import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth' // Firebase auth imports

import { BackButton } from '@/components/BackButton'
import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import StyledButton from '@/components/buttons/StyledButton'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { PASSWORD_MIN_LENGTH, PATH } from '@/constants/constants'
import { useCreateUserMutation } from '@/graphql/generated'

import { auth } from './../../app/lib/firebaseConfig'
import { UserInput } from './types'

type AuthTokens = User

interface User {
  id: string
  name: string | null
  email: string | null
  photo: string | null
  givenName: string | null
  familyName: string | null
}

export const EmailSignin: React.FC = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const [signupError, setSignupError] = useState<null | Record<string, string>>(null)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const handleContinue = (isNewUser: boolean | undefined) => {
    if (isNewUser) {
      router.push(PATH.SIGN_UP_SUCCESS)
      return
    } else {
      router.push(PATH.BASICS_DONE)
      return
    }
  }

  const [createUserMutation, { data: createData, loading: createLoading, error: createError }] = useCreateUserMutation()

  const addNewUserToDb = async (userInput: UserInput) => {
    try {
      // const response = await createUserMutation({
      //   variables: {
      //     firstName: userInput.firstName,
      //   },
      // })
      const response = await createUserMutation({
        variables: {
          input: {
            email: userInput.email,
            firstName: userInput.firstName || null,
            id: userInput.id,
          },
        },
      })

      if (response.data) {
        console.log('User created successfully:', response.data)
        // Handle success (e.g., show a success message, redirect, etc.)
      } else if (response.errors) {
        // Throw an error if the mutation returns errors
        throw new Error(`Failed to create user: ${response.errors[0].message}`)
      }
    } catch (err) {
      console.error('Error creating user:', err)
      throw err?.message // Rethrow the error to be caught in signInWithEmailPassword
    }
  }

  const signInWithEmailPassword = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const userCredential = await (isSignIn
        ? signInWithEmailAndPassword(auth, email, password)
        : createUserWithEmailAndPassword(auth, email, password))
      const currentUser = userCredential.user

      if (currentUser) {
        const user = {
          email: currentUser.email,
          familyName: currentUser.displayName?.split(' ')[1] || null, // Get last name
          givenName: currentUser.displayName?.split(' ')[0] || null, // Get first name
          id: currentUser.uid,
          name: currentUser.displayName,
          photo: currentUser.photoURL,
        }

        if (!isSignIn) {
          // registration
          const response = await addNewUserToDb({
            email: user.email,
            firstName: user.givenName,
            id: user.id,
          })

          console.log('response', response)
        }

        storeAuthTokens(user)
      } else {
        console.log('Provlem with creating user', userCredential)
        console.log('Provlem with creating user userCredential.user', userCredential.user)
      }

      handleContinue(!isSignIn)
    } catch (error) {
      console.log('Error during Email Sign-In:', error)
      setSignupError(error as Record<string, string> | null)
    } finally {
      setIsLoading(false)
    }
  }

  const storeAuthTokens = async (tokens: AuthTokens) => {
    try {
      await AsyncStorage.setItem('@auth_tokens', JSON.stringify(tokens))
    } catch (error) {
      console.error('Error saving auth tokens', error)
    }
  }

  const onSubmit = (data: Record<string, string>) => {
    signInWithEmailPassword(data.email, data.password)
  }

  const handleInstead = () => {
    clearErrors()
    setSignupError(null)
    setIsSignIn((prev) => !prev)
    if (isSignIn) {
      trigger('passwordConfirmation')
      setTimeout(() => {
        trigger('passwordConfirmation')
      }, 10)
    } else {
      if (watch('email') && watch('password')) {
        console.log('trigger()')
        trigger()
      }
    }
  }

  const getErrorText = (e: Record<string, string> | null) => {
    if (e?.code === 'auth/email-already-in-use') {
      return `Email already in use`
    }
    if (e?.code === 'auth/invalid-credential') {
      return `Invalid email or password`
    }
    if (e?.code === 'auth/too-many-requests') {
      return `Error: Too many requests`
    }
  }
  const errorText = getErrorText(signupError)

  return (
    <BackgroundImageWrapper>
      <BackButton />
      <View style={styles.top} />
      <View style={styles.main}>
        <View style={styles.headlineWrapper}>
          <Text style={styles.headline}>{isSignIn ? `Sign in` : `Create new account`}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons color="white" name="mail" size={24} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#fff"
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(e) => {
                        onChange(e)
                        clearErrors('email')
                        setSignupError(null)
                      }}
                    />
                  </>
                )}
                rules={{
                  pattern: {
                    message: 'Invalid email address',
                    value: /^\S+@\S+$/i,
                  },
                  required: 'Email is required',
                }}
              />
            </View>
            {errors.email ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{String(errors.email.message)}</Text>
              </View>
            ) : (
              <View style={styles.errorNone} />
            )}
            <View style={styles.inputContainer}>
              <Ionicons color="white" name="lock-closed" size={24} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#fff"
                      secureTextEntry={!isShowPassword}
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(e) => {
                        onChange(e)
                        clearErrors('password')
                        setSignupError(null)
                      }}
                    />
                  </>
                )}
                rules={{
                  minLength: {
                    message: 'Minimum is ' + PASSWORD_MIN_LENGTH + ' characters',
                    value: PASSWORD_MIN_LENGTH,
                  },
                  required: 'Password is required',
                }}
              />
              <Ionicons
                color="white"
                name="eye"
                size={24}
                style={styles.eyeIcon}
                onPress={() => {
                  setIsShowPassword((s) => !s)
                }}
              />
            </View>
            {errors.password ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{String(errors.password.message)}</Text>
              </View>
            ) : (
              <View style={styles.errorNone} />
            )}
            {isSignIn ? null : (
              <View style={[styles.inputContainer, ...(isSignIn ? [styles.hidden] : [])]}>
                <Ionicons color="white" name="checkmark-circle" size={24} />
                <Controller
                  control={control}
                  name="passwordConfirmation"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="Password confirmation"
                        placeholderTextColor="#fff"
                        secureTextEntry={!isShowPassword}
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(e) => {
                          onChange(e)
                          clearErrors('passwordConfirmation')
                          setSignupError(null)
                        }}
                      />
                    </>
                  )}
                  rules={{
                    required:
                      !isSignIn && !watch('passwordConfirmation') && watch('password')
                        ? 'Password confirmation is required'
                        : false,
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                  }}
                />
              </View>
            )}
            {errors.passwordConfirmation && !isSignIn ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{String(errors.passwordConfirmation.message)}</Text>
              </View>
            ) : (
              <View style={styles.errorNone} />
            )}
          </View>
        </>
      </View>

      <View style={styles.between} />

      <StyledButton
        style={styles.transparentButton}
        textStyle={styles.transparentButtonText}
        title={isSignIn ? 'Sign up instead' : 'Sign in instead'}
        onPress={handleInstead}
      />
      <StyledButton
        disabled={Boolean(
          errors.email ||
            errors.password ||
            (!isSignIn ? errors.passwordConfirmation : false) ||
            !watch('email') ||
            !watch('password'),
          // (!isValid && !isSignIn && !errors.passwordConfirmation && watch('email') && watch('password')),
        )}
        title="CONTINUE"
        onPress={handleSubmit(onSubmit)}
      />
      <View style={signupError && !errorText ? styles.bottomCustomError : styles.bottom}>
        {signupError ? (
          <View style={[styles.errorViewSmall, ...(signupError ? [styles.signupError] : [])]}>
            <Text style={[styles.errorText, styles.errorColorBottom]}>
              {errorText ? errorText : `Error, please try again. Details:`}
            </Text>
            {errorText ? null : (
              <Text style={[styles.errorTextSmall, styles.errorColorBottom, ...(errorText ? [styles.hidden] : [])]}>
                {JSON.stringify(signupError)}
              </Text>
            )}
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
  bottom: {
    height: 40,
    paddingLeft: 15,
    width: '90%',
  },
  bottomCustomError: {
    flex: 1.5,
    paddingLeft: 15,
    width: '90%',
  },
  buttonContainer: {
    display: 'flex',
    gap: 16,
    marginBottom: 30,
    width: '80%',
  },
  errorColorBottom: {
    color: 'rgba(222, 222, 255, 1)',
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
  errorTextSmall: {
    color: 'rgba(222, 96, 255, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 8,
    lineHeight: 16,
    marginTop: 6,
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
  eyeIcon: {
    marginLeft: 10,
  },
  formContainer: {
    alignItems: 'center',
    backgroundColor: 'linear-gradient(180deg, #FF70A3 0%, #FFD25F 100%)',
    justifyContent: 'center',
  },
  headline: {
    color: '#fff',
    display: 'flex',
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 36,
  },
  headlineWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    width: '80%',
  },
  hidden: {
    opacity: 0,
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 19.5,
    padding: 10,
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomColor: '#fff',
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
  transparentButton: {
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  transparentButtonText: {
    color: '#fff',
  },
})
