import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Chess } from 'chess.js';
import { WalletService } from '../user/wallet.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { Session } from '../models/session.model';

@WebSocketGateway({ cors: true, transfort: 'websocket' })
export class ChessGateway {
  constructor(
    private readonly walletService: WalletService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  @WebSocketServer()
  server: Server;

  games = new Map();
  playingUsers = new Map();

  @SubscribeMessage('game:join')
  async handleJoin(client: any, payload: any) {
    const { key } = payload;
    const game = await this.gameRepo.findOne({
      where: {
        id: key,
        status: 'waiting',
      },
    });
    if (!game) {
      client.emit('game:over', { key });
      return;
    }
    const token = client.user.session_token;
    if (!token) return;
    if (game.w !== client.user.id && game.b !== client.user.id) return;
    client.join(key);
    let g = this.games.get(key);
    if (!g) {
      g = {
        pgn: game.pgn,
        w: game.w,
        b: game.b,
        status: game.status,
      };
    }
    const gameSession = { pgn: g.pgn, w: g.w, b: g.b, status: game.status };
    client.join(key);
    switch (client.user.id) {
      case game.w:
        gameSession.w = token;
        this.server.to(client.id).emit('game:joined', { key, side: 'w' });
        break;
      case game.b:
        gameSession.b = token;
        this.server.to(client.id).emit('game:joined', { key, side: 'b' });
        break;
    }
    this.games.set(key, gameSession);
    g = gameSession;
    const chessData = new Chess();
    chessData.loadPgn(g.pgn);

    this.server.to(key).emit('game:ongoing', {
      key,
      pgn: g.pgn,
    });

    this.server.to(key).emit('game:message', {
      key,
      message: token + ' joined the game',
      token: 'System',
    });

    if (this.reminderTimer[key]) return;
    this.matchTimer[key] = 300;
    this.reminderTimer[key] = setInterval(async () => {
      this.matchTimer[key] -= 1;
      this.server.to(key).emit('game:timer', {
        time: this.matchTimer[key],
      });

      if (this.matchTimer[key] <= 0) {
        const winner = chessData.turn() === 'w' ? g.b : g.w;
        const winnerUser = await this.sessionRepo
          .findOne({
            where: {
              session: winner,
            },
            relations: ['user'],
          })
          .catch(console.log);
        this.server.to(key).emit('game:over', {
          winner,
          pgn: chessData.pgn(),
        });
        this.games.delete(key);
        await this.gameRepo
          .update({ id: key }, { status: 'over', pgn: chessData.pgn() })
          .catch(console.log);
        if (winnerUser)
          this.walletService.addBalance(
            winnerUser.user.id,
            +(game.bet * 2 * 0.9).toFixed(2),
            'Chess Winner',
          );
        clearInterval(this.reminderTimer[key]);
      }
    }, 1000);
  }

  matchTimer = {};
  reminderTimer = {};
  @SubscribeMessage('game:ongoing')
  async handleMessage(client: any, payload: any) {
    const { m, key } = payload;
    if (!m || !key) return;
    const token = client.user.session_token;
    if (!token) return;
    const gameData = await this.gameRepo.findOne({
      where: {
        id: key,
      },
    });
    if (!gameData || gameData.status !== 'waiting') {
      client.emit('game:over', { key });
      return;
    }
    const g = this.games.get(key);
    const game = new Chess();
    if (g) {
      game.loadPgn(g.pgn);
      if (g[game.turn()] !== token) {
        this.server.to(key).emit('game:ongoing', {
          pgn: g.pgn,
        });
        return;
      }
      if (this.reminderTimer[key]) clearInterval(this.reminderTimer[key]);
      this.matchTimer[key] = 300;
      this.reminderTimer[key] = setInterval(async () => {
        this.matchTimer[key] -= 1;
        this.server.to(key).emit('game:timer', {
          time: this.matchTimer[key],
        });

        if (this.matchTimer[key] <= 0) {
          const winner = game.turn() === 'w' ? g.b : g.w;
          const winnerUser = await this.sessionRepo
            .findOne({
              where: {
                session: winner,
              },
              relations: ['user'],
            })
            .catch(console.log);
          this.server.to(key).emit('game:over', {
            winner,
            pgn: game.pgn(),
          });
          this.games.delete(key);
          await this.gameRepo
            .update({ id: key }, { status: 'over', pgn: game.pgn() })
            .catch(console.log);
          if (winnerUser)
            this.walletService.addBalance(
              winnerUser.user.id,
              +(gameData.bet * 2 * 0.9).toFixed(2),
              'Chess Winner',
            );
          clearInterval(this.reminderTimer[key]);
        }
      }, 1000);

      game.move(m);
      if (game.isGameOver()) {
        if (game.isCheckmate()) {
          const winner = game.turn() === 'w' ? g.b : g.w;
          const winnerUser = await this.sessionRepo.findOne({
            where: {
              session: winner,
            },
            relations: ['user'],
          });
          if (winnerUser) {
            this.walletService.addBalance(
              winnerUser.user.id,
              +(gameData.bet * 2 * 0.9).toFixed(2),
              'Chess Winner',
            );
          }
        }
        await this.gameRepo.update(
          { id: key },
          { status: 'over', pgn: game.pgn() },
        );
        this.server.to(key).emit('game:over', { key });
        return;
      }
      this.games.set(key, { ...g, pgn: game.pgn() });
    }
    const newPgn = game.pgn();

    this.server.to(key).emit('game:ongoing', {
      pgn: newPgn,
    });

    return 'Hello from server';
  }

  @SubscribeMessage('game:message')
  handleChat(client: any, payload: any) {
    const { key, message } = payload;
    if (!key || !message) return;
    const token = client.user.session_token;
    if (!token) return;
    const g = this.games.get(key);
    if (!g) return;

    this.server.to(key).emit('game:message', {
      key,
      message,
      token,
    });
  }

  isMatching = false;
  matchQueue = { 1: [], 5: [], 10: [] };
  @SubscribeMessage('match')
  async handleMatch(client: any, payload: any) {
    const { bet } = payload;
    if (client.user.isAnonymous) return;
    const wallet = client.user.wallet;
    if (!wallet) return;
    if (wallet.balance < bet) return;
    const token = client.user.session_token;
    if (!token) return;
    const queue = this.matchQueue[bet].filter((id: string) => id !== token);
    if (queue.length === 0) {
      queue.push(token);
      this.server.to(token).emit('match:waiting', { bet });
    } else {
      if (this.isMatching) {
        queue.push(token);
        return;
      }
      this.isMatching = true;
      const opponent = queue.shift();
      console.log('match found', token, opponent);

      this.walletService
        .balanceDecrease(wallet, bet, 'Chess Fee')
        .catch(console.log);
      this.userRepo
        .findOne({
          where: {
            session: opponent,
          },
          relations: ['wallet'],
        })
        .then((user) => {
          if (user) {
            this.walletService
              .balanceDecrease(user.wallet, bet, 'Chess Fee')
              .catch(console.log);
          }
        });
      const key =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const game = new Chess();
      const opp = await this.userRepo.findOne({
        where: {
          session: opponent,
        },
      });
      const gameData = this.gameRepo.create({
        id: key,
        pgn: game.pgn(),
        w: client.user.id,
        b: opp.id,
        status: 'waiting',
      });

      this.games.set(key, {
        pgn: game.pgn(),
        w: token,
        b: opponent,
        status: 'waiting',
      });
      await this.gameRepo.save(gameData);

      this.server.to(client.id).emit('match:found', { key, bet, opponent });
      this.server
        .to(opponent)
        .emit('match:found', { key, bet, opponent: token });

      this.isMatching = false;
    }
    this.matchQueue[bet] = queue;
  }

  @SubscribeMessage('match:cancel')
  handleCancel(client: any, payload: any) {
    const token = client.user.session_token;
    this.matchQueue[1] = this.matchQueue[1].filter(
      (id: string) => id !== token,
    );
    this.matchQueue[5] = this.matchQueue[5].filter(
      (id: string) => id !== token,
    );
    this.matchQueue[10] = this.matchQueue[10].filter(
      (id: string) => id !== token,
    );
  }

  handleDisconnect(client: any) {
    const token = client.user.session_token;
    if (!token) return;
    const key = this.playingUsers.get(token);
    if (key) {
      const g = this.games.get(key);
      if (!g) return;
      if (g.w === token) {
        g.w = null;
      } else if (g.b === token) {
        g.b = null;
      }
      this.games.set(key, g);
      this.playingUsers.delete(token);
      this.server.to(key).emit('game:ongoing', {
        key,
        pgn: g.pgn,
      });
    }
    this.matchQueue[1] = this.matchQueue[1].filter(
      (id: string) => id !== token,
    );
    this.matchQueue[5] = this.matchQueue[5].filter(
      (id: string) => id !== token,
    );
    this.matchQueue[10] = this.matchQueue[10].filter(
      (id: string) => id !== token,
    );
  }
}
