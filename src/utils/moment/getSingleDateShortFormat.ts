import moment, { Moment } from 'moment';

export const TIME_DATE_MERCHANT = 'DD/MM/YYYY';

export const getSingleDateShortFormat = (_date: Moment) => {
    const today = moment();
    
      
    if (_date.isSame(today, 'day')) {
      return 'Hôm nay';
    }
  
    if (_date.isSame(today.clone().subtract(1, 'days'), 'day')) {
      return 'Hôm qua';
    }
  
    if (_date.isSame(today.clone().add(1, 'days'), 'day')) {
      return 'Ngày mai';
    }
  
    return _date.format(TIME_DATE_MERCHANT);
  };