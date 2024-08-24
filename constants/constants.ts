import { Href } from 'expo-router'

export const PASSWORD_MIN_LENGTH = 6

export const PATH: Record<string, Href<string>> = {
  BASICS_DONE: '/basics-done',
  GENDER: '/gender',
  HOME: '/',
  NAME: '/name',
  SIGN_UP_SUCCESS: '/sign-up-success',
  TEST1: '/test-1',
}
