import app from '../app/app';

const PORT = process.env.PORT || 3001;
const IP_ADDR = process.env.IP_PORT || '192.168.1.105';

app.listen(PORT,
  () => {
    // console.log(process.env.PORT_DB);
    console.log(process.env.HOST);
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_USER);
    console.log(`server started on ${IP_ADDR}:${PORT}`);
  }
);
