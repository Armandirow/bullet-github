<script setup lang="ts">
import { BulletColor as Color, type Bullet } from '@/types/bullet.types'
import HitboxComponent from './HitboxComponent.vue'
import { useSightStore } from '@/stores/sight'
import BulletColumns from './BulletColumns.vue'
import { getColSpan, getColStart, getRowSpan, getRowStart } from '@/utils/getCssClass'
import { computed, inject, ref } from 'vue'
import { useElementBounding, useMouseInElement } from '@vueuse/core'
import BulletSvg from '@/components/svg/BulletSvg.vue'
import { usePatternStore } from '@/stores/pattern'
import PatternElementSvg from '@/components/svg/PatternElementSvg.vue'
import { NOTYF_INJECTION_KEY } from '@/main'
import { useActionStore } from '@/stores/action'
import ActionBulletSelectSvg from '@/components/svg/ActionBulletSelectSvg.vue'

// Grid configuration constants
const GRID_CONFIG = {
  COLUMNS: 5,
  ROWS: 7,
  // ANIMATION_ROW: 1,
  FIRST_PLAYABLE_ROW: 2,
  LAST_PLAYABLE_ROW: 7,
  FIRST_PLAYABLE_COLUMN: 1,
  LAST_PLAYABLE_COLUMN: 5
} as const

// // Type for grid position
// type GridPosition = {
//   column: 1 | 2 | 3 | 4 | 5
//   row: typeof GRID_CONFIG.FIRST_PLAYABLE_ROW | typeof GRID_CONFIG.LAST_PLAYABLE_ROW
// }

// Tailwind class constants
const GRID_CLASSES = {
  container:
    'grid grid-cols-5 grid-rows-7 grid-flow-col w-full h-full gap-x-8 items-center place-items-center',
  selectedBullet: 'w-1/2 h-1/2',
  patternPreview:
    'gap-x-8 border-4 rounded border-blue grid grid-cols-subgrid grid-rows-subgrid cursor-pointer '
} as const

const sightStore = useSightStore()
const patternStore = usePatternStore()
const actionStore = useActionStore()
const notyf = inject(NOTYF_INJECTION_KEY)

const boardGridEl = ref<HTMLDivElement | null>(null)

const { width, height } = useElementBounding(boardGridEl)
const bulletContainerWidth = computed(() => width.value / GRID_CONFIG.COLUMNS)
const bulletContainerHeight = computed(() => height.value / GRID_CONFIG.ROWS)

const { isOutside, elementX, elementY } = useMouseInElement(boardGridEl)

const mouseColSpan = computed(() =>
  patternStore.patternSelected
    ? getColSpan(patternStore.patternSelected.columnLength)
    : 'col-span-1'
)
const mouseRowSpan = computed(() =>
  patternStore.patternSelected ? getRowSpan(patternStore.patternSelected.rowLength) : 'row-span-1'
)

const getGridPosition = (
  elementPos: number,
  containerSize: number,
  patternSize: number,
  maxSize: number,
  minStart: number
): number => {
  const start = Math.ceil(elementPos / containerSize) - Math.ceil(patternSize / 2) + 1
  const maxStart = maxSize - patternSize + 1
  return Math.max(minStart, Math.min(start, maxStart))
}

const mouseRowStart = computed(() => {
  const patternRow = patternStore.patternSelected?.rowLength ?? 1
  return getGridPosition(
    elementY.value,
    bulletContainerHeight.value,
    patternRow,
    GRID_CONFIG.ROWS,
    GRID_CONFIG.FIRST_PLAYABLE_ROW
  )
})

const mouseColStart = computed(() => {
  const patternCol = patternStore.patternSelected?.columnLength ?? 1
  return getGridPosition(
    elementX.value,
    bulletContainerWidth.value,
    patternCol,
    GRID_CONFIG.COLUMNS,
    GRID_CONFIG.FIRST_PLAYABLE_COLUMN
  )
})

const patternError = ref(false)
const isPatternOnCooldown = ref(false)

const onPatternClick = () => {
  if (isPatternOnCooldown.value) return

  try {
    console.log(mouseColStart.value, mouseRowStart.value)
    patternStore.playPatternSelected({
      posCol: mouseColStart.value,
      posRow: mouseRowStart.value - 1
    })
    patternError.value = false
  } catch (error) {
    console.warn(`${error}`)
    notyf?.open({ message: `${error}`, type: 'warn' })
    patternError.value = true
    setTimeout(() => {
      patternError.value = false
    }, 500)
  } finally {
    isPatternOnCooldown.value = true
    setTimeout(() => {
      isPatternOnCooldown.value = false
    }, 300)
  }
}

