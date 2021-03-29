const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls;

const gameData = dataJSON;



gameData.forEach((value) => {
    console.log(value["Genre"]);
})

const sphereWidth = 2;
const sphereHeight = 16;
const sphereDepth = 16;

const geometry = new THREE.SphereGeometry(sphereWidth, sphereHeight, sphereDepth);

function createSphere(geometry, color, x) {

    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    sphere.position.set(2, 1, 1);
    sphere.position.x = x;
    return sphere;
}

camera.position.z = 8;

const spheres = [
    createSphere(geometry, 0x44aa88, 0),
    createSphere(geometry, 0x8844aa, -5),
    createSphere(geometry, 0xaa8844, 5),
];

function createCamera() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.1;

}

function createLights() {
    // Create a directional light
    const mainLight = new THREE.PointLight(0xffffff, 22.0);


    // add the light to the scene
    scene.add(mainLight);
}

function animate() {

    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
}

function init() {

    // Set the background color
    scene.background = new THREE.Color('#3c415c');

    createCamera();
    createLights();

}
init();
animate();