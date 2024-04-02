const Professor = require("../models/Professor");
const User = require("../models/User");

class ProfessorController {
  async create(req, res) {
    let { email, telefone } = req.body;

    if (email == undefined || telefone == undefined) {
      res.status(400).send({ err: "dados invalidos" });
      return;
    }

    let user = await User.findByEmail(email);

    if (!user) {
      res.status(404).send({ err: "este usuario não existe" });
      return;
    }

    try {
      await Professor.add(user.id_usuario, telefone);
    } catch (error) {
      console.log(error);
      res.status(400).send({ err: "deu ruim aqui man" });
      return;
    }

    res.status(200).send({ msg: "professor adicionado com sucesso" });
  }
}

module.exports = new ProfessorController();
