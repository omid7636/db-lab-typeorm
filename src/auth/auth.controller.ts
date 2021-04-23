import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ApiBody } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { Public } from './decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginDto,
  })
  login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user)
  }
}
