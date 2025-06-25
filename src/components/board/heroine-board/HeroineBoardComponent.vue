<script setup lang="ts">
import { NOTYF_INJECTION_KEY } from '@/main'
import { inject, onMounted, onUnmounted, ref, computed } from 'vue'
import { useSightStore } from '@/stores/sight'
import { useCurrentBagStore } from '@/stores/current-bag'
import { usePatternStore } from '@/stores/pattern'
import { Heroine } from '@/types/heroine.types'
import type { PatternName } from '@/types/pattern.types'
import PatternElementSvg from '@/components/svg/PatternElementSvg.vue'
import { getGridCols, getGridRows } from '@/utils/getCssClass'
import FancyButton from '@/components/ui/FancyButton.vue'

const sightStore = useSightStore()
const patternStore = usePatternStore()
const currentBagStore = useCurrentBagStore()

const notyf = inject(NOTYF_INJECTION_KEY)
// const pickedBullet = ref<Bullet>()
const refillCurrentBag = () => {
  currentBagStore.refill()
}

const pickOne = async () => {
  try {
    await sightStore.pickOne()
  } catch (error) {
    console.warn(`${error}`)
    notyf?.error({ message: `${error}` })
  }
}

const onPatternClick = (patternId: PatternName) => {
  if (patternStore.patternSelected?.id === patternId) {
    patternStore.unselectPattern()
  } else {
    patternStore.selectPattern(patternId)
  }
}

const maxHealth = 5 // TODO: replace with store value
const currentHealth = 3 // TODO: replace with store value

// Track viewport dimensions
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)

// Calculate responsive max size based on viewport
const maxElementSize = computed(() => {
  const vw = viewportWidth.value
  const vh = viewportHeight.value

  // Base size on smaller viewport dimension to maintain aspect ratio
  const baseSize = Math.min(vw, vh * (1700 / 940))

  // Scale factor - adjust these values to fine-tune the sizing
  const scaleFactor = 0.03 // 1.5% of viewport

  return `${baseSize * scaleFactor}px`
})

// Handle resize events
const handleResize = () => {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}

onMounted(() => {
  patternStore.initialize(Heroine.ESFIR_VOLKOVA)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="bg-blue-300 flex flex-col justify-between h-full">
    <div class="flex flex-col gap-4 h-[10%]">
      <div class="pl-4">Heroine info</div>
      <div
        class="place-self-end rounded-lg border border-r-0 rounded-r-none border-blue-900 bg-black bg-opacity-25 text-white py-1 px-2"
      >
        Heroine phrase
      </div>
    </div>
    <div class="flex gap-4 justify-center h-[10%]">
      <FancyButton
        icon="pick"
        :disabled="sightStore.isFiring || currentBagStore.currentBag.bullets.length === 0"
        @click="pickOne"
      >
        Pick One
      </FancyButton>
      <FancyButton
        icon="refill"
        :disabled="currentBagStore.currentBag.bullets.length > 0"
        @click="refillCurrentBag"
      >
        Refill
      </FancyButton>
    </div>
    <div class="bg-red-400 p-4 flex flex-col gap-2 h-[10%]">
      <div class="bg-blue-200 rounded-2xl p-4">
        Nombre de balles restantes: {{ sightStore.nbBulletsRemaining }}
      </div>
    </div>
    <div class="bg-green-100 p-4 h-[50%] w-full">
      <div class="flex flex-col gap-4 h-full w-full justify-center items-center">
        <h3 class="text-lg font-semibold text-blue-900">Motifs disponibles</h3>
        <div
          class="flex flex-col flex-1 gap-4 pb-2 px-2 flex-wrap overflow-auto w-full justify-center items-center"
          v-if="patternStore.hand.length > 0"
        >
          <template v-for="pattern in patternStore.hand" :key="pattern.name">
            <div class="group relative h-full flex justify-center items-center">
              <!-- Popover for pattern name -->
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50"
              >
                <div
                  class="bg-blue-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                >
                  {{ pattern.name }}
                </div>
              </div>

              <div
                class="group z-20 hover:z-30 bg-blue-200 rounded-2xl p-4 cursor-pointer border-2 transition-all duration-200 hover:scale-[1.05] hover:shadow-lg w-full my-2 max-h-[90%]"
                :class="[
                  patternStore.patternSelected?.id === pattern.id
                    ? 'border-red-600 shadow-lg scale-105'
                    : 'border-blue-200 hover:border-blue-400'
                ]"
                @click="() => onPatternClick(pattern.id)"
              >
                <div class="flex flex-col gap-2 items-center justify-center h-fit">
                  <div
                    class="grid bg-white/50 rounded-lg p-2 w-fit h-fit"
                    :class="`${getGridCols(pattern.columnLength)} ${getGridRows(pattern.rowLength)}`"
                  >
                    <template
                      v-for="(rows, rowIndex) of pattern.grid"
                      :key="`patter-${pattern.id}-grid-row-${rowIndex}`"
                    >
                      <template
                        v-for="(patternElement, colIndex) of rows"
                        :key="`patter-${pattern.id}-grid-row-${rowIndex}-col-${colIndex}`"
                      >
                        <PatternElementSvg
                          class="border border-black/20 w-full h-full"
                          :style="{ maxWidth: maxElementSize, maxHeight: maxElementSize }"
                          :patternElement="patternElement"
                        >
                        </PatternElementSvg>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-else class="text-center text-blue-900/60 py-4">Aucun motif disponible</div>
      </div>
    </div>
    <div
      class="h-[8.25%] flex flex-col items-center justify-center bg-black/30 rounded-t-lg border-x border-t border-blue-900"
    ></div>
    <div class="relative px-4 h-[11.75%] bg-blue-600 w-full">
      <!-- Horizontal line behind hearts -->
      <div
        class="absolute left-8 right-0 top-1/2 -translate-y-1/2 h-4 bg-white opacity-80 z-0"
      ></div>
      <!-- Hearts -->
      <div class="flex items-center justify-center gap-3 z-10 w-full h-full">
        <span v-for="n in maxHealth" :key="n" class="w-full">
          <svg
            v-if="n <= currentHealth"
            viewBox="0 0 24 24"
            fill="white"
            stroke="#3B82F6"
            stroke-width="2"
            style="filter: drop-shadow(0 0 6px #60a5fa)"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="#93c5fd"
            stroke-width="2"
            style="filter: drop-shadow(0 0 2px #bae6fd)"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
