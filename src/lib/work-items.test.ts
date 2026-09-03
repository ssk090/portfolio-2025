import { describe, expect, it } from "vitest"
import { workCompanies } from "./work-items"

describe("workCompanies", () => {
  it("models Altir as one company with two dated roles", () => {
    const altir = workCompanies.find(
      (company) => company.title === "altir india private limited",
    )
    expect(altir).toBeDefined()
    expect(altir?.href).toBe("https://www.altir.co/")
    expect(altir?.location).toBe("hyderabad, india")
    expect(altir?.roles).toHaveLength(2)

    expect(altir?.roles[0]).toMatchObject({
      title: "senior software engineer",
      period: "oct 2025 - present",
      location: "hyderabad, india",
    })
    expect(altir?.roles[0]?.description).toBeUndefined()

    expect(altir?.roles[1]).toMatchObject({
      title: "software engineer",
      period: "apr 2023 - oct 2025",
      location: "hyderabad, india",
    })
    expect(altir?.roles[1]?.description).toHaveLength(3)

    for (const role of altir?.roles ?? []) {
      expect(role.title).not.toContain(";")
      expect(role.period).not.toContain(";")
    }
  })

  it("models Infosys as one company with three dated roles", () => {
    const infosys = workCompanies.find(
      (company) => company.title === "infosys limited",
    )
    expect(infosys).toBeDefined()
    expect(infosys?.href).toBe("https://www.infosys.com/")
    expect(infosys?.location).toBe("hyderabad, india")
    expect(infosys?.roles).toHaveLength(3)

    expect(infosys?.roles[0]).toMatchObject({
      title: "senior systems engineer",
      period: "sep 2022 - mar 2023",
      location: "hyderabad, india",
    })
    expect(infosys?.roles[1]).toMatchObject({
      title: "systems engineer",
      period: "apr 2021 - aug 2022",
      location: "hyderabad, india",
    })
    expect(infosys?.roles[2]).toMatchObject({
      title: "systems engineer trainee",
      period: "nov 2020 - mar 2021",
      location: "mysore, india",
    })

    expect(infosys?.description).toEqual([
      "developed and maintained enterprise web applications using react, angular, and typescript",
      "delivered frontend features and api integrations in agile teams",
      "improved dashboard usability by up to 60%",
    ])

    for (const role of infosys?.roles ?? []) {
      expect(role.title).not.toContain(";")
      expect(role.period).not.toContain(";")
      expect(role.description).toBeUndefined()
    }
  })

  it("keeps work experience as two company blocks only", () => {
    expect(workCompanies).toHaveLength(2)
    expect(workCompanies.map((c) => c.title)).toEqual([
      "altir india private limited",
      "infosys limited",
    ])
  })
})
