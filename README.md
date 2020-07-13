# Camera.mood

mediaDevices

## Installation

```PowerShell
#npm
npm i --save camera.mood

#yarn
yarn add camera.mood
```

## Usage

```typescript
import { Camera } from 'camera.mood';
import 'camera.mood/dist/camera.css';

const camera = new Camera({ parent: '#app' });
camera.mount();
```

### Props

#### parent

- **type**: _string_ | _HTMLElement_
- **requred**: _false_
- **default**: _body_

#### facingMode

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

#### className

- **type**: _string_
- **requred**: _false_

#### facingMode

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

#### delay

- **type**: _number_
- **requred**: _false_
- **default**: _0_

#### accept

- **type**: _string_
- **requred**: _false_
- **default**: _image/\*_

#### captureButton

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

#### loaderButton

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

#### delayButton

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

#### facingButton

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

### events

#### onError

```typescript
const camera = new Camera({
  // ...

  onError(e: any) {
    console.log(e);
  }
});
```

#### created

```typescript
const camera = new Camera({
  // ...

  created() {
    console.log('The camera is ready to be mounted');
  }
});
```

#### mounted

```typescript
const camera = new Camera({
  // ...

  mounted() {
    console.log('The camera is mounted on DOM');
  }
});
```

#### updated

```typescript
const camera = new Camera({
  // ...

  updated() {
    console.log('The camera is updated');
  }
});
```

#### captured

```typescript
const camera = new Camera({
  // ...

  captured(data: CameraObject) {
    console.log(camera.data);
  }
});
```

### functions

#### mount

mount the camera in DOM

```typescript
const camera = new Camera({});
camera.mount();
```

#### capture

take a picture

```typescript
const camera = new Camera({});
camera.capture();
```

#### remove

delete camera

```typescript
const camera = new Camera({});
camera.remove();
```

## Author

**[@domutala](https://github.com/domutala)**

## License

MIT
