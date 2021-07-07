class User {
    constructor(id, name, hash) {
      if (id) 
      this.id = id;
      this.name = name;
      this.hash = hash;
    }
  }
  
  module.exports = User;
  
  