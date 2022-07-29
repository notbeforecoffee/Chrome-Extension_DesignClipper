
const isFulhausSite = (returnUrl) => {
  const pattern = /https:\/\/studio.fulhaus.com\/.*/



  if (pattern.test(returnUrl)) {

    console.log(true);
  }
  console.log(false);
};

isFulhausSite("https://studio.fulhaus.com/quote?pid=6243bf151e79812d036eb099");
