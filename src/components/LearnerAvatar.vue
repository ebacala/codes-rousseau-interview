<template>
  <div class="learner-avatar">
    <img src="assets/images/avatar.webp" :alt="`${firstName} ${lastName}'s avatar`" />
    <div class="initials text-center">
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['firstName', 'lastName'])
const initials = `${props.lastName.substring(0, 1)}${props.firstName.substring(0, 1)}`
</script>

<style scoped>
.learner-avatar {
  height: 64px;
  width: 64px;
}
.initials {
  position: relative;
  top: -20px;
}
</style>
