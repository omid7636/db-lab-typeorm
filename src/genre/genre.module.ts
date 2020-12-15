import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from './entities/genre.entity'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  exports: [TypeOrmModule],
  controllers: [GenreController],
  providers: [
    GenreService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GenreModule {}
