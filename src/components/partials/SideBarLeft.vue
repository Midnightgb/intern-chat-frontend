<template>
  <aside class="bg-background border-r flex flex-col items-center gap-2 p-4 w-16 sm:w-64">
    <div class="flex flex-col items-center gap-2 w-full">
      <a class="bg-primary rounded-lg p-2 text-primary-foreground w-full" href="#">
        <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </div>
      </a>
      <div class="flex flex-col items-center gap-2 w-full">
        <a v-for="(server, index) in servers" :key="index"
          class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
          href="#">
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
              <line x1="6" x2="6.01" y1="6" y2="6"></line>
              <line x1="6" x2="6.01" y1="18" y2="18"></line>
            </svg>
            <span class="ml-2 text-sm font-medium hidden sm:inline">{{ server }}</span>
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup>
  const servers = ['Server 1', 'Server 2', 'Server 3', 'Server 4'];
</script>