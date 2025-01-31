import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

const seedRoles = async () => {
  console.log("Seeding roles...");

  try {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      //   check if the role already exists
      const existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
      } else {
        console.log(`Role ${role} already exists`);
      }
    }
    await session.commitTransaction();

    session.endSession();
  } catch (error) {}
};

seedRoles().catch((error) => console.error("Error running seeder", error));
