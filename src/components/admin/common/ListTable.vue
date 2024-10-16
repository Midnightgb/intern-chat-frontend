<template>
  <div class="relative">
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell v-for="header in headers" :key="header">
          {{ header }}
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="item in items" :key="item[keyField]">
          <fwb-table-cell v-for="field in fields" :key="field">
            {{ formatField(item[field], field) }}
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
  </div>
</template>

<script setup>
import {
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  keyField: {
    type: String,
    required: true
  },
  formatters: {
    type: Object,
    default: () => ({})
  }
})

const formatField = (value, field) => {
  if (props.formatters[field]) {
    return props.formatters[field](value)
  }
  return value
}
</script>