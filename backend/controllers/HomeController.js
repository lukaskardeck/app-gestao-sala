class HomeController{

    async index(req, res){
        res.send({msg: "Home funcionando!"});
    }

}

module.exports = new HomeController();