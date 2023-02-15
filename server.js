const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
const handlebars = require('handlebars');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(controllers);

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get("/tacos", (req, res) =>{
  res.render("blog")
  })
app.get('/', (req, res) => {
  res.render('home');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
  console.log('Establishing Direct Control of PORT ' + PORT + '.')
});
});