import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExperientsStore = defineStore('experients', () => {
  const rawData = ref([])
  const isDataLoaded = ref(false)
  const isLoading = ref(false)
  const fileName = ref('')
  const fileSize = ref('')

  const experimentIds = computed(() => {
    if (!rawData.value || !rawData.value.length) return []

    const uniqueIds = new Set()
    for (const item of rawData.value) {
      if (item.experiment_id) {
        uniqueIds.add(item.experiment_id)
      }
    }
    return Array.from(uniqueIds)
  })

  const metricNames = computed(() => {
    if (!rawData.value || !rawData.value.length) return []

    const uniqueMetrics = new Set()
    for (const item of rawData.value) {
      if (item.metric_name) {
        uniqueMetrics.add(item.metric_name)
      }
    }
    return Array.from(uniqueMetrics)
  })

  const maxStep = computed(() => {
    if (!rawData.value || !rawData.value.length) return 0

    let max = 0
    for (const item of rawData.value) {
      const step = Number(item.step) || 0
      if (step > max) {
        max = step
      }
    }
    return max
  })

  const stats = computed(() => {
    return {
      experimentsCount: experimentIds.value.length,
      metricsCount: metricNames.value.length,
      maxStep: maxStep.value,
      totalDataPoints: rawData.value.length,
    }
  })

  function setLoading(status) {
    isLoading.value = status
  }

  function setFileInfo(name, size) {
    fileName.value = name
    fileSize.value = size
  }

  function setRawData(data) {
    if (!data || !Array.isArray(data)) {
      console.error('Invalid data format provided to setRawData')
      return
    }

    if (data.length === 0) {
      console.warn('Empty data array provided to setRawData')
    }

    const sampleData = data.slice(0, 100)
    const hasInvalidItems = sampleData.some(
      (item) =>
        !item.experiment_id ||
        !item.metric_name ||
        item.step === undefined ||
        item.value === undefined,
    )

    if (hasInvalidItems) {
      console.warn('Some data items may have invalid structure')
    }

    rawData.value = data
    isDataLoaded.value = data.length > 0

    if (!isDataLoaded.value) {
      console.warn('No data was loaded into store')
    }
  }

  function clearRawData() {
    rawData.value = []
    isDataLoaded.value = false
    fileName.value = ''
    fileSize.value = ''
  }

  function getExperimentMetricData(experimentId, metricName) {
    if (!rawData.value || !rawData.value.length) return []

    return rawData.value
      .filter((item) => item.experiment_id === experimentId && item.metric_name === metricName)
      .sort((a, b) => Number(a.step) - Number(b.step))
  }

  return {
    rawData,
    isDataLoaded,
    isLoading,
    fileName,
    fileSize,
    experimentIds,
    metricNames,
    maxStep,
    stats,
    setLoading,
    setFileInfo,
    setRawData,
    clearRawData,
    getExperimentMetricData,
  }
})
