

const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
      
       
       
        function createSphere(){
            const geometry = new THREE.SphereGeometry(2, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff99
            });
            const circle = new THREE.Mesh(geometry, material);
        
            scene.add(circle);
            circle.position.set(2,1,1);
        }
        
        camera.position.z = 8;
      
        createSphere();

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            circle.rotation.x += 0.01;
            circle.rotation.y += 0.01;
            circle.rotation.z += 0.03;
        }
        animate();
        