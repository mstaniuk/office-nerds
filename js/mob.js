"use strict";
function Mob(x,y) {

  //general
  this.name      = null;
  this.x         = x || 0;           // X coord on grid
  this.y         = y || 0;           // Y coord on grid
  this.path      = [];               // Path to target
  this.sprite    = new Sprite('img/panda.png', [0,0], [0,0], [32,32], this.speed, [1,2], false);

  // misc
  this.target    = null;             // Target node
  this.goTo      = [];             // Target node
  this.pathExists= true;

  // Timing
  this.lastAtk   = Date.now();       // Last Atack in ms
  this.lastStep  = Date.now();       // Last step date

  //stats
  this.hp        = 100;
  this.maxHp     = 100;
  this.dmg       = 10;
  this.atkSpeed  = 1;
  this.speed     = 3;

  // states
  this.dead      = false;
  this.walking   = false;
};

Mob.prototype.getHpProc = function() {
  // return current hp as part of max health
  return (this.hp/this.maxHp);
}

Mob.prototype.update = function() {
    // update Mobs sprite
  this.sprite.update();
    // Attack Player if possible
  this.attack(Player);
    // Update last step time
  this.lastStep += this.speed * Game.dt;
    // Update last atack time
  this.lastAtk  += this.atkSpeed * Game.dt;
    // Move mob
  this.move();
}

Mob.prototype.canMove = function() {
    // Last step was took long enough
  if(this.lastStep > 1) {
    return true;
  }
  return false;
}

Mob.prototype.canAtk = function() {
    // Last atack was took long enough
  if(this.lastAtk > 1) {
    return true;
  }
  return false;
}

Mob.prototype.setDir = function(dx, dy) {
  if(dy > 0) {
    this.dir = 's';
  } else if(dy < 0) {
    this.dir = 'n';
  } else if(dx > 0) {
    this.dir = 'e';
  } else {
    this.dir = 'w';
  }
}

Mob.prototype.inRange = function(x, y) {
    // Get neighbors if Mob
  var neighbors = Game.grid.getNeighborsOf(this.x,this.y);
    // Loop through meighbors
  for(var i = 0; i < neighbors.length; ++i) {
      // check wather x y is neighbor of mob
    if(y === neighbors[i].y && x === neighbors[i].x){
      return true;
    }

  }

  return false;
}

Mob.prototype.attack = function(obj) {
    // check if attacked object is dead
  if(obj.dead) {
    return;
  }
    // check if Mob can attack
  if(!this.canAtk()) {
    return;
  }
    // check if attacked object is in range of attack
  if(!this.inRange(obj.x,obj.y)) {
    return;
  }
    // randomize miss as 1 of 100
  if(Utils.randomInt(0,10) === Utils.randomInt(0,10)) {
      // Create 'miss' inscription
  Game.particles.push(new TextAnim(this.x*32+this.sprite.size[0]/2, this.y*32-this.sprite.size[1]/2, "Miss"));
    return;
  }
    // Create hit sprite
  Game.explosions.push(new Sprite('img/hit1.png',[obj.x*32-16, obj.y*32-16],[0,0],[64,64],26,[0,1,2,3,4,5,6,7,8,9,10,11,12], true));
    // create current dmg
  var dmg = 0;
    // randomize weather it's hard hit as 1/400
  if(Utils.randomInt(0,20) === Utils.randomInt(0,20)) {
      // randomize attack demage as 200% to 250% of base attack
    dmg = Utils.randomInt(this.dmg*2,this.dmg*2.5);
      // Create special hit sprite
    Game.explosions.push(new Sprite('img/hit.png',[obj.x*32, obj.y*32],[0,0],[32,32],16,[0,1,2,3], true));
  } else {
      // randomize attack demage as 70% to 140% of base attack
    dmg = Utils.randomInt(this.dmg*0.8,this.dmg*1.2);
  }
    // Call reciving function on target object
  obj.reciveHit(dmg);
    // randomize next attack timig
  this.lastAtk = Utils.randomRange(-(this.atkSpeed*0.25),this.atkSpeed*0.25);
}

Mob.prototype.move = function() {
    // if Mob can't move
  if(!this.canMove()) {
    this.walking = false;
    return;
  }
    // check if move target exist
  if(this.target === null) {
    this.walking = false;
    return;
  }

  if(this.goTo[0] !== this.target.x || this.goTo[1] !== this.target.y){
    this.goTo = [this.target.x,this.target.y];
  }

    // Check if is by the destination
  if(Game.grid.isNeighborOf(this.x,this.y,this.goTo[0],this.goTo[1])){
    return;
  }

  if(!this.pathExists){
    return;
  }


    // Check if current path is valid
  if(!this.checkPath()) {
      // Create new path
    this.setPath();
    return;
  }

    // check if last path move is to the target or its neighbor
  if(this.path[this.path.length-1].x !== this.goTo[0] ||
     this.path[this.path.length-1].y !== this.goTo[1] ||
     Game.grid.isNeighborOf(this.path[this.path.length-1].x,this.path[this.path.length-1].y, this.goTo[0], this.goTo[1])) {
    this.setPath();
    return;
  }

    // Check if next step is possible
  if(!Game.grid.isWalkableAt(this.path[0].x, this.path[0].y)) {
      // calculate new path
    this.setPath();
    return;
  }

    // set walking state to true
  this.walking = true;
    // check walk direction
  var dx = this.path[0].x - this.x;
  var dy = this.path[0].y - this.y;
    // set directoon
  this.setDir(dx,dy);
    // Set grid walkable
  Game.grid.setWalkableAt(this.x,this.y,true);
    // set new Mob position
  this.x = this.path[0].x;
  this.y = this.path[0].y;
    // Set grid walkable
  Game.grid.setWalkableAt(this.x,this.y,false);
    // remove step that wast just made
  this.path.splice(0, 1);
    // reset last step timer
  this.lastStep = 0;
};

