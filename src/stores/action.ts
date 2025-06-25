import { Heroine, heroinesInformationsMap } from '@/types/heroine.types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  isSimpleAction,
  isStarAction,
  type Action,
  type ActionName,
  type SimpleAction
} from '@/types/action.types'
import { usePatternStore } from './pattern'

export const useActionStore = defineStore('action', () => {
  const actions = ref<Action[]>([])
  const actionSelected = ref<SimpleAction<ActionName>>()
  const actionPoints = ref<number>(0)

  const simpleActions = computed(() => actions.value.filter(isSimpleAction))
  const starActions = computed(() => actions.value.filter(isStarAction))

  const selectAction = (name: ActionName) => {
    const action = actions.value.find((action) => action.name === name)
    if (!action) {
      throw new Error(`Action with name ${name} not found`)
    }
    if (!isSimpleAction(action)) {
      throw new Error(`Action need to be a simple action with ap cost to be selected`)
    }
    const patternStore = usePatternStore()
    patternStore.unselectPattern()
    actionSelected.value = action
  }

  const unselectAction = () => {
    actionSelected.value = undefined
  }

  const playActionSelected = ({ posCol, posRow }: { posCol: number; posRow: number }) => {
    if (!actionSelected.value) {
      throw new Error(`You need to select an action before trying to play it`)
    }
    if (actionPoints.value < actionSelected.value.apCost) {
      throw new Error("You don't have the AP needed")
    }
    // const sightStore = useSightStore()
    // sightStore.playAction({ action: actionSelected.value, posCol, posRow })

    unselectAction()
  }

  const activateStarActions = () => {
    for (const action of starActions.value) {
      action.callback()
    }
  }

  const consumeActionPoints = (cost: number) => {
    if (actionPoints.value < cost) {
      throw new Error("You don't have the AP needed")
    }
    actionPoints.value -= cost
  }

  const initialize = (hero: Heroine) => {
    actions.value = heroinesInformationsMap[hero].actions
    actionSelected.value = undefined
    actionPoints.value = heroinesInformationsMap[hero].apNumber
  }

  return {
    actions,
    actionSelected,
    actionPoints,
    simpleActions,
    starActions,
    initialize,
    activateStarActions,
    selectAction,
    unselectAction,
    playActionSelected,
    consumeActionPoints
  }
})
