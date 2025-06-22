import express from "express";
import { groupController } from "../controllers/group.controller";
import { validate } from "../middlewares/validateRequest";
import {
  createGroupSchema,
  addUserToGroupSchema,
} from "../validators/group.validator";

const router = express.Router();

router.post("/", validate(createGroupSchema), groupController.createGroup);
router.get("/:groupId", groupController.getGroupById);
router.get("/", groupController.getGroupByName);
router.get("/user/:userId", groupController.getGroupsByUserId);
router.post(
  "/:groupId/users",
  validate(addUserToGroupSchema),
  groupController.addUserToGroup
);
router.delete("/:groupId/users/:userId", groupController.removeUserFromGroup);

export default router;
