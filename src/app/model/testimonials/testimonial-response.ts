import { Project } from "../projects/project";

export class TestimonialResponse {
    id!: number;
    title!: string;
    description!: string;
    result!: number;
    image!: string;
    creationDate!: Date;
    lastUpdate!: Date;
    showOnWebsite!: boolean;
    project!: Project;
}
