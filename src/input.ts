export interface IInput {
  forward: boolean;
  left: boolean;
  backward: boolean;
  right: boolean;
  jump: boolean;

}

export class Input implements IInput {
  private static _instance: IInput;

  forward: boolean;
  left: boolean;
  backward: boolean;
  right: boolean;
  jump: boolean;

  public static get Instance() {
    if (!Input._instance) {
      Input._instance = new Input();
    }

    return Input._instance;
  }

  private constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => this.onKeyChanged(event, true), false);
    document.addEventListener("keyup", (event: KeyboardEvent) => this.onKeyChanged(event, false), false);
  }

  private onKeyChanged(event: KeyboardEvent, down: boolean): void {
    switch (event.key) {
      case 'w':
        this.forward = down;
        break;
      case 'a':
        this.left = down;
        break;
      case 's':
        this.backward = down;
        break;
      case 'd':
        this.right = down;
        break;
      case ' ':
        this.jump = down;
        break;
    }
  };
}