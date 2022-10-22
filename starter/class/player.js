const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const { World } = require('./world');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.items = [];
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    let item = this.currentRoom.getItemByName(itemName);
    this.items.push(item)

    let roomItems = this.currentRoom.items;
    this.currentRoom.items = roomItems.filter(roomitem => roomitem.name != itemName)


  }

  dropItem(itemName) {

    // Fill this in
    let itemToDrop = this.getItemByName(itemName);
    let items = this.items;
    this.items = items.filter(item => item != itemToDrop);
    this.currentRoom.items.push(itemToDrop);

  }

  eatItem(itemName) {

    // Fill this in
    let item = this.getItemByName(itemName)
    if (item && item.isFood) {
        let playerItems = this.items;
        this.items = playerItems.filter(playerItem => playerItem.name != itemName);
        this.health += 10;
        console.log(`You ate some food, you're health is now ${this.health}`);
      }
  }

  getItemByName(name) {

    for (const item of this.items) {
      if (item.name === name) {
        return item;
      }
    }
  }

  hit(name) {

    // Fill this in
    let enemy = World.getEnemiesInRoom(this.currentRoom).filter(enemy => enemy.name === name); 
    
    //set enemy target
    if (enemy.health > 0) {
      console.log(`${this.name} attacking ${enemy.name}!!!`);
      enemy.applyDamage(10)
      enemy.setTarget()
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
