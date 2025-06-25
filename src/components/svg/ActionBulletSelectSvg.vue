<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { ref, inject, computed } from 'vue'
import { useActionStore } from '@/stores/action'
import { useSightStore } from '@/stores/sight'
import { ActionName } from '@/types/action.types'
import { BulletColor, type Bullet } from '@/types/bullet.types'
import { NOTYF_INJECTION_KEY } from '@/main'

const rightArrowEl = ref(null)
const leftArrowEl = ref(null)
const upArrowEl = ref(null)
const downArrowEl = ref(null)

const { isOutside: isOutsideRight } = useMouseInElement(rightArrowEl)
const { isOutside: isOutsideLeft } = useMouseInElement(leftArrowEl)
const { isOutside: isOutsideUp } = useMouseInElement(upArrowEl)
const { isOutside: isOutsideDown } = useMouseInElement(downArrowEl)

const actionStore = useActionStore()
const sightStore = useSightStore()
const notyf = inject(NOTYF_INJECTION_KEY)

// Computed properties to determine which arrows to show
const showLeftArrow = computed(() => {
  if (!actionStore.actionSelected || !sightStore.selectedBullet) return false

  const action = actionStore.actionSelected.name
  const bullet = sightStore.selectedBullet
  const currentPosition = getPositionByColumnColor(bullet.column)

  switch (action) {
    case ActionName.MOVE_LEFT_RIGHT_DOWN_ONE:
      return currentPosition > 1
    case ActionName.MOVE_UP_ONE:
    case ActionName.MOVE_DOWN_ANY:
      return false
    default:
      return false
  }
})

const showRightArrow = computed(() => {
  if (!actionStore.actionSelected || !sightStore.selectedBullet) return false

  const action = actionStore.actionSelected.name
  const bullet = sightStore.selectedBullet
  const currentPosition = getPositionByColumnColor(bullet.column)

  switch (action) {
    case ActionName.MOVE_LEFT_RIGHT_DOWN_ONE:
      return currentPosition < 5
    case ActionName.MOVE_UP_ONE:
    case ActionName.MOVE_DOWN_ANY:
      return false
    default:
      return false
  }
})

const showUpArrow = computed(() => {
  if (!actionStore.actionSelected || !sightStore.selectedBullet) return false

  const action = actionStore.actionSelected.name
  const bullet = sightStore.selectedBullet

  switch (action) {
    case ActionName.MOVE_LEFT_RIGHT_DOWN_ONE:
      return false
    case ActionName.MOVE_UP_ONE:
      return bullet.row > 1
    case ActionName.MOVE_DOWN_ANY:
      return false
    default:
      return false
  }
})

const showDownArrow = computed(() => {
  if (!actionStore.actionSelected || !sightStore.selectedBullet) return false

  const action = actionStore.actionSelected.name
  const bullet = sightStore.selectedBullet

  switch (action) {
    case ActionName.MOVE_LEFT_RIGHT_DOWN_ONE:
      return bullet.row < 7
    case ActionName.MOVE_UP_ONE:
      return false
    case ActionName.MOVE_DOWN_ANY:
      // Check if there's available space below
      for (let row = bullet.row + 1; row <= 7; row++) {
        if (!sightStore.sightBoard[bullet.column][row]) {
          return true
        }
      }
      return false
    default:
      return false
  }
})

const noValidMoves = computed(() => {
  if (!actionStore.actionSelected || !sightStore.selectedBullet) return false
  return !showLeftArrow.value && !showRightArrow.value && !showUpArrow.value && !showDownArrow.value
})

// Helper function to get column color by position
const getColumnColorByPosition = (position: number): BulletColor => {
  switch (position) {
    case 1:
      return BulletColor.RED
    case 2:
      return BulletColor.BLUE
    case 3:
      return BulletColor.GREEN
    case 4:
      return BulletColor.YELLOW
    case 5:
      return BulletColor.PURPLE
    default:
      throw new Error('Invalid column position')
  }
}

// Helper function to get position by column color
const getPositionByColumnColor = (color: BulletColor): number => {
  switch (color) {
    case BulletColor.RED:
      return 1
    case BulletColor.BLUE:
      return 2
    case BulletColor.GREEN:
      return 3
    case BulletColor.YELLOW:
      return 4
    case BulletColor.PURPLE:
      return 5
    default:
      throw new Error('Invalid column color')
  }
}

