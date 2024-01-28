import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER ,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST ,
        port: process.env.DB_PORT ,
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
