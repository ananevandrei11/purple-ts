import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor.js';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { ICommandExecuteFfmpeg, IFfmpegInput } from './ffmpeg.types';
import { FileService } from '../../core/files/files.service.js';
import { PromptService } from '../../core/prompt/prompt.service.js';
import { FfmpegBuilder } from './ffmpeg.builder.js';
import { StreamHandler } from '../../core/handlers/stream.handler.js';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();
  constructor(logger: IStreamLogger) {
    super(logger);
  }
  protected async prompt(): Promise<IFfmpegInput> {
    const w = await this.promptService.input<number>('Width', 'number');
    const h = await this.promptService.input<number>('Height', 'number');
    const path = await this.promptService.input<string>('Path', 'input');
    const name = await this.promptService.input<string>('Name', 'input');
    return { w, h, path, name };
  }
  protected build({ w, h, name, path }: IFfmpegInput): ICommandExecuteFfmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(w, h)
      .output(output);

    return { command: 'ffmpeg', args, output };
  }
  protected spawn({
    args,
    command,
    output,
  }: ICommandExecuteFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger,
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
