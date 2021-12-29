export interface IsDomain {
    id: number;

    batch_id: number;

    name: string;

    domains: [];

    created_at: string;

    request_status: boolean;

    createDomain(): void;

    // findById(id: number): any;
}
