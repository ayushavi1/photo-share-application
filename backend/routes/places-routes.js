const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Burj Khalifa',
    description: 'One of the most famous sky scrapers in the world!',
    address: '20 W 34th St, Dubai, UAE',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    const error = new Error(`Place with id ${placeId} not found.`);
    error.code = 404;
    throw error;
  }

  res.json({ place: place });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    const error = new Error(`Place with user id ${userId} not found.`);
    error.code = 404;
    return next(error);
  }

  res.json({ place: place });
});

module.exports = router;
