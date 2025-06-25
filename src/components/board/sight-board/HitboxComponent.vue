<script setup lang="ts">
const hitbarCount = 5
</script>

<template>
  <!-- Hitbar (5 circles, grid-aligned) -->
  <div class="relative w-full bg-blue px-2 flex flex-col items-center justify-center">
    <div class="absolute left-0 right-8 top-1/2 -translate-y-1/2 h-4 bg-white opacity-95 z-0"></div>
    <div class="grid grid-cols-5 gap-x-4 w-full h-full z-10">
      <span v-for="n in hitbarCount" :key="'hitbar-' + n" class="flex items-center justify-center">
        <svg viewBox="0 0 64 64" fill="white" stroke="#3B82F6" stroke-width="2">
          <circle cx="32" cy="32" r="24" />
          <!-- Three larger left-pointing triangles centered in the circle -->
          <path d="M48 26L48 38L36 32L48 26Z" fill="white" />
          <path d="M36 26L36 38L24 32L36 26Z" fill="white" />
          <path d="M24 26L24 38L12 32L24 26Z" fill="white" />
        </svg>
      </span>
    </div>
  </div>
</template>
