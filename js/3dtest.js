var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
console.log(renderer);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set the clear color to transparent

var mesh; // Define the mesh variable outside the loader.load() function

// Create a new GLTF loader
const loader = new THREE.GLTFLoader();

// Load the model
loader.load(
  // URL of the model file
  'public/moon.gltf',

  // Called when the model has loaded
  function ( gltf ) {
    console.log(gltf);
    // Get the mesh from the loaded model
    mesh = gltf.scene.children[0];

    // Add the mesh to the scene
    scene.add( mesh );

    // This scales the mesh to half its original size in all directions
    mesh.scale.set(0.6, 0.6, 0.6); 


    // Animate the mesh
    function animate() {
      requestAnimationFrame(animate);

      mesh.rotation.x += (targetRotationY - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetRotationX - mesh.rotation.y) * 0.05;
      mesh.position.set(0, -0.5, 0);
      renderer.render(scene, camera);
    }

    animate();

  },
  
  // Called while the model is loading
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  
  // Called if there's an error loading the model
  function ( error ) {

    console.error( error );

  }
);

// Add lights to the scene for shading
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

camera.position.z = 3;

// Variables to store mouse position and rotation
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var isMouseDown = false;
var targetRotationX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationOnMouseDownY = 0;

// Add event listeners for mouse movement
document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('mousedown', onDocumentMouseDown);
document.addEventListener('mouseup', onDocumentMouseUp);

function onDocumentMouseDown(event) {
  event.preventDefault();

  isMouseDown = true;

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  targetRotationOnMouseDownX = targetRotationX;
  targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) / 200;
  mouseY = (event.clientY - window.innerHeight / 2) / 200;

  if (isMouseDown) {
    targetRotationX += (mouseX - prevMouseX) * 1;
    targetRotationY += (mouseY - prevMouseY) * 1;

    mesh.rotation.x += (mouseY - prevMouseY) * 0.01;
    mesh.rotation.y -= (mouseX - prevMouseX) * 0.01;
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function onDocumentMouseUp(event) {
  isMouseDown = false;
}
