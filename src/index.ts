import 'reflect-metadata' // from where?
import {createKoaServer} from "routing-controllers" // koa
import Controller from "./controller"

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [Controller]
})

app.listen(port, () => console.log(`Listening on port ${port}`))