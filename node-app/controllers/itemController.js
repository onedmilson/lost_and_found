const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  iname: String,
  idesc: String,
  category: String,
  iimage: String,
  addedBy: String,
});

const Items = mongoose.model('Items', schema);

module.exports.addItems = (req, res) => {
  const { iname, idesc, category } = req.body;
  const iimage = req.file ? req.file.path : undefined;
  const addedBy = req.body.userId;

  const item = new Items({ iname, idesc, category, iimage, addedBy });

  item.save()
    .then(() => {
      res.send({ message: 'Item salvo com sucesso!' });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};

module.exports.getItems = (req, res) => {
  Items.find()
    .then((result) => {
      res.send({ message: 'Sucesso.', items: result });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};

module.exports.getItemById = (req, res) => {
  Items.findOne({ _id: req.params.iId })
    .then((result) => {
      res.send({ message: 'Sucesso.', item: result });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};

module.exports.myItems = (req, res) => {
  const userId = req.body.userId;
  Items.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: 'Sucesso', items: result });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};

module.exports.deleteItem = (req, res) => {
  Items.findByIdAndDelete(req.params.iId)
    .then(() => {
      res.send({ message: 'Item excluído com sucesso!' });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};

module.exports.updateItem = (req, res) => {
  const { iname, idesc, category, userId } = req.body;
  const iimage = req.file ? req.file.path : undefined;

  const updateData = { iname, idesc, category };
  if (iimage) updateData.iimage = iimage;

  Items.findByIdAndUpdate(req.params.iId, updateData, { new: true })
    .then((result) => {
      res.send({ message: 'Item atualizado com sucesso!', item: result });
    })
    .catch(() => {
      res.send({ message: 'Erro no servidor.' });
    });
};
