import dotenv from "dotenv"
import { cleanEnv, str } from "envalid"

dotenv.config({ path: ".env" })

export const env = cleanEnv(process.env, {
    BOT_TOKEN: str({ desc: "A bot token from @BotFather" }),
})

export const BOT_TOKEN = env.BOT_TOKEN
