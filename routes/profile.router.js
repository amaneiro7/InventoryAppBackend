// const express = require('express');
// const passport = require('passport');

// const router = express.Router();
// const service = new OrderService()


// //GET
// router.get('/my-orders',
//   passport.authenticate('jwt', {session: false}),
//   async (req, res, next) => {
//     try {
//       const user = req.user;
//       const orders = await service.findByUser(user.sub)
//       res.json(orders)
//     } catch (error) {
//       next(error)
//     };
//   });

// module.exports = router;


// async findByUser(userId) {
//   const orders = await models.Order.findAll({
//     where: {
//       '$customer.user.id$': userId,
//     },
//     include: [
//       {
//         association: 'customer',
//         include: ['user'],
//       },
//     ],
//   });
//   return orders;
// }
