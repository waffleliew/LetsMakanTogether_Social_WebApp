import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'if0_35875886_Letsmakantogether_mysql',
     'if0_35875886',
    'Qk1cE6GnsT',
    {
        host: 'sql113.infinityfree.com',
        port:  3306,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

export default sequelize;
