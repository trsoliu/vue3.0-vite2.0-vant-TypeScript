<template>
  <div class="demo-box">
    <h4>teleport</h4>
    <button @click="modalOpen = true">
      Open full screen modal! (With teleport!)
    </button>
    <!-- <teleport> props -->
    <!-- to  指定移动 <teleport> 内容的目标元素 -->
    <!-- disabled - boolean。此可选属性可用于禁用 <teleport> 的功能，这意味着其插槽内容将不会移动到任何位置，而是在您在周围父组件中指定了 <teleport> 的位置渲染。 -->
    <teleport to="body" :disabled="disabled">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const modalOpen = ref<boolean>(false)
    const disabled = ref<boolean>(true)
    return {
      modalOpen,
      disabled,
    }
  },
})
</script>
