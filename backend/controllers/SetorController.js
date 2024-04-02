const Setor = require('../models/Setor');
const User = require('../models/User');

class SetorController {
  async create(req, res) {
    let { email, telefone, sigla } = req.body;

    if (email == undefined || telefone == undefined || sigla == undefined) {
      res.status(400).send({ err: "dados invalidos" });
      return;
    }

    let user = await User.findByEmail(email);

    if (!user) {
      res.status(404).send({ err: "este usuario não existe" });
      return;
    }

    try {
      await Setor.add(user.id_usuario, telefone, sigla);
    } catch (error) {
      console.log(error);
      res.status(400).send({ err: "deu ruim aqui man" });
      return;
    }

    res.status(200).send({ msg: "setor adicionado com sucesso" });
  }
}

module.exports = new SetorController();
