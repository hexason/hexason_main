import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socket from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';
import { UserService } from './user/user.service';

export class IoCustomAdapter extends IoAdapter {
  protected httpServer: any;
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: socket.ServerOptions) {
    const io = super.createIOServer(port, options);

    const userService = this.app.get(UserService);

    io.use(async (socket: socket.Socket, next: (...o: any) => void) => {
      let jwt_token =
        socket.handshake.auth.authorization ||
        socket.handshake.headers['authorization'];
      const session_token = socket.id;
      // if(!session_token) throw new WsException("No session token provided");
      try {
        jwt_token = jwt_token.replace('Bearer ', '');
        const decoded = jwt.verify(jwt_token, process.env.SUPABASE_SECRET);
        const user = await userService.userSession(
          decoded['sub'] as string,
          session_token,
        );
        if (!user) throw new WsException('User not found');
        socket['user'] = {
          id: decoded['sub'],
          wallet: user.wallet,
          session_token,
          isAnonymous: false,
        };
        if (socket['user'].isAnonymous) return;
        next();
      } catch {
        socket['user'] = {
          id: 'anonymous',
          username: 'anonymous',
          from: 'anonymous',
          session_token,
          isAnonymous: true,
        };
        next();
      }
    });

    return io;
  }
}
