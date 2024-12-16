import {Project} from "../model/Project.ts";

const validateProject = (project: Project): string[] => {
    const errors: string[] = [];
    if (!project.name || project.name.trim().length < 3 || project.name.trim().length > 50) {
        errors.push("Name must be between 3 and 50 characters.");
    }
    if (!project.description || project.description.trim().length < 3 || project.description.trim().length > 200) {
        errors.push("Description must be between 3 and 200 characters.");
    }
    if (!project.details || project.details.trim().length < 10 || project.details.trim().length > 1000) {
        errors.push("Details must be between 10 and 1000 characters.");
    }
    if (!project.localization) {
        errors.push("Localization is required.");
    }
    if (!project.images || project.images.length === 0) {
        errors.push("Image is required.");
    }
    return errors;
}

export default validateProject;