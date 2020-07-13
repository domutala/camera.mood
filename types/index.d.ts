export interface CameraObject {
  data: string;
  type: string;
  name: string;
}

declare class Camera {
  private el: HTMLElement;
  private video: HTMLVideoElement;

  constructor({
    parent,
    facingMode,
    className,
    delay,
    accept,
    captureButton,
    loaderButton,
    delayButton,
    facingButton,
    created,
    mounted,
    captured,
    updated,
    onError
  }: {
    parent?: Element | string;
    facingMode?: boolean;
    className?: string;
    delay?: number;
    accept?: string;
    captureButton?: boolean;
    loaderButton?: boolean;
    delayButton?: boolean;
    facingButton?: boolean;
    created?: () => void;
    mounted?: () => void;
    updated?: () => void;
    captured?: (data: CameraObject) => void;
    onError?: (data?: any) => void;
  });

  public mount(): void;
  public capture(): void;
  public remove(): void;
}

export default Camera;
