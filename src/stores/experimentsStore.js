import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExperimentsStore = defineStore('experiments', () => {
  const rawData = ref([])
  const isDataLoaded = ref(false)
  const isInfoLoading = ref(false)
  const isChartsLoading = ref(false)
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

  function setInfoLoading(status) {
    isInfoLoading.value = status
  }

  function setChartsLoading(status) {
    isChartsLoading.value = status
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

  const getExperimentMetricData = function (experimentId, metricName) {
    if (!rawData.value || !rawData.value.length) return []

    return rawData.value
      .filter((item) => item.experiment_id === experimentId && item.metric_name === metricName)
      .sort((a, b) => Number(a.step) - Number(b.step))
      .map((item) => ({
        x: Number(item.step),
        y: Number(item.value),
      }))
  }

  const optimizeDataPoints = function (data, detailLevel = 'overview') {
    if (!data || data.length === 0) return data

    let maxPoints
    switch (detailLevel) {
      case 'overview':
        maxPoints = 500
        break
      case 'medium':
        maxPoints = 2000
        break
      case 'detailed':
        maxPoints = 8000
        break
      case 'full':
        return data
      case 'auto':
      default:
        if (data.length <= 1000) return data
        if (data.length <= 5000) maxPoints = 1500
        else if (data.length <= 15000) maxPoints = 3000
        else maxPoints = 5000
        break
    }

    if (data.length <= maxPoints) return data

    const step = Math.ceil(data.length / maxPoints)
    const decimatedData = []

    decimatedData.push(data[0])
    for (let i = step; i < data.length - 1; i += step) {
      decimatedData.push(data[i])
    }

    if (data.length > 1) {
      decimatedData.push(data[data.length - 1])
    }

    return decimatedData
  }

  const getMetricChartData = function (metricName, visibleExperiments, detailLevel = 'overview') {
    if (!rawData.value || !rawData.value.length || !visibleExperiments) {
      return { datasets: [] }
    }

    const datasets = []
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

    experimentIds.value.forEach((experimentId, index) => {
      if (!visibleExperiments.has(experimentId)) return

      const rawDataPoints = getExperimentMetricData(experimentId, metricName)
      if (rawDataPoints.length === 0) return

      const optimizedData = optimizeDataPoints(rawDataPoints, detailLevel)

      datasets.push({
        label: experimentId,
        data: optimizedData,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + '20',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: optimizedData.length > 100 ? 0 : 2,
        pointHoverRadius: 4,
      })
    })

    return { datasets }
  }

  const getDataStats = function (metricName, experimentId) {
    const data = getExperimentMetricData(experimentId, metricName)
    return {
      totalPoints: data.length,
      firstStep: data.length > 0 ? data[0].x : 0,
      lastStep: data.length > 0 ? data[data.length - 1].x : 0,
      minValue: data.length > 0 ? Math.min(...data.map((d) => d.y)) : 0,
      maxValue: data.length > 0 ? Math.max(...data.map((d) => d.y)) : 0,
    }
  }

  return {
    rawData,
    isDataLoaded,
    isInfoLoading,
    isChartsLoading,
    fileName,
    fileSize,
    experimentIds,
    metricNames,
    maxStep,
    stats,
    setInfoLoading,
    setChartsLoading,
    setFileInfo,
    setRawData,
    clearRawData,
    getExperimentMetricData,
    optimizeDataPoints,
    getMetricChartData,
    getDataStats,
  }
})
