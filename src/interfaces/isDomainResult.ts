export interface IsDomainResult {
    id: number;

    batch_id: number;

    name: string;

    domain: string;

    status: string;

    site_response: string;

    score: number;

    blacklisted: boolean;

    created_at: string;

    valid_ssl: boolean;
}
