const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const jwtRouter = require("./routes/jwtRoutes");
const { errorResponse } = require("./controller/responseController");
const instructorRouter = require("./routes/instructorRoutes");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const morgan = require("morgan");
const studentRouter = require("./routes/studentRouter");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/students", studentRouter);

// async function run() {
//   try {
//

//     /**
//      * MIDDLEWARE
//      */
//     const verifyAdmin = async (req, res, next) => {
//       const email = req.decoded.email;
//       const query = { email: email };
//       const user = await usersCollection.findOne(query);
//       if (user?.role !== "admin") {
//         return res
//           .status(403)
//           .send({ error: true, message: "forbidden message" });
//       }
//       next();
//     }

//     /**
//      * STRIPE PAYMENT API
//      */
//     app.post("/create-payment-intent", verifyJWT, async (req, res) => {
//       const { price } = req.body;

//       if (price) {
//         const amount = parseFloat(price) * 100;
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: amount,
//           currency: "usd",
//           payment_method_types: ["card"],
//         });

//         res.send({
//           clientSecret: paymentIntent.client_secret,
//         });
//       } else {
//         res.send({ error: true });
//       }
//     });
//     /**
//      * PAYMENT API
//      */
//     app.get("/payment", verifyJWT, async (req, res) => {
//       const email = req.decoded.email;

//       const query = { email: email };
//       const result = await paymentCollection
//         .find(query)
//         .sort({ date: -1 })
//         .toArray();
//       res.send(result);
//     });
//     app.post("/payment", async (req, res) => {
//       const result = await paymentCollection.insertOne(req.body);
//       res.send(result);
//     });
//     /**
//      * USER'S COLLECTION API'S
//      */
//     app.get("/all-instructors", async (_req, res) => {
//       const query = { role: "instructor" };
//       const result = await usersCollection.find(query).toArray();
//       res.send(result);
//     });
//     app.get("/all-users", verifyJWT, verifyAdmin, async (_req, res) => {
//       const result = await usersCollection.find().toArray();
//       res.send(result);
//     });
//     app.post("/users", async (req, res) => {
//       const users = req.body;
//       users.role = "student";
//       const query = { email: users.email };
//       const existingUser = await usersCollection.findOne(query);
//       if (existingUser) return res.send({ message: "user already exits" });
//       const result = await usersCollection.insertOne(users);
//       res.send(result);
//     });
//     app.patch("/user/:email", verifyJWT, verifyAdmin, async (req, res) => {
//       const email = req.params.email;
//       const role = req.query.role;
//       const query = { email: email };
//       const result = await usersCollection.updateOne(query, {
//         $set: { role: role },
//       });
//       res.send(result);
//     });

//     /**
//      * CLASSES COLLECTION API'S
//      */
//     app.get("/admin/all-classes", verifyJWT, verifyAdmin, async (_, res) => {
//       const result = await classesCollection.find().toArray();
//       res.send(result);
//     });
//     app.get("/user/all-classes", async (_req, res) => {
//       const query = { status: "approve" };
//       const result = await classesCollection.find(query).toArray();
//       res.send(result);
//     });
//     app.get("/classes", verifyJWT, async (req, res) => {
//       let query = { email: req.query?.email };
//       const result = await classesCollection.find(query).toArray();
//       res.send(result);
//     });
//     app.get("/popular-classes", async (_req, res) => {
//       const query = { status: "approve" };
//       const result = await classesCollection.find(query).limit(6).toArray();
//       res.send(result);
//     });
//     app.get("/price/:id", verifyJWT, async (req, res) => {
//       const id = req.params.id;
//       if (id) {
//         const query = { _id: new ObjectId(id) };
//         const result = await classesCollection.findOne(query);
//         res.send(result);
//       }
//     });
//     app.post("/classes", verifyJWT, async (req, res) => {
//       const classes = req.body;
//       const result = await classesCollection.insertOne(classes);
//       res.send(result);
//     });
//     app.patch("/updateStatus/:id", verifyJWT, async (req, res) => {
//       const id = req.params.id;
//       const updatedStatus = req.body.status;
//       const query = { _id: new ObjectId(id) };
//       const result = await classesCollection.updateOne(query, {
//         $set: { status: updatedStatus },
//       });
//       res.send(result);
//     });
//     app.patch("/class/:id", async (req, res) => {
//       const course_id = req.params.id;

//       const query = { _id: new ObjectId(course_id) };
//       const course = await classesCollection.findOne(query);

//       if (!course) {
//         return res.status(404).send("Course not found");
//       }

//       const updatedCourse = {
//         totalEnrolled: course.totalEnrolled + 1,
//         availableSeats: course.availableSeats - 1,
//       };

//       const result = await classesCollection.updateOne(query, {
//         $set: updatedCourse,
//       });

//       res.send(result);
//     });

//     /**
//      * SELECTED COURSE COLLECTION API'S
//      */
//     app.get("/my-course/:email", verifyJWT, async (req, res) => {
//       const email = req.params.email;
//       const query = { email: email };
//       const result = await selectedCourseCollection.find(query).toArray();
//       res.send(result);
//     });
//     app.post("/add-course", verifyJWT, async (req, res) => {
//       const courseId = req.body;
//       const existingCourse = await selectedCourseCollection.findOne(courseId);

//       if (existingCourse)
//         return res.send({ message: "already selected this course" });
//       else {
//         const result = await selectedCourseCollection.insertOne(courseId);
//         res.send(result);
//       }
//     });
//     app.delete("/my-course/:id", verifyJWT, async (req, res) => {
//       const id = req.params.id;
//       const query = {
//         _id: new ObjectId(id),
//       };
//       const result = await selectedCourseCollection.deleteOne(query);
//       res.send(result);
//     });
//     /**
//      * INSTRUCTOR REVIEW API
//      */
//     app.get("/instructor", async (_req, res) => {
//       const result = await instructorCollection
//         .find()
//         .sort({ student: -1 })
//         .limit(6)
//         .toArray();
//       res.send(result);
//     });
//     /**
//      * STUDENT REVIEW API
//      */
//     app.get("/reviews", async (_req, res) => {
//       const result = await reviewsCollection.find().toArray();
//       res.send(result);
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

//client error handle

app.use((_req, _res, next) => {
  next(createError(404, "route not found"));
});

//server error handle
app.use((error, _req, res, _next) => {
  return errorResponse(res, {
    statusCode: error.status,
    message: error.message,
  });
});

module.exports = app;
