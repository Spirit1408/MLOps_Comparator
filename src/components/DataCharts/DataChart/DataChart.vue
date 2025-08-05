<script setup>
import ChartButton from './ChartButton/ChartButton.vue'
</script>

<template>
  <div class="flex gap-2 bg-black rounded-lg">
    <div class="border-r border-gray-400">
      <ul class="divide-y divide-gray-400">
        <li>
          <ChartButton experiment="Experiment 1" />
        </li>
        <li>
          <ChartButton experiment="Experiment 2" />
        </li>
        <li>
          <ChartButton experiment="Experiment 3" />
        </li>
        <li>
          <ChartButton experiment="Experiment 4" />
        </li>
      </ul>
    </div>

    <div class="flex-grow">charts</div>
  </div>
</template>
