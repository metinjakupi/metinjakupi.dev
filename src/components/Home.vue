<style>
.box__bg {
  position: relative;
  z-index: 0;

  overflow: hidden;
  padding: 12px;
}

.box__bg::before {
  content: "";
  position: absolute;
  z-index: -2;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: 100%100%, 50%50%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-image: linear-gradient(#f3f4f6, #2e1065);
  animation: bgRotate 4s linear infinite;
}

.box__bg::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: 1px;
  top: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: linear-gradient(#101010, #101010);
  border-radius: 12px;
}

@keyframes bgRotate {
  100% {
    transform: rotate(1turn);
  }
}

@media (max-width: 768px) {
  .box{
    grid-column: span 3!important;
  }
}

</style>
<template>
  <main class="max-w-7xl p-3 mx-auto my-auto">

    <div :class="['grid', 'grid-cols-3', 'gap-6', 'p-4']">
      <div
          :key="i" v-for="(item, i) in gridItems"
          :href="item.link"
          :class="[
        item.classes,
        'box',
        'fade-in-animation',
        'rounded-xl',
        'shadow-lg',
        'p-6',
        'font-sans',
        'transform',
        'hover:scale-105',
        'transition-transform',
      ]"
          :style="{ 'grid-column': 'span ' + item.colSpan }"
      >
        <h3 class="text-2xl font-bold mb-4">{{ item.title }}</h3>
        <img v-if="item.icon && item.isLogo" :src="item.icon" class=" mt-4" alt="">
        <p v-if="item.content" v-html="item.content" class="text-lg mb-4"></p>
        <img v-if="item.icon && !item.isLogo" :src="item.icon" width="50" alt="">
        <div v-if="item.skills">
          <span v-for="skill in item.skills"
                class="inline-flex items-center rounded-md bg-gray-50 my-2 mx-1.5 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {{ skill }}
          </span>
        </div>
      </div>

    </div>
  </main>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const skills = [
  'HTML5',
  'CSS3',
  'SCSS',
  'Tailwind.css',
  'Javascript',
  'Typescript',
  'Node.js',
  'Vue.js',
  'Wordpress',
  'Quasar',
  'Ionic',
  'Nuxt.js',
  'React',
  'Next.js',
  'AWS',
  'Terraform',
  'Docker',
  'Git',
  'CI/CD',
  'Firebase',
  'Serverless Hosting',
  'CircleCI',
]
const gridItems = ref([
  {
    title: 'Introduction',
    content: 'Hello, I am <b class="text-lg"> Metin Jakupi</b>. Dedicated Developer with a proven history of successful projects. Skilled in problem-solving and system architecture, adept at creating scalable web applications. Expert in understanding user requirements and delivering effective solutions. Capable of working autonomously and collaboratively.',
    classes: 'border text-white border-zinc-400',
    colSpan: 2,
    link: '#',
  },
  {
    title: '',
    link: 'https://github.com/yourusername',
    icon: 'github-mark.png',
    isLogo: false,
    classes: 'flex justify-center items-center flex-col border border-zinc-400 text-white',
    colSpan: 1
  },
  {
    title: '',
    link: 'https://twitter.com/mjakupiiii',
    icon: 'logo-white.png',
    isLogo: false,
    classes: 'flex justify-center items-center flex-col border border-zinc-400 text-white',
    colSpan: 1
  },
  {
    title: 'My Skills',
    content: 'Here is my tech stack',
    link: '#',
    classes: 'border text-white border-zinc-400',
    skills: skills,
    colSpan: 1
  },
  {
    title: 'Work Experience',
    isLogo: true,
    link: 'https://eagle.mk/',
    icon: 'logo.png',
    content: `
    <strong>Senior Frontend Developer</strong><br>
    August 2017 – Present | Eagle IT Solutions`,
    classes: 'box__bg text-white',
    colSpan: 1
  },
  {
    title: 'Contact Me',
    content: 'You can reach me at mjakupi@outlook.com or through my social profiles.',
    classes: 'border text-white border-zinc-400',
    colSpan: 2,
    link: '#',
  }
])


</script>

<style scoped>

</style>
