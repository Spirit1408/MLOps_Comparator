<script setup>
import { useExperimentsStore } from '@/stores/experimentsStore'
import { computed } from 'vue'

const experimentsStore = useExperimentsStore()

const isDataLoaded = computed(() => experimentsStore.isDataLoaded)
const isLoading = computed(() => experimentsStore.isLoading)
const stats = computed(() => experimentsStore.stats)
const fileName = computed(() => experimentsStore.fileName)
</script>

<template>
  <div class="p-5 rounded-lg max-w-[30%] w-full mx-auto border border-gray-400 bg-[#3C3C3C]">
    <div v-if="isLoading" class="h-[200px] flex items-center justify-center">
      <p class="text-green-400">Loading data from file...</p>
    </div>

    <div v-else-if="!isDataLoaded" class="h-[200px] flex items-center justify-center">
      <p class="text-gray-400">Your data will be displayed here...</p>
    </div>

    <div v-else class="text-left">
      <h2 class="text-xl font-bold mb-4 text-center">File statistics</h2>

      <div class="space-y-3">
        <div class="flex justify-between items-center border-b border-gray-600 pb-2">
          <span class="text-gray-300">File name:</span>
          <span class="font-medium">{{ fileName }}</span>
        </div>

        <div class="flex justify-between items-center border-b border-gray-600 pb-2">
          <span class="text-gray-300">Number of experiments:</span>
          <span class="font-medium">{{ stats.experimentsCount }}</span>
        </div>

        <div class="flex justify-between items-center border-b border-gray-600 pb-2">
          <span class="text-gray-300">Number of metrics:</span>
          <span class="font-medium">{{ stats.metricsCount }}</span>
        </div>

        <div class="flex justify-between items-center border-b border-gray-600 pb-2">
          <span class="text-gray-300">Total amount of steps:</span>
          <span class="font-medium">{{ stats.maxStep }}</span>
        </div>

        <div class="flex justify-between items-center border-b border-gray-600 pb-2">
          <span class="text-gray-300">Total amount of data points:</span>
          <span class="font-medium">{{ stats.totalDataPoints }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
