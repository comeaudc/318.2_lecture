import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('user get route');
});

router.post('/post', (req, res) => {
  res.send('user post route');
});

router.put('/', (req, res) => {
  res.send('user put route');
});

router.delete('/', (req, res) => {
  res.send('user delete route');
});

export default router;
