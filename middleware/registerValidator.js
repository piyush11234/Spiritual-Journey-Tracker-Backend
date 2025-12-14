import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("phone")
        .optional()
        .isMobilePhone().withMessage("Invalid phone number"),

    body("address")
        .optional()
        .isLength({ min: 3 }).withMessage("Address must be at least 3 characters"),
];
