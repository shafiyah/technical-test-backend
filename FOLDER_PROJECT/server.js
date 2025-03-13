const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const employeeRoutes = require("./src/routes/employee.routes");
app.use("/employees", employeeRoutes);


const educationRoutes = require("./src/routes/education.routes");
app.use("/educations", educationRoutes);

const employeeProfileRoutes = require("./src/routes/employee.profile.routes");
app.use("/employee-profile", employeeProfileRoutes);

const employeeFamilyRoutes = require("./src/routes/employee.family.routes");
app.use("/employee-family", employeeFamilyRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
