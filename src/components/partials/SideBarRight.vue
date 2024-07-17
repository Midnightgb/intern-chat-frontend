<template>
  <aside class="bg-background border-l flex flex-col items-center gap-2 p-4 w-16 sm:w-64">
    <div class="flex flex-col items-center gap-2 w-full">
      <div class="flex flex-col items-center gap-2 w-full">
        <a class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full" href="#">
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
            <span class="ml-2 text-sm font-medium hidden sm:inline">Direct Messages</span>
          </div>
        </a>
      </div>
      <div class="flex-1"></div>
      <div class="flex items-center gap-2 w-full">
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <img class="aspect-square h-full w-full" alt="User Avatar" src="/images/placeholder-user.png" />
        </span>
        <div class="text-sm font-medium hidden sm:inline">John Doe</div>
<!--         <a class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground ml-auto" href="#">
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span class="ml-2 text-sm font-medium hidden sm:inline">Settings</span>
          </div>
        </a> -->
        <ToolTip triggerText="Configuraciones" :triggerIcon="'<Settings />'" tooltipContent="Ajutes de usuario" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import ToolTip from '../layout/ToolTip.vue';
</script>
