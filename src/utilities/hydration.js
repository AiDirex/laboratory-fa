let errorMessage = 'قادر به تجزیه مقادیر وارد شده برای پارامترهای پرسیده شده در url نیست.';

export const rehydrate = function(obj) {
  try {
    return JSON.parse(new Buffer(obj, 'base64').toString());
  } catch (e) {
    if (typeof alert !== 'undefined') {
      alert(errorMessage);
    } else {
      console.error(errorMessage);
    }
    return {}
  }
}

export const dehydrate = function(obj) {
  return new Buffer(JSON.stringify(obj)).toString('base64');
}
