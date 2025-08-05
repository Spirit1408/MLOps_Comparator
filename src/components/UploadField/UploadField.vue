<script setup>
import InputFile from './InputFile/InputFile.vue'
import { ref } from 'vue'
import { useExperimentsStore } from '@/stores/experimentsStore'
import { parseCSV } from '@/utils/parseCSV'

const fileInfo = ref(null)
const error = ref(null)

const experimentsStore = useExperimentsStore()

const handleFileSelected = async (selectedFileInfo) => {
  fileInfo.value = selectedFileInfo
  error.value = null

  experimentsStore.setInfoLoading(true)
  experimentsStore.setChartsLoading(true)

  try {
    experimentsStore.setFileInfo(selectedFileInfo.name, selectedFileInfo.size)

    const parsedData = await parseCSV(selectedFileInfo.file)

    if (parsedData && parsedData.length > 0) {
      experimentsStore.setRawData(parsedData)

      experimentsStore.setInfoLoading(false)

      await new Promise((resolve) => setTimeout(resolve, 500))

      experimentsStore.setChartsLoading(false)
    } else {
      throw new Error('No data was parsed from the CSV file')
    }
  } catch (err) {
    console.error('Error processing file:', err)
    error.value = err.message || 'Failed to process file'
    experimentsStore.clearRawData()

    experimentsStore.setInfoLoading(false)
    experimentsStore.setChartsLoading(false)
  }
}

const handleFileError = (errorMessage) => {
  error.value = errorMessage
  fileInfo.value = null
  experimentsStore.clearRawData()
}
</script>

<template>
  <div class="p-5 rounded-lg max-w-[500px] w-full mx-auto border border-gray-400 bg-[#3C3C3C]">
    <p class="text-center mb-5">Click or drag & drop CSV file to analyze</p>

    <InputFile @file-selected="handleFileSelected" @file-error="handleFileError" />

    <p v-if="fileInfo && !error" class="text-center mt-5">
      {{ fileInfo.name }} | {{ fileInfo.size }}
    </p>
    <p v-if="error" class="text-center mt-5 text-red-500">{{ error }}</p>
  </div>
</template>
