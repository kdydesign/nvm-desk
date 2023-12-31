<script setup lang="ts">
import { ref, toRefs, watch, type Ref } from 'vue'
import {Dark} from 'quasar'

const props = defineProps<{
  isShow: boolean
}>()

defineEmits<{
  'update:is-show': [value: boolean]
}>()

const { isShow } = toRefs(props)
const isOpen: Ref<boolean> = ref(false)
const themeMode: Ref<boolean> = ref(false)

const getMail = 'mailto:kdydesign@gmail.com'
const getGithub = 'https://github.com/kdydesign/nvm-desk/issues'

watch(isShow, v => isOpen.value = v)

function onChangeTheme (val:boolean) {
  Dark.set(val)

  window.electronAPI.send('setConfig', {dark: val})
}

window.electronAPI.receive('getConfig', (_, { config }) => {
  themeMode.value = config.dark
  onChangeTheme(config.dark)
})
</script>

<template>
  <q-drawer
    v-model="isOpen"
    side="right"
    overlay
    no-swipe-open
    no-swipe-close
    no-swipe-backdrop
    elevated
    class="config-panel"
    @update:model-value="$emit('update:is-show', isOpen)"
  >
    <div class="row config-title">
      <div class="col">
        <q-img
          src="@/assets/img/logo-text.png"
          width="150px"
        />
      </div>

      <div>
        <q-btn
          round
          flat
          size="sm"
          icon="close"
          @click="$emit('update:is-show', false)"
        />
      </div>
    </div>

    <div class="config-body">
      <div class="row">
        <div class="col">
          Theme
        </div>
        <div class="col">
          <q-toggle
            v-model="themeMode"
            size="sm"
            checked-icon="dark_mode"
            color="brand"
            unchecked-icon="light_mode"
            @update:model-value="onChangeTheme"
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          Issues
        </div>

        <div class="col">
          <a :href="getMail">
            <q-icon
              name="fa-solid fa-envelope"
              size="sm"
            />
          </a>

          <a
            :href="getGithub"
            target="_blank"
          >
            <q-icon
              name="fa-brands fa-github"
              size="sm"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="config-footer">
      <span class="row justify-center">MIT LICENSE</span>
      <span class="row justify-center">Copyright © 2023 Dev.DY</span>
    </div>
  </q-drawer>
</template>
