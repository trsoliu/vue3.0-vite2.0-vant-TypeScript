<template>
  <div class="bilibiliLayout">
        <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'BilibiliLayout',
  components: {
  },
  setup() {
   
    return {
      
    }
  },
})
</script>

<style lang="less" scoped>
.bilibiliLayout {
  width: 100%;
  position: relative;
  top: 100px;
  background: #fff;
}
</style>
