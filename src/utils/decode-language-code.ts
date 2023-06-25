import regions from "../regions.json"

const regionCodes = Object.keys(regions)
const mem: Record<string, string | null> = {}

export function decodeLanguageCode(langCode: string): string | null {
    return mem[langCode] ??= regionCodes.find(regionCode => regionCode.startsWith(langCode)) ?? null
}
