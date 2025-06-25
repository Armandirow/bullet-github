import { defineStore } from 'pinia'
import { useBag } from '@/composables/bag'
import { onMounted, ref } from 'vue'
import { useCenterBagStore } from './center-bag'

const BULLET_START_NUMBER = 10
const INTENSITY_START = 4

export const useCurrentBagStore = defineStore('current-bag', () => {
  const { bag: currentBag, pickRandomBullet, addBullet, shuffle } = useBag()
  const centerBagStore = useCenterBagStore()
  const intensity = ref<number>(INTENSITY_START)

  const pickRandomBullets = (nb: number) => {
    for (let i = 0; i < nb; i++) {
      const bullet = centerBagStore.pickRandomBullet()
      addBullet(bullet)
      shuffle()
    }
  }

  const refill = () => {
    pickRandomBullets(intensity.value)
    intensity.value += 1
  }

  onMounted(() => {
    pickRandomBullets(BULLET_START_NUMBER)
    refill()
  })

  return { currentBag, pickRandomBullet, refill }
})
