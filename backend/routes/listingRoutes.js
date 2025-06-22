import express from "express";
import { createProperty, deleteProperty, getProperties, getPropertyById, getUserProperties, updateProperty } from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/create", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.get("/user/:id", getUserProperties);


export default router;


