const swal = require('sweetalert');


const showSwal = (title, icon, buttons) => {
    swal({ title, icon, buttons });
};

const formatDate = (timestamp) => {
  if (!timestamp) {
    return '';
  }

  try {
    let numericTimestamp;
    if (typeof timestamp === 'string') {
      numericTimestamp = parseInt(timestamp, 10);
    } else if (typeof timestamp === 'number') {
      numericTimestamp = timestamp;
    } else {
      return new Date(timestamp).toLocaleDateString('fa-IR');
    }

    const date = new Date(numericTimestamp);
    if (date.toString() === 'Invalid Date') {
      return timestamp.toString().substring(0, 10);
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'persian',
    };

    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  } catch (error) {
    console.error('خطا در تبدیل تاریخ:', error);
    return 'تاریخ نامشخص';
  }
};


export { showSwal, formatDate };