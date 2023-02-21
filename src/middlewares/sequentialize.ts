import { comp } from "./composer"
import { sequentialize } from "@grammyjs/runner"

comp.use(sequentialize(ctx => ctx.from?.id.toString()))
