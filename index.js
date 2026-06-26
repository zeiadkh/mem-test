import authRoutes from './routes/auth.route.js';
import express from 'express';
import pool from './db/connection.js';
const app = express()
app.use(express.json());
app.use('/api/auth', authRoutes);
import bodyParser  from 'body-parser';
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});