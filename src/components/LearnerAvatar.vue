<template>
  <div class="p-0 learner-avatar">
    <img src="/assets/images/avatar.webp" :alt="`${firstName} ${lastName}'s avatar`" />
    <div class="initials text-center">
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['firstName', 'lastName'])
const initials = `${props.lastName.substring(0, 1).toUpperCase()}${props.firstName.substring(0, 1).toUpperCase()}`
</script>

<style scoped>
.learner-avatar {
  height: 64px;
  width: 64px;
}

.img {
  height: 64px;
  width: 64px;
}
.initials {
  position: relative;
  top: -20px;
}
</style>
