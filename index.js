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

function processFormSubmission(e) {
  e.preventDefault(); //prevent page reload on submitting form
  validateDateField(); //if date validation fails then onSubmit will not execute further
  const formEle = document.getElementById("inquiry-form");
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  callAPI(formEle, submitBtn);
}

function onSubmit() {
  const formEle = document.getElementById("inquiry-form");
  formEle.addEventListener("submit", processFormSubmission);
}

function updateUI(tryOrCatch, submitBtn, formEle) {
  formEle.removeEventListener("submit", processFormSubmission);
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
  const formData = new FormData(formEle);
  const URL =
    "https://script.google.com/macros/s/AKfycbzJhx_W2TP08ZwTOWRaQ2u9OWZsWkwyakIpWs_d3xH_2tFv195Y_FAmQkmHQ4LU2SMjnA/exec";

  fetch(URL, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      updateUI("try", submitBtn, formEle);
    })
    .catch(() => {
      updateUI("catch", submitBtn, formEle);
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

function currentSlide(slideClassName, dotClassName, slideIndex) {
  clearTimeout(
    slideClassName === "day-night-slides" ? dayNightTimeout : slidesTimeout
  );
  showSlides(slideClassName, dotClassName, slideIndex);
}

function showSlides(slideClassName, dotClassName, slideIndex) {
  let i;
  let slides = document.getElementsByClassName(slideClassName);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  let dots = document.getElementsByClassName(dotClassName);
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  if (slideClassName === "day-night-slides") {
    dayNightTimeout = setTimeout(function () {
      return showSlides("day-night-slides", "day-night-dot", slideIndex);
    }, 2000); // Change image every 2 seconds
  } else {
    slidesTimeout = setTimeout(function () {
      return showSlides("mySlides", "dot", slideIndex);
    }, 2000); // Change image every 2 seconds
  }
}

function createHtmlContent(finalPath, isLocation) {
  const brand = "#FF5823";
  const locations1 = [
    "Agra",
    "Ahemdabad",
    "Allahbad",
    "Ambala",
    "Ankleshwar",
    "Aurangabad",
    "Bangalore",
    "Bathinda",
    "Belapur Mumbai",
    "Bhiwandi",
    "Bhopal",
    "Bhubneswar",
    "Bhuj",
    "Bikaner",
    "Calicut",
    "Chandigarh",
    "Chennai",
    "Cochin",
    "Coimbtore",
    "Cuttack",
  ];
  const locations2 = [
    "Delhi",
    "Dehradun",
    "Dwarka",
    "Dwarka Delhi",
    "Fridabad",
    "Gandhidham",
    "Ghaziabad",
    "Goa",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Haridwar",
    "Hisar",
    "Hubli",
    "Hydrabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jammu",
    "Jamnagar",
  ];
  const locations3 = [
    "Jamshedpur",
    "Jodhpur",
    "Kalighat",
    "Kanpur",
    "Kolhapur",
    "Kolkata",
    "Korba",
    "Kottayam",
    "Ludhiana",
    "Lukhnow",
    "Madipakkam",
    "Madurai",
    "Manesar",
    "Mangalore",
    "Meemrana",
    "Meerut",
    "Mumbai",
    "Mysore",
    "Nasik",
    "Nagpur",
  ];
  const locations4 = [
    "Noida",
    "Pallnerghata Road",
    "Panipat",
    "Patalganga",
    "Patna",
    "Pondicherry",
    "Porur",
    "Portblair",
    "Pune",
    "Raigarh",
    "Raipur",
    "Rajkot",
    "Ranchi",
    "Rudrapur",
    "Rourkela",
    "Sarjapur Road",
    "Secunerabad",
    "Siliguri",
    "Surat",
    "Thoraipakkam",
  ];
  const locations5 = [
    "Tirupur",
    "Trichy",
    "Trivandrum",
    "Thoraipakkam",
    "Udaipur",
    "Vadodra",
    "Varanasi",
    "Vapi",
    "Vijaywada",
    "Vizag",
    "Whitefield",
  ];
  const cityName = finalPath?.split('/')?.[1]?.split('.')?.[0];
  return `
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont" style="background: #fffbf6;">
    <div id="ibulz" class="nav-inner">
      <a href="https://esha111998.github.io/">
        <img id="logo" alt="" src=${
          isLocation ? "../assets/logonew.png" : "assets/logonew.png"
        } width="auto" height="100px"></img>
      </a>
      <div class="flex-div col-div">
        <div style="align-self: flex-start;">
        <a aria-label="mobile" class="flex-div row-div" href=tel:+919911198767><img alt="" src=${
          isLocation ? "../assets/phone.svg" : "assets/phone.svg"
        } width="30px" height="30px"></img>
          <p class="header-font-size" style="font-weight: 700; color: ${brand}">+91-9911198767</p></a>
        </div>
        <div style="align-self: flex-start;">
        <a aria-label="email" class="flex-div row-div" href="mailto:daynightpackersandmovers@gmail.com"><img alt="" src=${
          isLocation ? "../assets/mail.svg" : "assets/mail.svg"
        } width="30px" height="30px"></img>
          <p class="header-font-size" style="margin: 5px; font-weight: 700; line-break: anywhere; color: ${brand}">daynightpackersandmovers@gmail.com</p></a>
        </div>
      </div>
    </div>
  </div>

  ${
    !isLocation
      ? `<div id="day-night" class="contact border-bottom-class" style="background: #e2e4f4;">
    <div class="iyohgi" style="text-align: center;">
      <div class="">
        <div class="slideshow-container">
          <div class="day-night-slides fade">
            <img class="slideImg" alt="" src=${
              isLocation ? "../assets/1.png" : "assets/1.png"
            } height="300px" width="300px">
            <div class="day-night-text">
              24/7 Dedication: Working Around the Clock to Serve You Better. ⏰ #AlwaysOn
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/2.png" : "assets/2.png"
            } height="300px" width="350px">
            <div class="day-night-text">Safe and Sound, Every Detail Perfected. 🛡️✨ #ExcellenceAssured
            <br /><br />
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/3.png" : "assets/3.png"
            } height="300px" width="350px">
            <div class="day-night-text">Powered by Excellence: Our Arsenal of Resources Ready for You. 💼⚙️ #PreparedForSuccess
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/4.png" : "assets/4.png"
            } height="300px" width="320px">
            <div class="day-night-text">Your Trusted Partner: Where Every Customer Finds a Companion. 🤝 #CustomerFirst
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/5.png" : "assets/5.png"
            } height="300px" width="320px">
            <div class="day-night-text">Relax, We've Got You Covered: Ensuring Customer Satisfaction Every Step of the Way. 😌👌 #PeaceOfMindService
            </div>
          </div>

        </div>
        <br>

        <div style="text-align:center">
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 0)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 1)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 2)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 3)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 4)"></span>
        </div>
      </div>
    </div>
  </div>`
      : `<div id="city-section" class="contact border-bottom-class" style="background: #f2f2f2;">
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${
            isLocation
              ? "../assets/citySection.gif"
              : "assets/citySection.gif"
          }></img>
        </div>
        <div class="contact-details">
          <p style="font-size: 30px; font-weight: 700;">Welcome to Day Night Packers and Movers in ${cityName} - Your Trusted Partner in Relocation!</p><br /><br />
          <p style="font-size: 19px;">At Day Night Packers and Movers, we understand that moving can be a daunting task. Whether you're relocating your home or your business, we are here to make your transition seamless and stress-free.</p><br />
          <p style="font-size: 19px;">
          With years of experience in the industry, our team of dedicated professionals is committed to providing top-notch moving and packing services tailored to meet your specific needs. From packing fragile items with the utmost care to transporting your belongings safely to your new destination, we handle every aspect of your move with precision and efficiency.
          </p>
        </div>
      </div>
    </div>
  </div>`
  }

  <div id="form-detail" class="contact border-bottom-class">
    <div class="iyohgi" class="flex-div col-div" style="align-items: unset;">
      <p class="i78bq-2-3 contact-details" style="font-size: x-large; text-align: center; border-bottom: 70px;">Relocate with ease! Our professional movers and packers ensure a seamless transition for your home or office. From meticulous packing to safe transportation, trust us for a stress-free move. <b style="font-size: 34px;">Get a quote today!</b></p>
      <div class="inquire-tos-content">
        <div id="customer-form">
          <form id="inquiry-form" class="flex-div col-div" style="align-items: flex-start;">
            <label for="name">Name*</label>
            <input id="name" name="name" placeholder="Enter Name" autocomplete="off" required></input>
            <label for="phone">Phone*</label>
            <input id="phone" name="phone" type="tel" placeholder="Enter Phone" autocomplete="off" required pattern="[0-9]{10}"></input>
            <label for="movingFrom">Moving From*</label>
            <input id="movingFrom" name="movingFrom" placeholder="Enter Location" autocomplete="off" required></input>
            <label for="to">Moving To*</label>
            <input id="to" name="to" placeholder="Enter Location" autocomplete="off" required></input>
            <label for="moving-date">Request Moving Date*</label>
            <input id="moving-date" name="movingDate" type="date" autocomplete="off" required></input>
            <input id="leadSource" name="leadSource" value="Inquiry Form" style="display: none;"></input>
            <input id="inquiryDate" name="inquiryDate" value=${Intl.DateTimeFormat(
              "en-GB"
            ).format(new Date())} style="display: none;"></input>
            <button id="submit-btn" type="submit">Submit</button>
          </form>
        </div>
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src=${
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
          <img alt="" loading="lazy" width="600px" height="auto" src=${
            isLocation
              ? "../assets/3TakeOurServices.gif"
              : "assets/3TakeOurServices.gif"
          }></img>
        </div>
        <div style="text-align: left; margin-top: 50px;" class="contact-details">
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
      <h1 class="i78bq-2-3 contact-details h1-font-size">Decoding Excellence: Illuminating Our Range of Services. 💼 #ServiceSavvy</h1>
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
          <img alt="" loading="lazy" width="600px" height="auto" src=${
            isLocation ? "../assets/4OurService.gif" : "assets/4OurService.gif"
          }></img>
        </div>
      </div>
    </div>
  </div>

  <div id="our-team" class="contact border-bottom-class" style="background: #5ad5ff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details h1-font-size">United in Purpose, Stronger in Unity. 🌟 Dynamics of our Team</h1>
      <div id="our-team-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src=${
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

  <div id="client-reviews" class="contact border-bottom-class" style="background: #d7e973;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details h1-font-size">Voices of Satisfaction: Hear What Our Customers Have to Say! 🌟 #HappyCustomersSpeak</h1>
      <div class="">
        <div class="slideshow-container">
          <!-- Full-width images with number and caption text -->
          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${
              isLocation ? "../assets/client1.jpg" : "assets/client1.jpg"
            } height="200px" width="200px">
            <div class="text">Rahul Maan, Kapurthala, Punjab <br /><br />
            "Moving with Day Night Packers and Movers was a breeze! From the initial inquiry to the final delivery, their team was professional, efficient, and careful with our belongings. I highly recommend Day Night Packers and Movers for a stress-free moving experience!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${
              isLocation ? "../assets/client2.jpg" : "assets/client2.jpg"
            } height="200px" width="200px">
            <div class="text">Mr. Lakshay Jeet Shah, Bhubaneswar, Orissa <br /><br />
            "I had a fantastic experience with Day Night Packers and Movers. Their team was punctual, polite, and incredibly hardworking. They handled all of our items with care and precision, ensuring nothing was damaged during the move. Kudos to the team!!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${
              isLocation ? "../assets/client3.jpg" : "assets/client3.jpg"
            } height="200px" width="200px">
            <div class="text">Shalini Dey, Siliguri, West Bengal<br /><br />
            "Day Night Packers and Movers exceeded my expectations. Their team went above and beyond to ensure my move went smoothly. I'm grateful for their excellent service and would highly recommend them to anyone in need of a moving company."
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${
              isLocation ? "../assets/client4.jpg" : "assets/client4.jpg"
            } height="200px" width="200px">
            <div class="text">Raj Shekar Reddy, Hyderabad<br /><br />
            "Day Night Packers and Movers provided exceptional service from start to finish. Their staff was courteous, efficient, and incredibly helpful throughout the entire process. They took the stress out of moving and made sure everything arrived at my new home safely. "
            </div>
          </div>

        </div>
        <br>

        <!-- The dots/circles -->
        <div style="text-align:center">
          <span class="dot" onclick="currentSlide('mySlides', 'dot', 0)"></span>
          <span class="dot" onclick="currentSlide('mySlides', 'dot', 1)"></span>
          <span class="dot" onclick="currentSlide('mySlides', 'dot', 2)"></span>
          <span class="dot" onclick="currentSlide('mySlides', 'dot', 3)"></span>
        </div>
      </div>
    </div>
  </div>

  <div id="charges-table" class="contact border-bottom-class" style="background: #b2b2eb;">
  <div class="iyohgi" style="text-align: center;">
    <h1 class="i78bq-2-3 contact-details h1-font-size">Fair Pricing, Exceptional Value: Exploring Our Transparent Charges. 💰 #QualityMeetsAffordability</h1>
    <div style="background: white; overflow-x:auto; border-radius: 5px; margin: 30px;">
      <table style="border-color: white;">
        <thead style="background: #16163F; color: white;">
          <tr>
            <td style="border-top-left-radius: 5px;">Shifting Type</td>
            <td>Upto 50 Kms</td>
            <td>Upto 500 Kms</td>
            <td>Upto 1000 Kms</td>
            <td>Upto 1500 Kms</td>
            <td style="border-top-right-radius: 5px;">Upto 2500 Kms</td>
          </tr>
        </thead>
        <tbody>
          <tr style="background: white;">
            <td>1 BHK Home</td>
            <td>Rs 7,000 to 11,000</td>
            <td>Rs 12,000 to 16,000</td>
            <td>Rs 20,000 to 25,000</td>
            <td>Rs 26,000 to 32,000</td>
            <td>Rs 30,000 to 35,000</td>
          </tr>
          <tr style="background: whitesmoke;">
            <td>2 BHK Home</td>
            <td>Rs 12,000 to 15,000</td>
            <td>Rs 20,000 to 23,000</td>
            <td>Rs 25,000 to 30,000</td>
            <td>Rs 32,000 to 40,000</td>
            <td>Rs 40,000 to 45,000</td>
          </tr>
          <tr style="background: white;">
            <td>3 BHK Home</td>
            <td>Rs 15,000 to 18,000</td>
            <td>Rs 25,000 to 30,000</td>
            <td>Rs 35,000 to 40,000</td>
            <td>Rs 45,000 to 50,000</td>
            <td>Rs 50,000 to 65,000</td>
          </tr>
          <tr style="background: whitesmoke;">
            <td>4 BHK / Villa</td>
            <td>Rs 25,000 to 30,000</td>
            <td>Rs 35,000 to 40,000</td>
            <td>Rs 50,000 to 60,000</td>
            <td>Rs 55,000 to 65,000</td>
            <td>Rs 70,000 to 90,000</td>
          </tr>
          <tr style="background: white;">
            <td>Car Transportation</td>
            <td>By Road with labor and fuel cost</td>
            <td>Rs 12,000 to 14,500</td>
            <td>Rs 17,000 to 20,000</td>
            <td>Rs 21,000 to 25,000</td>
            <td>-</td>
          </tr>
          <tr style="background: whitesmoke;">
            <td>Bike Transportation</td>
            <td>By Road with labor and fuel cost</td>
            <td>Rs 7,000 to 10,500</td>
            <td>Rs 10,000 to 15,000</td>
            <td>Rs 15,000 to 18,000</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  <div id="process-steps" class="contact border-bottom-class" style="background: #94ddd7;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details h1-font-size">Unlocking Convenience: The Seamless Steps to Availing Our Services. 🛠️ #CustomerExperience</h1>
      <div class="">
        <!--<div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src=${
            isLocation
              ? "../assets/3TakeOurServices.gif"
              : "assets/3TakeOurServices.gif"
          }></img>
        </div>-->
        <div style="text-align: left; display: flex; flex-direction: column; gap: 40px; padding: 0px 150px 0px 150px;">
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">01 </b>  Get in Touch for a Seamless Moving Experience! 📦✨ <br />Contact Us Today!</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">02 </b>  Planning Your Move? Let's Get Started with a Free Survey and Quotation!</div>
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">03 </b>  Ready to Make Your Move? Book with Us Today and Be a part of Smooth Transition!</div>
          <!--<div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">04 </b>  Book us</div>-->
        </div>
      </div>
    </div>
  </div>

  <div id="services" class="services border-bottom-class iyohgi">
    <div id="iymxg" class="service-info">
      <h1 class="i78bq contact-details h1-font-size" data-custom-content="services">
      Everywhere You Need Us to Be: Discovering Our Global Presence. 🌍 #AccessibleInnovation
      </h1>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <div class="fill-form-img-div" style="align-self: center;">
        <img alt="" loading="lazy" width="500px" height="auto" src=${
          isLocation ? "../assets/AroundWorld.gif" : "assets/AroundWorld.gif"
        }></img>
      </div>
      <div id="i12z9" class="services-box">
        <div id="ilmjk" class="service-cont">
          <ul id="ipekj" class="service-desc">
            ${locations1
              .map((loc) => {
                return `<li id="locations/${loc}.html"><a class="contact-details" href="locations/${loc}.html">Packers and
                  Movers in ${loc}</a></li>`;
              })
              .join("")}
            <!--<li id="locations/ahemdabad.html"><a class="contact-details" href="locations/ahemdabad.html">Packers and
                Movers in Ahemdabad</a></li>
            <li id="locations/banglore.html"><a class="contact-details" href="locations/banglore.html">Packers and
                Movers in Banglore</a></li>
            <li id="locations/chennai.html"><a class="contact-details" href="locations/chennai.html">Packers and
                Movers in Chennai</a></li>
            <li id="locations/coimbatore.html"><a class="contact-details" href="locations/coimbatore.html">Packers
                and Movers in Coimbatore</a></li>-->
          </ul>
        </div>
        <div id="ilmjk-2" class="service-cont">
          <ul id="ipekj-2" class="service-desc">
            ${locations2
              .map((loc) => {
                return `<li id="locations/${loc}.html"><a class="contact-details" href="locations/${loc}.html">Packers and Movers in ${loc}</a></li>`;
              })
              .join("")}
            <!--
            <li id="locations/delhi.html"><a class="contact-details" href="locations/delhi.html">Packers and Movers
                in Delhi</a></li>
            <li id="locations/faridabad.html"><a class="contact-details" href="locations/faridabad.html">Packers and
                Movers in Faridabad</a></li>
            <li id="locations/ghaziabad.html"><a class="contact-details" href="locations/ghaziabad.html">Packers and
                Movers in Ghaziabad</a></li>
            <li id="locations/gurgaon.html"><a class="contact-details" href="locations/gurgaon.html">Packers and
                Movers in Gurgaon</a></li>-->
          </ul>
        </div>
        <div id="ilmjk-3" class="service-cont">
          <ul id="ipekj-3" class="service-desc">
          ${locations3
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          <!--  <li id="locations/hyderabad.html"><a class="contact-details" href="locations/hyderabad.html">Packers and
                Movers in Hyderabad</a></li>
            <li id="locations/indore.html"><a class="contact-details" href="locations/indore.html">Packers and
                Movers in Indore</a></li>
            <li id="locations/jaipur.html"><a class="contact-details" href="locations/jaipur.html">Packers and
                Movers in Jaipur</a></li>
            <li id="locations/kolkata.html"><a class="contact-details" href="locations/kolkata.html">Packers and
                Movers in Kolkata</a></li>-->
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations4
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          <!-- <li id="locations/mumbai.html"><a class="contact-details" href="locations/mumbai.html">Packers and
                Movers in Mumbai</a></li>
            <li id="locations/noida.html"><a class="contact-details" href="locations/noida.html">Packers and Movers
                in Noida</a></li>
            <li id="locations/pune.html"><a class="contact-details" href="locations/pune.html">Packers and Movers in
                Pune</a></li>
            <li id="locations/surat.html"><a class="contact-details" href="locations/surat.html">Packers and Movers
                in Surat</a></li>-->
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations5
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          <!-- <li id="locations/mumbai.html"><a class="contact-details" href="locations/mumbai.html">Packers and
                Movers in Mumbai</a></li>
            <li id="locations/noida.html"><a class="contact-details" href="locations/noida.html">Packers and Movers
                in Noida</a></li>
            <li id="locations/pune.html"><a class="contact-details" href="locations/pune.html">Packers and Movers in
                Pune</a></li>
            <li id="locations/surat.html"><a class="contact-details" href="locations/surat.html">Packers and Movers
                in Surat</a></li>-->
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" class="contact border-bottom-class" style="background: #047d9d;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="contact-details h1-font-size">Doubts Dismissed: Let Us Clear the Path to Clarity. 🌟 #ConfidenceInAnswers</h1>
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="500px" height="auto" src=${
            isLocation ? "../assets/6ContactUs.gif" : "assets/6ContactUs.gif"
          }></img>
        </div>
        <div>
        <p id="iqrh3-2-2" class="contact-details" style="margin-bottom: 10px; margin-top: 20px;">Contact us</p>
        <div id="igiuzk" class="flex-div row-div">
          <a id="i2tpy3" aria-label="facebook" href="https://www.facebook.com/profile.php?id=61559284304658" target="_blank"><img alt="facebook page link" loading="lazy" id="i3gekg" height="49px" width="49px" src=${
            isLocation ? "../assets/fb.svg" : "assets/fb.svg"
          } /></a>
          <a id="i2tpy3-2" aria-label="instagram" href="https://www.instagram.com/daynightpackersand/" target="_blank"><img alt="instagram page link" loading="lazy" id="i3gekg-2" height="33px" width="33px" src=${
            isLocation ? "../assets/insta.svg" : "assets/insta.svg"
          } /></a>
          <a id="i2tpy3-5" aria-label="whatsapp" href="https://wa.me/+919911198767" target="_blank"><img alt="chat on whatsapp" loading="lazy" id="i3gekg-3" height="40px" width="40px" src=${
            isLocation ? "../assets/whatsapp.svg" : "assets/whatsapp.svg"
          } /></a>
          <a id="i2tpy3-3" aria-label="email" href="mailto:daynightpackersandmovers@gmail.com"><img alt="compose email" loading="lazy" id="i3gekg-4" height="37px" width="37px"
              src=${
                isLocation ? "../assets/email.svg" : "assets/email.svg"
              } /></a>
          <a aria-label="mobile" href=tel:+919911198767><img alt="call" loading="lazy" id="i3gekg-5" height="37px" width="37px" src=${
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
      <img alt="" loading="lazy" id="modal-img" width="50px" height="50px"></img>
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
  const htmlContent = createHtmlContent(finalPath, isLocation);
  manageDOM(htmlContent, finalPath, isLocation);
}

main();

// Events handling
closeModal();
onSubmit();

let dayNightTimeout;
let dayNightSlideIndex = 0;
if (!getPathAndLocation().isLocation) {
  showSlides("day-night-slides", "day-night-dot", dayNightSlideIndex);
}

let slidesTimeout;
let slideIndex = 0;
showSlides("mySlides", "dot", slideIndex);
