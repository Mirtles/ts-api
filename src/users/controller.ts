import { JsonController, Get, Param, Put, NotFoundError, Body, Post, HttpCode } from 'routing-controllers' 
import User from './entity'

@JsonController()
export default class UserController {

  // Create endpoints for victory and eternal glory

  @Get('/users')
  async getAllUsers(){
    const users = await User.find()
    return { users }
  }

  @Get('/users/:id')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }
  
  @Post('/users')
  @HttpCode(201)
  async createUser(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const newUser = User.create(rest)
    await newUser.setPassword(password) // arg is 'raw' pw, saves encrypted
    return newUser.save()
  }

  @Put('/users/:id')
  async updateUser(
    @Param('id') id: number,
    // updates, so partial is enough to do that
    @Body() updateReq: Partial<User>
  ) { 
    const user = await User.findOne(id)
    if(!user) throw new NotFoundError('Cannot find user')
    return User.merge(user, updateReq).save()
  }
}