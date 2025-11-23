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
          bhubaneswar, odisha, india
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          senior software engineer @ altir
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        frontend developer with 5+ years of experience in designing, developing,
        and maintaining applications for startups and mncs. demonstrating
        consistent excellence in delivering customer focused solutions. skilled
        in modern javascript frameworks and libraries. if i&apos;m not coding,
        i&apos;m probably doing cardistry, watching movies or obsessing over
        mechanical keyboards.
      </p>
    </header>
  )
}
