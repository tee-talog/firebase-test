<template>
  <div class="secret">
    <div v-if="loading || !user">Loading...</div>
    <section v-else class="p-2">
      <h1>ユーザー情報</h1>
      <table>
        <tr>
          <th>ID</th>
          <td>{{ user.uid }}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ user.email }}</td>
        </tr>
      </table>
    </section>

    <section class="p-2">
      <button type="button" @click.prevent="logout">ログアウト</button>
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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

import { initialize } from '@/modules/firebase'

export default defineComponent({
  setup() {
    const context = useContext()
    initialize(context.$config)

    const auth = getAuth()
    const router = useRouter()

    const loading = ref(true)
    const user = ref<User | null>(auth.currentUser)

    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value = u
        loading.value = false
      } else {
        router.replace('/login')
      }
    })

    const logout = async () => {
      await signOut(auth)
      router.push('/')
    }

    return {
      user,
      loading,
      logout,
    }
  },
})
</script>
