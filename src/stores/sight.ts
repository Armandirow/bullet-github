import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useCurrentBagStore } from './current-bag'
import {
  BulletColor as Color,
  type Bullet,
  type BulletColumn,
  type SightBoard
} from '@/types/bullet.types'
import { PatternElementType, type Pattern } from '@/types/pattern.types'
import { useActionStore } from './action'

export const useSightStore = defineStore('sight', () => {
  const sightBoard = ref<SightBoard>({
    [Color.RED]: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [Color.BLUE]: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [Color.GREEN]: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [Color.YELLOW]: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [Color.PURPLE]: [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
  })
  const destroyedBullets = ref<Bullet[]>([])
  const currentBagStore = useCurrentBagStore()
  const selectedBullet = ref<Bullet | undefined>()
  const isFiring = ref(false)

  const bulletsOnBoard = computed(() => {
    return Object.values(sightBoard.value).flatMap((column) =>
      column.filter((bullet): bullet is Bullet => bullet !== undefined)
    )
  })

  const nbBulletsDestroyed = computed(() => destroyedBullets.value.length)
  const nbBulletsRemaining = computed(() => currentBagStore.currentBag.bullets.length)

  const getMoveDownPosition = ({
    bulletColumn,
    rowNumber,
    numberOfMoves
  }: {
    bulletColumn: BulletColumn
    rowNumber: number
    numberOfMoves: number
  }): [number, boolean] => {
    console.log(`next  [${rowNumber}] needToMove: ${numberOfMoves}\n${bulletColumn[rowNumber]}`)
    if (numberOfMoves === 0) {
      return [rowNumber, true]
    }
    if (rowNumber + 1 > 6) {
      return [rowNumber, false]
    }
    if (bulletColumn[rowNumber + 1] !== undefined) {
      return getMoveDownPosition({
        bulletColumn,
        numberOfMoves: numberOfMoves,
        rowNumber: rowNumber + 1
      })
    }
    return getMoveDownPosition({
      bulletColumn,
      numberOfMoves: numberOfMoves - 1,
      rowNumber: rowNumber + 1
    })
  }

  const updateOneBullet = (bullet: Bullet, udatedFields: Partial<Bullet>) => {
    sightBoard.value[bullet.column][bullet.row] = undefined
    const updatedBullet = {
      ...bullet,
      ...udatedFields
    }
    sightBoard.value[updatedBullet.column][updatedBullet.row] = updatedBullet
    return updatedBullet
  }

  const startAnimation = (bullet: Bullet, { left, top }: { left: number; top: number }) => {
    updateOneBullet(bullet, { startAnimation: true, left, top })
  }

  const stopAnimation = (bullet: Bullet) => {
    updateOneBullet(bullet, { startAnimation: false, left: 0, top: 0 })
  }

  const pickOne = async () => {
    if (isFiring.value) {
      throw new Error('Please wait for the current bullet to settle')
    }

    isFiring.value = true
    try {
      const bullet = currentBagStore.pickRandomBullet()
      sightBoard.value[bullet.column][bullet.row] = bullet
      await new Promise((resolve) => setTimeout(resolve, 100))
      const bulletColumn = sightBoard.value[bullet.column]
      const [rowNumber, canMove] = getMoveDownPosition({
        bulletColumn,
        numberOfMoves: bullet.number,
        rowNumber: bullet.row
      })
      if (canMove) {
        updateOneBullet(bullet, { top: rowNumber - bullet.row, startAnimation: true })
        await new Promise((resolve) => setTimeout(resolve, 500))
        updateOneBullet(bullet, {
          row: rowNumber,
          top: 0,
          startAnimation: false
        })
      } else {
        throw new Error('cannot move down, lose 1 hp')
      }
    } finally {
      isFiring.value = false
    }
  }

  const getColumnColor = (colPos: number): Color => {
    switch (colPos) {
      case 1:
        return Color.RED
      case 2:
        return Color.BLUE
      case 3:
        return Color.GREEN
      case 4:
        return Color.YELLOW
      case 5:
        return Color.PURPLE
      default:
        throw new Error('not in range')
    }
  }

  const destroyBullets = async (bullets: Bullet[]) => {
    for (const bullet of bullets) {
      bullet.isDestroying = true
      await new Promise((resolve) => setTimeout(resolve, 500))
      sightBoard.value[bullet.column][bullet.row] = undefined
      if (bullet.isStared) {
        const actionStore = useActionStore()
        actionStore.activateStarActions()
      }
      destroyedBullets.value.push(bullet)
    }
  }

  const selectBullet = (bulletToSelect: Bullet) => {
    const bullet = sightBoard.value[bulletToSelect.column][bulletToSelect.row]
    if (bullet?.id !== bulletToSelect.id) {
      selectedBullet.value = undefined
      throw new Error(`selected Bullet not found`)
    }
    selectedBullet.value = bullet
  }

  const moveBulletAnimated = async (bullet: Bullet, newColumn: Color, newRow: number) => {
    if (isFiring.value) {
      throw new Error('Please wait for the current bullet to settle')
    }

    // Check if target position is occupied
    if (sightBoard.value[newColumn][newRow]) {
      throw new Error('Target position is occupied')
    }

    isFiring.value = true
    try {
      // Calculate movement offsets
      const currentPosition = getPositionByColumnColor(bullet.column)
      const newPosition = getPositionByColumnColor(newColumn)
      const columnOffset = newPosition - currentPosition
      const rowOffset = newRow - bullet.row

      // Start animation
      startAnimation(bullet, { left: columnOffset, top: rowOffset })

      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove from current position and update bullet
      sightBoard.value[bullet.column][bullet.row] = undefined
      bullet.column = newColumn
      bullet.row = newRow

      // Place in new position and reset animation
      stopAnimation(bullet)

      // Clear selection
      selectedBullet.value = undefined
    } finally {
      isFiring.value = false
    }
  }

  const getPositionByColumnColor = (color: Color): number => {
    switch (color) {
      case Color.RED:
        return 1
      case Color.BLUE:
        return 2
      case Color.GREEN:
        return 3
      case Color.YELLOW:
        return 4
      case Color.PURPLE:
        return 5
      default:
        throw new Error('Invalid column color')
    }
  }

  const playPattern = ({
    pattern,
    posCol,
    posRow
  }: {
    pattern: Pattern
    posCol: number
    posRow: number
  }) => {
    let sameNumber: number | undefined = undefined
    const bulletsDestroyed: Bullet[] = []
    // const colored = pattern.grid[0].filter((el) => el.type === PatternElementType.COLORED_BULLET)
    for (const [patternRowIndex, patternRow] of pattern.grid.entries()) {
      for (const [patternColIndex, patternElement] of patternRow.entries()) {
        const sightElement =
          sightBoard.value[getColumnColor(posCol + patternColIndex)][posRow + patternRowIndex]
        console.log({ pattern: { ...patternElement }, sightEl: { ...sightElement } })
        switch (patternElement.type) {
          case PatternElementType.BLANK:
            // do nothing
            break
          case PatternElementType.COLORED_BULLET:
            if (patternElement.color !== sightElement?.color) {
              throw new Error('Color is not the same  as pattern')
            }
            break
          case PatternElementType.NO_BULLET:
            if (sightElement !== undefined) {
              throw new Error('A bullet is present on space')
            }

            break
          case PatternElementType.ANY_BULLET:
            if (!sightElement) {
              throw new Error('No bullet on space')
            }
            if (patternElement.isdestroyed) {
              bulletsDestroyed.push(sightElement)
            }
            break
          case PatternElementType.DESTROY:
            if (sightElement) {
              bulletsDestroyed.push(sightElement)
            }
            break
          case PatternElementType.NUMBERED_BULLET:
            if (!sightElement) {
              throw new Error('No bullet on space')
            }
            if (patternElement.number !== sightElement.number) {
              throw new Error('Bullet number is not the same as pattern')
            }
            break
          case PatternElementType.SAME_NUMBER:
            if (!sightElement) {
              throw new Error('No bullet on space')
            }
            if (sameNumber === undefined) {
              sameNumber = sightElement.number
              break
            }
            if (sameNumber !== sightElement.number) {
              throw new Error('Not the same number')
            }
            break
        }
      }
    }

    destroyBullets(bulletsDestroyed)
  }

  onMounted(() => {})

  return {
    sightBoard,
    bulletsOnBoard,
    nbBulletsDestroyed,
    nbBulletsRemaining,
    pickOne,
    getColumnColor,
    destroyBullets,
    selectBullet,
    playPattern,
    selectedBullet,
    isFiring,
    moveBulletAnimated,
    startAnimation,
    stopAnimation
  }
})
