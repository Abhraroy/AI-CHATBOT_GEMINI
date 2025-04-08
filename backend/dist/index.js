import app from './app.js';
import { databaseconnect } from './DB/Db_Connection.js';
const PORT = process.env.PORT;
databaseconnect().then(() => {
    app.listen(PORT, () => {
        console.log("your server is runing");
    });
}).catch((err) => console.log(err));
