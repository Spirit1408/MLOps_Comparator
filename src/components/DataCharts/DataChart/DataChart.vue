<script setup>
import ChartButton from './ChartButton/ChartButton.vue'
import MetricChart from './MetricChart/MetricChart.vue'
import DetailControls from './DetailControls/DetailControls.vue'
import { useExperimentsStore } from '@/stores/experimentsStore'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  metricName: {
    type: String,
    required: true,
  },
})

const experimentsStore = useExperimentsStore()

const visibleExperiments = ref(new Set())
const detailLevel = ref('overview')

const experiments = computed(() => experimentsStore.experimentIds)
const hasData = computed(() => experimentsStore.isDataLoaded && experiments.value.length > 0)

const totalDataPoints = computed(() => {
  if (!hasData.value) return 0

  let total = 0
  for (const experimentId of visibleExperiments.value) {
    const data = experimentsStore.getExperimentMetricData(experimentId, props.metricName)
    total += data.length
  }
  return total
})

watch(
  () => [experimentsStore.isDataLoaded, experiments.value],
  ([isLoaded, experimentsList]) => {
    if (isLoaded && experimentsList.length > 0) {
      visibleExperiments.value = new Set(experimentsList)
    }
  },
  { immediate: true },
)

const toggleExperimentVisibility = (experimentId) => {
  if (visibleExperiments.value.has(experimentId)) {
    visibleExperiments.value.delete(experimentId)
  } else {
    visibleExperiments.value.add(experimentId)
  }
  visibleExperiments.value = new Set(visibleExperiments.value)
}

const isExperimentVisible = (experimentId) => {
  return visibleExperiments.value.has(experimentId)
}

const updateDetailLevel = (level) => {
  detailLevel.value = level
}
</script>

<template>
  <div v-if="hasData" class="flex bg-black rounded-lg min-h-96">
    <div class="w-80 border-r border-gray-600 rounded-l-lg">
      <div class="p-4">
        <h3 class="font-semibold mb-2 text-sm uppercase tracking-wide">
          {{ metricName }}
        </h3>
        <p class="text-gray-400 text-xs mb-3">Toggle experiments</p>

        <DetailControls
          :detail-level="detailLevel"
          :total-data-points="totalDataPoints"
          @update:detail-level="updateDetailLevel"
        />

        <div class="space-y-1">
          <ChartButton
            v-for="(experiment, index) in experiments"
            :key="experiment"
            :experiment="experiment"
            :experiment-index="index"
            :is-visible="isExperimentVisible(experiment)"
            @toggle="toggleExperimentVisibility(experiment)"
          />
        </div>
      </div>
    </div>

    <div class="flex-1 p-4">
      <MetricChart
        :metric-name="metricName"
        :visible-experiments="visibleExperiments"
        :detail-level="detailLevel"
      />
    </div>
  </div>

  <div v-else class="flex items-center justify-center bg-gray-900 rounded-lg min-h-96">
    <div class="text-center text-gray-400">
      <p class="text-lg mb-2">No data loaded</p>
      <p class="text-sm">Upload a CSV file to view charts</p>
    </div>
  </div>
</template>

<style scoped>
.min-h-96 {
  min-height: 24rem;
}

.w-80 {
  width: 20rem;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
