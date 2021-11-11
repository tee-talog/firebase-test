<template>
  <div>
    <section class="p-2">
      <h1>ユーザー登録</h1>
      <form @submit.prevent="createUser">
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
          submit
        </button>
      </form>
    </section>

    <section class="p-2">
      <nuxt-link to="login">login</nuxt-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { initialize } from '@/modules/firebase'

export default defineComponent({
  setup() {
    const context = useContext()
    initialize(context.$config)

    const email = ref('')
    const password = ref('')

    const createUser = async () => {
      const auth = getAuth()
      auth.languageCode = 'ja'

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        console.log(userCredential)
      } catch (e: unknown) {
        console.log(e)
      }
    }

    return {
      email,
      password,
      createUser,
    }
  },
})
</script>
