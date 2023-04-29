<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'

import { useLearnersStore } from './store/useLearnersStore'
import learners from './learners.json'

const store = useLearnersStore()

onMounted(() => {
  store.importLearners(learners)
})
</script>

<style scoped></style>
