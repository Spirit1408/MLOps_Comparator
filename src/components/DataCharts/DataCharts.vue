<script setup>
import { computed } from 'vue'
import DataChart from './DataChart/DataChart.vue'
import { useExperimentsStore } from '@/stores/experimentsStore'
import SLoader from '@/components/SLoader/SLoader.vue'

const experimentsStore = useExperimentsStore()

const isDataLoaded = computed(() => experimentsStore.isDataLoaded)
const isLoading = computed(() => experimentsStore.isLoading)
const metrics = computed(() => experimentsStore.metricNames)
</script>

<template>
  <div class="p-5 rounded-lg w-[500px] mx-auto border border-gray-400 bg-[#3C3C3C] transition-width duration-500" :class="{ 'w-[1000px]': isDataLoaded}">
    <div v-if="!isDataLoaded && !isLoading" class="h-[200px] flex items-center justify-center">
      <p class="text-gray-400">Charts will be displayed here...</p>
    </div>

    <div v-else-if="isLoading" class="h-[200px] flex items-center justify-center">
      <SLoader />
    </div>

    <div v-else class="flex flex-col gap-5">
      <DataChart v-for="metric in metrics" :key="metric" :metric-name="metric" />
    </div>
  </div>
</template>
