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
                ca: `-----BEGIN CERTIFICATE-----
                        MIIEQTCCAqmgAwIBAgIUSaLnntaD9w3RhdI+/kZ4PcgDr/owDQYJKoZIhvcNAQEM
                    BQAwOjE4MDYGA1UEAwwvZDIzNDZhZmUtYzMxZC00MzUwLWJhOWItZDYxZDFkOTBj
                    ZmJkIFByb2plY3QgQ0EwHhcNMjQwMTI4MTkzMzAyWhcNMzQwMTI1MTkzMzAyWjA6
                    MTgwNgYDVQQDDC9kMjM0NmFmZS1jMzFkLTQzNTAtYmE5Yi1kNjFkMWQ5MGNmYmQg
                    UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAL+USHpI
                    Q+qwYBg34HH9RH0cMCF1sz1ZV2Hp4s+//pl7o3QDX6BX0z48v+UYgXACfnJX0aL6
                        RubQNFnQHP7YdV5MckNSUenp/mgo398jXCbv74SQCfIcdM+IWoPAnPijoGsMtKbr
                    k0mW/u/GiBnqt7gBbVm9Ng+yzqPJkktTVgB8v51tRUlj8D8X7zERHyG9zAfJSTji
                +Xv7Y2EIaetmVqPLMVLoXGyhvLTNMvrC0nGELj+M5KzZsxm0JnDcjz/yWk/Z435o
            s7K2P1jGeQKf6sUFnXAaI+1bnq9dE3+21TcD5wk7mKAtYm6f3nm0Kn7/tSr8PoTY
        3UAed/CoD1x8b69dBqE5q/fVtmKEhWGIyclX9davNGI6FpENjuvvd8c6g5bKDpDj
        TWROGAt1rfKoNOcHnnVCGUYxo5S3knz7AUpMurXZdmSomqKFv90h7iDa5eLauLti
        0TWzr8BYs9RoFQ3j2rmBcQpZcTX/oi4G2CxEp2Tmva4S1M+SM9ns46PNswIDAQAB
        oz8wPTAdBgNVHQ4EFgQUEs/GQ1yl2jBqUiLS40UyGw98g8UwDwYDVR0TBAgwBgEB
    /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBALDwSYdms6h8lvOx
Ygy5HSx4YrfG/0M3EkxUR2wyzftll+0Afs9ktEui4Gery1FMgeEoH4XT33NJ4E/O
kbkn853Bf+UnefqFnlsptZJNB7/zfohTDZKspfs3Q6cP4KURCaB5gshvcLiGsd/P
KtYmuk8tc6ZTgILkdJHbzbeUSfI5lUqxGYtPBSEPQV7+BY7vbYLE4R4nD4z973UJ
S/o3lQfEuzolcvfwlm2p/gEdbi1NuDKiUWOcIqZdautKU9XWrFdATYF0jCzo2dKD
JuZYfnebaA2d38KaCzMf2MAE2PhvXTHAPcZmpnosp55EUI//RZTusDOSzXt5YMbU
Hx73MRhJcXtoMcGSgVnBm+8BpMfmyRCScqP+TVsm6Gd8uHsb54ntYEe56l0v9F1E
B5CimXQtDH3/BCBQ3+PmTjUL4zDLZI2srp3UEbq7RiWR1XLYirMZZbZdDjUcFTuT
TzB3IdjET8ixSoTxeS11W9CqJe8BZPzx+/AVyP9oC3JeuOEPfg==
-----END CERTIFICATE-----`

}
        },
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

export default sequelize;
