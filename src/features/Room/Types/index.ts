export type ItemCardRoom = {
    title: string,
    start_time: string,
    end_time: string,
    user: any,
    total_money: any,
}

export interface RoomItemProps {
    id: number;
    title: string;
    price_room: number;
    avatar: string;
    commission_percentage: number;
    date_end: string,
    date_start: string,
    user_count: number
  }