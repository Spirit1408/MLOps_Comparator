<script setup>
import { ref, computed, watchEffect, onUnmounted } from 'vue'
import Chart from 'primevue/chart'
import { useExperimentsStore } from '@/stores/experimentsStore'

const props = defineProps({
  metricName: {
    type: String,
    required: true,
  },
  visibleExperiments: {
    type: Set,
    required: true,
  },
  detailLevel: {
    type: String,
    default: 'overview',
  },
})

const experimentsStore = useExperimentsStore()
const chartRef = ref(null)

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: props.metricName,
      color: '#ffffff',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#374151',
      borderWidth: 1,
      callbacks: {
        afterBody: function () {
          if (props.detailLevel !== 'full') {
            return [`Detail level: ${getDetailLevelLabel()}`]
          }
          return []
        },
      },
    },
  },
  scales: {
    x: {
      type: 'linear',
      display: true,
      title: {
        display: true,
        text: 'Step',
        color: '#9CA3AF',
      },
      grid: {
        color: '#374151',
      },
      ticks: {
        color: '#9CA3AF',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
        color: '#9CA3AF',
      },
      grid: {
        color: '#374151',
      },
      ticks: {
        color: '#9CA3AF',
      },
    },
  },
  elements: {
    line: {
      tension: 0.1,
    },
    point: {
      radius: 0,
      hoverRadius: 4,
    },
  },
  animation: {
    duration: props.detailLevel === 'full' ? 0 : 300,
  },
  parsing: false,
  normalized: true,
  spanGaps: false,
})

const getDetailLevelLabel = () => {
  const labels = {
    overview: 'Overview (~500 points)',
    medium: 'Medium (~2K points)',
    detailed: 'Detailed (~8K points)',
    auto: 'Auto (optimal)',
    full: 'Full',
  }
  return labels[props.detailLevel] || 'Unknown'
}

const chartData = computed(() => {
  return experimentsStore.getMetricChartData(
    props.metricName,
    props.visibleExperiments,
    props.detailLevel,
  )
})

const dataPointsCount = computed(() => {
  return chartData.value.datasets.reduce((total, dataset) => total + dataset.data.length, 0)
})

watchEffect(() => {
  chartData.value
  props.visibleExperiments
  props.detailLevel
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between items-center mb-2 text-xs text-gray-400">
      <span>{{ getDetailLevelLabel() }}</span>
      <span>{{ dataPointsCount.toLocaleString() }} points</span>
    </div>

    <div class="flex-1 w-full">
      <Chart
        ref="chartRef"
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="w-full h-full"
      />
    </div>
  </div>
</template>
