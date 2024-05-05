function getPathAndLocation() {
  let path = window.location.pathname;
  let splittedPath = path.split("/");
  const finalPath = [splittedPath.at(-2), splittedPath.at(-1)].join("/"); //handled for both local and sever
  let isLocation = false;
  if (finalPath.includes("locations")) isLocation = true;
  return { finalPath, isLocation };
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function validateDateField() {
  const dateField = document.getElementById("moving-date");
  const dateObj = new Date(dateField.value);
  const currentDate = new Date();
  if (dateObj < currentDate) {
    dateField.setCustomValidity("Please enter the future date");
    dateField.reportValidity();
  }
}

function onSubmit() {
  const formEle = document.getElementById("inquiry-form");
  formEle.addEventListener("submit", (e) => {
    e.preventDefault(); //prevent page reload on submitting form
    validateDateField(); //if date validation fails then onSubmit will not execute further
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    callAPI(formEle, submitBtn);
  });
}

function updateUI(tryOrCatch, submitBtn) {
  const modalImg = document.getElementById("modal-img");
  const modalP = document.getElementById("modal-p");
  const { isLocation } = getPathAndLocation();
  if (tryOrCatch === "try") {
    modalImg.src = isLocation ? "../assets/tick.svg" : "assets/tick.svg";
    modalP.innerHTML = "Thank you! <br /> We will contact you shortly.";
  } else {
    modalImg.src = isLocation ? "../assets/cross.svg" : "assets/cross.svg";
    modalP.innerHTML = "Unable to send request!";
  }
  showModal();
  submitBtn.disabled = false;
}

function callAPI(formEle, submitBtn) {
  const URL =
    "https://script.google.com/macros/s/AKfycbysbbUN-lRSP13ngDwSbhOuCHOeSnIArp0SbKjpTLnnPNQSWL-On1pa63l7XG0oOWdj/exec";

  fetch(URL, {
    method: "POST",
    body: new FormData(formEle),
    mode: "no-cors",
  })
    .then(() => {
      updateUI("try", submitBtn);
    })
    .catch(() => {
      updateUI("catch", submitBtn);
    });

  // const subject = `Inquiry | ${payload.name}`;
  // const emailContent = `You got an inquiry! <br /><br /> <b>Name:</b> ${payload.name} <br /> <b>Phone:</b> ${payload.phone} <br /> <b>Moving From:</b> ${payload.fro} <br /> <b>Moving To:</b> ${payload.to} <br /> <b>Requested Moving Date:</b> ${payload.movingDate} <br />`;
  // const key = "C658082A837A6EF33562359FC952BB33D40E";

  // window.Email.send({
  //   Host: "smtp.elasticemail.com",
  //   Username: "eshagoyal98@gmail.com",
  //   Password: key,
  //   To: "eshagoyal98@gmail.com",
  //   // From: document.getElementById("email").value,
  //   From: "tanwarankit04@gmail.com",
  //   Subject: subject,
  //   Body: emailContent,
  // }).then((message) => {
  //   const modalImg = document.getElementById("modal-img");
  //   const modalP = document.getElementById("modal-p");
  //   const { isLocation } = getPathAndLocation();
  //   if (message === "OK") {
  //     modalImg.src = isLocation ? "../assets/tick.svg" : "assets/tick.svg";
  //     modalP.innerHTML = "Email sent successfully!";
  //   } else {
  //     modalImg.src = isLocation ? "../assets/cross.svg" : "assets/cross.svg";
  //     modalP.innerHTML = "Unable to send email!";
  //   }
  //   showModal();
  // });
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function createHtmlContent(isLocation) {
  return `
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont" style="background: #fffbf6;">
    <div id="ibulz" class="nav-inner">
      <div class="flex-div row-div" style="gap: 10px;">
        <img alt="" src=${
          isLocation ? "../assets/logo.png" : "assets/logo.png"
        } width="auto" height="100px"></img>
        <div class="flex-div col-div">
          <div class="flex-div row-div" style="align-self: flex-start;">
            <h2 class="max-width-content"><i>Day</i></h2>
            <h2 class="max-width-content" style="color: red;"><i>Night</i></h2>
          </div>
            <h2 class="max-width-content"><i>Packers and Movers</i></h2>
        </div>
      </div>
      <div class="flex-div col-div">
        <div class="flex-div row-div" style="align-self: flex-start;">
          <img alt="" src=${
            isLocation ? "../assets/phone.svg" : "assets/phone.svg"
          } width="30px" height="30px"></img>
          <p style="font-size: 16px; font-weight: 700;">+91-9911198767</p>
        </div>
        <div class="flex-div row-div" style="align-self: flex-start;">
          <img alt="" src=${
            isLocation ? "../assets/mail.svg" : "assets/mail.svg"
          } width="30px" height="30px"></img>
          <p style="margin: 5px; font-size: 16px; font-weight: 700; line-break: anywhere;">daynightpackersandmovers@gmail.com</p>
        </div>
      </div>
    </div>
  </div>

  <div id="day-night" class="contact border-bottom-class" style="background: white;">
    <div style="display: flex; justify-content: space-between; flex-direction: row; align-items: center;">
      <div class="fill-form-img-div" style="align-self: center;">  
        <img alt="" width="600px" height="auto" src=${
          isLocation
            ? "../assets/1DayNightTheme.gif"
            : "assets/1DayNightTheme.gif"
        }></img>
      </div>
      <div style="padding: 20px;">
        <h1 data-custom-content="good-advice">
          The Power of <br />Good Advice
        </h1>
        <p data-custom-content="description">
          I'm a paragraph. Click here to add <br id="i8lap" />
          your own text and edit me.
        </p>
        <a id="iz026q-2-2" href="#contact"
          autocomplete="off"
          data-custom-content="learnMore"
          class="learn-more"
          >Contact Us</a>
      </div>
    </div>
  </div>

  <div id="form-detail" class="contact border-bottom-class">
    <div class="iyohgi" class="flex-div col-div" style="align-items: unset;">
      <p class="i78bq-2-3 contact-details" style="font-size: xx-large; text-align: center; border-bottom: 70px;">Relocate with ease! Our professional movers and packers ensure a seamless transition for your home or office. From meticulous packing to safe transportation, trust us for a stress-free move. <b style="font-size: 34px;">Get a quote today!</b></p>
      <div class="inquire-tos-content">
        <div id="customer-form">
          <form id="inquiry-form" class="flex-div col-div" style="align-items: flex-start;">
            <label for="name">Name*</label>
            <input id="name" name="name" placeholder="Enter Name" autocomplete="off" required></input>
            <label for="phone">Phone*</label>
            <input id="phone" name="phone" type="tel" placeholder="Enter Phone" autocomplete="off" required pattern="[0-9]{10}"></input>
            <label for="movingFrom">Moving From*</label>
            <select id="movingFrom" name="movingFrom" placeholder="Select Location" autocomplete="off" required>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
            </select>
            <label for="to">Moving To*</label>
            <select id="to" name="to" placeholder="Select Location" autocomplete="off" required>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
            </select>
            <label for="moving-date">Request Moving Date*</label>
            <input id="moving-date" name="movingDate" type="date" autocomplete="off" required></input>
            <button id="submit-btn" type="submit">Submit</button>
          </form>
        </div>
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation ? "../assets/2QueryForm.gif" : "assets/2QueryForm.gif"
          }></img>
        </div>
      </div>  
    </div>
  </div>

  <div id="take-our-services" class="contact border-bottom-class" style="background: #94ddd7;">
    <div class="iyohgi" style="text-align: center;">
      <div class="inquire-tos-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation
              ? "../assets/3TakeOurServices.gif"
              : "assets/3TakeOurServices.gif"
          }></img>
        </div>
        <div style="text-align: left;" class="contact-details">
          <p style="font-size: 19px; font-weight: 700;">Worried About Your Next Relocation During Busy Schedule??</p><br />
          <p style="font-size: xxx-large; font-weight: 800;">Let Us Help You!!</p><br /><br />
          <p>
          Moving to a new place? Let us take the stress out of your relocation journey and turn it into a seamless experience you'll remember fondly. At Day Night Packers and Movers, we're not just movers – we're your partners in making your transition smooth, efficient, and worry-free.
          </p><br /><br />
          <p>
          From our transparent pricing and on-time delivery to our friendly and reliable service, we're committed to going above and beyond to exceed your expectations every step of the way.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div id="our-services" class="contact border-bottom-class" style="background: #ffc7a9;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details" style="font-size: xx-large;">What we actually do?</h1>
      <div id="our-services-content">   
        <div>
          <ul class="service-desc" style="font-size: 18px; line-height: 2.0em;">
            <li><h2>Packers And Movers</h2></li>
            <li><h2>Car And Bike Carrier</h2></li>
            <li><h2>Shipping Service</h2></li>
            <li><h2>Air Freight Forwarding</h2></li>
            <li><h2>Sea Freight Forwarding</h2></li>
            <li><h2>International Relocation</h2></li>
            <li><h2>Domestic Relocation</h2></li>
            <li><h2>Warehousing Service</h2></li>
          </ul>
        </div>
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation ? "../assets/4OurService.gif" : "assets/4OurService.gif"
          }></img>
        </div>
      </div>
    </div>
  </div>

  <div id="our-team" class="contact border-bottom-class" style="background: #5ad5ff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details" style="font-size: xx-large;">Who we are?</h1>
      <div id="our-team-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation ? "../assets/5OurTeam.gif" : "assets/5OurTeam.gif"
          }></img>
        </div>
        <div class="contact-details" style="text-align: left;">
          <ul gap="2px"><li style="margin-bottom: 10px;">At Day Night Packers and Movers, we're your highly motivated and professional companions, dedicated to making your next relocation a stress-free experience.</li>

          <li style="margin-bottom: 10px;">Our team is here to assist you every step of the way with precision and perfection whether you're moving across town or across the country.</li>
          
          <li style="margin-bottom: 10px;">Team of dedicated professionals trained to handle every aspect of your move, from packing and loading to transportation and unpacking.</li>
          
          <li>Years of expertise in the industry, we are committed to providing you with the highest level of service and support. we'll be by your side around the clock.</li></ul><br /><br />
          
          <p>Contact us today to experience the difference our dedicated team can make in your next relocation journey.<br /><br /><br />
          
          <h2>Let's move forward together!</h2></p>
        </div>
      </div>
    </div>
  </div>

  <div id="process-steps" class="contact border-bottom-class" style="background: #94ddd7;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details" style="font-size: xx-large;">How it works?</h1>
      <div class="">
        <!--<div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation
              ? "../assets/3TakeOurServices.gif"
              : "assets/3TakeOurServices.gif"
          }></img>
        </div>-->
        <div style="text-align: left; display: flex; flex-direction: column; gap: 40px; padding: 0px 150px 0px 150px;">
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">01 </b>  Contact us</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">02 </b>  Get a free survey</div>
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">03 </b>  Get quotation</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">04 </b>  Book us</div>
        </div>
      </div>
    </div>
  </div>

  <div id="charges-table" class="contact border-bottom-class" style="background: blue;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details" style="font-size: xx-large;">Our charges</h1>
      <div class="flex-div">
        <table border>
          <thead style="background: white;">
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
              <td>e</td>
              <td>f</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
              <td>e</td>
              <td>f</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
              <td>e</td>
              <td>f</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
              <td>e</td>
              <td>f</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div id="client-reviews" class="contact border-bottom-class" style="background: navajowhite;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details" style="font-size: xx-large;">What our customers say about us?</h1>
      <div class="">
        <!--<div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="600px" height="auto" src=${
            isLocation
              ? "../assets/3TakeOurServices.gif"
              : "assets/3TakeOurServices.gif"
          }></img>
        </div>-->
        <div class="slideshow-container">
          <!-- Full-width images with number and caption text -->
          <div class="mySlides fade">
            <img alt="" src=${
              isLocation
                ? "../assets/client1.jpg"
                : "assets/client1.jpg"
            } height="200px" width="200px">
            <div class="text">Caption Text</div>
          </div>

          <div class="mySlides fade">
            <img alt="" src=${
              isLocation
                ? "../assets/client2.jpg"
                : "assets/client2.jpg"
            } height="200px" width="200px">
            <div class="text">Caption Two</div>
          </div>

          <div class="mySlides fade">
            <img alt="" src=${
              isLocation
                ? "../assets/client3.jpg"
                : "assets/client3.jpg"
            } height="200px" width="200px">
            <div class="text">Caption Three</div>
          </div>

          <div class="mySlides fade">
            <img alt="" src=${
              isLocation
                ? "../assets/client4.jpg"
                : "assets/client4.jpg"
            } height="200px" width="200px">
            <div class="text">Caption Four</div>
          </div>

          <!-- Next and previous buttons
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a> -->
        </div>
        <br>

        <!-- The dots/circles -->
        <div style="text-align:center">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
          <span class="dot" onclick="currentSlide(4)"></span>
        </div>
      </div>
    </div>
  </div>

  <div id="services" class="services border-bottom-class" style="margin: 0px;">
    <div id="iymxg" class="service-info">
      <h1 class="i78bq contact-details" style="font-size: xx-large;" data-custom-content="services">
        Our presence
      </h1>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <div class="fill-form-img-div" style="align-self: center;">
        <img alt="" width="500px" height="auto" src=${
          isLocation ? "../assets/AroundWorld.gif" : "assets/AroundWorld.gif"
        }></img>
      </div>
      <div id="i12z9" class="services-box">
        <div id="ilmjk" class="service-cont">
          <ul id="ipekj" class="service-desc">
            <li id="locations/ahemdabad.html"><a class="contact-details" href="locations/ahemdabad.html">Packers and
                Movers in Ahemdabad</a></li>
            <li id="locations/banglore.html"><a class="contact-details" href="locations/banglore.html">Packers and
                Movers in Banglore</a></li>
            <li id="locations/chennai.html"><a class="contact-details" href="locations/chennai.html">Packers and
                Movers in Chennai</a></li>
            <li id="locations/coimbatore.html"><a class="contact-details" href="locations/coimbatore.html">Packers
                and Movers in Coimbatore</a></li>
          </ul>
        </div>
        <div id="ilmjk-2" class="service-cont">
          <ul id="ipekj-2" class="service-desc">
            <li id="locations/delhi.html"><a class="contact-details" href="locations/delhi.html">Packers and Movers
                in Delhi</a></li>
            <li id="locations/faridabad.html"><a class="contact-details" href="locations/faridabad.html">Packers and
                Movers in Faridabad</a></li>
            <li id="locations/ghaziabad.html"><a class="contact-details" href="locations/ghaziabad.html">Packers and
                Movers in Ghaziabad</a></li>
            <li id="locations/gurgaon.html"><a class="contact-details" href="locations/gurgaon.html">Packers and
                Movers in Gurgaon</a></li>
          </ul>
        </div>
        <div id="ilmjk-3" class="service-cont">
          <ul id="ipekj-3" class="service-desc">
            <li id="locations/hyderabad.html"><a class="contact-details" href="locations/hyderabad.html">Packers and
                Movers in Hyderabad</a></li>
            <li id="locations/indore.html"><a class="contact-details" href="locations/indore.html">Packers and
                Movers in Indore</a></li>
            <li id="locations/jaipur.html"><a class="contact-details" href="locations/jaipur.html">Packers and
                Movers in Jaipur</a></li>
            <li id="locations/kolkata.html"><a class="contact-details" href="locations/kolkata.html">Packers and
                Movers in Kolkata</a></li>
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
            <li id="locations/mumbai.html"><a class="contact-details" href="locations/mumbai.html">Packers and
                Movers in Mumbai</a></li>
            <li id="locations/noida.html"><a class="contact-details" href="locations/noida.html">Packers and Movers
                in Noida</a></li>
            <li id="locations/pune.html"><a class="contact-details" href="locations/pune.html">Packers and Movers in
                Pune</a></li>
            <li id="locations/surat.html"><a class="contact-details" href="locations/surat.html">Packers and Movers
                in Surat</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" class="contact border-bottom-class" style="background: #047d9d;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="contact-details" style="font-size: xx-large;">Still have doubts?</h1>
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" width="500px" height="auto" src=${
            isLocation ? "../assets/6ContactUs.gif" : "assets/6ContactUs.gif"
          }></img>
        </div>
        <div>
        <p id="iqrh3-2-2" class="contact-details" style="margin-bottom: 10px; margin-top: 20px;">Contact us</p>
        <div id="igiuzk" class="flex-div row-div">
          <a id="i2tpy3" aria-label="facebook" href=""><img alt="facebook page link" id="i3gekg" height="38px" width="38px" src=${
            isLocation ? "../assets/fb.svg" : "assets/fb.svg"
          } /></a>
          <a id="i2tpy3-2" aria-label="instagram" href=""><img alt="instagram page link" id="i3gekg-2" height="25px" width="25px" src=${
            isLocation ? "../assets/insta.svg" : "assets/insta.svg"
          } /></a>
          <a id="i2tpy3-5" aria-label="whatsapp" href="https://wa.me/+919911198767" target="_blank"><img alt="chat on whatsapp" id="i3gekg-3" height="31px" width="31px" src=${
            isLocation ? "../assets/whatsapp.svg" : "assets/whatsapp.svg"
          } /></a>
          <a id="i2tpy3-3" aria-label="email" href="mailto:daynightpackersandmovers@gmail.com"><img alt="compose email" id="i3gekg-4" height="30px" width="30px"
              src=${
                isLocation ? "../assets/email.svg" : "assets/email.svg"
              } /></a>
          <a aria-label="mobile" href=tel:+919911198767><img alt="call" id="i3gekg-5" height="30px" width="30px" src=${
            isLocation ? "../assets/tel.svg" : "assets/tel.svg"
          } /></a>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright-footer" style="background-color: aliceblue;">
    <p id="iy2lbi">© 2024 powered by Day Night Packers And Movers</p>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content flex-div col-div">
      <img alt="" id="modal-img" width="50px" height="50px"></img>
      <p id="modal-p" style="text-align: center";></p>
    </div>
  </div>`;
}

function manageDOM(htmlContent, finalPath, isLocation) {
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  document.body.appendChild(container);
  if (isLocation) removeCurrentLocationLI(finalPath);
}

function removeCurrentLocationLI(finalPath) {
  const li = document.getElementById(finalPath);
  li?.remove();
}

function main() {
  const { finalPath, isLocation } = getPathAndLocation();
  const htmlContent = createHtmlContent(isLocation);
  manageDOM(htmlContent, finalPath, isLocation);
}

main();

// Events handling
closeModal();
onSubmit();
let slideIndex = 0;
showSlides();
