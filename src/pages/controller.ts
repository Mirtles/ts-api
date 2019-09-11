import { JsonController, Get, Param, Body, Put, Post, HttpCode, NotFoundError } from 'routing-controllers'
import Page from './entity'


// this makes sure a class is marked as controller that always returns JSON
@JsonController()
export default class PageController {
  
  @Get('/pages')
  async getAllPages(){
    const pages = await Page.find()
    return { pages }
  }

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }

  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() updateReq: Partial<Page>
  ) { 
    const page = await Page.findOne(id)
    if(!page) throw new NotFoundError('Cannot find page')
    return Page.merge(page, updateReq).save()
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    return page.save()
  }
}