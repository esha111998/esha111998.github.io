onmessage = function(e) {
    // the passed-in data is available via e.data
    const URL =
    "https://script.google.com/macros/s/AKfycbysbbUN-lRSP13ngDwSbhOuCHOeSnIArp0SbKjpTLnnPNQSWL-On1pa63l7XG0oOWdj/exec";
    console.log('worker called');
  fetch(URL, {
    method: "POST",
    body: new FormData(e.data),
    mode: "no-cors",
  })
    .then(() => {
        postMessage('success');
    //   updateUI("try", submitBtn, formEle);
    })
    .catch(() => {
        postMessage('failure');
    //   updateUI("catch", submitBtn, formEle);
    });
};