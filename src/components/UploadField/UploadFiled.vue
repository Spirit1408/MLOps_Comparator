<script setup>
import InputFile from './InputFile/InputFile.vue'
import { ref } from 'vue'

const fileInfo = ref(null)
const error = ref(null)

const handleFileSelected = (selectedFileInfo) => {
  fileInfo.value = selectedFileInfo
  error.value = null
}

const handleFileError = (errorMessage) => {
  error.value = errorMessage
  fileInfo.value = null
}
</script>

<template>
  <div class="p-5 rounded-lg w-[30%] mx-auto border border-gray-400 bg-[#3C3C3C]">
    <p class="text-center mb-5">Click or drag & drop CSV file to analyze</p>

    <InputFile @file-selected="handleFileSelected" @file-error="handleFileError" />

    <p v-if="fileInfo" class="text-center mt-5">{{ fileInfo.name }} | {{ fileInfo.size }}</p>
    <p v-if="error" class="text-center mt-5 text-red-500">{{ error }}</p>
  </div>
</template>
