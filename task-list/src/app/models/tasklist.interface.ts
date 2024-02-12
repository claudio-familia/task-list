export interface Tasklist {
    id?: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    completedAt?: Date | string | null
}
