import 'reflect-metadata' // from where?
import {createKoaServer, Action} from "routing-controllers" // koa
import setupDb from './db'
import PageController from "./pages/controller"
import UserController from "./users/controller"
import LoginController from './logins/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [PageController, UserController, LoginController],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      return !!(token && verify(token))
    }
    return false
  }
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`\nListening on port ${port}\n`))
  )
  .catch(err => console.error(err))