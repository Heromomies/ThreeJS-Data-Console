const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls;

const gameData = dataJSON;

const genres = {};


var raycaster;
var mouse;
var INTERSECTED;
genres["action"] = 0;



//let text = [];
//RAYCASTER
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2(1, 1);

let planets = [];

function onDocumentMouseMove(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    event.preventDefault();

    // update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


/*const loader = new THREE.FontLoader();*/

/*loader.load( 'json/PerfectDOSVGA437_Regular.json', function ( font ) {

	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 800,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5,
        
	} 
    
    
    );
    text.push(geometry);
}
 );*/




function SpawnSphere() {
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

            planets.push(createSphere(geometry, generateRandomColor(), getRandomIntInclusive(100, 500), getRandomIntInclusive(100, 500), getRandomIntInclusive(100, 500)));
        }

    })
}




function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createSphere(geometry, color, x, y, z) {

    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    sphere.position.set(x, y, z);
    sphere.userData.originalColor = color;
    return sphere;
}

camera.position.z = 500;


function createCamera() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;

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
    render();
    renderer.render(scene, camera);
}

function init() {

    // Set the background color
    scene.background = new THREE.Color('#3c415c');
    createCamera();
    createLights();

}

function render() {

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);


    for (const planet of planets) {
        let isFound = false;
        for (const planet2 of intersects) {
            //Si la planet est correspond
            if (planet === planet2.object) {
                planet.material.color.set(0x000000);
                isFound = true;
            }

        }
        if (!isFound) {
            planet.material.color.set(planet.userData.originalColor);
        }
    }
}


init();
animate();
SpawnSphere();
window.addEventListener('mousemove', onDocumentMouseMove, false);