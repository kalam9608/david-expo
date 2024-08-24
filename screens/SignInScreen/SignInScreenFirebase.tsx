import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useRouter } from 'expo-router'
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithCredential } from 'firebase/auth' // Firebase auth imports

import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import StyledButton from '@/components/buttons/StyledButton'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { PATH } from '@/constants/constants'
import { useCreateUserMutation } from '@/graphql/generated'

import { auth } from './../../app/lib/firebaseConfig'
import googleIcon from './../../assets/icons/google-icon.png'
import IconBlack from './../../assets/icons/icon-black.png'
import Logo from './Logo'
import PrivacySection from './PrivacySection'
import SignInButton from './SignInButton'
import TroubleSignInLink from './TroubleSignIn'
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

export const SignInScreenFirebase: React.FC = () => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const restoreSession = async () => {
      const tokens = await retrieveAuthTokens()
      if (tokens) {
        setUserInfo(tokens)
      }
    }

    restoreSession()
  }, [])

  const handleContinue = (isNewUser: boolean | undefined) => {
    if (isNewUser) {
      router.push(PATH.SIGN_UP_SUCCESS)
      return
    } else {
      handleContinueTest()
    }
  }

  const [createUserMutation, { data: createData, loading: createLoading, error: createError }] = useCreateUserMutation()

  const addNewUserToDb = async (userInput: UserInput) => {
    try {
      const response = await createUserMutation({
        variables: {
          input: userInput,
        },
      })

      if (response.data) {
        console.log('User created successfully:', response.data)
        // Handle success (e.g., show a success message, redirect, etc.)
      }
    } catch (err) {
      console.error('Error creating user:', err)
      // Handle error (e.g., show an error message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      await GoogleSignin.hasPlayServices()
      const { idToken } = await GoogleSignin.signIn()
      console.log('idToken', idToken)

      // Create a Google credential with the ID token
      const googleCredential = GoogleAuthProvider.credential(idToken)

      // Sign in with the credential
      const userCredential = await signInWithCredential(auth, googleCredential)
      const currentUser = userCredential.user
      const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser

      if (currentUser) {
        const user: User = {
          email: currentUser.email,
          familyName: currentUser.displayName?.split(' ')[1] || null, // Get last name
          givenName: currentUser.displayName?.split(' ')[0] || null, // Get first name
          id: currentUser.uid,
          name: currentUser.displayName,
          photo: currentUser.photoURL,
        }

        if (isNewUser) {
          await addNewUserToDb({
            email: user.email,
            firstName: user.givenName,
            id: user.id,
          })
        }

        setUserInfo(user)
        storeAuthTokens(user)

        handleContinue(isNewUser)
      }
    } catch (error) {
      console.log('Error during Google Sign-In:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut() // Perform Google sign-out
      await auth.signOut() // Sign out from Firebase
      setUserInfo(null) // Clear user info from state
      await AsyncStorage.removeItem('@auth_tokens') // Clear tokens from AsyncStorage
    } catch (error) {
      console.log('Error during sign out:', error)
    }
  }

  const storeAuthTokens = async (tokens: AuthTokens) => {
    try {
      await AsyncStorage.setItem('@auth_tokens', JSON.stringify(tokens))
    } catch (error) {
      console.error('Error saving auth tokens', error)
    }
  }

  const retrieveAuthTokens = async (): Promise<AuthTokens | null> => {
    try {
      const tokens = await AsyncStorage.getItem('@auth_tokens')
      return tokens ? JSON.parse(tokens) : null
      return null
    } catch (error) {
      console.error('Error retrieving auth tokens', error)
      return null
    }
  }

  const handleEmailSignin = () => {
    router.push('/email-signin')
  }

  const handleContinueTest = () => {
    router.push(PATH.NAME)
    // router.push(PATH.SIGN_UP_SUCCESS) // TODO
  }

  return (
    <BackgroundImageWrapper>
      <View style={styles.top} />
      <View style={styles.between}>
        <Logo />
      </View>

      <View style={[styles.buttonContainer, ...(userInfo ? [styles.centerAlignment] : [])]}>
        {userInfo ? (
          <>
            <Text style={styles.welcome}>{`Welcome, ${userInfo.givenName || userInfo.email}`}</Text>
            <StyledButton title="Continue test" onPress={handleContinueTest} />
            <StyledButton style={styles.buttonTransparent} textStyle={styles.white} title="Log Out" onPress={signOut} />
          </>
        ) : (
          <>
            <SignInButton iconSource={googleIcon} title="Sign in with Google" onPress={signInWithGoogle} />
            <SignInButton iconSource={IconBlack} title="Sign in" onPress={handleEmailSignin} />
            <TroubleSignInLink />
            <PrivacySection />
          </>
        )}
      </View>
      <View style={styles.bottom} />

      {isLoading && <LoadingOverlay isLoading={isLoading} />}
    </BackgroundImageWrapper>
  )
}

const styles = StyleSheet.create({
  between: {
    flex: 2,
  },
  bottom: {
    flex: 0.2,
  },
  buttonContainer: {
    display: 'flex',
    gap: 16,
    marginBottom: 30,
    width: '80%',
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
  },
  centerAlignment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 2,
  },
  welcome: {
    color: '#fff',
    fontSize: 20,
  },
  white: { color: '#ccc' },
})
