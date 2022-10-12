import { JwtRefreshTokenStrategy } from './jwt.refresh.token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { JwtConfig } from '../config/jwt.config.type';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from 'src/users/users.controller';
import { UsersDto } from 'src/entities/users.dto';
import Configuration from '../config/configuration';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersDto]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(Configuration)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<JwtConfig>('refresh').secret,
        signOptions: {
          expiresIn: configService.get<JwtConfig>('refresh').expiresIn,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