Mob.prototype.reciveHit = function(dmg) {
    // decreese durrent hp
  this.hp    -= dmg;
    // reset color of demage inscription
  var color   = "";
    // reset size of demage inscription
  var size    = "";
    // calculate procentage of recived demage
  var percent = dmg/this.maxHp;
    // set color of demage inscription
    // set size of demage inscription
    // based on got dmg
  if(percent < 0.05) {
    color = "#FFF3E0";
    size  = "12px";
  } else if(percent < 0.15) {
    color = "#FFE0B2";
    size  = "14px";
  } else if(percent < 0.2) {
    color = "#FFCC80";
    size  = "16px";
  } else if(percent < 0.25) {
    color = "#FFB74D";
    size  = "18px";
  } else if(percent < 0.3) {
    color = "#FFA726";
    size  = "2px";
  } else if(percent < 0.35) {
    color = "#FF9800";
    size  = "22px";
  } else if(percent < 0.4) {
    color = "#FB8C00";
    size  = "24px";
  } else if(percent < 0.45) {
    color = "#F57C00";
    size  = "26px";
  } else if(percent < 0.5) {
    color = "#EF6C00";
    size  = "28px";
  } else {
    color = "#E65100";
    size  = "30px";
  }

    // // Create demage inscription
  Game.particles.push(
    new TextAnim(this.x * 32 + this.sprite.size[0] / 2, this.y * 32 - this.sprite.size[1] /2, "-" + "" + dmg, color, size, 0.5)
  );
    //if died call dire
  if(this.hp <= 0) {
    this.onDie();
  }
}

Mob.prototype.onDie = function() {
  Game.grid.setWalkableAt(this.x,this.y, true);
  this.dead = true;
}

Mob.prototype.drawHp = function() {
    // set hp bar background color
  Game.ctx.fillStyle    = "rgba(0,0,0,.3)";
    // draw hp bar background
  Game.ctx.fillRect(0, -5, Game.grid.nodeWidth+2, 4);

  if(!this.dead){
      // Set current hp bar color
    Game.ctx.fillStyle  = "rgba(255,0,0,.8)";
      // draw current hp bar
    Game.ctx.fillRect(1, -4, this.getHpProc()*Game.grid.nodeWidth, 2);
  }
    // set text font
  Game.ctx.font         = 'bold 12px Arial';
    // set text color
  Game.ctx.fillStyle    = "rgba(200,,0,.8)";
    // set stroke color
  Game.ctx.strokeStyle  = "rgba(0,0,0,.5)";
    // set stroke width
  Game.ctx.lineWidth    = 1;
    // get text size
  var text              = Game.ctx.measureText(this.name);
    // Write text
  Game.ctx.fillText(this.name, 16-text.width/2, -10);
    // Stroke text
  Game.ctx.strokeText(this.name, 16-text.width/2, -10);
}

Mob.prototype.draw = function() {
    // set right sprite position based on direction
  switch(this.dir){
    case 'n': this.sprite.pos = [0,64]; break;
    case 'w': this.sprite.pos = [0,128]; break;
    case 's': this.sprite.pos = [0,32]; break;
    case 'e': this.sprite.pos = [0,96]; break;
  }
    // set right sprite position based on walking state
  if(this.walking) {
    this.sprite.frames = [1,2];
  } else {
    this.sprite.frames = [0];
  }
    // save canvas' 2d context
  Game.ctx.save();
    // center canvas' 2d context on Mob
  Game.ctx.translate(this.x*32, this.y*32);
    // Draw Mobs sprite
  this.sprite.draw();
    // Draw Mobs hp & name
  this.drawHp();
    // restore canvas' 2d context
  Game.ctx.restore();
};


Mob.prototype.checkPath = function(){
    // check if path exists
  if(this.path === undefined || this.path[0] === undefined){
    return false;
  }
    // get used variables
  var pathLen = this.path.length,
      firstX  = this.path[0].x,
      firstY  = this.path[0].y,
      lastX   = this.path[pathLen-1].x,
      lastY   = this.path[pathLen-1].y;
    // check if next step is by 1 grid 'x' range
  if(Math.abs(this.x - firstX) > 1) {
    return false;
  }
    // check if next step is by 1 grid 'y' range
  if(Math.abs(this.y - firstY) > 1) {
    return false;
  }
    // check if path is not too long
  if(Math.abs(firstX - lastX) + Math.abs(firstY - lastY) > 30) {
    return false;
  }

  return true;
}


Mob.prototype.setPath = function() {
    // set helper variable
  var node = this.target;
    // check if target is not too far
  if(Math.abs(this.x - node.x) + Math.abs(this.y - node.y) > 20) {
    return;
  }

    // Create Astar
  var astar  = new Astar(this,node);
    // Calculate Path
  this.path  = astar.getPath();
    if(this.path === null) {
      this.pathExists = false;
    } else {
      this.pathExists = true;
    }
    // return calculated path
  return this.path;
};
