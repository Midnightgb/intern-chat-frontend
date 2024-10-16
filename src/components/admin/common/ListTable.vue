<template>
  <div class="relative">
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell v-for="Header in Headers" :key="Header">
          {{ Header }}
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="object in objects" :key="object.id">
          <fwb-table-cell v-for="Objectkey in Object.keys(object)" :key="Objectkey">
            {{ object[Objectkey] }}
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

defineProps({
objects: {
  type: Array,
  required: true
},
Objectkey: {
  type: String,
  required: true
},
Headers: {
  type: Array,
  required: true
}
})

</script>

