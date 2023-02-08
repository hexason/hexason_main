import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../models/game.model';
import { ChessGateway } from './chess.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [ChessGateway],
})
export class ChessModule {}
