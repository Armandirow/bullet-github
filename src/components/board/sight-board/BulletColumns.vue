<script setup lang="ts">
import { BulletColor, Line } from '@/types/bullet.types'
import BulletContainer from './BulletContainer.vue'
import TriangleSvg from '@/components/svg/TriangleSvg.vue'
import { getShadowColor } from '@/utils/getCssClass'

defineProps<{
  color: BulletColor
}>()
</script>

<template>
  <div class="flex flex-col items-center w-full h-full justify-center relative">
    <div
      class="w-1/2 rounded-full aspect-square flex items-center justify-center"
      :class="getShadowColor(color)"
    >
      <div class="bg-slate-100 w-11/12 aspect-square rounded-full"></div>
    </div>
    <TriangleSvg :color="color" class="absolute w-2 h-2 bottom-0 md:w-4 md:h-4"></TriangleSvg>
  </div>
  <BulletContainer
    :line="Line.FIRST"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
  <BulletContainer
    :line="Line.SECOND"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
  <BulletContainer
    :line="Line.THIRD"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
  <BulletContainer
    :line="Line.FOURTH"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
  <BulletContainer
    :line="Line.FIFTH"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
  <BulletContainer
    :line="Line.SIXTH"
    :color="color"
    :class="getShadowColor(color)"
  ></BulletContainer>
</template>
