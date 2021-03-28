


        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls (camera, renderer.domElement);
      
       
       
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
      
      

        
        function createLights() {
            // Create a directional light
            const mainLight = new THREE.PointLight(0xffffff, 22.0);
    
    
            // remember to add the light to the scene
            scene.add( mainLight);
        }
        function init() {
          
    
            // Set the background color
            scene.background = new THREE.Color('#00DDDC');
            createSphere();
           // createCamera();
            createLights();
            renderer.render( scene, camera );
        }
        init();