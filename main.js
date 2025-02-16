import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import mainRoute from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 4005;

const app = express();
app.use(express.json());
app.use('/api', mainRoute);

async function bootstrap() {
    try {
        await sequelize.sync();
        console.log('connected to database successfully');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error.message);
    }
}

bootstrap();