const handleArrowClick = async (direction: 'left' | 'right' | 'up' | 'down') => {
  if (!actionStore.actionSelected) {
    notyf?.error({ message: 'No action selected' })
    return
  }

  if (!sightStore.selectedBullet) {
    notyf?.error({ message: 'No bullet selected' })
    return
  }

  try {
    switch (actionStore.actionSelected.name) {
      case ActionName.MOVE_LEFT_RIGHT_DOWN_ONE:
        await handleMoveLeftRightDownOne(direction)
        break
      case ActionName.MOVE_UP_ONE:
        await handleMoveUpOne(direction)
        break
      case ActionName.MOVE_DOWN_ANY:
        await handleMoveDownAny(direction)
        break
      default:
        notyf?.error({ message: 'This action cannot be used with arrows' })
    }
  } catch (error) {
    notyf?.error({ message: `${error}` })
  }
}

const handleMoveLeftRightDownOne = async (direction: 'left' | 'right' | 'up' | 'down') => {
  const action = actionStore.actionSelected!
  const bullet = sightStore.selectedBullet!
  const currentPosition = getPositionByColumnColor(bullet.column)

  switch (direction) {
    case 'left':
      if (currentPosition > 1) {
        const newColumn = getColumnColorByPosition(currentPosition - 1)
        if (sightStore.isPositionAvailable({ column: newColumn, row: bullet.row })) {
          // We need to consume action points before moving the bullet
          // because the moveBulletAnimated will wait for the animation to finish
          // and we want to animate the action at the same time
          actionStore.consumeActionPoints(action.apCost)
          sightStore.selectedBullet = undefined
          await moveBullet(bullet, newColumn, bullet.row)
        } else {
          throw new Error('Cannot move left: target position is occupied')
        }
      } else {
        throw new Error('Cannot move left: already at leftmost column')
      }
      break
    case 'right':
      if (currentPosition < 5) {
        const newColumn = getColumnColorByPosition(currentPosition + 1)
        if (sightStore.isPositionAvailable({ column: newColumn, row: bullet.row })) {
          // We need to consume action points before moving the bullet
          // because the moveBulletAnimated will wait for the animation to finish
          // and we want to animate the action at the same time
          actionStore.consumeActionPoints(action.apCost)
          sightStore.selectedBullet = undefined
          await moveBullet(bullet, newColumn, bullet.row)
        } else {
          throw new Error('Cannot move right: target position is occupied')
        }
      } else {
        throw new Error('Cannot move right: already at rightmost column')
      }
      break
    case 'down':
      if (bullet.row < 7) {
        if (sightStore.isPositionAvailable({ column: bullet.column, row: bullet.row + 1 })) {
          // We need to consume action points before moving the bullet
          // because the moveBulletAnimated will wait for the animation to finish
          // and we want to animate the action at the same time
          actionStore.consumeActionPoints(action.apCost)
          sightStore.selectedBullet = undefined
          await moveBullet(bullet, bullet.column, bullet.row + 1)
        } else {
          throw new Error('Cannot move down: target position is occupied')
        }
      } else {
        throw new Error('Cannot move down: already at bottom row')
      }
      break
    case 'up':
      throw new Error('This action only allows left, right, or down movement')
  }

  actionStore.unselectAction()
}

const handleMoveUpOne = async (direction: 'left' | 'right' | 'up' | 'down') => {
  const bullet = sightStore.selectedBullet!
  const action = actionStore.actionSelected!

  if (direction !== 'up') {
    throw new Error('This action only allows upward movement')
  }

  if (bullet.row > 1) {
    if (sightStore.isPositionAvailable({ column: bullet.column, row: bullet.row - 1 })) {
      // We need to consume action points before moving the bullet
      // because the moveBulletAnimated will wait for the animation to finish
      // and we want to animate the action at the same time
      actionStore.consumeActionPoints(action.apCost)
      sightStore.selectedBullet = undefined
      await moveBullet(bullet, bullet.column, bullet.row - 1)
    } else {
      throw new Error('Cannot move up: target position is occupied')
    }
  } else {
    throw new Error('Cannot move up: already at top row')
  }

  actionStore.unselectAction()
}

const handleMoveDownAny = async (direction: 'left' | 'right' | 'up' | 'down') => {
  const bullet = sightStore.selectedBullet!
  const action = actionStore.actionSelected!

  if (direction !== 'down') {
    throw new Error('This action only allows downward movement')
  }

  // Find the lowest available position in the same column
  let targetRow = bullet.row
  for (let row = bullet.row + 1; row <= 7; row++) {
    if (!sightStore.sightBoard[bullet.column][row]) {
      targetRow = row
    } else {
      break
    }
  }

  if (targetRow > bullet.row) {
    if (sightStore.isPositionAvailable({ column: bullet.column, row: targetRow })) {
      // We need to consume action points before moving the bullet
      // because the moveBulletAnimated will wait for the animation to finish
      // and we want to animate the action at the same time
      actionStore.consumeActionPoints(action.apCost)
      sightStore.selectedBullet = undefined
      await moveBullet(bullet, bullet.column, targetRow)
    } else {
      throw new Error('Cannot move down: target position is occupied')
    }
  } else {
    throw new Error('No available space below the bullet')
  }

  actionStore.unselectAction()
}

