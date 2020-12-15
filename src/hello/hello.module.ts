import { Module } from '@nestjs/common'
import { HelloService } from './hello.service'
import { HelloController } from './hello.controller'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Module({
  controllers: [HelloController],
  providers: [
    HelloService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HelloModule {}
