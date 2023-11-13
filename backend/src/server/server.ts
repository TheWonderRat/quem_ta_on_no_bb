import app from '../app/app';

const PORT = process.env.PORT || 3001;
const IP_ADDR = process.env.IP_PORT || '192.168.1.105';

app.listen(PORT, async () => {
  console.log(`server started on ${IP_ADDR}:${PORT}`);
});
