<script setup>
import { ref } from 'vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'

const emit = defineEmits(['file-selected', 'file-error'])

const fileInputRef = ref(null)
const isDragOver = ref(false)

const ALLOWED_TYPES = ['text/csv']

const validateFile = (file) => {
  const isValidType = ALLOWED_TYPES.includes(file.type) || file.name.toLowerCase().endsWith('.csv')

  if (!isValidType) {
    return {
      isValid: false,
      error: 'Only CSV files are allowed',
    }
  }

  return { isValid: true, error: null }
}

const processFile = (file) => {
  const validation = validateFile(file)

  if (!validation.isValid) {
    emit('file-error', validation.error)
    return
  }

  const fileInfo = {
    name: file.name,
    size: `${(file.size / 1024).toFixed(1)} KB`,
    type: file.type,
    file: file,
  }

  emit('file-selected', fileInfo)
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const handleClick = () => {
  fileInputRef.value?.click()
}

const handleDragEnter = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  event.stopPropagation()
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragOver.value = false
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

const handleDrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false

  const files = event.dataTransfer.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center cursor-pointer transition-colors duration-200 p-8 border-2 border-dashed rounded-lg',
      isDragOver
        ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
        : 'border-[#05FF0D]',
    ]"
    @click="handleClick"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      accept=".csv,text/csv"
      @change="handleFileSelect"
    />

    <div class="text-center">
      <UploadIcon
        :class="[
          'w-10 h-10 mx-auto transition-colors duration-200',
          isDragOver ? 'text-blue-500' : 'text-gray-500',
        ]"
      />
      <p class="mt-2 text-sm text-gray-400">
        {{ isDragOver ? 'Drop your CSV file here' : 'Click or drag CSV file here' }}
      </p>
    </div>
  </div>
</template>
