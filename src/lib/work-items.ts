import type { Item } from "@/components/section-list"

export const workItems: Item[] = [
  {
    title: "altir india private limited",
    role:
      "senior software engineer · oct 2025 - present; software engineer · apr 2023 - oct 2025",
    location: "hyderabad, india",
    description: [
      "developed and shipped production features for client-facing react and typescript applications, improving usability, performance, and reliability across core product flows",
      "built and delivered a cross-platform react native mobile application within 2 months after independently learning the framework, receiving positive client feedback",
      "collaborated with designers, backend engineers, and qa teams to build reusable ui components, integrate apis, fix production bugs, and deliver releases on schedule",
    ],
    href: "https://www.altir.co/",
  },
  {
    title: "infosys limited",
    role:
      "senior systems engineer · sep 2022 - mar 2023; systems engineer · apr 2021 - aug 2022; trainee · nov 2020 - mar 2021 (mysore)",
    location: "hyderabad, india",
    description: [
      "developed and maintained enterprise web applications using react, angular, and typescript",
      "delivered frontend features and api integrations in agile teams",
      "improved dashboard usability by up to 60%",
    ],
    href: "https://www.infosys.com/",
  },
]

export const internshipItems: Item[] = [
  {
    title: "airports authority of india",
    role: "intern",
    location: "bhubaneswar, india",
    period: "may 2019 - jun 2019",
    description: [
      "observed atc, communications, and navigation systems in an airport operations setting",
    ],
    href: "https://www.aai.aero/",
  },
  {
    title: "bharat sanchar nigam limited",
    role: "intern",
    location: "bhubaneswar, india",
    period: "may 2018 - jun 2018",
    description: ["learned telecom network basics in a field operations setting"],
    href: "https://www.bsnl.co.in/",
  },
]

export const educationItems: Item[] = [
  {
    title: "siksha o anusandhan university",
    role: "btech, electronics and communication engineering",
    period: "2016 - 2020",
    description: [],
    href: "https://www.soa.ac.in/",
  },
  {
    title: "shivam junior college",
    role: "12th",
    location: "hyderabad, india",
    period: "2014 - 2016",
    description: [],
  },
  {
    title: "kendriya vidyalaya",
    role: "10th",
    period: "2014",
    description: [],
    href: "https://kvsangathan.nic.in/",
  },
]

export const certifications = [
  "python quick start",
  "aws educate intro to gen ai",
  "career edge - knockdown the lockdown",
  "full stack web development",
  "automate your workflows with generative ai",
] as const
