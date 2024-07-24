//src/components/common/DropDown.vue
<template>
  <fwb-dropdown text="Click me" placement="top">
    <fwb-list-group>
      <fwb-list-group-item>Item #1</fwb-list-group-item>
      <fwb-list-group-item>Item #2</fwb-list-group-item>
      <fwb-list-group-item>Item #3</fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
</script>
