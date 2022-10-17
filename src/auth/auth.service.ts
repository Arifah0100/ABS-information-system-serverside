import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../interfaces/users.interface';
import { UsersDto } from 'src/entities/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Users> {
    const user = await this.userService.findByUsername(username);
    const passwordMatched = user && (await bcrypt.compare(pass, user.password));
    if (passwordMatched && user.status != 'Inactive') {
      return user;
    }
    return null;
  }

  async login(user: any) {
    // use sub for userId to be consistent with JWT Standards
    const accessToken = this.getAccessToken(user);
    const refreshToken = this.jwtService.sign({ userId: user.id });
    let expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() +
        parseInt(this.configService.get('jwt').expiresIn, 10),
    );
    return {
      userId: user.id,
      accessToken,
      expiresIn,
      refreshToken,
    };
  }

  getAccessToken(user: UsersDto) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.userType,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt').secret,
      expiresIn: this.configService.get('jwt').expiresIn,
    });
  }

  async register(user: UsersDto): Promise<UsersDto> {
    const { username } = user;
    const foundUser = await this.userService.findByUsername(username);
    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.username = user.username.toLowerCase();
    return await this.userService.create(user);
  }

  async updateUserPassword(newPin: string, userId: number) {
    const user = await this.userService.findOne(userId);
    const hashedPassword = await bcrypt.hash(newPin, 10);
    user.password = hashedPassword;
    return await this.userService.update(userId, user);
  }

  async verifyPassword(newPin: string, userId: number) {
    const user = await this.userService.findOne(userId);
    const passwordMatched = await bcrypt.compare(newPin, user.password);
    if (passwordMatched) {
      return user;
    }
    return;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userService.findOne(userId);
    if (refreshToken === user.refreshToken) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userService.setCurrentRefreshToken(null, userId);
  }

  pick(O: any, props: string[]): any {
    return props.reduce((o, k) => ((o[k] = O[k]), o), {});
  }
}
