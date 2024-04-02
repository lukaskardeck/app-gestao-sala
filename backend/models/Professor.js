const knex = require("../database/connection");

class Professor {
  async add(idUser, telefone) {
    try {
      await knex.transaction(async (trx) => {
        await trx.insert({ id_usuario: idUser, telefone: telefone }).table('adicional');
        await trx.insert({ id_usuario: idUser, id_role: 1 }).table('usuario_role');
      });      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new Professor();
