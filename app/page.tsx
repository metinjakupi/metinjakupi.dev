
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f5f5f5] text-foreground relative">
      <div
        className="absolute inset-0 z-0"
        style={
          {
            "--line": "#e0e0e0",
            "--size": "50px",
            background: `
        linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size),
        linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size)
      `,
            mask: "linear-gradient(-20deg, transparent 50%, white)",
          } as React.CSSProperties
        }
      ></div>
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col gap-12 md:gap-16 max-w-2xl relative z-10">
        <section className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          <div className="flex-1 space-y-4">
            <div className="font-bold text-2xl md:text-4xl">Metin Jakupi</div>
            <div className="text-muted-foreground">
              Software Engineer | Frontend Developer
            </div>
            <div>
              Dedicated Developer with a proven history of successful
              projects. Skilled in problem-solving and system architecture,
              adept at creating scalable web applications. Expert in
              understanding user requirements and delivering effective
              solutions. Capable of working autonomously and collaboratively.
            </div>
          </div>
          <img
            src="/me.png"
            alt="Metin Jakupi"
            className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover"
            width="300"
            height="300"
            style={{ aspectRatio: "300/300", objectFit: "cover" }}
          />
        </section>
        <section className="space-y-4 md:space-y-6">
          <div className="font-bold">Skills</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>AWS</div>
            <div>CI/CD</div>
            <div>Digital Ocean</div>
            <div>Docker</div>
            <div>Next.js</div>
            <div>Node.js</div>
            <div>Nest.js</div>
            <div>React</div>
            <div>Supabase</div>
            <div>Tailwind</div>
            <div>Vue</div>
            <div>Wordpress</div>
          </div>
        </section>
        <section className="space-y-4 md:space-y-6">
          <div className="font-bold">Experience</div>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="font-bold">Lead Software Engineer</div>
              <div className="text-muted-foreground">
                Eagle IT Solutions | 2016 - 2024
              </div>
              <div>
                At Eagle IT Solutions, I embarked on my programming journey, evolving from a junior developer to a lead role. Throughout this period, I honed my skills in full-stack development, mastered various technologies, and led multiple successful projects. This experience was instrumental in shaping my problem-solving abilities and fostering a deep understanding of software architecture and team leadership.
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-bold">Fullstack Developer</div>
              <div className="text-muted-foreground">
                Zappter | 2019
              </div>
              <div>
                Worked as a fullstack developer at Zappter, focusing on building a drag and drop application using PHP and jQuery. Gained valuable experience in creating interactive web applications and implementing user-friendly interfaces.
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4 md:space-y-6">
          <div className="font-bold">Connect with me</div>
          <div className="flex flex-wrap gap-4">
            <Link href="https://github.com/metinjakupi" target="_blank" prefetch={false}>
              <Button variant="outline">
                <GitlabIcon className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link href="https://x.com/mjakupiiii" target="_blank" prefetch={false}>
              <Button variant="outline">
                <TwitterIcon className="w-5 h-5 mr-2" />
                Twitter
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function GitlabIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