const onBulletPressed = (bullet: Bullet) => {
  if (actionStore.actionSelected === undefined) {
    return
  }
  sightStore.selectBullet(bullet)
}
</script>

<template>
  <div class="bg-green-200 gap-0 items-center flex flex-col h-full">
    <div class="w-full px-8 h-[6%]">
      <div class="bg-white border border-t-0 border-blue-600 rounded-lg rounded-t-none px-4 py-1">
        Current
      </div>
    </div>
    <div class="w-full h-[82.25%] px-4">
      <div :class="[GRID_CLASSES.container, 'relative  ']" v-if="sightStore.sightBoard">
        <template v-for="(columns, color) in sightStore.sightBoard" :key="`column-${color}`">
          <BulletColumns :color="color" />
        </template>
        <div
          ref="boardGridEl"
          :class="[GRID_CLASSES.container, 'absolute top-0 left-0 items-center']"
        >
          <template v-for="bullet in sightStore.bulletsOnBoard" :key="`bullet-${bullet.id}`">
            <div
              :class="[
                'relative w-full h-full',
                getColStart(bullet.column),
                getRowStart(bullet.row),
                'duration-500 ease-in-out',
                bullet.startAnimation ? 'transition-all' : 'transition-none',
                sightStore.selectedBullet?.id === bullet.id ? GRID_CLASSES.selectedBullet : '',
                bullet.isDestroying ? 'animate-destroy' : ''
              ]"
              :style="{
                top: `${bullet.top * bulletContainerHeight}px`,
                left: `${bullet.left * bulletContainerWidth}px`
              }"
            >
              <BulletSvg
                class="w-full h-full"
                @pressed="() => onBulletPressed(bullet)"
                :number="bullet.number"
                :color="bullet.color"
                :is-stared="bullet.isStared"
              ></BulletSvg>
              <div class="absolute top-0 w-full h-full flex justify-center items-center">
                <ActionBulletSelectSvg
                  class="fill-white"
                  v-if="sightStore.selectedBullet?.id === bullet.id"
                ></ActionBulletSelectSvg>
              </div>
            </div>
          </template>
        </div>
        <div
          :class="[
            GRID_CLASSES.container,
            'absolute top-0 left-0',
            !isOutside && patternStore.patternSelected ? 'z-10' : '-z-10'
          ]"
        >
          <div
            v-if="!isOutside && patternStore.patternSelected"
            :class="[
              GRID_CLASSES.patternPreview,
              `col-start-${mouseColStart}`,
              `row-start-${mouseRowStart}`,
              mouseColSpan,
              mouseRowSpan,
              patternError ? 'animate-warning border-red-500' : 'border-blue-500',
              isPatternOnCooldown ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            ]"
            @click="onPatternClick"
          >
            <!-- AFFICHER EN BORDER LA FORME DU PATTERN CHOISI POUR POUVOIUR L'APPLIQUER A L'ENDROIT VOULU -->
            <template
              v-for="(rows, rowIndex) of patternStore.patternSelected.grid"
              :key="`subgrid-row-${rowIndex}`"
            >
              <template
                v-for="(patternElement, colIndex) of rows"
                :key="`subgrid-row-${rowIndex}-col-${colIndex}`"
              >
                <PatternElementSvg class="w-full h-full" :patternElement="patternElement">
                </PatternElementSvg>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="flex h-full w-full row-span-67" v-else>
        <BulletColumns :color="Color.RED" />
        <BulletColumns :color="Color.BLUE" />
        <BulletColumns :color="Color.GREEN" />
        <BulletColumns :color="Color.YELLOW" />
        <BulletColumns :color="Color.PURPLE" />
      </div>
    </div>
    <HitboxComponent class="h-[11.75%]"></HitboxComponent>
  </div>
</template>

<style scoped>
.animate-destroy {
  animation: destroy 0.5s ease-out forwards;
}

.animate-warning {
  animation: warning 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
}

@keyframes destroy {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes warning {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(4px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-6px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(6px, 0, 0);
  }
}
</style>
