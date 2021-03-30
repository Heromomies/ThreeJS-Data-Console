const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls;

const gameData = dataJSON;

const genres = {};

genres["action"] = 0;
gameData.forEach((value) => {
    var genre = value["Genre"].toLowerCase();
    if (genre === "") {
        return;
    }

    if (genre.startsWith("action")) {
        genres["action"] = genres["action"] + 1;
    } else {
        if (genres[genre] === undefined) {
            genres[genre] = 0;
        }
        genres[genre] = genres[genre] + 1;
        
        const sphereWidth = genres[genre];
        const sphereHeight = genres[genre];
        const sphereDepth = 16;
    
        const geometry = new THREE.SphereGeometry(sphereWidth, sphereHeight, sphereDepth);
        
        createSphere(geometry, generateRandomColor(), getRandomIntInclusive(100, 500), getRandomIntInclusive(100, 500));
    }
  
})
console.log(genres);

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function createSphere(geometry, color, x, z) {

    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    sphere.position.set(2, 1, z);
    sphere.position.x = x;
    return sphere;
}

camera.position.z = 500;


function createCamera() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.;

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