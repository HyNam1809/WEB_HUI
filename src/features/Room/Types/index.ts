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
    commission_percentage: number;
    date_room_end: string,
    total_user: number,
    user_count: number,
    payment_time: string
  }