const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, startingRoom) {
    super(name, description, startingRoom)
    this.newCooldown = 3000;
    this.cooldown = this.newCooldown;
    this.attackTarget = null;    
    this.isActive = true;
    this.actCounter = 0;

  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    let wasSameRoom = this.currentRoom === this.player.currentRoom
    let room = this.currentRoom
    let roomExits = Object.keys(room.exits);
    let numExits = roomExits.length;
    // choose random exit
    let rndIndex = Math.floor(Math.random() * numExits)
    let moveTo = roomExits[rndIndex];
    // move 
    const nextRoom = this.currentRoom.getRoomInDirection(moveTo);
    this.currentRoom = nextRoom;
    if (wasSameRoom) console.log(`${this.name} leaving room going ${roomExits[rndIndex]}`);
    if (this.currentRoom === this.player.currentRoom) console.log(`${this.name} joining room`);
      // reset cooldown
      this.cooldown = this.newCooldown
    
    }

  takeSandwich(sandwhich = 'sandwhich') {
    // Fill this in
    this.health += 10;
    console.log(`${this.name} found and ate a sandwhich!`);

    // get room items
    let roomItems = this.currentRoom.items

    // remove sandwhich from room
    this.currentRoom.items = roomItems.filter(roomItem => roomItem != sandwhich)


  }



  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }



  attack() {
    // Fill this in

    // if same room as player, attack
    if (this.currentRoom === this.player.currentRoom) {
      console.log(`${this.name} is attacking ${this.player.name}!!`)
      this.player.health -= 10;
      console.log(`${this.player.name} has lost 10 health! Current Health: ${this.player.health}`)
      if (this.player.health <= 0) {
        this.player.die();
      }
      this.cooldown = this.newCooldown;
    }
  }



  applyDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} is hit! ${this.name}'s health is now ${this.health}`)
    }
  



  act() {


    if (this.health <= 0) {
      // Dead, do nothing;
      return;
    }

    let isSandwhich = null;
    if (this.currentRoom.items > 0) {
      let items = this.currentRoom.items;
      let sandwhich = items.getItemByName('sandwhich');
      if (room.items.includes(sandwhich)) {
        isSandwhich = true;
      } 
    }

    if (this.cooldown > 0) {
      this.rest();
    } else if (isSandwich) {
      this.takeSandwich();
    } else if (this.actCounter % 6 < 3) {  
      this.scratchNose();
    } else if (this.attackTarget && this.currentRoom === this.player.currentRoom) {
        this.attack();
    } else if (this.isActive && (this.actCounter % 10 === 0)) {
      console.log(`Some sound is heard... Like a ${this.name} is moving` )
        this.randomMove();      
    } else if (this.health <= 0) {
        this.die()
      return
    }
      
    this.actCounter++    
    this.cooldown = this.newCooldown // reset cooldown
    this.rest();
    // Fill this in

    
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }
}

module.exports = {
  Enemy,
};
