import { Partner } from "../partners/partner";

export class Project {
    private id!: number;
    private title!: string;
    private description!: string;
    private startDate!: Date;
    private endDate!: Date;
    private imageUrl!: string;
    private showOnWebsite!: boolean;
    private partner!: Partner;
}
