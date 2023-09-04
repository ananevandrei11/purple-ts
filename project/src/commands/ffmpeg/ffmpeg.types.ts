import { ICommandExecute } from '../../core/executor/command.executor.types';

export interface IFfmpegInput {
  w: number;
  h: number;
  path: string;
  name: string;
}

export interface ICommandExecuteFfmpeg extends ICommandExecute {
  output: string;
}
