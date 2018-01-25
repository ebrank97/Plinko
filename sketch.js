// module aliases
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
let plinkos = [];
let boundaries = [];
let rows = 11,
    cols = 11;

let bounce;

function preload(){
  bounce = loadSound('Bounce.mp3');
}

function setup() {
  // put setup code here
  createCanvas(600, 700);
  colorMode(HSB);
  console.log("Press the mouse to create new Particles");
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 1;
  newParticle();

  let spacing = width / cols;
  for(let j=0;j<cols;j++){
    for(let i=0;i<rows;i++){
      let x = i * spacing;
      if(j % 2 == 0){
        x += spacing/2;
      }
      let y = spacing + j * spacing;
      let p = new Plinko(x, y, 4);
      plinkos.push(p);
    }
  }

  let b = new Boundary(width/2, height+50, width, 100);
  boundaries.push(b);

  for(let i=0; i< cols + 1;i++){
    let x = i * spacing;
    let h = 70;
    let w = 10;
    let y = height - h/2;
    let b = new Boundary(x, y, w, h);
    boundaries.push(b);
  }
}

function newParticle(){
  let p = new Particle(300, 0, 10);
  particles.push(p);
}

function mousePressed(){
  let p = new Particle(random(width), 0, 10);
  particles.push(p);
  bounce.play();
}

function draw() {
  // put drawing code here
  background(0, 0, 0);
  //To create a new Particle every 60 framesPerSecond
  if(frameCount % 80 ==  0){
    newParticle();
  }

  Engine.update(engine, 16.666); //delta = 16.666 ms thats the update time of the engine

  for(let i=0;i < particles.length;i++){
      particles[i].show();
      if(particles[i].isOffScreen()){
        World.remove(world, particles[i].body);
        particles.splice(i, 1);
        i--;
      }
  }

  for(let i=0;i < plinkos.length;i++){
      plinkos[i].show();
  }

  for(let i=0;i < boundaries.length;i++){

      boundaries[i].show();
  }
}
