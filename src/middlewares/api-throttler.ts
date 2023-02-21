import { comp } from "./composer"
import { apiThrottler } from "@grammyjs/transformer-throttler"

comp.use((ctx, next) => {
    ctx.api.config.use(apiThrottler())
    return next()
})
