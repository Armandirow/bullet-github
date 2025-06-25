<script setup lang="ts">
import { BulletColor, Line } from '@/types/bullet.types'

const props = defineProps<{ color: BulletColor; line: Line }>()
const mappingColorMatrix = {
  [BulletColor.RED]: '0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0',
  [BulletColor.BLUE]: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0',
  [BulletColor.YELLOW]: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0',
  [BulletColor.GREEN]: '0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0',
  [BulletColor.PURPLE]: '0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0'
}

const colorMatrix = mappingColorMatrix[props.color]
</script>

<template>
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g :filter="`url(#filter0_di_2_2_${color})`">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32 61C48.0163 61 61 48.0163 61 32C61 15.9838 48.0163 3.00002 32 3.00002C15.9837 3.00002 3 15.9838 3 32C3 48.0163 15.9837 61 32 61ZM32 57.375C46.0142 57.375 57.375 46.0142 57.375 32C57.375 17.9858 46.0142 6.62501 32 6.62501C17.9858 6.62501 6.625 17.9858 6.625 32C6.625 46.0142 17.9858 57.375 32 57.375Z"
        :fill="color"
      />
    </g>
    <g filter="url(#filter1_di_2_2)">
      <path
        d="M17.6524 8.38829C19.5501 11.2874 17.6524 10.8042 14.3314 14.1865C11.0105 17.5688 11.7214 19.6621 8.6384 17.5688C5.79188 15.6361 9.11282 12.737 11.0105 10.8042C12.9082 8.87147 16.1637 6.11404 17.6524 8.38829Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter2_di_2_2)">
      <path
        d="M55.6117 17.6524C52.7126 19.5501 53.1958 17.6524 49.8135 14.3314C46.4312 11.0105 44.3379 11.7214 46.4312 8.6384C48.3639 5.79188 51.263 9.11282 53.1958 11.0105C55.1285 12.9082 57.886 16.1637 55.6117 17.6524Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter3_di_2_2)">
      <path
        d="M46.3476 55.6117C44.4499 52.7126 46.3476 53.1958 49.6686 49.8135C52.9895 46.4312 52.2786 44.3379 55.3616 46.4312C58.2081 48.3639 54.8872 51.263 52.9895 53.1958C51.0918 55.1285 47.8363 57.886 46.3476 55.6117Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter4_di_2_2)">
      <path
        d="M8.38829 46.3476C11.2874 44.4499 10.8042 46.3476 14.1865 49.6686C17.5688 52.9895 19.6621 52.2786 17.5688 55.3616C15.6361 58.2081 12.737 54.8872 10.8042 52.9895C8.87147 51.0918 6.11404 47.8363 8.38829 46.3476Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        :id="`filter0_di_2_2_${color}`"
        x="1"
        y="1.00002"
        width="62"
        height="62"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix vif="colorMatrix" type="matrix" :values="colorMatrix" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix vif="colorMatrix" type="matrix" :values="colorMatrix" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_2" />
      </filter>
      <filter
        id="filter1_di_2_2"
        x="1.53125"
        y="1.53125"
        width="22.875"
        height="22.875"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_2" />
      </filter>
      <filter
        id="filter2_di_2_2"
        x="39.5938"
        y="1.53125"
        width="22.875"
        height="22.875"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_2" />
      </filter>
      <filter
        id="filter3_di_2_2"
        x="39.5938"
        y="39.5938"
        width="22.875"
        height="22.875"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_2" />
      </filter>
      <filter
        id="filter4_di_2_2"
        x="1.53125"
        y="39.5938"
        width="22.875"
        height="22.875"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_2" />
      </filter>
    </defs>
  </svg>
</template>
