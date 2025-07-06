import { Project } from "../projects/project";

export class TestimonialResponse {
    private id!: number;
    private title!: string;
    private description!: string;
    private result!: number;
    private image!: string;
    private creationDate!: Date;
    private lastUpdate!: Date;
    private showOnWebsite!: boolean;
    private project!: Project;
}
