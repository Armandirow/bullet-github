import { defineStore } from 'pinia'
import { useBag } from '@/composables/bag'
import { BulletColor, type Bullet, type BulletNumber } from '@/types/bullet.types'
import { onMounted } from 'vue'

export const useCenterBagStore = defineStore('center-bag', () => {
  const { bag: centerBag, pickRandomBullet, shuffle } = useBag()

  const initialize = () => {
    // Initialize 140 bullets
    // 5 Colors
    // 8 bullets for number 1, 2 and 3 with 2 starred bullet
    // 4 bullets for number 4 with 2 starred bullet

    const colors = [
      BulletColor.RED,
      BulletColor.BLUE,
      BulletColor.GREEN,
      BulletColor.YELLOW,
      BulletColor.PURPLE
    ]
    const numbers: BulletNumber[] = [1, 2, 3, 4]

    const bullets = colors.flatMap((color) => {
      return numbers.flatMap((number) => {
        const nbBulletsForNumber = number === 4 ? 4 : 8
        const nbBullets = [...Array(nbBulletsForNumber).keys()]
        return nbBullets.map((indexBullet): Bullet => {
          return {
            id: window.crypto.randomUUID(),
            color,
            isStared: indexBullet >= nbBulletsForNumber - 2,
            number,
            column: color,
            row: 0, //first row, in the placeholder before falling down
            top: 0,
            left: 0,
            startAnimation: false
          }
        })
      })
    })
    centerBag.value.bullets = [...bullets]
  }

  onMounted(() => {
    initialize()
  })

  return { centerBag, shuffle, pickRandomBullet }
})
