import regions from "../regions.json"

const regionCodes = Object.keys(regions)
const mem: Record<string, string | null> = {}

const langCodeTestRegex = /^[a-z]{2}$/

export function decodeLanguageCode(langCode: string): string | null {
    if (!langCodeTestRegex.test(langCode))
        return null
    return mem[langCode] ??= regionCodes.find(regionCode => regionCode.startsWith(langCode)) ?? null
}
