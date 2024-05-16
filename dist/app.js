"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { Pool } = require('pg');
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestOrder',
    password: 'sqlpg24',
    port: 5432,
});
app.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield fetch('https://blog.postman.com/how-to-test-json-properties-in-postman/').then((response) => response.json());
        const filteredOrders = items.filter((item) => item.OrderBlock.LineNo % 3 !== 0);
        for (const order of filteredOrders) {
            yield pool.query('INSERT INTO orders (orderID) VALUES ($1)', [order.orderID]);
        }
        res.status(200).send('Order IDs stored successfully');
    }
    catch (error) {
        res.status(500).send('Error processing request');
    }
}));
// Array Functions
app.post('/array-manipulation', (req, res) => {
    const { array } = req.body;
    if (!Array.isArray(array)) {
        return res.status(400).json({ error: 'Invalid array payload' });
    }
    // Map
    const doubleArray = array.map((num) => num * 2);
    // Filter
    const filteredArray = array.filter((num) => num % 2 !== 0);
    // Reduce
    const sum = array.reduce((acc, num) => acc + num, 0);
    // Slice
    const slicedArray = array.slice(0, 3);
    // Concat
    const newArray = array.concat([10, 11, 12]);
    // Sort
    const sortedArray = array.sort((a, b) => a - b);
    // Reverse
    const reversedArray = array.reverse();
    res.status(200).json({
        doubleArray,
        filteredArray,
        sum,
        slicedArray,
        newArray,
        sortedArray,
        reversedArray
    });
});
// Given array of Objects
const students = [
    { name: 'Alice', age: 20, grade: 75 },
    { name: 'Bob', age: 22, grade: 85 },
    { name: 'charlie', age: 21, grade: 60 },
    { name: 'David', age: 19, grade: 45 },
    { name: 'Eve', age: 20, grade: 90 },
];
// Function to filter out students who passed (grade >= 50)
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}
// Function to get an array of student names 
function getStudentsName(students) {
    return students.map(student => student.name);
}
// Functions to sort students by their grades in ascending order 
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}
// Functions to get the age of the students
function getAverageAge(students) {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / students.length;
}
console.log("Passed Students:", filterPassedStudents(students));
console.log("Student Names:", getStudentsName(students));
console.log("Students Sorted by Grade", sortStudentsByGrade(students));
console.log("Average Age of Students:", getAverageAge(students));
//Function to check whether table is created or not
// const pool1 = require('./pgConfig').pool;
function ensureTableExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryCheckTableExists = `SELECT EXISTS (SELECT FROM TestOrder WHERE schemaname = 'public' AND tablename = 'orders');`;
        const queryCreateTable = `CREATE TABLE IF NOT EXISTS orders(
          id SERIAL PRIMARY KEY,
          orderID VARCHAR(255) NOT NULL
    );`;
        try {
            const res = yield pool.query(queryCheckTableExists);
            const tableExists = res.row[0].exists;
            if (!tableExists) {
                yield pool.query(queryCreateTable);
                console.log('Table "orders" has been created');
            }
            else {
                console.log('Table "orders" already exists');
            }
        }
        catch (err) {
            console.log('Error ensuring table exists', err);
        }
    });
}
// Call the function to ensure the table exists
ensureTableExists();
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map