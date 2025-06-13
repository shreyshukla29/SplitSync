import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Server is running!');
});


app.listen(PORT, (): void => {
  console.log(`Server started at http://localhost:${PORT}`);
});
