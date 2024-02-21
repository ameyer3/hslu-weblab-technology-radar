export interface Technology {
    name: string;
    category: string;
    ring?: string;
    ringdescription?: string;
    description: string;
    creationAuthor?: number;
    updateAuthor: number;
    creationDate?: Date;
    published?: boolean;
    publishingDate?: Date;
}

export interface History {
    technologyId: number;
    name: string;
    category: string;
    ring: string;
    ringdescription: string;
    description: string;
    published: boolean;
    publishingDate: Date;
    updateDate: Date;
    updateAuthor: number;
}
