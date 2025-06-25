<script setup lang="ts">
import BulletContainerSvg from '@/components/svg/BulletContainerSvg.vue'
import { BulletColor, Line } from '@/types/bullet.types'
import { getShadowColor } from '@/utils/getCssClass'

defineProps<{
  color: BulletColor
  line: Line
}>()
</script>

<template>
  <div class="w-full aspect-square rounded-full" :class="getShadowColor(color)">
    <BulletContainerSvg :line="line" :color="color"> </BulletContainerSvg>
  </div>
</template>
