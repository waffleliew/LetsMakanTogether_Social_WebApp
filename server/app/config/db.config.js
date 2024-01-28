import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'letsmakantogether',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'YOUR_PASSWORD',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // For self-signed certificates
            }
        },
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

export default sequelize;
