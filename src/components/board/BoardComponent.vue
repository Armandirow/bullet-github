<script setup lang="ts">
import ActionBoardComponent from './action-board/ActionBoardComponent.vue'
import HeroineBoardComponent from './heroine-board/HeroineBoardComponent.vue'
import SightBoard from './sight-board/SightBoard.vue'
</script>

<template>
  <div class="flex h-full max-h-screen aspect-[630/348]">
    <HeroineBoardComponent class="w-[31%]"></HeroineBoardComponent>
    <SightBoard class="w-[38%]"></SightBoard>
    <ActionBoardComponent class="w-[31%]"></ActionBoardComponent>
  </div>
</template>
