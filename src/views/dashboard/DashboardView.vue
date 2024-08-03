<template>
  <div class="flex flex-grow bg-gray-100">
    <SidebarLeft />
    <SideBarRight />
    <MainContent />
  </div>
</template>

<script setup>
import SidebarLeft from '@/components/layout/SideBarLeft.vue'
import SideBarRight from '@/components/layout/SideBarRight.vue'
import MainContent from '@/components/layout/MainContent.vue'
</script>