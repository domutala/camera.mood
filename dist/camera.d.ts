interface CameraObject {
    data: string;
    type: string;
    name: string;
}
export default class Camera {
    private mediaStream;
    private parent;
    private el;
    private className;
    private video;
    private facingMode;
    private delay;
    private accept;
    private mode;
    private ratio;
    private captureSate;
    private isVedeoPlayed;
    private captureButton;
    private loaderButton;
    private delayButton;
    private facingButton;
    private captured?;
    private onError?;
    private created?;
    private mounted?;
    private updated?;
    constructor({ parent, facingMode, className, delay, accept, captureButton, loaderButton, delayButton, facingButton, created, mounted, captured, updated, onError }: {
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
    buildTrack(): void;
    build(): void;
    private buildCaptureButton;
    private buildButtonLoader;
    private buildButtonFacing;
    private buildDelay;
    private buildDelayIndex;
    capture(): void;
    private counter;
    private capture0;
    mount(): void;
    remove(): void;
    load(): void;
}
export {};
