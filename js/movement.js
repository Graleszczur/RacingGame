
var up=false;
var down=false;
var left=false;
var right=false;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

document.addEventListener('keydown',onDocumentKeyDown,false);
document.addEventListener('keyup',onDocumentKeyUp,false);

function onDocumentKeyDown(event){
    event = event || window.event;
    var keycode = event.keyCode;
    switch(keycode){
        case 37: console.log("left down");left=true;break;
        case 38 : console.log("up down"   );up=true;break;
        case 39 : console.log("right down"); right=true;break;
        case 40 : console.log("down down" );down=true;break;
    }
}
function onDocumentKeyUp(event){
    event = event || window.event;
    var keycode = event.keyCode;
    switch(keycode){
        case 37 : console.log("left up" );left=false;break;
        case 38 : console.log("up up"   );up=false;break;
        case 39 : console.log("right up");right=false;break;
        case 40 : console.log("down up" );down=false;break;
    }
}

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var Texture = new THREE.TextureLoader().load( "img\\droga.png" );
Texture.wrapS = THREE.RepeatWrapping;
Texture.wrapT = THREE.RepeatWrapping;
Texture.repeat.set( 1, 5 );

var Material = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.DoubleSide } );
var Geometry = new THREE.PlaneGeometry(10, 50, 1, 1);
var plane = new THREE.Mesh(Geometry, Material);
plane.rotation.set(90, 0, 0);
plane.material.map.offset.y = 1.5;
scene.add(plane);
var clock = new THREE.Clock;
dt=clock.getDelta();


var camera = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, 0.1, 10000);
camera.position.z = 10;
scene.add(camera);
var light = new THREE.PointLight(0xFFFFFF);
light.position.set(-10, 15, 50);
scene.add(light);


var texture = THREE.ImageUtils.loadTexture( 'img\\tlo.png' );
var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
        map: texture
    }));

backgroundMesh .material.depthTest = false;
backgroundMesh .material.depthWrite = false;

// Create your background scene
var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();
backgroundScene .add(backgroundCamera );
backgroundScene .add(backgroundMesh );

var speed = 0
var velocity = 0.001
var friction = 0.99

function render() {

    speed *= friction;
    plane.material.map.offset.y -= speed;
    requestAnimationFrame(render);

    if(right){
        if(camera.position.x < 3.5){
            camera.position.x += 0.1;

        }
    }

    if(left){
        if(camera.position.x > -3.5){
            camera.position.x -= 0.1;

        }
    }
    if(up){
        speed += velocity
    }
    if(down){
        friction = 0.85
    }
    if(!down){
        friction = 0.99
    }
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render(scene, camera);
}
render();
</script>