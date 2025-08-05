<script setup>
import { computed } from 'vue'

const props = defineProps({
  experiment: {
    type: String,
    required: true,
  },
  experimentIndex: {
    type: Number,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle'])

const colors = [
  '#3B82F6',
  '#EF4444',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#06B6D4',
  '#F97316',
  '#84CC16',
  '#EC4899',
  '#6366F1',
]

const experimentColor = computed(() => {
  return colors[props.experimentIndex % colors.length]
})

const toggleVisibility = () => {
  emit('toggle')
}
</script>

<template>
  <button
    @click="toggleVisibility"
    class="p-2 flex items-center gap-2 hover:bg-gray-700 transition-colors w-full text-left rounded"
    :class="{ 'opacity-50': !isVisible }"
  >
    <span
      class="w-3 h-3 rounded-full border-2 border-white flex-shrink-0"
      :style="{ backgroundColor: isVisible ? experimentColor : 'transparent' }"
    />
    <p class="text-sm truncate">
      {{ experiment }}
    </p>
  </button>
</template>
