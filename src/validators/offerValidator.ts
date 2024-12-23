import {Offer} from "../model/Offer.ts";

const validateOffer = (offer: Offer): string[] => {
    const errors: string[] = [];
    if (!offer.title || offer.title.trim().length < 3 || offer.title.trim().length > 50) {
        errors.push("Title must be between 3 and 50 characters.");
    }

    if (!offer.description || offer.description.trim().length < 3 || offer.description.trim().length > 500) {
        errors.push("Description must be between 3 and 500 characters.");
    }

    if (!offer.details || offer.details.trim().length < 10 || offer.details.trim().length > 1200) {
        errors.push("Details must be between 10 and 1200 characters.");
    }

    if (!offer.image) {
        errors.push("Image is required.");
    }
    return errors;
}

export default validateOffer;