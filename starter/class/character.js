class Character {

  constructor(name, description, currentRoom, health = 100, strength = 10) {
    this.name = name,
    this.description = description,
    this.currentRoom = currentRoom,
    this.health = health,
    this.strength = strength,
    this.items = []

  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.currentRoom.items.push(...this.items)
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
