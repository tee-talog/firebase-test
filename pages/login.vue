<template>
  <div class="login">
    <section class="p-2">
      <h1>ログイン</h1>
      <form @submit.prevent="login">
        <label>
          <span>メールアドレス</span>
          <input
            type="text"
            v-model="email"
            class="border-solid border-2 border-gray-600 rounded"
          />
        </label>
        <label>
          <span>パスワード</span>
          <input
            type="password"
            v-model="password"
            class="border-solid border-2 border-gray-600 rounded"
          />
        </label>

        <button
          type="submit"
          class="border-solid border-2 border-gray-600 rounded py-1 px-4"
        >
          login
        </button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { initialize } from '@/modules/firebase'

export default defineComponent({
  setup() {
    const context = useContext()
    initialize(context.$config)

    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const login = async () => {
      const auth = getAuth()
      auth.languageCode = 'ja'

      try {
        await setPersistence(auth, browserLocalPersistence)
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        console.log(userCredential)
        router.push('/secret')
      } catch (e: unknown) {
        console.log(e)
      }
    }

    return {
      email,
      password,
      login,
    }
  },
})
</script>
