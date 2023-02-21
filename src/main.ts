import "source-map-support/register"

import { bot } from "bot"
import { middlewares } from "middlewares"
import { handlers } from "handlers"
import { run, RunnerHandle } from "@grammyjs/runner"

bot.use(middlewares)
bot.use(handlers)

let runner: RunnerHandle

async function main() {
    await bot.init()
    runner = run(bot)
    console.log(`@${bot.botInfo.username} started`)
}

async function exit() {
    console.log("Goodbye!")
    if (runner.isRunning())
        await runner.stop()
}

main().then(() => {
    process.on("SIGINT", exit)
    process.on("SIGTERM", exit)
})
