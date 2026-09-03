import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-5 animate-fade-in text-white">
        <span className="inline-block">
          <ScrambleText text="shivananda sai" />
        </span>
      </h1>
      <div className="flex flex-col gap-2 text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          hyderabad, telangana, india
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          senior software engineer @ altir
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        frontend / full-stack engineer with 5+ years building production web and
        mobile apps. i use react, typescript, next.js, react native, angular,
        and practical ai tooling. i focus on ui architecture, api integration,
        testing, and performance. i ship client-facing products at altir. i
        previously built enterprise web apps at infosys.
      </p>
    </header>
  )
}
