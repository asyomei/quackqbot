import { SearchResult } from "types/search"
import { parse } from "node-html-parser"

const url = "https://html.duckduckgo.com/html/?q="

export async function search(q: string): Promise<SearchResult[]> {
    const doc = await fetch(url + q).then(r => r.text()).then(parse)
    const results = doc.querySelectorAll("div.web-result")
    return results.map(res => {
        const node = res.childNodes[1]
        return {
            title: (node.childNodes[2].childNodes[1].text.trim()),
            desc: (node.childNodes[6].text.trim()),
            url: node.childNodes[4].childNodes[1].childNodes[3].childNodes[0].text.trim()
        }
    })
}
