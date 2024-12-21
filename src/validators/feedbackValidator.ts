import { Feedback } from "../model/Feedback.ts";

const validateFeedback = (feedback: Feedback): string[] => {
    const errors: string[] = [];
    if (!feedback.name || feedback.name.trim().length < 3 || feedback.name.trim().length > 50) {
        errors.push("Name must be between 3 and 50 characters.");
    }
    if (!feedback.surname || feedback.surname.trim().length < 3 || feedback.surname.trim().length > 50) {
        errors.push("Surname must be between 3 and 50 characters.");
    }
    if (!feedback.message || feedback.message.trim().length < 10 || feedback.message.trim().length > 500) {
        errors.push("Message must be between 10 and 500 characters.");
    }
    return errors;
};

export default validateFeedback;