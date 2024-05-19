const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const app = express()
const port = 4000
const itemController = require('./controllers/itemController')
const userController = require('./controllers/userController')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://laf:ZN7lp0OV2jysMgYO@lafcluster.kjia0rm.mongodb.net/lafDB?retryWrites=true&w=majority');

app.post('/add-items', upload.single('iimage'), itemController.addItems);
app.post('/my-items', itemController.myItems)
app.get('/get-items', itemController.getItems)
app.get('/get-item/:iId', itemController.getItemById)
app.post('/signup', userController.signup)
app.get('/profile/:userId', userController.profileById)
app.post('/login', userController.login)
app.put('/update-item/:iId', upload.single('iimage'), itemController.updateItem);
app.delete('/delete-item/:iId', itemController.deleteItem);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})