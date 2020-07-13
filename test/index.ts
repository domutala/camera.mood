import Camera from '../src/camera';
import '../src/camera.scss';

const camera = new Camera({
  parent: '#app',
  delay: 0,
  created: function () {
    camera.mount();
  }
});
