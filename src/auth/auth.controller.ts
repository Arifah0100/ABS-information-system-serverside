import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginUserDto, RefreshDto, AccessTokenDto } from './userAuth.dto';
import { UsersDto } from 'src/entities/users.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  //Registering User
  @ApiBody({ type: UsersDto })
  @ApiOperation({ summary: 'Register User', operationId: 'register' })
  @ApiResponse({ status: 200, type: UsersDto })
  @Post('/register')
  create(@Body() user: UsersDto) {
    if (user.refreshToken == '') {
      return this.authService.register({
        ...user,
        refreshToken: undefined,
      });
    }
  }

  //Login User
  @ApiOperation({
    summary: 'Login User',
    operationId: 'login',
  })
  @ApiParam({
    name: 'user',
    type: LoginUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    type: AccessTokenDto,
  })
  @Post('login')
  async login(@Request() req) {
    const { refreshToken, accessToken, userId } = await this.authService.login(
      req.user,
    );
    await this.userService.setCurrentRefreshToken(refreshToken, userId);
    return { refreshToken, accessToken };
  }

  //Refresh Token
  @ApiOperation({
    summary: 'Refresh Token',
    operationId: 'refreshToken',
  })
  @ApiBody({
    type: RefreshDto,
  })
  @ApiResponse({
    status: 200,
    type: AccessTokenDto,
  })
  @ApiBearerAuth()
  @Post('refresh_token')
  async refreshToken(@Request() req) {
    const accessToken = this.authService.getAccessToken(req.user);
    return { accessToken };
  }

  //Logout User
  @ApiOperation({
    summary: 'logout given user',
    operationId: 'logout',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Request() req) {
    await this.authService.removeRefreshToken(req.user.userId);
  }

  //Get Profile of User Whose Logged In
  @ApiOperation({
    summary: 'get profile info',
    operationId: 'getProfile',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UsersDto })
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.userId);
    return {
      ...user,
      password: undefined,
      refreshToken: undefined,
    };
  }
}
