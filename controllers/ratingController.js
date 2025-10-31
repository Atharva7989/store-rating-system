const Joi = require("joi");
const { Rating, Store } = require("../models");

const ratingSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
});

exports.submitRating = async (req, res) => {
  try {
    console.log("Rating route hit");

    const { storeId, rating } = req.body;
    const userId = req.user.id;

    console.log("Received:", { storeId, rating, userId });

    const { error } = ratingSchema.validate({ rating });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const existingRating = await Rating.findOne({
      where: { user_id: userId, store_id: storeId },
    });

    if (existingRating) {
      console.log(" User already rated this store");
      return res.status(400).json({ message: "You have already rated this store." });
    }

    // Create new rating
    const newRating = await Rating.create({
      user_id: userId,
      store_id: storeId,
      rating,
    });


    const allRatings = await Rating.findAll({ where: { store_id: storeId } });
    const avg =
      allRatings.reduce((acc, r) => acc + r.rating, 0) / allRatings.length;

    await Store.update(
      { average_rating: avg, total_ratings: allRatings.length },
      { where: { id: storeId } }
    );


    res.json({
      message: "Rating submitted successfully",
      averageRating: avg.toFixed(2),
    });
  } catch (error) {
    console.error(" Rating error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
