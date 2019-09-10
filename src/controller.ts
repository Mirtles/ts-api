import {Controller, Get} from 'routing-controllers' //koa decorators

// marks a class as a controller that can handle HTTP requests
@Controller()
export default class MainController {

  // marks this method as responding to HTTP request
  // @Get takes URI path as an argument
    @Get("/hello")
    main() {
      return {
        hello: 'World'
      }
    }

}