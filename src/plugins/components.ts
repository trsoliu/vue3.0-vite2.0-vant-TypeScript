import { App, ref } from "vue";
import HelloWorld from '@/components/HelloWorld.vue'
export function installComponents(app: App): App {
    app.component("HelloWorld",HelloWorld);
    app.component("modal-button", {
    template: `
      <button @click="modalOpen = true">
          Open full screen modal!1 (With teleport!)
      </button>
      <teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            I'm a teleported modal! 
            (My parent is "body")
            <button @click="modalOpen = false">
              Close
            </button>
          </div>
        </div>
      </teleport>
    `,
    setup(){
      const modalOpen=ref(false)
      return {
        modalOpen
      };
    },
    // data() {
    //   console.log(199999)
    //   return {
    //     modalOpen: false,
    //   };
    // },
  });
  console.log(app)
  return app;
}
