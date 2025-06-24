import express from "express";
import { groupController } from "../controllers/group.controller";
import { validate } from "../middlewares/validateRequest";
import {
  createGroupSchema,
  addUserToGroupSchema,
} from "../validators/group.validator";
import { authenticate } from "./../middlewares/auth.middleware";
const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(createGroupSchema),
  groupController.createGroup
);
router.get("/:groupId", authenticate, groupController.getGroupById);
router.get("/", authenticate, groupController.getGroupByName);
router.get("/user/:userId", authenticate, groupController.getGroupsByUserId);
router.post(
  "/:groupId/users",
  validate(addUserToGroupSchema),
  groupController.addUserToGroup
);
router.delete("/:groupId/users/:userId",authenticate,groupController.removeUserFromGroup);
export default router;
