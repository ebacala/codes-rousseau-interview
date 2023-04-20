<template>
    <h1 class="text-center my-5 animate-h1">Welcome to your backoffice</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    setTimeout(() => router.push({ name: 'learners' }), 5000)
})
</script>

<style scoped>
@keyframes animation-h1 {
    0% {
        opacity: 0;
        transform: translate(-100%, 0);
    }
    50% {
        opacity: 1;
        transform: translate(0, 0);
    }
    100% {
        opacity: 0;
        transform: translate(0, 100%);
    }
}

h1 {
    font-size: clamp(30px, 4vw, 52px);
    font-weight: 800;
}

.animate-h1 {
    animation: animation-h1 4s linear 0.5s 1 normal both;
}
</style>
