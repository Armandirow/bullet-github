import { Heroine, heroinesInformationsMap } from '@/types/heroine.types'
import type { Pattern, PatternName } from '@/types/pattern.types'
import { getShuffledArray } from '@/utils/math'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSightStore } from './sight'
import { useActionStore } from './action'

export const usePatternStore = defineStore('pattern', () => {
  const drawPile = ref<Pattern[]>([])
  const hand = ref<Pattern[]>([])
  const discardPile = ref<Pattern[]>([])
  const patternSelected = ref<Pattern>()

  const drawPattern = () => {
    const [patternDrawn, ...shuffledPatterns] = getShuffledArray(drawPile.value)
    drawPile.value = [...shuffledPatterns]
    hand.value.push(patternDrawn)
  }

  const selectPattern = (id: PatternName) => {
    const pattern = hand.value.find((pattern) => pattern.id === id)
    if (!pattern) {
      patternSelected.value = undefined
      throw new Error(`pattern with id ${id} not found in hand`)
    }
    const actionStore = useActionStore()
    actionStore.unselectAction()
    patternSelected.value = pattern
  }
  const unselectPattern = () => {
    patternSelected.value = undefined
  }

  const playPatternSelected = ({ posCol, posRow }: { posCol: number; posRow: number }) => {
    if (!patternSelected.value) {
      throw new Error(`You need to select a pattern before trying to play it`)
    }
    const sightStore = useSightStore()
    sightStore.playPattern({ pattern: patternSelected.value, posCol, posRow })
    const patternId = patternSelected.value.id
    hand.value = [...hand.value.filter((pattern) => pattern.id !== patternId)]
    patternSelected.value = undefined
  }

  const initialize = (hero: Heroine) => {
    heroinesInformationsMap[hero]
    drawPile.value = heroinesInformationsMap[hero].patterns
    discardPile.value = []
    patternSelected.value = undefined
    hand.value = []
    for (let i = 0; i < heroinesInformationsMap[hero].handSize; i++) {
      drawPattern()
    }
  }

  return {
    drawPile,
    hand,
    patternSelected,
    initialize,
    selectPattern,
    unselectPattern,
    playPatternSelected
  }
})
