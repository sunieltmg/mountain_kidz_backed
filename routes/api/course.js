import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.json('Get all course');
  })
  .post((req, res) => {
    if (!req.body.title || !req.body.description || !req.body.image) {
      res.status(400).json('All fields are required');
    }
    res.status(201).json({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });
  })
  .put((req, res) => {
    console.log('Update course');
  })
  .delete((req, res) => {
    console.log('Delete course');
  });

router.route('/:id').get((req, res) => {
  console.log('get single course');
});

export default router;
