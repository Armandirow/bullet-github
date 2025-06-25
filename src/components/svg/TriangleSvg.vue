<script setup lang="ts">
import { BulletColor } from '@/types/bullet.types'
import { getDropShadow, getDropShadowSm } from '@/utils/getCssClass'

const props = defineProps<{
  color: BulletColor
}>()

const dropShadow = getDropShadow(props.color)
const dropShadowSm = getDropShadowSm(props.color)
</script>

<template>
  <svg :class="dropShadow" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_32_2)">
      <path d="M32 64L0 0H64L32 64Z" fill="current" />
      <path :class="dropShadowSm" d="M32 48L12 8H52L32 48Z" fill="white" />
    </g>
  </svg>
</template>
