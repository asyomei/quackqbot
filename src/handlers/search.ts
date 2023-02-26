import { comp } from "./composer"
import { format } from "util"
import { search } from "utils/search"
import { randomUUID } from "crypto"
import { InlineQueryResultArticle } from "grammy/out/types"
import { SearchResult } from "types/search"
import { helpMessageText } from "consts/help"
import { decodeLanguageCode } from "utils/decode-language-code"

comp.on("inline_query", async ctx => {
    const { query } = ctx.inlineQuery
    let [regionCode, searchQuery] = parseQuery(query)

    if (!searchQuery) {
        const article = getHelpArticle(ctx.me.username)
        await ctx.answerInlineQuery([article])
        return
    }

    if (!regionCode) {
        let { language_code } = ctx.from
        switch (language_code) {
        case "en":
            language_code = "us"
            break
        case "uk":
            language_code = "ua"
            break
        }
        regionCode = (language_code && decodeLanguageCode(language_code)) ?? "wt-wt"
    } else if (regionCode.length == 2) {
        regionCode = decodeLanguageCode(regionCode) ?? "wt-wt"
    }

    const results = await search(searchQuery, regionCode)
    if (results.length == 0) {
        const article = getNotFoundArticle(searchQuery)
        await ctx.answerInlineQuery([article], { cache_time: 0 })
        return
    }

    const articles = getArticles(results.slice(0, 50))
    await ctx.answerInlineQuery(articles, { cache_time: 0 })
})

function parseQuery(query: string): [string | null, string] {
    const m = query.match(/^:([a-z]{2}(?:-[a-z]{2,3})?)/)
    if (!m)
        return [null, query]
    return [m[1], query.slice(m[1].length + 1).trimStart()]
}

function getHelpArticle(botUsername: string): InlineQueryResultArticle {
    return {
        id: "help",
        type: "article",
        title: "Help",
        input_message_content: {
            message_text: format(helpMessageText, botUsername)
        }
    }
}

function getNotFoundArticle(query: string): InlineQueryResultArticle {
    const message = `Nothing found at the query "${query}"`
    return {
        id: "not-found",
        type: "article",
        title: "Not Found",
        description: message,
        input_message_content: {
            message_text: message,
            disable_web_page_preview: true
        }
    }
}

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
