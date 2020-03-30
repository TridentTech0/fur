window.addEventListener('DOMContentLoaded',()=>{
    let canvas = document.getElementById('renderCanvas'); 
    let engine = new BABYLON.Engine(canvas,false);
    
    let createScene = () =>{
        let scene = new BABYLON.Scene(engine); // creating babylonJs Scene
        scene.clearColor = new BABYLON.Color3.FromHexString('#c6dae1');

        /* Cameras */
        let camera = new BABYLON.ArcRotateCamera('camera1',Math.PI/2,Math.PI/2,100,new BABYLON.Vector3.Zero(),scene);
        camera.attachControl(canvas,true);

        /* Lights */
        let hempLight = new BABYLON.HemisphericLight('light1',new BABYLON.Vector3(0,1,0),scene);
        hempLight.intensity = 1.6;
        let pointLight = new BABYLON.PointLight('pointLight',new BABYLON.Vector3.Zero(),scene);
        pointLight.parent = camera;

        /* Object - Sphere */
        let sphere = new BABYLON.Mesh.CreateSphere('sphere1',35,60,scene);
    
        /* Fur Material */
        let furMaterial = new BABYLON.FurMaterial('fur',scene);
        furMaterial.highLevelFur = true;
        furMaterial.furLength = 1;
        furMaterial.furAngle = Math.PI/2;
        furMaterial.furColor = new BABYLON.Color3(1,1,1);
        furMaterial.diffuseTexture = new BABYLON.Texture('https://res.cloudinary.com/weatherapi/image/upload/v1585508989/babylon/skin_wc58op.jpg',scene);
        furMaterial.bumpTexture = new BABYLON.Texture('https://res.cloudinary.com/weatherapi/image/upload/v1585508988/babylon/bump_dxcauv.png',scene);
        furMaterial.furTexture = new BABYLON.FurMaterial.GenerateTexture('furTexture',scene);
        furMaterial.furSpacing = 3.2;
        furMaterial.furDensity = 20;
        furMaterial.furSpeed = 200;
        // furMaterial.furGravity = new BABYLON.Vector3(0,-1,0);
        sphere.material = furMaterial;
        var quality = 30;
        var shells = BABYLON.FurMaterial.FurifyMesh(sphere, quality);
        
        return scene;
    }

    let scene = createScene();
    engine.runRenderLoop(()=>{
            scene.render();
    })

    window.addEventListener('resize',()=>{
        engine.resize();
    })

})