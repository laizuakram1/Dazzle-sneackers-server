const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y66jyhy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const sneackersCollection = client
  .db("dazzleSneackers")
  .collection("sneackers");
const bestSellerCollection = client
  .db("dazzleSneackers")
  .collection("bestSeller");
const teamMemberCollection = client.db("dazzleSneackers").collection("OurTeam");
const blogsCollection = client.db("dazzleSneackers").collection("latestBlog");
const relatedProductsCollection = client.db("dazzleSneackers").collection("relatedProducts");
const cartCollection = client.db("dazzleSneackers").collection("cartItems");

module.exports.getAllSneackers = async (req, res) => {
  const result = await sneackersCollection.find({}).toArray();

  res.send(result);
};
module.exports.postSingleSneackers = async(req, res) =>{
    const data  = req.body;
    const result = cartCollection.insertOne(data);

    res.send(result);
}
module.exports.getSingleSneacker = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await sneackersCollection.findOne(query);

  // res.send(result);
  res.send(result);
};
module.exports.getBestSeller = async (req, res) => {
  const result = await bestSellerCollection.find({}).toArray();

  res.send(result);
};
module.exports.getTeamMember = async (req, res) => {
  const result = await teamMemberCollection.find({}).toArray();

  res.send(result);
};
module.exports.getLatestBlog = async (req, res) => {
  const blogs = await blogsCollection.find({}).toArray();

  res.send(blogs);
};
module.exports.getRelatedProducts = async (req, res) => {
  const products = await relatedProductsCollection.find({}).toArray();

  res.send(products);
};
module.exports.getPaymentIntent = async (req, res) => {
  const items = req.body;
  const amount = items.price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
