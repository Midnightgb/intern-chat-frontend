<template>
    <div class="relative">
      <fwb-table hoverable>
        <fwb-table-head>
          <fwb-table-head-cell>
            ID
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Nombre
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Estado
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Fecha de creacion
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Fecha de actualizacion
          </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="permission in permissions" :key="permission.id_permission">
            <fwb-table-cell>
              {{ permission.id_permission }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ permission.name }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ permission.status_permission ? 'Activo' : 'Inactivo'  }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ new Date(permission.created_at).toLocaleString('es-ES') }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ new Date(permission.updated_at).toLocaleString('es-ES') }}
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
  permissions: {
    type: Array,
    required: true
  }
})

</script>

