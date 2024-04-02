const knex = require("../database/connection");

class User {
  async add(email, nome) {
    try {
      console.log("Erro?");
      await knex.insert({ email: email, nome: nome }).table("usuario");
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email) {
    try {
      let user = await knex.where({ email: email }).select().table("usuario");
      return user[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new User();
