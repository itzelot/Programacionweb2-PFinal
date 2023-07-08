import {Sequelize} from "sequelize";
const db=new Sequelize('hoteles', 'root', '1234',{
    dialect: 'mysql',
    dialectOptions:{
        host:'127.0.0.1',
        port:'3306',
        timestamps: false,
        underscore: false,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
        operatorAlies: false,
        "allowPublicKeyRetrieval": true
    }
});

export default db;