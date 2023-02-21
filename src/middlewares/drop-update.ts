import { comp } from "./composer"

comp.use((ctx, next) => {
    if (ctx.inlineQuery)
        return next()
})
