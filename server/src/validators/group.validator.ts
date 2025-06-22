// src/validators/group.validator.ts

import { z } from "zod";

export const createGroupSchema = {
  body: z.object({
    name: z.string().min(2, "Group name is required"),
  }),
};

export const addUserToGroupSchema = {
  body: z.object({
    userId: z.string().uuid("Invalid userId"),
  }),
  params: z.object({
    groupId: z.string().uuid("Invalid groupId"),
  }),
};
