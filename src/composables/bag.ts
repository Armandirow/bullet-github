import { type Bag, type Bullet } from '@/types/bullet.types'
import { getShuffledArray } from '@/utils/math'
import { computed, ref } from 'vue'

export const useBag = () => {
  const bag = ref<Bag>({ bullets: [] })
  const remainingBullets = computed(() => bag.value.bullets.length)

  const shuffle = () => {
    bag.value = { ...bag, bullets: [...getShuffledArray(bag.value.bullets)] }
  }

  const pickRandomBullet = () => {
    if (remainingBullets.value === 0) {
      throw new Error('No bullets remaining in this bag')
    }
    shuffle()
    const [pickedBullet, ...newRemainingBullets] = bag.value.bullets
    bag.value.bullets = [...newRemainingBullets]
    return pickedBullet
  }

  const addBullet = (bullet: Bullet) => {
    bag.value.bullets = [...bag.value.bullets, bullet]
  }

  return { pickRandomBullet, shuffle, addBullet, bag }
}
