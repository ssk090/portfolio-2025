import { describe, expect, it } from "vitest"
import {
  certifications,
  educationItems,
  internshipItems,
  workCompanies,
} from "./work-items"
import { site } from "./site"

const steDash = /\u2014|\u2013/

describe("workCompanies", () => {
  it("keeps public email on work@ and Person title Senior Software Engineer", () => {
    expect(site.email).toBe("shivanandasai.work@gmail.com")
    expect(site.email).not.toContain(".38@")
    expect(site.jobTitle).toBe("Senior Software Engineer")
  })

  it("models Altir as one company with latest designation only", () => {
    const altir = workCompanies.find(
      (company) => company.title === "altir india private limited",
    )
    expect(altir).toBeDefined()
    expect(altir?.href).toBe("https://www.altir.co/")
    expect(altir?.location).toBe("hyderabad, india")
    expect(altir?.roles).toHaveLength(1)

    expect(altir?.roles[0]).toMatchObject({
      title: "senior software engineer",
      period: "apr 2023 - present",
      location: "hyderabad, india",
    })
    expect(altir?.roles[0]?.description).toHaveLength(3)
    expect(JSON.stringify(altir)).not.toMatch(steDash)

    for (const role of altir?.roles ?? []) {
      expect(role.title).not.toContain(";")
      expect(role.period).not.toContain(";")
    }
  })

  it("models Infosys as one company with latest designation only", () => {
    const infosys = workCompanies.find(
      (company) => company.title === "infosys limited",
    )
    expect(infosys).toBeDefined()
    expect(infosys?.href).toBe("https://www.infosys.com/")
    expect(infosys?.location).toBe("hyderabad, india")
    expect(infosys?.roles).toHaveLength(1)

    expect(infosys?.roles[0]).toMatchObject({
      title: "senior systems engineer",
      period: "nov 2020 - mar 2023",
      location: "hyderabad, india",
    })
    expect(infosys?.roles[0]?.description).toBeUndefined()

    expect(infosys?.description).toEqual([
      "developed and maintained enterprise web applications using react, angular, and typescript",
      "delivered frontend features and api integrations in agile teams",
      "improved dashboard usability by up to 60%",
    ])

    const blob = infosys?.description?.join(" ").toLowerCase() ?? ""
    expect(blob).toContain("60%")
    expect(blob).toMatch(/react/)
    expect(blob).toMatch(/angular/)
    expect(blob).toMatch(/agile/)
    expect(blob).toMatch(/api/)
    expect(blob).not.toContain("65%")
    expect(blob).not.toContain("85%")
    expect(blob).not.toContain("spring boot")
    expect(JSON.stringify(infosys)).not.toMatch(steDash)

    for (const role of infosys?.roles ?? []) {
      expect(role.title).not.toContain(";")
      expect(role.period).not.toContain(";")
    }
  })

  it("keeps work experience as two company blocks only", () => {
    expect(workCompanies).toHaveLength(2)
    expect(workCompanies.map((c) => c.title)).toEqual([
      "altir india private limited",
      "infosys limited",
    ])
  })

  it("includes AAI and BSNL internships", () => {
    expect(internshipItems).toHaveLength(2)
    expect(internshipItems[0]?.title).toContain("airports authority")
    expect(internshipItems[0]?.period?.toLowerCase()).toContain("2019")
    expect(internshipItems[0]?.location?.toLowerCase()).toContain("bhubaneswar")
    expect(internshipItems[1]?.title).toContain("bharat sanchar")
    expect(internshipItems[1]?.period?.toLowerCase()).toContain("2018")
  })

  it("includes education timeline through 10th", () => {
    expect(educationItems.map((item) => item.title)).toEqual([
      "siksha o anusandhan university",
      "shivam junior college",
      "kendriya vidyalaya",
    ])
    expect(educationItems[0]?.role.toLowerCase()).toContain("btech")
    expect(educationItems[0]?.period).toBe("2016 - 2020")
    expect(educationItems[1]?.role).toBe("12th")
    expect(educationItems[2]?.role).toBe("10th")
  })

  it("lists lowercase certification badges", () => {
    expect([...certifications]).toEqual([
      "python quick start",
      "aws educate intro to gen ai",
      "career edge - knockdown the lockdown",
      "full stack web development",
      "automate your workflows with generative ai",
    ])
    for (const cert of certifications) {
      expect(cert).toBe(cert.toLowerCase())
      expect(cert).not.toMatch(steDash)
    }
  })
})
