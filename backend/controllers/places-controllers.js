const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError(`Place with id ${placeId} not found.`, 404);
  }

  res.json({ place: place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    return next(new HttpError(`Place with user ${userId} not found.`, 404));
  }

  res.json({ place: place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
