import regions from "../regions.json"

const regionsText = Object.entries(regions).map(([code, name]) => `- ${code} - ${name}`).join("\n")

export const helpMessageText = `\
A DuckDuckGo Search Inline Bot
Usage: @%s [:rg-cd] query
  where
    rg-cd - Region code
    query - Your search query

All region codes:
${regionsText}`
