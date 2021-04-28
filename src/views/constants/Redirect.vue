<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',

  setup() {
    const route = useRoute()

    onMounted(() => {
      const { params, query } = route
      const { path } = params
      const { replace } = useRouter()
      const _path = Array.isArray(path) ? path.join('/') : path
      replace({
        path: '/' + _path,
        query,
      })
    })
    return {}
  },
})
</script>

<style lang="less" scoped></style>
