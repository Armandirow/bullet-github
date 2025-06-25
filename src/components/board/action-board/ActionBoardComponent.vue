<script setup lang="ts">
import ActionPointTrackSvg from '@/components/svg/ActionPointTrackSvg.vue'
import PowerupContainer from './PowerupContainer.vue'
import { useActionStore } from '@/stores/action'
import { onMounted } from 'vue'
import { Heroine } from '@/types/heroine.types'
import { isSimpleAction, type ActionName } from '@/types/action.types'
import ActionContainerSvg from '@/components/svg/ActionContainerSvg.vue'

const actionStore = useActionStore()

const onActionClick = (actionName: ActionName) => {
  if (actionStore.actionSelected?.name === actionName) {
    actionStore.unselectAction()
  } else {
    actionStore.selectAction(actionName)
  }
}

onMounted(() => {
  actionStore.initialize(Heroine.ESFIR_VOLKOVA)
})
</script>

<template>
  <div class="bg-green-100 flex gap-4 items-start p-4">
    <ActionPointTrackSvg class="py-4 h-full shrink-0"></ActionPointTrackSvg>
    <div class="grid gap-4 grid-cols-2 w-full pt-16">
      <template v-for="action of actionStore.actions" :key="action.name">
        <div class="w-full aspect-square" @click="() => onActionClick(action.name)">
          <ActionContainerSvg
            class="rounded-xl w-full h-full border-2"
            :class="`${actionStore.actionSelected?.name === action.name ? 'border-red' : 'border-white'} ${isSimpleAction(action) ? 'cursor-pointer' : ''}`"
            :action="action"
          ></ActionContainerSvg>
        </div>
      </template>
      <PowerupContainer></PowerupContainer>
      <PowerupContainer></PowerupContainer>
      <PowerupContainer></PowerupContainer>
    </div>
  </div>
</template>
