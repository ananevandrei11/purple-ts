export class FfmpegBuilder {
  private inputPath: string;
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set('-c:v', 'libx264');
  }

  input(inputPath: string): this {
    this.inputPath = inputPath;
    return this;
  }

  setVideoSize(w: number, h: number): this {
    this.options.set('-s', `${w}x${h}`);
    return this;
  }

  output(outputPath: string): string[] {
    if (!this.inputPath) {
      throw new Error('InputPath not found');
    }
    const args: string[] = ['-i', this.inputPath];
    this.options.forEach((val, key) => {
      args.push(key);
      args.push(val);
    });
    args.push(outputPath);
    return args;
  }
}
