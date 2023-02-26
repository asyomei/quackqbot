import { SearchResult } from "types/search"
import { format } from "util"
import { parse } from "node-html-parser"

const BASE_URL = "https://html.duckduckgo.com/html/?q=%s&kl=%s"

export async function search(q: string, kl = "wt-wt"): Promise<SearchResult[]> {
    const url = format(BASE_URL, q, kl)
    const doc = await fetch(url).then(r => r.text()).then(parse)
    const results = doc.querySelectorAll("div.web-result")
    try {
        return results.map(res => {
            const node = res.childNodes[1]
            return {
                title: node.childNodes[2].childNodes[1].text.trim(),
                desc: node.childNodes[6].text.trim(),
                url: node.childNodes[4].childNodes[1].childNodes[3].childNodes[0].text.trim().replace(/ /g, "%20")
            }
        })
    } catch (e) {
        if (e instanceof TypeError)
            return []
        throw e
    }
}
