import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { requestRideZodSchema, updateRideStatusZodSchema } from './ride.validation';
import { RideControllers } from './ride.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const rideRoute = Router();

rideRoute.post(
  '/request',
  checkAuth(Role.Rider), // Shudhumatro RIDER-ra request korte parbe
  validateRequest(requestRideZodSchema),
  RideControllers.requestRide,
);
rideRoute.patch('/:rideId/accept', checkAuth(Role.Driver), RideControllers.AccptRide);
rideRoute.patch(
  '/:rideId/status',
  checkAuth(Role.Driver),
  validateRequest(updateRideStatusZodSchema),
  RideControllers.updateRideStatus,
);
rideRoute.patch(
  '/:rideId/cancel',
  checkAuth(Role.Rider),
  RideControllers.cancelRide,
);
rideRoute.get(
  '/pending',
  checkAuth(Role.Driver), 
  RideControllers.getPendingRides,
);
rideRoute.get(
  '/history',
  checkAuth(Role.Rider, Role.Driver), 
  RideControllers.getRideHistory,
);
export default rideRoute;