<script setup>
import { computed } from 'vue'

defineProps({
  experiment: {
    type: String,
    required: true,
  },
})

const randomColor = computed(() => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
})
</script>

<template>
  <button class="p-2 flex items-center gap-2">
    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: randomColor }" />
    <p>
      {{ experiment }}
    </p>
  </button>
</template>
