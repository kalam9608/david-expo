import { useEffect } from 'react'

import { ApolloProvider } from '@apollo/client'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import { useColorScheme } from '@/components/useColorScheme'

import client from './lib/apollo-client'

import 'react-native-reanimated'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId: '.apps.googleusercontent.com',
      offlineAccess: true,
      webClientId: '',
    })
  }
  // useEffect(() => {
  //   configGoogleSignIn() // will execute everytime the component mounts
  // }, [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={/*colorScheme === 'dark' ? DarkTheme :*/ DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="index" /> */}
          {/* <Stack.Screen name="email-signin" /> */}
          <Stack.Screen name="sign-up-success"/>
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  )
}
