<script setup>
import ChartButton from './ChartButton/ChartButton.vue'
import { useExperimentsStore } from '@/stores/experimentsStore'
import { computed } from 'vue'

const experimentsStore = useExperimentsStore()

const experiments = computed(() => experimentsStore.experimentIds)
</script>

<template>
  <div class="flex gap-2 bg-black rounded-lg">
    <div class="border-r border-gray-400">
      <ul class="divide-y divide-gray-400">
        <li v-for="experiment in experiments" :key="experiment">
          <ChartButton :experiment="experiment" />
        </li>
      </ul>
    </div>

    <div class="flex-grow">charts</div>
  </div>
</template>
