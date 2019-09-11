import { IsString } from 'class-validator'
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers'
import User from '../users/entity'
import { sign } from '../jwt'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController{
  @Post('/logins')
  async authenticate(
    @Body() {email, password}: AuthenticatePayload
  ) {
    // check if user exists
    const user = await User.findOne({where: {email}})
    if(!user) throw new BadRequestError('No such user')
    // checkPassword returns boolean for match
    if (!await user.checkPassword(password)) {
      throw new BadRequestError('Wrong password!')
    }
    const jwt = sign({ id: user.id! })
    return { jwt }

  }
}
