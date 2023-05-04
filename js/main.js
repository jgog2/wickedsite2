const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
const mousePosition = {
  x: 0,
  y: 0
};

function onMouseMove(event) {
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  if (isDragging) {
    const deltaMove = {
      x: mousePosition.x - previousMousePosition.x,
      y: mousePosition.y - previousMousePosition.y
    };

    const deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(
        new THREE.Euler(
          toRadians(deltaMove.y * 40),
          toRadians(deltaMove.x * 40),
          0,
          'XYZ'
        )
      );

    cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
  }

  previousMousePosition = {
    x: mousePosition.x,
    y: mousePosition.y
  };
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function onMouseDown(event) {
  isDragging = true;
}

function onMouseUp(event) {
  isDragging = false;
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
