import { comp } from "./composer"
import { search } from "utils/search"
import { randomUUID } from "crypto"
import { InlineQueryResultArticle } from "grammy/out/types"
import { SearchResult } from "types/search"

comp.on("inline_query", async ctx => {
    const { query } = ctx.inlineQuery
    if (!query) {
        await ctx.answerInlineQuery([])
    }

    const results = await search(query)
    if (results == null) {
        await ctx.answerInlineQuery([], { cache_time: 0 })
        return
    }

    const articles = getArticles(results.slice(0, 50))
    await ctx.answerInlineQuery(articles, { cache_time: 0 })
})

function getArticles(results: SearchResult[]): InlineQueryResultArticle[] {
    return results.map(res => {
        return {
            id: randomUUID(),
            type: "article",
            title: res.title,
            description: res.desc,
            url: res.url,
            input_message_content: {
                message_text: res.url,
                disable_web_page_preview: false
            }
        }
    })
}
