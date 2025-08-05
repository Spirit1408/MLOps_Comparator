<script setup>
import { computed } from 'vue'

const props = defineProps({
  detailLevel: {
    type: String,
    default: 'overview',
  },
  totalDataPoints: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:detailLevel'])

const detailOptions = [
  {
    value: 'overview',
    label: 'Overview',
    description: '~500 points',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: '~2K points',
  },
  {
    value: 'detailed',
    label: 'Detailed',
    description: '~8K points',
  },
  {
    value: 'auto',
    label: 'Auto',
    description: 'Optimal',
  },
  {
    value: 'full',
    label: 'Full',
    description: 'All points',
  },
]

const currentPoints = computed(() => {
  if (props.totalDataPoints === 0) return 0

  switch (props.detailLevel) {
    case 'overview':
      return Math.min(500, props.totalDataPoints)
    case 'medium':
      return Math.min(2000, props.totalDataPoints)
    case 'detailed':
      return Math.min(8000, props.totalDataPoints)
    case 'full':
      return props.totalDataPoints
    case 'auto':
    default:
      if (props.totalDataPoints <= 1000) return props.totalDataPoints
      if (props.totalDataPoints <= 5000) return Math.min(1500, props.totalDataPoints)
      if (props.totalDataPoints <= 15000) return Math.min(3000, props.totalDataPoints)
      return Math.min(5000, props.totalDataPoints)
  }
})

const updateDetailLevel = (level) => {
  emit('update:detailLevel', level)
}
</script>

<template>
  <div class="border rounded-lg p-3 mb-4">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-medium">Detail level</h4>
      <div class="text-xs text-gray-400">
        {{ currentPoints.toLocaleString() }} / {{ totalDataPoints.toLocaleString() }} points
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in detailOptions"
        :key="option.value"
        @click="updateDetailLevel(option.value)"
        class="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200"
        :class="{
          'bg-green-600 text-black shadow-lg': detailLevel === option.value,
          'bg-[#3C3C3C] text-gray-300 hover:bg-gray-600': detailLevel !== option.value,
        }"
      >
        <span>{{ option.label }}</span>
        <span class="text-xs opacity-75">({{ option.description }})</span>
      </button>
    </div>

    <div class="mt-3 flex items-center gap-2 text-xs">
      <div class="flex items-center gap-1">
        <div
          class="w-2 h-2 rounded-full"
          :class="{
            'bg-green-500': currentPoints <= 1000,
            'bg-yellow-500': currentPoints > 1000 && currentPoints <= 5000,
            'bg-red-500': currentPoints > 5000,
          }"
        />
        <span class="text-gray-400">
          Performance:
          <span
            :class="{
              'text-green-400': currentPoints <= 1000,
              'text-yellow-400': currentPoints > 1000 && currentPoints <= 5000,
              'text-red-400': currentPoints > 5000,
            }"
          >
            {{ currentPoints <= 1000 ? 'Excellent' : currentPoints <= 5000 ? 'Good' : 'Slow' }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
