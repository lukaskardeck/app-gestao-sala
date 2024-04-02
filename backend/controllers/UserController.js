const User = require("../models/User");

class UserController {
  async create(req, res) {
    let { email, nome } = req.body;

    if (email == undefined || nome == undefined) {
      res.status(400).send({ err: "dados inválidos" });
      return;
    }

    try {
      console.log("Aqui vai?");
      await User.add(email, nome);
    } catch (error) {
      res.status(500).send({ error });
      return;
    }

    res.status(200).send({msg: "usuario adicionado com sucesso!"});
  }
}

module.exports = new UserController();
