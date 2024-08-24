import { User } from 'firebase/auth'

import { auth } from './firebaseConfig'

/**
 * Get firebase data for usert user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser as User | null
}

/**
 * Get token of curenct user
 */
export const getCurrentUserToken = (): Promise<string | null> => {
  const currentUser = getCurrentUser()

  return currentUser?.getIdToken() || Promise.resolve(null)
}
