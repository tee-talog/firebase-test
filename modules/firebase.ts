import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { initializeApp } from 'firebase/app'

export const initialize = ($config: NuxtRuntimeConfig) => {
  const firebaseConfig = {
    apiKey: $config.apiKey,
    authDomain: $config.authDomain,
    projectId: $config.projectId,
    storageBucket: $config.storageBucket,
    messagingSenderId: $config.messagingSenderId,
    appId: $config.appId,
  }

  return initializeApp(firebaseConfig)
}
