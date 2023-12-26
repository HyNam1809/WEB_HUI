export const getDeviceId = () => {
  const fingerprint = [];

  // Thu thập thông tin về trình duyệt và hệ điều hành
  fingerprint.push(navigator.userAgent);
  fingerprint.push(navigator.language);
  fingerprint.push(screen.colorDepth);
  fingerprint.push(new Date().getTimezoneOffset());
  fingerprint.push(typeof sessionStorage !== 'undefined');
  fingerprint.push(typeof localStorage !== 'undefined');
  fingerprint.push(typeof indexedDB !== 'undefined');
  
  const hash = btoa(fingerprint.join(''));  

  return hash;
};

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatMoney = (value: number) => {
  // return `${(value ?? 0)?.toFixed(3)}đ`;
  return `${VND.format(value ?? 0)}`;
};