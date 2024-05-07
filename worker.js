onmessage = function(e) {
    // the passed-in data is available via e.data
    const URL =
    "https://script.google.com/macros/s/AKfycbysbbUN-lRSP13ngDwSbhOuCHOeSnIArp0SbKjpTLnnPNQSWL-On1pa63l7XG0oOWdj/exec";
    console.log('worker called', e);
    const data = JSON.parse(e.data);
    console.log('parsed e', data);
  fetch(URL, {
    method: "POST",
    body: new FormData(data),
    mode: "no-cors",
  })
    .then(() => {
        console.log('sucess');
        postMessage('success');
    //   updateUI("try", submitBtn, formEle);
    })
    .catch(() => {
        console.log('failure');
        postMessage('failure');
    //   updateUI("catch", submitBtn, formEle);
    });
};