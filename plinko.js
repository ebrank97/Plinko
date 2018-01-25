class Plinko{

  constructor(x, y, r){
    this.hue = random(360);
    let option = {
      restitution: 0.5,
      friction: 0,
      isStatic: true
    };
    this.body = Bodies.circle(x,  y, r, option);
    this.r = r;
    World.add(world, this.body);
  }

  show(){
    fill(this.hue,255,255);
    noStroke();
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
