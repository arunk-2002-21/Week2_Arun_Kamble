import express from "express";
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestOrder',
    password: 'sqlpg24',
    port: 5432,
});

app.post('/api/orders', async (req,res) =>{
    try{
    const items = await fetch('https://blog.postman.com/how-to-test-json-properties-in-postman/').then((response: { json: () => any; }) => response.json());

    const filteredOrders = items.filter((item: { OrderBlock: { LineNo: number; }; }) => item.OrderBlock.LineNo % 3 !==0);

    for(const order of filteredOrders){
        await pool.query('INSERT INTO orders (orderID) VALUES ($1)',[order.orderID]);
    }

    res.status(200).send('Order IDs stored successfully');
    } catch(error){
        res.status(500).send('Error processing request');
    }
})

// Array Functions

app.post('/array-manipulation', (req,res) => {
    const {array} = req.body;

    if(!Array.isArray(array)){
        return res.status(400).json({ error: 'Invalid array payload'});
    }

    // Map
    const doubleArray = array.map((num: number)=> num*2);

    // Filter
    const filteredArray = array.filter((num:number) => num%2 !==0);

    // Reduce
    const sum = array.reduce((acc:number, num: number) => acc+num, 0);

    // Slice
    const slicedArray = array.slice(0,3);

    // Concat
    const newArray = array.concat([10,11,12]);

    // Sort
    const sortedArray = array.sort((a: number, b: number) => a-b);

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

interface Student{
    name: string;
    age: number;
    grade: number;
}

// Given array of Objects
const students: Student[] = [
    {name:'Alice', age:20, grade:75},
    {name:'Bob', age:22, grade:85},
    {name:'charlie', age:21, grade:60},
    {name:'David', age:19, grade:45},
    {name:'Eve', age:20, grade:90},
];

// Function to filter out students who passed (grade >= 50)
function filterPassedStudents(students: Student[]): Student[]{
    return students.filter(student => student.grade >= 50);
}

// Function to get an array of student names 
function getStudentsName(students: Student[]): string[]{
    return students.map(student => student.name);
}

// Functions to sort students by their grades in ascending order 
function sortStudentsByGrade(students: Student[]): Student[]{
    return students.slice().sort((a,b)=> a.grade - b.grade);
}

// Functions to get the age of the students
function getAverageAge(students: Student[]): number{
    const totalAge = students.reduce((sum, student) => sum + student.age, 0)
    return totalAge / students.length;
}
console.log("Passed Students:", filterPassedStudents(students));
console.log("Student Names:", getStudentsName(students));
console.log("Students Sorted by Grade", sortStudentsByGrade(students));
console.log("Average Age of Students:", getAverageAge(students));


//Function to check whether table is created or not

async function ensureTableExists() {
    const queryCheckTableExists = `SELECT EXISTS (SELECT FROM TestOrder WHERE schemaname = 'public' AND tablename = 'orders');`;

    const queryCreateTable = 
        `CREATE TABLE IF NOT EXISTS orders(
          id SERIAL PRIMARY KEY,
          orderID VARCHAR(255) NOT NULL
    );`;

    try{
        const res = await pool.query(queryCheckTableExists);
        const tableExists = res.row[0].exists;

        if(!tableExists) {
            await pool.query(queryCreateTable);
            console.log('Table "orders" has been created');
        }else{
            console.log('Table "orders" already exists');
        }
    }catch(err){
        console.log('Error ensuring table exists', err);
    }
}

// Call the function to ensure the table exists
ensureTableExists();

app.listen(port, ()=> {
    console.log(`Server is listening on ${port}`);
});
