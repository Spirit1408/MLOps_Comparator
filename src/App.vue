<script setup>
import MainTitle from "./components/MainTitle/MainTitle.vue";
import UploadField from "./components/UploadField/UploadField.vue";
import LogsData from "./components/DataInfo/DataInfo.vue";
import DataCharts from "./components/DataCharts/DataCharts.vue";
</script>

<template>
  <div class="flex flex-col gap-10 h-screen py-10">
    <MainTitle />

    <UploadField />

    <LogsData />

    <DataCharts />
  </div>
</template>
