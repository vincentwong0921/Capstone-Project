const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Review, User, Order } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//Get all Reviews
router.get("/", async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ['last_name', 'phone', 'email', 'role', 'hashedPassword', 'createdAt', 'updatedAt'] },
      }
    ]
  });
  return res.json(reviews);
});

//Get Review of current user
router.get("/current", requireAuth, async (req, res) => {
  const user_id = req.user.id;

  const reviews = await Review.findAll({
    where: { user_id: user_id },
    include: [
      {
        model: User,
        attributes: { exclude: ['last_name', 'phone', 'email', 'role', 'hashedPassword', 'createdAt', 'updatedAt'] },
      },
      {
        model: Order,
        attributes: { exclude: ['address', 'city', 'state', 'zip', 'amount', 'status', 'createdAt', 'updatedAt'] },
      }
    ],
  });

  return res.json(reviews);
});

//Get Review by review Id
router.get('/:reviewId', async(req, res) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)

    if(!review) return res.status(404).json({message: "Review couldn't be found"})

    return res.json(review)
})

//Edit a Review by review Id
router.put('/:reviewId', requireAuth, validateReview, async(req, res) => {
    const userRole = req.user.role;
    const reviewId = req.params.reviewId
    const user_id = req.user.id
    const { review, stars } = req.body;
    const userReview = await Review.findByPk(reviewId)

    if (!userReview) return res.status(404).json({message: "Review couldn't be found"})
    if (userReview.user_id !== user_id && userRole !== 'Admin') return res.status(403).json({message: 'Forbidden'})

    await userReview.update({ review, stars })
    return res.json(userReview)
})

//Delete a Review by reviewID
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId
    const user_id = req.user.id
    const user_role = req.user.role
    const userReview = await Review.findByPk(reviewId)

    if (!userReview) return res.status(404).json({message: "Review couldn't be found"})
    if (userReview.user_id !== user_id && user_role !== 'Admin') return res.status(403).json({message: 'Forbidden'})

    await userReview.destroy()
    return res.json({ message: 'Successfully deleted!'})
})

module.exports = router;
