export interface IRoomData {
    id: number;
    title: string;
    price_room: string,
    avatar: string,
    commission_percentage: number,
    date_end: string,
    date_start: string,
    created_at: string,
    updated_at: string,
    user_count: number
  }

export interface IRoomItemResData {
    id: number;
    avatar: string;
    commission_percentage: number;
    date_end: string;
    created_at: string;
    date_start: string;
    price_room: number;
    title: string;
    updated_at: number;
    user_count: number;
}