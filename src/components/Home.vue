<template>
  <main class="max-w-4xl p-3 mx-auto my-auto bg-gray-100 ">
    <header class="text-left w-full mb-3 align-top border-b-8">
        <h1 class="text-3xl mb-2 font-bold text-gray-700">
          Metin Jakupi
        </h1>
        <h2 class="font-semibold text-gray-700 mb-2">
         Senior Frontend Developer
        </h2>
    </header>

    <div class="col-gap-16">
      <section class="pb-4 mt-4 first:mt-0">
        <div class="pb-2 mb-2 border-b-2">
          <ul class="list-inside pr-7">

            <li class="mt-1 leading-normal transition duration-100 ease-in text-gray-500 text-md hover:text-gray-700">
              <a href="https://github.com/metinjakupi" class="group">
                      <span class="mr-5 text-lg font-semibold text-gray-700">
                        Github:
                      </span>
                metinjakupi
                <span
                    class="inline-block font-normal text-black transition duration-100 ease-in text-gray-550 print:text-black group-hover:text-gray-700 print:">
                        ↗
                      </span>
              </a>
            </li>

            <li class="mt-1 leading-normal transition duration-100 ease-in text-gray-500 text-md hover:text-gray-700">
              <a href="mailto:mjakupi@outlook.com" class="group">
                      <span class="mr-8 text-lg font-semibold text-gray-700">
                        Email:
                      </span>
                mjakupi@outlook.com
                <span
                    class="inline-block font-normal transition duration-100 ease-in text-gray-500 print:text-black group-hover:text-gray-700">
                        ↗
                      </span>
              </a>
            </li>
            <li class="mt-1 leading-normal transition duration-100 ease-in text-gray-500 text-md hover:text-gray-700">
                      <span class="mr-2 text-lg font-semibold text-gray-700">
                        Location:
                      </span>Ohrid, North Macedonia
            </li>
          </ul>
        </div>
      </section>
      <section class="pb-2 pb-4 mt-4 border-b-4 first:mt-0">
        <h2 class="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          SUMMARY
        </h2>
        <div class="mb-2">
          <p class="mt-2 leading-normal text-gray-700 text-md">
            Highly motivated Senior Frontend Developer with a strong track record of bringing projects to fruition.
            Excellent
            problem-solving and analytical skills, with experience architecting, implementing, and testing distributed
            systems
            and highly scalable web applications. Proven track record of understanding user needs and translating them
            into
            actionable solutions. A self-starter with the ability to work independently and in teams to accomplish major
            projects
          </p>
        </div>
      </section>
      <section class="pb-2 pb-4 mt-4 border-b-4 first:mt-0">
        <div>
          <h2 class="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
            EXPERIENCE
          </h2>
          <section class="mb-2">
            <header v-for="(j,k) in jobs" :key="`job-${k}`" class="mb-5">

              <h3 class="text-lg font-semibold text-gray-700">
                {{ j.title }}
              </h3>
              <p class="leading-normal text-md text-gray-600">
                {{ j.dates }} {{ j.company }}
              </p>
              <p>
                {{ j.description }}
              </p>
            </header>
          </section>
        </div>
      </section>
      <section class="pb-2 pb-4 mt-4 border-b-4 first:mt-0">
        <div>
          <h2 class="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
            EDUCATION
          </h2>
          <section class="pb-4 mt-4 mb-4">
            <header>
              <h3 class="flex-grow text-lg font-semibold text-gray-700 leading-snugish">
                University for Information Science and Technology "St. Paul the Apostle"
              </h3>
              <p class="leading-normal text-md text-gray-500">
                2014 – 2018
              </p>
            </header>
          </section>
        </div>
      </section>
      <section class="pb-4 mt-4 first:mt-0">
        <h2 class="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          SKILLS
        </h2>
        <div class="mb-2">
          <header>
            <h3 class="text-lg font-semibold text-gray-700 leading-snugish">
              Full Stack Web Development
            </h3>
          </header>

          <div class="my-1 last:pb-1">
            <ul class="flex flex-wrap text-sm2 leading-relaxed -mr-1.6 -mb-1">
              <li v-for="(skill,k) in skills" :key="`skill-${k}`"
                  class="px-2.5 mr-2 mb-1 text-white leading-relaxed  bg-indigo-400 print:bg-white print:border-inset print:text-black">
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-2">
          <header>
            <h3 class="font-semibold text-gray-700 text-m leading-snugish">
              DevOps
            </h3>
          </header>
          <div class="my-1 last:pb-1">
            <ul class="flex flex-wrap text-sm2 leading-relaxed -mr-1.6 -mb-1">
              <li v-for="(dev,k) in devOps" :key="`devOps-${k}`"
                  class="px-2 mr-2 mb-1 text-black leading-relaxed bg-emerald-300 print:bg-white print:border-inset ">
                {{ dev }}
              </li>

            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>

const jobs = [
  {
    title: "Freelance",
    company: "",
    location: "",
    dates: "January 2015 – April 2017",
    description: "Web & Mobile development",
  },
  {
    title: "Senior Frontend Developer",
    company: "| Eagle It Solutions",
    location: "Struga, North Macedonia",
    dates: "August 2017 – Present",
    description: "Proactively cultivated client relationships designed full stack web experiences for clients actively engaged with clients about specifications and designs crafted literate, comprehensive source code provided commentary to improve maintainability fostered ongoing services to clients as requested or needed",
  },
  {
    title: "Full Stack Developer",
    company: "| Zappter",
    location: "Zürich, Switzerland",
    dates: "January – April 2019",
    description: "Building plugins for Zappter platform. Using PHP and JQuery",
  },

]
const skills = [
  'HTML5',
  'CSS3',
  'SCSS',
  'Tailwind.css',
  'Javascript',
  'Typescript',
  'Node.js',
  'Vue',
  'Wordpress',
  'Quasar',
  'Ionic',
  'Angular',
  'Nuxt.js',
  'React',
  'Gatsby.js',
]

const devOps = [
  'AWS',
  'Terraform',
  'Docker',
  'Git',
  'CI/CD',
  'Firebase',
  'Serverless Hosting',
  'CircleCI',
]
</script>

<style scoped>

</style>
