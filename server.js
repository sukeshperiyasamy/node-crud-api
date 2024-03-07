const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Product = require('./poductmodel')



app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json(products);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

//  update product

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: `Cannot find ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product 

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find ID ${id}` });
    }
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});







mongoose.connect('mongodb+srv://admin:admin@sukeshdb.qkgkjzh.mongodb.net/Node-api?retryWrites=true&w=majority&appName=sukeshdb')
.then(()=>{
  console.log('connected to database')

  app.listen(port, () => {
    console.log(`Example app listening on port ${3000}`)
  })

})
.catch(()=>{
  console.log(error)
})