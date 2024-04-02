class Setor {
  async add(idUser, telefone, sigla) {
    try {
      await knex.transaction(async (trx) => {
        await trx
          .insert({ id_usuario: idUser, telefone: telefone, sigla: sigla })
          .table("adicional");
        await trx
          .insert({ id_usuario: idUser, id_role: 2 })
          .table("usuario_role");
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new Setor();