const moveBullet = async (bullet: Bullet, newColumn: BulletColor, newRow: number) => {
  await sightStore.moveBulletAnimated(bullet, newColumn, newRow)
}
</script>

<template>
  <div class="absolute bg-black w-[90%] h-[80%] opacity-20 rounded-full"></div>
  <div class="fill-white z-10">
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <!-- <circle cx="32" cy="32" r="16" /> -->
      <path
        d="M48 32C48 40.8366 40.8366 48 32 48C23.1634 48 16 40.8366 16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32ZM19.2 32C19.2 39.0692 24.9308 44.8 32 44.8C39.0692 44.8 44.8 39.0692 44.8 32C44.8 24.9308 39.0692 19.2 32 19.2C24.9308 19.2 19.2 24.9308 19.2 32Z"
      />
      <!-- right -->
      <path
        v-if="showRightArrow"
        ref="rightArrowEl"
        d="M63.0134 31.2168C63.5177 31.6172 63.5177 32.3828 63.0134 32.7832L53.6218 40.2388C52.9664 40.7591 52 40.2924 52 39.4556L52 24.5444C52 23.7076 52.9664 23.2409 53.6218 23.7612L63.0134 31.2168Z"
        transform-origin="64 32"
        class="cursor-pointer"
        @click="handleArrowClick('right')"
      >
        <animateTransform
          v-if="!isOutsideRight"
          attributeName="transform"
          attributeType="XML"
          type="scale"
          dur="3s"
          values="1;1.5;1"
          repeatCount="indefinite"
        />
      </path>
      <!-- left -->
      <path
        v-if="showLeftArrow"
        ref="leftArrowEl"
        d="M0.986589 31.2168C0.482265 31.6172 0.482265 32.3828 0.98659 32.7832L10.3782 40.2388C11.0336 40.7591 12 40.2924 12 39.4556L12 24.5444C12 23.7076 11.0336 23.2409 10.3782 23.7612L0.986589 31.2168Z"
        transform-origin="0 32"
        class="cursor-pointer"
        @click="handleArrowClick('left')"
      >
        <animateTransform
          v-if="!isOutsideLeft"
          attributeName="transform"
          attributeType="XML"
          type="scale"
          dur="3s"
          values="1;1.5;1"
          repeatCount="indefinite"
        />
      </path>

      <!-- up -->
      <path
        v-if="showUpArrow"
        ref="upArrowEl"
        d="M31.2168 0.986589C31.6172 0.482264 32.3828 0.482265 32.7832 0.986589L40.2388 10.3782C40.7591 11.0336 40.2924 12 39.4556 12L24.5444 12C23.7076 12 23.2409 11.0336 23.7612 10.3782L31.2168 0.986589Z"
        transform-origin="32 0"
        class="cursor-pointer"
        @click="handleArrowClick('up')"
      >
        <animateTransform
          v-if="!isOutsideUp"
          attributeName="transform"
          attributeType="XML"
          type="scale"
          dur="3s"
          values="1;1.5;1"
          repeatCount="indefinite"
        />
      </path>
      <!-- down -->
      <path
        v-if="showDownArrow"
        ref="downArrowEl"
        d="M32.7832 63.0134C32.3828 63.5177 31.6172 63.5177 31.2168 63.0134L23.7612 53.6218C23.2409 52.9664 23.7076 52 24.5444 52H39.4556C40.2924 52 40.7591 52.9664 40.2388 53.6218L32.7832 63.0134Z"
        transform-origin="32 64"
        class="cursor-pointer"
        @click="handleArrowClick('down')"
      >
        <animateTransform
          v-if="!isOutsideDown"
          attributeName="transform"
          attributeType="XML"
          type="scale"
          dur="3s"
          values="1;1.5;1"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
  <!-- No valid moves message -->
  <div
    v-if="noValidMoves"
    class="absolute inset-0 flex items-center justify-center text-white text-xs font-medium bg-black bg-opacity-50 rounded-full"
  >
    No moves
  </div>
</template>
