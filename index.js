const { cityOrLinkName } = getPathAndLocation();
const brand = "#FF5823";
// let dayNightTimeout;
let dayNightSlideIndex = 0;

let slidesTimeout;
let slideIndex = 0;

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
  formEle?.addEventListener("submit", processFormSubmission);
}

function updateUI(tryOrCatch, submitBtn, formEle) {
  formEle.removeEventListener("submit", processFormSubmission);
  const modalImg = document.getElementById("modal-img");
  const modalP = document.getElementById("modal-p");
  if (tryOrCatch === "try") {
    modalImg.src = "assets/tick.svg";
    modalP.innerHTML = "Thank you! <br /> We will contact you shortly.";
  } else {
    modalImg.src = "assets/cross.svg";
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
}

function showHidePrevNextBtns(index) {
  const prevBtn = document.getElementsByClassName("prev")[0];
  const nextBtn = document.getElementsByClassName("next")[0];

  if (index > 0) prevBtn.style.display = "block";
  else prevBtn.style.display = "none";
  if (index < 3) nextBtn.style.display = "block";
  else nextBtn.style.display = "none";
}

function currentSlide(slideClassName, dotClassName, slideIndex) {
  if (slideClassName === "mySlides") clearTimeout(slidesTimeout);
  else dayNightSlideIndex = slideIndex;
  showSlides(slideClassName, dotClassName, slideIndex);
}

function plusSlides(slideIndex) {
  dayNightSlideIndex += slideIndex;
  showSlides("day-night-slides", "day-night-dot", dayNightSlideIndex);
}

function showSlides(slideClassName, dotClassName, slideIndex) {
  let i;
  let slides = document.getElementsByClassName(slideClassName);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  let dots = document.getElementsByClassName(dotClassName);
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i]?.className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  if (slideClassName === "day-night-slides") {
    showHidePrevNextBtns(slideIndex - 1);
    // dayNightTimeout = setTimeout(function () {
    //   return showSlides("day-night-slides", "day-night-dot", slideIndex);
    // }, 2000); // Change image every 2 seconds
  }
  if (slideClassName === "mySlides") {
    slidesTimeout = setTimeout(function () {
      return showSlides("mySlides", "dot", slideIndex);
    }, 2000); // Change image every 2 seconds
  }
}

function applyAnimationWhenInViewport(elementIdOrClass, animation) {
  const element = document.querySelector(elementIdOrClass);
  const observer = new IntersectionObserver((entries) => {
    element.classList.toggle(animation, entries[0].isIntersecting);
  });
  observer.observe(element);

  // const screenTop = document.scrollingElement.scrollTop;
  // const screenBottom = screenTop + innerHeight;
  // const eleTop = element.getBoundingClientRect().top

  // if ( eleTop < screenBottom && eleTop < screenTop)
  // {
  //   element.children[0].classList.add(animation);
  // }
}

function getAboutUsContent() {
  return `
  <section id="about-us" class="contact border-bottom-class" style="background: #000000;">
    <div class="cover-img flex-div col-div" style="background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/about-packers-movers.webp');">
      <h1 class="heading">About Us</h1>
      <div class="flex-div row-div" style="margin-top: 30px; gap: 20px; flex-wrap: wrap;">
        <div class="card about-us-cards flex-div col-div">
          <p><b>Our Mission</b></p>
          <a class="service-btn" href="https://www.daynightpackersmovers.com/our-mission.html">View More</a>
        </div>
        <div class="card about-us-cards flex-div col-div">
          <p><b>Our Team</b></p>
          <a class="service-btn" href="https://www.daynightpackersmovers.com/our-team.html">View More</a>
        </div>
        <div class="card about-us-cards flex-div col-div">
          <p><b>Our Services</b></p>
          <a class="service-btn" href="https://www.daynightpackersmovers.com/our-service.html">View More</a>
        </div>
        <div class="card about-us-cards flex-div col-div">
          <p><b>Why Choose Us</b></p>
          <a class="service-btn" href="https://www.daynightpackersmovers.com/why-choose-us.html">View More</a>
        </div>
      </div>
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getOurMissionContent() {
  return `
  <section>
    <div class="cover-img flex-div col-div white" style="text-align: left; background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/our-mission.webp');">
      <h1 class="heading">Our Mission</h1>
      <p style="margin-top: 30px;">
      Our mission is to make your household shifting experience as smooth and stress-free as possible. We understand that moving can be a daunting task, and our goal is to handle every aspect of your move with care and efficiency. From the moment you search for "household shifting services near me" and contact us to the final delivery at your new location, we strive to exceed your expectations with our commitment to excellence. We achieve this through:</p><br /><br />
      <ul class="sub-menus-ul" style="align-self: flex-start;">
        <li>Expertly trained movers who handle your belongings with utmost care.</li>
        <li>Timely and reliable service ensuring your move stays on schedule.</li>
        <li>Years of experience in handling moves of all sizes and complexities.</li>
        <li>A customer-first approach, ensuring your satisfaction from start to finish.</li>
        <li>Transparent communication and pricing, ensuring no surprises along the way.</li>
      </ul>
      <p style="margin-top: 20px; align-self: flex-start;">Choose Day Night Packers And Movers for a hassle-free moving experience that you can trust.</p>
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getOurTeamContent() {
  return `
  <section>
    <div class="cover-img flex-div col-div white" style="align-items: flex-start; background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/our-team.webp');">      
      <h1 style="align-self: center; margin-bottom: 30px;" class="heading">Our Team</h1>
      <ul  class="sub-menus-ul" style="line-height: 2.0em;">
        <li><b>Highly Motivated Companions:</b> Day Night Packers and Movers are dedicated to ensuring your relocation is stress-free.</li>
        <li><b>Expertise and Experience:</b> With years of experience in the moving industry, we provide top-notch service and support.</li>
        
        <li><b>Local and Long-Distance Moving:</b> Whether you're moving across town or across the country, we've got you covered.</li>
        
        <li><b>24/7 Support:</b> We're available round the clock to assist you with your relocation needs.</li>
        
        <li><b>Transparent Pricing:</b> No hidden fees, just clear and upfront quotes.</li>
      </ul>
      <p style="margin-top: 30px;">Let's move forward with Day Night Packers and Movers. <b><a class="white" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html">Contact us today!</a></b></p>
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getOurServiceContent() {
  return `
  <section>
    <div class="cover-img flex-div col-div white" style="text-align: left; background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/our-services.webp');">
      <h1 class="heading">Our Service</h1>
      <p style="align-self: flex-start; margin-bottom: 20px; margin-top: 30px;">At Day Night Packers And Movers, we offer a comprehensive range of moving services to cater to your specific needs:
      </p><br />
      <p><b>Residential Moving:</b> Whether you're moving across the street or across the country, our professional movers ensure your belongings are transported safely and securely.<br /><br />

      <b>Packing Services:</b> Our expert packers use high-quality materials and techniques to protect your items during transit.<br /><br />

      <b>Storage Solutions:</b> Our secure storage facilities provide short-term and long-term solutions for your belongings.<br /><br />

      <b>Long-Distance Moving:</b> Our experienced movers handle all the logistics of long-distance moves, ensuring your possessions arrive on time and in perfect condition.<br /><br />

    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getWhyChooseUsContent() {
  return `
  <section>
    <div class="cover-img flex-div col-div white" style="text-align: left; background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/why-choose-us.webp');">
      <h1 class="heading">Why Choose Us?</h1>
      <p style="align-self: flex-start; margin-bottom: 5px; margin-top: 30px;">Choosing Day Night Packers And Movers means choosing a team of experienced movers, dedicated to providing exceptional service. Here are a few reasons why our customers trust us with their moves:</p><br /><br />
        
        <p><b>Professionalism:</b> Our movers are trained professionals who handle your belongings with the utmost care and respect.<br /><br />

        <b>Reliability:</b> We pride ourselves on being a reliable moving company that you can count on to show up on time and deliver as promised.<br /><br />

        <b>Experience:</b> With years of experience in the moving industry, we have the knowledge and expertise to handle moves of all sizes and complexities.<br /><br />

        <b>Customer Satisfaction:</b> We go above and beyond to ensure that our clients are happy with our services from start to finish.<br /><br />

        <b>Transparent Pricing:</b> Our competitive and transparent pricing quotes provide a clear understanding of the costs involved.<br />
      </p>  
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getBlogsContent(brand) {
  return `
  <section id="blogs" class="contact border-bottom-class" style="background: #e9e7e7;">
    <div class="iyohgi services-bg-img flex-div col-div" style="background-image: url('assets/packers-and-movers-truck.webp');"></div>
    <div class="iyohgi flex-div col-div" style="gap: 30px;">  
      <h1><u>Blogs</u></h1>
      <div class="flex-div row-div" style="flex-wrap: wrap; gap: 50px;">
        ${blogsData
          .map((blog) => {
            return `
          <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
            <img class="service-cards-img" height="183px" src="assets/${blog.imgName}.webp" alt=${blog.imgAlt} loading="lazy" />
            <div class="container">
              <h3>${blog.title}</h3>
              <p class="service-cards-text">${blog.content}</p>
              <div class="flex-div row-div" style="justify-content: space-between;">
                <p style="margin-top: 15px; color: ${brand};"><b>${blog.date}</b></p>
                <a class="service-btn" href="https://www.daynightpackersmovers.com/${blog.route}.html">View More</a>
              </div>
            </div>
          </div>
          `;
          })
          .join("")}
      </div>
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function collapsibleProcessing() {
  const collapsibles = document.getElementsByClassName("collapsible");
  let i;
  for (i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function () {
      var content = this.nextElementSibling;
      this.classList.toggle("active");
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function getFAQsContent() {
  return `
  <section id="faq" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">FAQs</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/faqs.webp"}></img>
        </div>
        <div class="contact-details" style="text-align: left;">
          <button type="button" class="collapsible">What services do you offer as a moving and packers company?</button>
          <div class="content">
            <p>We offer a wide range of services including residential moving, commercial moving, packing and unpacking, storage solutions, and long-distance moving. Our professional movers are trained to handle all aspects of the moving process to ensure a smooth transition to your new location.</p>
          </div>
          <button type="button" class="collapsible">How much do your moving services cost?</button>
          <div class="content">
            <p>The cost of our moving services depends on various factors such as the distance of the move, the size of your belongings, and the level of packing services required. For an accurate estimate, please contact us for a free moving quote.</p>
          </div>
          <button type="button" class="collapsible">How do you ensure the safety of my belongings during the move?</button>
          <div class="content">
            <p>We prioritize the safety of your belongings by using high-quality packing materials, secure packing techniques, and experienced movers. Our team is trained to handle fragile and valuable items with care. Additionally, we offer moving insurance options for added peace of mind.</p>
          </div>
          <button type="button" class="collapsible">Do you provide packing materials?</button>
          <div class="content">
            <p>Yes, we provide a variety of packing materials including boxes, bubble wrap, packing paper, and tape. Our packing supplies are designed to protect your items during transit. You can purchase these materials separately or as part of our packing services.</p>
          </div>
          <button type="button" class="collapsible">How far in advance should I schedule my move?</button>
          <div class="content">
            <p>We recommend scheduling your move at least 4-6 weeks in advance, especially during peak moving seasons. This allows us to accommodate your preferred moving date and provide the best possible service.</p>
          </div>
          <button type="button" class="collapsible">Can you handle long-distance moves?</button>
          <div class="content">
            <p>Yes, we specialize in both local and long-distance moving services. Our team is equipped to manage all the logistics of long-distance relocations, ensuring your belongings arrive safely and on time.</p>
          </div>
          <button type="button" class="collapsible">What should I do to prepare for my move?</button>
          <div class="content">
            <p>To prepare for your move, start by decluttering and organizing your belongings. Create an inventory list and label your boxes. We also recommend setting aside important documents and personal items to keep with you during the move. Our team can provide a detailed moving checklist to help you get started.</p>
          </div>
          <button type="button" class="collapsible">Do you offer storage solutions?</button>
          <div class="content">
            <p>Yes, we offer secure storage solutions for both short-term and long-term needs. Our storage facilities are climate-controlled and monitored 24/7 to ensure the safety of your belongings. Contact us to learn more about our storage options.</p>
          </div>
          <button type="button" class="collapsible">Are there any items you cannot move?</button>
          <div class="content">
            <p>For safety reasons, we cannot move hazardous materials such as flammable liquids, explosives, and certain chemicals. Additionally, we recommend transporting valuables such as jewelry, important documents, and personal mementos yourself. Please contact us for a complete list of restricted items.</p>
          </div>
          <button type="button" class="collapsible">How can I get a moving quote?</button>
          <div class="content">
            <p>You can get a moving quote by filling out our online form, calling our office, or scheduling an in-home estimate. Provide us with details about your move, including the size of your home, the distance, and any special requirements. We will provide a free, no-obligation quote based on your specific needs.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  ${getChargesTableContent()}
  ${getProcessCardsContent()}
  ${getOurPresenceContent()}
  `;
}

function getInquiryFormContent() {
  return `
  <div id="form-detail" class="contact border-bottom-class">
    <div class="iyohgi" class="flex-div col-div" style="align-items: unset;">
      <div id="get-a-quote"><p class="i78bq-2-3 contact-details" style="font-size: 20px; text-align: center; border-bottom: 70px;">Relocate with ease! Our professional packers and movers ensure a seamless transition for your home or office. From meticulous packing to safe transportation, trust us for a stress-free move. <b style="font-size: 24px;">Get a quote today!</b></p></div>
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
              "en-GB",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            ).format(new Date())} style="display: none;"></input>
            <button id="submit-btn" type="submit">Submit</button>
          </form>
        </div>
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/delivery-truck.webp"></img>
        </div>
      </div>  
    </div>
  </div>
  `;
}

function getServicesContent() {
  return `
<div id="our-services" class="contact border-bottom-class" style="background: #e9e7e7;">
  <div class="iyohgi" style="text-align: center;">
    ${
      cityOrLinkName === "day-night-packers-movers-services"
        ? `<h1 class="i78bq-2-3 contact-details">Services</h1>`
        : `<div class="flex-div row-div"><h2 class="i78bq-2-3 contact-details">Available Services At </h2><h2 class="i78bq-2-3" style="color: black;">Day</h2> <h2 class="i78bq-2-3" style="color: ${brand};">Night</h2> <h2 class="i78bq-2-3 contact-details">Packers And Movers</h2></div>`
    }
    <div id="our-services-content">
      <div class="flex-div row-div" style="flex-wrap: wrap; justify-content: space-around; gap: 20px;">
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/packers-movers-service.webp" alt="packers and movers" loading="lazy" />
          <div class="container">
            <h3>Packers And Movers</h3>
            <p class="service-cards-text">Professional packing, transport, and unpacking for hassle-free relocations.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/packers-movers-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/car-carrier-truck.webp" alt="car carrier truck" loading="lazy" />
          <div class="container">
            <h3>Car And Bike Carrier</h3>
            <p class="service-cards-text">Safe, reliable vehicle transport with professional handling and care.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/car-bike-carrier-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/shipping.webp" alt="shipping" loading="lazy" />
          <div class="container">
            <h3>Shipping Service</h3>
            <p class="service-cards-text">We provide reliable transportation of goods, ensuring timely and secure delivery.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/shipping-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/air-freight-forwarding-service.webp" alt="plane" loading="lazy" height="185px" />
          <div class="container">
            <h3>Air Freight Forwarding</h3>
            <p class="service-cards-text">Fast, reliable air freight for secure, global delivery with optimized efficiency.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/air-freight-forwarding-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/sea-freight-forwarding-service.webp" alt="sea-ship-with-containers" loading="lazy" />
          <div class="container">
            <h3>Sea Freight Forwarding</h3>
            <p class="service-cards-text">Cost-effective, reliable international shipping of large goods via ocean transport.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/sea-freight-forwarding-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/home-shifting-service.webp" alt="home shifting" loading="lazy" />
          <div class="container">
            <h3>Home Shifting Services</h3>
            <p class="service-cards-text">Home Shifting Services: packing, transporting, unpacking for a hassle-free move.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/home-shifting-service.html">View More</a></div>
          </div>
        </div>
        <div class="card service-card flex-div col-div" style="justify-content: flex-start;">
          <img class="service-cards-img" src="assets/warehouse-service.webp" alt="warehouse" loading="lazy" />
          <div class="container">
            <h3>Warehousing Service</h3>
            <p class="service-cards-text">Secure storage solutions: safety, inventory management, and efficient distribution.</p>
            <div style="text-align: end;"><a class="service-btn" href="https://www.daynightpackersmovers.com/warehousing-service.html">View More</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
${
  cityOrLinkName === "day-night-packers-movers-services"
    ? `${getChargesTableContent()} ${getProcessCardsContent()} ${getOurPresenceContent()}`
    : ``
}

  `;
}

function getChargesTableContent() {
  return `
  <div id="charges-table" class="contact border-bottom-class" style="background: white;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="i78bq-2-3 contact-details">Movers And Packers Charges</h2>
      <div id="table-parent">
        <table style="border-color: #878181; font-size: 12px;">
          <thead class="white" style="background: #262626;">
            <tr>
              <td style="border-top-left-radius: 5px;"><b>Shifting Type</b></td>
              <td><b>Upto 50 Kms</b></td>
              <td><b>Upto 500 Kms</b></td>
              <td><b>Upto 1000 Kms</b></td>
              <td><b>Upto 1500 Kms</b></td>
              <td style="border-top-right-radius: 5px;"><b>Upto 2500 Kms</b></td>
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
            <tr style="background: #ffede8;">
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
            <tr style="background: #ffede8;">
              <td>4 BHK / Villa</td>
              <td>Rs 25,000 to 30,000</td>
              <td>Rs 35,000 to 40,000</td>
              <td>Rs 50,000 to 60,000</td>
              <td>Rs 55,000 to 65,000</td>
              <td>Rs 70,000 to 90,000</td>
            </tr>
            <tr style="background: white;">
              <td>Car Transportation</td>
              <td>By Road with service and fuel cost</td>
              <td>Rs 12,000 to 14,500</td>
              <td>Rs 17,000 to 20,000</td>
              <td>Rs 21,000 to 25,000</td>
              <td>-</td>
            </tr>
            <tr style="background: #ffede8;">
              <td>Bike Transportation</td>
              <td>By Road with service and fuel cost</td>
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
  `;
}

function getProcessCardsContent() {
  return `
  <div id="process-steps" class="contact border-bottom-class" style="background: #e9e7e7;">
    <div class="iyohgi" style="text-align: center;">
      <div class="flex-div row-div"><h2 class="i78bq-2-3 contact-details">How To Book Services At</h2> <h2 style="color: black;" class="i78bq-2-3">Day</h2> <h2 style="color: ${brand};" class="i78bq-2-3">Night</h2> <h2 class="i78bq-2-3 contact-details">Packers And Movers?</h2></div>
      <div id="process-steps-content">
        <div style="text-align: left; display: flex; flex-direction: column; gap: 40px; padding: 0px 150px 0px 150px;" class="process-card-parent">
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">01 </b> Get in touch for a seamless moving experience! 📦✨ <br /> Share your requirements</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">02 </b> Let's get started with a free survey and quotation! <br />Get the best price with us</div>
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">03 </b> Ready to make your move? <a href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Book with us today</b></a> and be a part of smooth transition!</div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function getOurPresenceContent() {
  const locations1 = [
    "agra",
    "ahmedabad",
    "allahabad",
    "ambala",
    "ankleshwar",
    "aurangabad",
    "bangalore",
    "bathinda",
    "belapur Mumbai",
    "bhiwandi",
    "bhopal",
    "bhuvneshwar",
    "bhuj",
    "bikaner",
    "calicut",
    "chandigarh",
    "chennai",
    "cochin",
    "coimbatore",
    "cuttack",
  ];
  const locations2 = [
    "dehradun",
    "delhi",
    "dwarka",
    "dwarka-delhi",
    "faridabad",
    "gandhidham",
    "ghaziabad",
    "goa",
    "gurgaon",
    "guwahati",
    "gwalior",
    "haridwar",
    "hisar",
    "hubli",
    "hyderabad",
    "indore",
    "jabalpur",
    "jaipur",
    "jammu",
    "jamnagar",
  ];
  const locations3 = [
    "jamshedpur",
    "jodhpur",
    "kalighat",
    "kanpur",
    "kolhapur",
    "kolkata",
    "korba",
    "kottayam",
    "ludhiana",
    "lucknow",
    "madipakkam",
    "madurai",
    "manesar",
    "mangalore",
    "meerut",
    "mumbai",
    "mysore",
    "nasik",
    "nagpur",
    "neemrana",
  ];
  const locations4 = [
    "noida",
    "pallnerghata-road",
    "panipat",
    "patalganga",
    "patna",
    "pondicherry",
    "porur",
    "portblair",
    "pune",
    "raigarh",
    "raipur",
    "rajkot",
    "ranchi",
    "rudrapur",
    "rourkela",
    "sarjapur-road",
    "secunderabad",
    "siliguri",
    "surat",
    "thoraipakkam",
  ];
  const locations5 = [
    "tirupur",
    "trichy",
    "trivandrum",
    "udaipur",
    "vadodra",
    "varanasi",
    "vapi",
    "vijayawada",
    "vizag",
    "whitefield",
  ];
  return `
  <div id="services" class="services border-bottom-class iyohgi">
    <div id="iymxg" class="service-info" style="text-align: center;">
      <div class="flex-div row-div">
        <h2 class="i78bq contact-details" data-custom-content="services">
          Presence of </h2> <h2 style="color: black;" class="i78bq">Day</h2> <h2 style="color: ${brand};" class="i78bq">Night</h2> <h2 class="i78bq contact-details"> Packers And Movers
        </h2></div>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <div class="fill-form-img-div" style="align-self: center;">
        <img alt="" loading="lazy" width="500px" height="auto" src="assets/around-world.webp"></img>
      </div>
      <div id="i12z9" class="services-box">
        <div id="ilmjk" class="service-cont">
          <ul id="ipekj" class="service-desc">
            ${locations1
              .map((loc) => {
                return `<li id="packers-movers-in-${loc}"><a class="contact-details" href="https://www.daynightpackersmovers.com/packers-movers-in-${loc}.html">Packers and
                  Movers in ${extractLocation(loc, 0)}</a></li>`;
              })
              .join("")}
          </ul>
        </div>
        <div id="ilmjk-2" class="service-cont">
          <ul id="ipekj-2" class="service-desc">
            ${locations2
              .map((loc) => {
                return `<li id="packers-movers-in-${loc}"><a class="contact-details" href="https://www.daynightpackersmovers.com/packers-movers-in-${loc}.html">Packers and Movers in ${extractLocation(
                  loc,
                  0
                )}</a></li>`;
              })
              .join("")}
          </ul>
        </div>
        <div id="ilmjk-3" class="service-cont">
          <ul id="ipekj-3" class="service-desc">
          ${locations3
            .map((loc) => {
              return `<li id="packers-movers-in-${loc}"><a class="contact-details" href="https://www.daynightpackersmovers.com/packers-movers-in-${loc}.html">Packers and
                Movers in ${extractLocation(loc, 0)}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations4
            .map((loc) => {
              return `<li id="packers-movers-in-${loc}"><a class="contact-details" href="https://www.daynightpackersmovers.com/packers-movers-in-${loc}.html">Packers and
                Movers in ${extractLocation(loc, 0)}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations5
            .map((loc) => {
              return `<li id="packers-movers-in-${loc}"><a class="contact-details" href="https://www.daynightpackersmovers.com/packers-movers-in-${loc}.html">Packers and
                Movers in ${extractLocation(loc, 0)}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
}

function getPackersMoversServiceContent() {
  return (
    `
  <div id="packers-movers-service-content" class="contact border-bottom-class" style="background: #f5f5f5;">  
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/packers-movers-service.webp');">
      <p class="x3-p">Packers and Movers Services</p>
      <h1 class="services-h1">Professional packing, transport, and unpacking for hassle-free relocations.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Packers and Movers services involve professional companies that help individuals and businesses relocate their goods from one place to another. These services typically include packing, loading, transporting, unloading, and unpacking items, ensuring that the belongings are moved safely and efficiently. Here’s a breakdown of what you can expect from Packers and Movers services:</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>1. Packing Services</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Packing Materials:</b></span> We provide high-quality packing materials like boxes, bubble wrap, packing paper, and tape.</li>          
          <li><span><b>Expert Packing:</b></span> Professional packers are trained to pack items securely to minimize damage during transit. We use appropriate techniques for different types of items, such as fragile goods, electronics, and furniture.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>2. Loading and Unloading</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Loading Equipment:</b></span> We use equipment like dollies, ramps, and straps to safely load and unload items.</li>
          <li><span><b>Skilled Labour:</b></span> Skilled laborers handle heavy lifting, ensuring that items are moved without damage.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>3. Transportation</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Transport Vehicles:</b></span> We have a fleet of vehicles suitable for different types and volumes of goods.</li>
          <li><span><b>Tracking Services:</b></span> Day Night Packers And Movers companies offer tracking services so you can monitor the location of your belongings during transit.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>4. Unpacking and Reassembly</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Unpacking Services:</b></span> We help unpack the items at the destination, reducing the stress of setting up your new home or office.</li>
          <li><span><b>Furniture Reassembly:</b></span> We can also reassemble furniture and other items as needed.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>5. Insurance</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Insurance Coverage:</b></span> Day Night Packers and Movers provide insurance options to cover any potential damage or loss during the move.</li>
          <li><span><b>Insurance Claims:</b></span> We assist in the claims process if any items are damaged or lost.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>6. Special Services</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Storage Solutions:</b></span> Some companies offer temporary storage solutions if there is a gap between moving out and moving in.</li>
          <li><span><b>Pet and Vehicle Relocation:</b></span> Specialized services for transporting pets and vehicles.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>7. Domestic and International Moves</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Local Movers:</b></span> Day Night Packers and Movers provide insurance options to cover any potential damage or loss during the move.</li>
          <li><span><b>Long-Distance Movers:</b></span> We assist in the claims process if any items are damaged or lost.</li>
          <li><span><b>International Movers:</b></span> Handling customs, international shipping, and delivery.
          Choosing the Best Packers and Movers</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function getCarBikeCarrierServiceContent() {
  return (
    `
  <div id="car-bike-carrier-service-content" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/car-carrier-truck.webp');">
      <p class="x3-p">Car And Bike Carrier</p>
      <h1 class="services-h1">Safe, reliable vehicle transport with professional handling and care.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Car and Bike Carrier services involve the safe and efficient transportation of vehicles from one location to another. These services are provided by specialized companies that handle all aspects of vehicle relocation, ensuring that cars and bikes reach their destination in the same condition as they were picked up. Here’s a comprehensive guide to what Car and Bike Carrier services entail:</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>1. Types of Vehicle Transportation</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Open Carrier Transport:</b></span> Vehicles are transported on an open trailer, which is cost-effective but exposes vehicles to weather and road conditions.</li>          
          <li><span><b>Enclosed Carrier Transport:</b></span> Vehicles are transported in an enclosed trailer, offering protection from the elements and road debris, ideal for luxury or vintage cars and bikes.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>2. Pickup and Delivery Services</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Door-to-Door Service:</b></span> The vehicle is picked up from your current location and delivered directly to your new address.</li>
          <li><span><b>Terminal-to-Terminal Service:</b></span> The vehicle is dropped off and picked up at designated terminals, which can be more affordable but less convenient.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>3. Vehicle Inspection and Documentation</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Pre-Transport Inspection:</b></span> A detailed inspection of the vehicle is conducted before transportation to document its current condition.</li>
          <li><span><b>Bill of Lading:</b></span> A legal document that outlines the details of the transport service, including the vehicle's condition, pickup, and delivery details.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>4. Insurance Coverage</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Basic Insurance:</b></span> Most carriers include basic insurance coverage in their services, protecting against damage during transit.</li>
          <li><span><b>Additional Insurance:</b></span> Optional insurance for higher coverage limits or to cover specific types of damage.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>5. Specialized Handling</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Luxury and Vintage Vehicles:</b></span> Customized handling procedures for high-value cars and bikes to prevent damage.</li>
          <li><span><b>Non-Operational Vehicles:</b></span> Services available for transporting vehicles that are not in running condition.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>6. Tracking and Customer Support</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Customer Support:</b></span> Dedicated support teams to answer questions and provide updates throughout the transport process.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function getShippingServiceContent() {
  return (
    `
  <div id="shipping-service-content" class="contact border-bottom-class" style="background: #a8c4e9;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/shipping.webp');">
      <p class="x3-p">Shipping Service</p>
      <h1 class="services-h1">We provide reliable transportation of goods, ensuring timely and secure delivery.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Shipping services involve the transportation of goods from one location to another, whether domestically or internationally. These services are essential for individuals, businesses, and industries that require the efficient and reliable movement of items. Here's an overview of what shipping services entail:</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>1. Types of Shipping Services</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Domestic Shipping:</b></span> Transporting goods within the same country. This can be done via road, rail, or domestic air freight.</li>          
          <li><span><b>International Shipping:</b></span> Transporting goods across international borders, typically involving sea or air freight.</li>          
          <li><span><b>Express Shipping:</b></span> Fast shipping options for urgent deliveries, often through air freight.</li>          
          <li><span><b>Economy Shipping:</b></span> Cost-effective shipping options with longer delivery times, usually via ground or sea.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>2. Modes of Transport</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Air Freight:</b></span> Fast and reliable, ideal for high-value or time-sensitive shipments.</li>
          <li><span><b>Sea Freight:</b></span> Cost-effective for large or heavy shipments, though slower than air freight.</li>
          <li><span><b>Road Transport:</b></span> Flexible and suitable for short to medium distances, within or across borders.</li>
          <li><span><b>Rail Transport:</b></span> Efficient for large volumes of goods over long distances within a continent.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>3. Shipping Services and Features</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Door-to-Door Service:</b></span> Goods are picked up from the sender’s location and delivered directly to the recipient.</li>
          <li><span><b>Port-to-Port Service:</b></span> Goods are transported from one port to another, requiring additional arrangements for pickup and delivery.</li>
          <li><span><b>Customs Clearance:</b></span> Handling of all customs formalities for international shipments.</li>
          <li><span><b>Tracking and Monitoring:</b></span> Real-time tracking of shipments to monitor their location and status.</li>
          <li><span><b>Insurance</b></span> Coverage options to protect against loss or damage during transit.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>4. Packaging and Handling</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Professional Packaging:</b></span> Ensuring goods are packed securely to prevent damage during transit.</li>
          <li><span><b>Special Handling:</b></span> Customized packaging and handling for fragile, hazardous, or high-value items.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>5. Documentation and Compliance</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Shipping Documents:</b></span> Preparation of necessary documents such as bills of lading, commercial invoices, and packing lists.</li>
          <li><span><b>Regulatory Compliance:</b></span> Ensuring shipments comply with international shipping regulations and standards.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function getAirFreightServiceContent() {
  return (
    `
  <div id="air-freight-service-content" class="contact border-bottom-class white" style="background: #032d3a;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/air-freight-forwarding-service.webp');">
      <p class="x3-p">Air Freight Forwarding</p>
      <h1 class="services-h1">Fast, reliable air freight for secure, global delivery with optimized efficiency.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="" style="text-align: left;">
          <p>Air freight forwarding is a service provided by logistics companies that involves the shipment of goods via air transport. This method is chosen for its speed and efficiency, especially for long-distance shipments or when goods need to be delivered urgently.
          </p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>How Does Air Freight Forwarding Work?</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Pickup and Packaging:</b></span> The process begins with the pickup of goods from the sender's location. The items are then securely packaged to ensure they withstand the rigors of air transport.</li>          
          <li><span><b>Documentation and Customs Clearance:</b></span> Proper documentation is prepared, including air waybills, invoices, and any necessary customs forms. Customs clearance is a crucial step, ensuring that goods comply with international regulations and tariffs.</li>          
          <li><span><b>Transport to Airport:</b></span> The packaged goods are transported to the departure airport, where they are loaded onto a cargo plane.</li>          
          <li><span><b>Air Transport:</b></span> The cargo is flown to the destination airport. The speed of air freight makes it an ideal choice for time-sensitive shipments.</li>          
          <li><span><b>Customs Clearance at Destination:</b></span> Upon arrival, the goods undergo customs clearance at the destination country.</li>          
          <li><span><b>Final Delivery:</b></span> The goods are then transported from the airport to the final destination, completing the delivery process.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Benefits of Air Freight Forwarding</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Speed:</b></span> Air freight is the fastest shipping method, significantly reducing transit times compared to sea or land transport.</li>
          <li><span><b>Reliability:</b></span> Air freight schedules are highly reliable, with minimal delays.</li>
          <li><span><b>Global Reach:</b></span> Airlines can reach nearly any destination worldwide, making air freight an excellent choice for international shipping.</li>
          <li><span><b>Security:</b></span> Airports have stringent security measures, reducing the risk of theft or damage.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Air Freight Forwarding Services</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Express Air Freight:</b></span> For urgent shipments that require the fastest possible delivery times.</li>
          <li><span><b>Standard Air Freight:</b></span> A balance between speed and cost, suitable for most commercial shipments.</li>
          <li><span><b>Charter Services:</b></span> Customized solutions for oversized, urgent, or specialized cargo.</li>
          <li><span><b>Door-to-Door Services:</b></span> Comprehensive service from the sender’s location to the recipient’s doorstep, handling all logistics and documentation.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Trends and Challenges in Air Freight Forwarding</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>E-commerce Growth:</b></span> The rise of online shopping has significantly increased the demand for air freight services, particularly for fast delivery of consumer goods.</li>
          <li><span><b>Sustainability:</b></span> There is growing pressure to reduce the carbon footprint of air transport. Innovations in fuel efficiency and sustainable practices are becoming more important.</li>
          <li><span><b>Capacity Constraints:</b></span> Limited cargo space on passenger flights and high demand can lead to capacity challenges, affecting prices and availability.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function getSeaFreightServiceContent() {
  return (
    `
  <div id="sea-freight-service-content" class="contact border-bottom-class" style="background: #0addb9;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/sea-freight-forwarding-service.webp');">
      <p  class="x3-p">Sea Freight Forwarding</p>
      <h1 class="services-h1">Cost-effective, reliable international shipping of large goods via ocean transport.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Sea freight forwarding is the process of organizing shipments of goods from one place to another by sea. It involves a range of activities such as booking cargo space on vessels, preparing and submitting documentation, arranging inland transportation, customs clearance, and cargo insurance.</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Types of Cargo:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Full Container Load (FCL):</b></span> Optimal for large shipments, offering exclusive container use.</li>          
          <li><span><b>Less than Container Load (LCL):</b></span> Ideal for smaller shipments, sharing container space.</li>          
          <li><span><b>Bulk Cargo:</b></span> Suited for loose goods, such as grains or minerals.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Documentation:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Bill of Lading (BOL):</b></span> Essential document for sea freight shipping.</li>
          <li><span><b>Packing List:</b></span> Detailed inventory of shipped goods.</li>
          <li><span><b>Commercial Invoice:</b></span> Key document for customs clearance.</li>
          <li><span><b>Certificate of Origin:</b></span> Verifies the country of manufacture.</li>
          <li><span><b>Customs Documentation:</b></span> Ensures compliance with import regulations.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Customs Clearance:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Customs Brokerage Services:</b></span> Professional handling of import/export procedures.</li>
          <li><span><b>Customs Compliance:</b></span> Ensuring adherence to international trade laws.</li>
          <li><span><b>Tariff Classification:</b></span> Accurate categorization of goods for duty calculation.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Logistics Coordination:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Shipping Lines Coordination:</b></span> Partnering with major shipping lines for efficient transit.</li>
          <li><span><b>Port Operations:</b></span> Managing cargo handling at ports.</li>
          <li><span><b>Intermodal Transportation:</b></span> Combining sea, rail, and truck transport for seamless delivery.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Insurance:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Cargo Insurance:</b></span> Protecting goods against potential transit risks.</li>
          <li><span><b>Marine Insurance:</b></span> Coverage for sea freight shipments.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Tracking and Visibility:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Real-Time Shipment Tracking:</b></span> Monitoring cargo status throughout transit.</li>
          <li><span><b>Supply Chain Visibility:</b></span> Enhancing transparency in the logistics process.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Cost Management:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Shipping Rate Negotiation:</b></span> Securing competitive sea freight rates.</li>
          <li><span><b>Freight Cost Optimization:</b></span> Reducing overall transportation expenses.</li>
          <li><span><b>Value-Added Services:</b></span> Offering additional services to enhance shipment efficiency.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

// function getInternationalRelocationServiceContent() {
//   return `
//   <div id="international-relocation-service-content" class="contact border-bottom-class" style="background: #05b574;">
//     <div class="iyohgi" style="text-align: center;">
//       <h1 class="i78bq-2-3 contact-details">Shipping Services</h1>
//       <div id="city-section-content">
//         <div class="fill-form-img-div" style="align-self: center;">
//           <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/international-relocation.webp"}></img>
//         </div>
//         <div class="contact-details" style="text-align: left;">
//           <p>Shipping services involve the transportation of goods from one location to another, whether domestically or internationally. These services are essential for individuals, businesses, and industries that require the efficient and reliable movement of items. Here's an overview of what shipping services entail:</p><br />
//           <p style="margin-bottom: 5px; font-size: 22px;">
//             <b>1. Types of Shipping Services</b><br />
//           </p>
//           <ul style="line-height: 2.0em; padding-left: 25px;">
//           <li><span><b>Domestic Shipping:</b></span> Transporting goods within the same country. This can be done via road, rail, or domestic air freight.</li>
//           <li><span><b>International Shipping:</b></span> Transporting goods across international borders, typically involving sea or air freight.</li>
//           <li><span><b>Express Shipping:</b></span> Fast shipping options for urgent deliveries, often through air freight.</li>
//           <li><span><b>Economy Shipping:</b></span> Cost-effective shipping options with longer delivery times, usually via ground or sea.</li>
//           </ul><br />
//           <p style="margin-bottom: 5px; font-size: 22px;">
//             <b>2. Modes of Transport</b><br />
//           </p>
//           <ul style="line-height: 2.0em; padding-left: 25px;">
//           <li><span><b>Air Freight:</b></span> Fast and reliable, ideal for high-value or time-sensitive shipments.</li>
//           <li><span><b>Sea Freight:</b></span> Cost-effective for large or heavy shipments, though slower than air freight.</li>
//           <li><span><b>Road Transport:</b></span> Flexible and suitable for short to medium distances, within or across borders.</li>
//           <li><span><b>Rail Transport:</b></span> Efficient for large volumes of goods over long distances within a continent.</li>
//           </ul><br />
//           <p style="margin-bottom: 5px; font-size: 22px;">
//             <b>3. Shipping Services and Features</b><br />
//           </p>
//           <ul style="line-height: 2.0em; padding-left: 25px;">
//           <li><span><b>Door-to-Door Service:</b></span> Goods are picked up from the sender’s location and delivered directly to the recipient.</li>
//           <li><span><b>Port-to-Port Service:</b></span> Goods are transported from one port to another, requiring additional arrangements for pickup and delivery.</li>
//           <li><span><b>Customs Clearance:</b></span> Handling of all customs formalities for international shipments.</li>
//           <li><span><b>Tracking and Monitoring:</b></span> Real-time tracking of shipments to monitor their location and status.</li>
//           <li><span><b>Insurance</b></span> Coverage options to protect against loss or damage during transit.</li>
//           </ul><br />
//           <p style="margin-bottom: 5px; font-size: 22px;">
//             <b>4. Packaging and Handling</b><br />
//           </p>
//           <ul style="line-height: 2.0em; padding-left: 25px;">
//           <li><span><b>Professional Packaging:</b></span> Ensuring goods are packed securely to prevent damage during transit.</li>
//           <li><span><b>Special Handling:</b></span> Customized packaging and handling for fragile, hazardous, or high-value items.</li>
//           </ul><br />
//           <p style="margin-bottom: 5px; font-size: 22px;">
//             <b>5. Documentation and Compliance</b><br />
//           </p>
//           <ul style="line-height: 2.0em; padding-left: 25px;">
//           <li><span><b>Shipping Documents:</b></span> Preparation of necessary documents such as bills of lading, commercial invoices, and packing lists.</li>
//           <li><span><b>Regulatory Compliance:</b></span> Ensuring shipments comply with international shipping regulations and standards.</li>
//           </ul><br />
//         </div>
//       </div>
//     </div>
//   </div>
//   `
//   +getInquiryFormContent();
// }

function getHomeShiftingServiceContent() {
  return (
    `
  <div id="home-shifting-service-content" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/home-shifting-service.webp');">
      <p  class="x3-p">Home Shifting Services</p>
      <h1 class="services-h1">Home Shifting Services: packing, transporting, unpacking for a hassle-free move.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Home shifting services, also known as residential moving services, help individuals and families relocate their household belongings from one place to another. These services include various aspects of the moving process to ensure a smooth and stress-free transition.</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Pre-Move Planning:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Home Shifting Services:</b></span> Comprehensive solutions for residential moves.</li>          
          <li><span><b>Moving Consultation:</b></span> Expert advice and planning for an efficient move.</li>          
          <li><span><b>Moving Checklist:</b></span> Step-by-step guide to prepare for a home shift.</li>          
          <li><span><b>Home Moving Cost Estimate:</b></span> Detailed budgeting for relocation expenses.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Packing Services:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Professional Packing Services:</b></span> Ensuring safe and secure packing of household items.</li>
          <li><span><b>Packing Supplies for Moving:</b></span> High-quality materials for protecting belongings.</li>
          <li><span><b>Custom Packing Solutions:</b></span> Specialized packing for fragile and valuable items.</li>
          <li><span><b>Labeling and Inventory Management:</b></span> Organized tracking of packed items.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Transportation:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Local and Long-Distance Moving:</b></span> Services for both nearby and faraway relocations.</li>
          <li><span><b>Safe and Secure Transport:</b></span> Ensuring belongings are transported safely.</li>
          <li><span><b>Door-to-Door Moving Services:</b></span> Comprehensive service from origin to destination.</li>
          <li><span><b>Moving Truck Rental:</b></span> Options for renting trucks for DIY moves.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Loading and Unloading:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Professional Loading Services:</b></span> Expert handling of heavy and bulky items.</li>
          <li><span><b>Safe Unloading Services:</b></span> Careful placement of belongings in the new home.</li>
          <li><span><b>Furniture Disassembly and Reassembly:</b></span> Ensuring large items are moved efficiently.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Storage Solutions:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Short-Term Storage Options:</b></span> Temporary storage for belongings during the move.</li>
          <li><span><b>Long-Term Storage Services:</b></span> Secure storage for extended periods.</li>
          <li><span><b>Climate-Controlled Storage:</b></span> Protecting sensitive items from environmental damage.</li>
          <li><span><b>Secure Storage Facilities:</b></span> Safe keeping of belongings during transit.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Specialized Moving Services:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Pet Relocation:</b></span> Safe transportation of pets.</li>
          <li><span><b>Vehicle Shipping:</b></span> Transporting cars and motorcycles.</li>
          <li><span><b>Fragile Item Handling:</b></span> Specialized care for delicate items like antiques and artwork.</li>
          <li><span><b>Heavy Item Moving:</b></span> Expert handling of pianos, pool tables, and other heavy items.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Insurance:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Moving Insurance:</b></span> Protecting belongings against potential damage or loss.</li>
          <li><span><b>Comprehensive Moving Coverage:</b></span> Offering peace of mind during the move.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Unpacking and Setup:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Professional Unpacking Services:</b></span> Efficiently unpacking belongings in the new home.</li>
          <li><span><b>Home Setup Assistance:</b></span> Helping arrange furniture and organize items.</li>
          <li><span><b>Debris Removal:</b></span> Clearing packing materials and waste post-move.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Additional Services:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Cleaning Services:</b></span> Pre-move and post-move cleaning of homes.</li>
          <li><span><b>Utility Setup:</b></span> Assisting with the setup of utilities like electricity, water, and internet.</li>
          <li><span><b>Change of Address Assistance:</b></span> Helping update addresses with relevant authorities.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Customer Support:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>24/7 Customer Support:</b></span> Assistance throughout the moving process.</li>
          <li><span><b>Personal Move Coordinator:</b></span> Dedicated support for personalized moving needs.</li>
          <li><span><b>Tracking and Updates:</b></span> Real-time tracking of the moving progress.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function getWarehousingServiceContent() {
  return (
    `
  <div id="warehousing-service-content" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="services-bg-img flex-div col-div white" style="text-align: center;  background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/warehouse-service.webp');">
      <p class="x3-p">Warehousing Service</p>
      <h1 class="services-h1">Secure storage solutions: safety, inventory management, and efficient distribution.</h1>
    </div>
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="contact-details" style="text-align: left;">
          <p>Shipping services involve the transportation of goods from one location to another, whether domestically or internationally. These services are essential for individuals, businesses, and industries that require the efficient and reliable movement of items. Here's an overview of what shipping services entail:</p><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Types of Warehousing:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Public Warehousing:</b></span> Flexible storage options available to multiple clients.</li>          
          <li><span><b>Private Warehousing:</b></span> Dedicated storage facilities owned or leased by a single company.</li>          
          <li><span><b>Bonded Warehousing:</b></span> Storage for goods awaiting customs clearance.</li>          
          <li><span><b>Climate-Controlled Warehousing:</b></span> Specialized storage for temperature-sensitive items.</li>          
          <li><span><b>Distribution Centers:</b></span> Warehouses designed for efficient distribution and logistics.</li>          
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Storage Solutions:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Long-Term Storage:</b></span> Extended storage solutions for goods.</li>
          <li><span><b>Short-Term Storage:</b></span> Temporary storage options for inventory.</li>
          <li><span><b>Bulk Storage:</b></span> Large-scale storage for bulk goods.</li>
          <li><span><b>Rack Storage:</b></span> Organized storage using racking systems for easy access.</li>
          <li><span><b>Pallet Storage:</b></span> Efficient storage using pallets for handling and stacking.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Warehouse Management:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Warehouse Management Systems (WMS):</b></span> Technology for managing warehouse operations.</li>
          <li><span><b>Inventory Management:</b></span> Tracking and managing inventory levels.</li>
          <li><span><b>Order Fulfillment:</b></span> Efficient processing and shipping of customer orders.</li>
          <li><span><b>Cross-Docking:</b></span> Direct transfer of goods from inbound to outbound transportation.</li>
          <li><span><b>Kitting and Assembly:</b></span> Combining individual items into ready-to-ship kits.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Logistics and Distribution:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Logistics Services:</b></span> Comprehensive logistics management for efficient supply chains.</li>
          <li><span><b>Third-Party Logistics (3PL):</b></span> Outsourcing logistics and warehousing to specialized providers.</li>
          <li><span><b>Transportation Services:</b></span> Coordinating transport for inbound and outbound shipments.</li>
          <li><span><b>Last-Mile Delivery:</b></span> Ensuring timely delivery to the end customer.</li>
          <li><span><b>Reverse Logistics:</b></span> Managing returns and exchanges efficiently.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Value-Added Services:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Packaging Services:</b></span> Professional packing and repacking of goods.</li>
          <li><span><b>Labeling and Barcoding:</b></span> Accurate labeling for easy identification and tracking.</li>
          <li><span><b>Quality Control:</b></span> Inspecting goods to ensure they meet quality standards.</li>
          <li><span><b>Custom Solutions:</b></span> Tailored warehousing services to meet specific business needs.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Security and Safety:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>24/7 Security:</b></span> Round-the-clock security measures to protect goods.</li>
          <li><span><b>Fire Safety Systems:</b></span> Advanced fire detection and suppression systems.</li>
          <li><span><b>Access Control:</b></span> Restricted access to authorized personnel only.</li>
          <li><span><b>CCTV Monitoring:</b></span> Surveillance cameras for continuous monitoring.</li>
          <li><span><b>Safety Protocols:</b></span> Ensuring a safe working environment within the warehouse.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Technology Integration:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Automated Warehousing:</b></span> Utilizing robotics and automation for efficient operations.</li>
          <li><span><b>Real-Time Tracking:</b></span> Monitoring goods in real-time for better visibility.</li>
          <li><span><b>Data Analytics:</b></span> Leveraging data to optimize warehousing and logistics.</li>
          <li><span><b>IoT Integration:</b></span> Using Internet of Things for smarter warehouse management.</li>
          <li><span><b>Blockchain for Supply Chain:</b></span> Enhancing transparency and security in the supply chain.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Specialized Storage:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Cold Storage:</b></span> Refrigerated warehousing for perishable goods.</li>
          <li><span><b>Hazardous Materials Storage:</b></span> Safe storage for hazardous and flammable materials.</li>
          <li><span><b>Document Storage:</b></span> Secure storage for important documents and records.</li>
          <li><span><b>E-commerce Fulfillment:</b></span> Warehousing services tailored for online retail.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Customer Support:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>24/7 Customer Support:</b></span> Assistance for warehousing and logistics queries.</li>
          <li><span><b>Dedicated Account Managers:</b></span> Personalized support for individual clients.</li>
          <li><span><b>Service Level Agreements (SLAs):</b></span> Defined service standards for warehousing.</li>
          </ul><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Sustainability:</b><br />
          </p>
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Green Warehousing:</b></span> Eco-friendly practices in warehousing operations.</li>
          <li><span><b>Energy-Efficient Facilities:</b></span> Reducing energy consumption in warehouses.</li>
          <li><span><b>Sustainable Packaging:</b></span> Using environmentally friendly packaging materials.</li>
          </ul><br />
        </div>
      </div>
    </div>
  </div>
  ` + getInquiryFormContent()
  );
}

function setActiveTab() {
  const home = document.getElementsByClassName("home");
  const about = document.getElementsByClassName("about");
  const blogs = document.getElementsByClassName("blogs");
  const faqs = document.getElementsByClassName("faqs");
  const services = document.getElementsByClassName("services");
  const contactUs = document.getElementsByClassName("contact-us");

  const packersMovers = document.getElementById("packers-movers");
  const carBikeCarrier = document.getElementById("car-bike-carrier");
  const shipping = document.getElementById("shipping");
  const airFreight = document.getElementById("air-freight");
  const seaFreight = document.getElementById("sea-freight");
  // const internationalRelocation = document.getElementById(
  //   "international-relocation"
  // );
  const homeShifting = document.getElementById("home-shifting");
  const warehousing = document.getElementById("warehousing");

  const mission = document.getElementById("our-mission");
  const team = document.getElementById("our-team");
  const service = document.getElementById("our-service");
  const whyChooseUs = document.getElementById("why-choose-us");

  const checklist = document.getElementById("ultimate-checklist");
  const packingTips = document.getElementById("packing-tips");
  const whyUs = document.getElementById("why-us");
  const longDistanceMove = document.getElementById("long-distance-moving");

  const menus = [home, about, blogs, faqs, services, contactUs];
  const serviceSubMenus = [
    packersMovers,
    carBikeCarrier,
    shipping,
    airFreight,
    seaFreight,
    // internationalRelocation,
    homeShifting,
    warehousing,
  ];

  const aboutUsSubMenus = [mission, team, service, whyChooseUs];

  const blogsSubMenus = [checklist, packingTips, whyUs, longDistanceMove];

  const serviceRoutes = [
    "packers-movers-service",
    "air-freight-forwarding-service",
    "sea-freight-forwarding-service",
    "car-bike-carrier-service",
    "home-shifting-service",
    // "international-relocation-service",
    "shipping-service",
    "warehousing-service",
  ];

  const aboutUsRoutes = [
    "our-mission",
    "our-team",
    "our-service",
    "why-choose-us",
  ];

  const blogsRoutes = [
    "ultimate-checklist",
    "packing-tips",
    "why-us",
    "long-distance-moving",
  ];

  if (cityOrLinkName === "packers-movers-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    packersMovers.className += " active-dropdown-options";
  } else if (cityOrLinkName === "air-freight-forwarding-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    airFreight.className += " active-dropdown-options";
  } else if (cityOrLinkName === "sea-freight-forwarding-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    seaFreight.className += " active-dropdown-options";
  } else if (cityOrLinkName === "car-bike-carrier-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    carBikeCarrier.className += " active-dropdown-options";
  } else if (cityOrLinkName === "home-shifting-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    homeShifting.className += " active-dropdown-options";
  }
  // else if (cityOrLinkName === "international-relocation-service") {
  //   for (let i = 0; i < serviceSubMenus.length; i++) {
  //     serviceSubMenus[i].className.replace(" active-dropdown-options", "");
  //   }
  //   internationalRelocation.className += " active-dropdown-options";
  // }
  else if (cityOrLinkName === "shipping-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    shipping.className += " active-dropdown-options";
  } else if (cityOrLinkName === "warehousing-service") {
    for (let i = 0; i < serviceSubMenus.length; i++) {
      serviceSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    warehousing.className += " active-dropdown-options";
  }

  if (cityOrLinkName === "our-mission") {
    for (let i = 0; i < aboutUsSubMenus.length; i++) {
      aboutUsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    mission.className += " active-dropdown-options";
  } else if (cityOrLinkName === "our-team") {
    for (let i = 0; i < aboutUsSubMenus.length; i++) {
      aboutUsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    team.className += " active-dropdown-options";
  } else if (cityOrLinkName === "our-service") {
    for (let i = 0; i < aboutUsSubMenus.length; i++) {
      aboutUsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    service.className += " active-dropdown-options";
  } else if (cityOrLinkName === "why-choose-us") {
    for (let i = 0; i < aboutUsSubMenus.length; i++) {
      aboutUsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    whyChooseUs.className += " active-dropdown-options";
  }

  if (cityOrLinkName === "ultimate-checklist") {
    for (let i = 0; i < blogsSubMenus.length; i++) {
      blogsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    checklist.className += " active-dropdown-options";
  } else if (cityOrLinkName === "packing-tips") {
    for (let i = 0; i < blogsSubMenus.length; i++) {
      blogsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    packingTips.className += " active-dropdown-options";
  } else if (cityOrLinkName === "why-us") {
    for (let i = 0; i < blogsSubMenus.length; i++) {
      blogsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    whyUs.className += " active-dropdown-options";
  } else if (cityOrLinkName === "long-distance-moving") {
    for (let i = 0; i < blogsSubMenus.length; i++) {
      blogsSubMenus[i].className.replace(" active-dropdown-options", "");
    }
    longDistanceMove.className += " active-dropdown-options";
  }

  if (cityOrLinkName === "" || cityOrLinkName === "index") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    home[0].className += " active-menu";
    home[1].className += " active-menu";
  } else if (
    aboutUsRoutes.includes(cityOrLinkName) ||
    cityOrLinkName === "about-day-night-packers-movers"
  ) {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    about[0].className += " active-menu";
    about[1].className += " active-menu";
  } else if (
    blogsRoutes.includes(cityOrLinkName) ||
    cityOrLinkName === "self-preparation-before-shifting"
  ) {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    blogs[0].className += " active-menu";
    blogs[1].className += " active-menu";
  } else if (cityOrLinkName === "queries-before-shifting") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    faqs[0].className += " active-menu";
    faqs[1].className += " active-menu";
  } else if (
    serviceRoutes.includes(cityOrLinkName) ||
    cityOrLinkName === "day-night-packers-movers-services"
  ) {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    services[0].className += " active-menu";
    services[1].className += " active-menu";
  } else if (cityOrLinkName === "contact-day-night-packers-movers") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    contactUs[0].className += " active-menu";
    contactUs[1].className += " active-menu";
  }
}

function openNav() {
  document.getElementById("side-panel").style.width = "250px";
}

function closeNav() {
  document.getElementById("side-panel").style.width = "0";
}

function extractLocation(str, startIndex) {
  // Split the string by "-"
  let parts = str.split("-");

  // Initialize an empty array to collect parts of the location name
  let location = [];

  // Iterate over the parts, starting from the third one (index 2)
  for (let i = startIndex; i < parts.length; i++) {
    // Capitalize the first letter of each part and push it to the array
    location.push(parts[i][0].toUpperCase() + parts[i].slice(1));
  }

  // Join the array into a string with spaces in between
  return location.join(" ");
}

function navigate(route) {
  window.location.href = `https://www.daynightpackersmovers.com/${route}.html`;
}

function createHtmlContent() {
  return `
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont" style="background: #fffbf6;">
    
    <div id="ibulz" class="nav-inner">
      <div>
        <button id="logo-btn" aria-label="logo" style="padding: 0px; background: inherit; border: none;" onclick="navigate('index')">
          <img id="logo" alt="" src=${"assets/logo.webp"} width="auto" height="80px"></img>
        </button>
      </div>
      <div id="menus" class="flex-div row-div" style="gap: 30px;">
        <a class="home" href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
        <div class="dropdown">
          <a class="about" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b>About Us</b></a>
          <div class="dropdown-content">
            <a id="our-mission" href="https://www.daynightpackersmovers.com/our-mission.html">Our Mission</a>
            <a id="our-team" href="https://www.daynightpackersmovers.com/our-team.html">Our Team</a>
            <a id="our-service" href="https://www.daynightpackersmovers.com/our-service.html">Our Services</a>
            <a id="why-choose-us" href="https://www.daynightpackersmovers.com/why-choose-us.html">Why Choose Us</a>
          </div>
        </div>
        <a class="blogs" href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html"><b>Blogs</b></a>
        <a class="faqs" href="https://www.daynightpackersmovers.com/queries-before-shifting.html"><b>FAQs</b></a>
        <div class="dropdown">
          <a  class="services" href="https://www.daynightpackersmovers.com/day-night-packers-movers-services.html"><b>Services</b></a>
          <div class="dropdown-content">
            <a id="packers-movers" href="https://www.daynightpackersmovers.com/packers-movers-service.html">Packers And Movers</a>
            <a id="car-bike-carrier" href="https://www.daynightpackersmovers.com/car-bike-carrier-service.html">Car And Bike Carrier</a>
            <a id="shipping" href="https://www.daynightpackersmovers.com/shipping-service.html">Shipping Service</a>
            <a id="air-freight" href="https://www.daynightpackersmovers.com/air-freight-forwarding-service.html">Air Freight Forwarding</a>
            <a id="sea-freight" href="https://www.daynightpackersmovers.com/sea-freight-forwarding-service.html">Sea Freight Forwarding</a>
            <!--<a id="international-relocation" href="https://www.daynightpackersmovers.com/international-relocation-service.html">International Relocation</a>-->
            <a id="home-shifting" href="https://www.daynightpackersmovers.com/home-shifting-service.html">Home Shifting Services</a>
            <a id="warehousing" href="https://www.daynightpackersmovers.com/warehousing-service.html">Warehousing Service</a>
          </div>
        </div>
        <a class="contact-us" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Contact Us</b></a>
      </div>
      <div id="menu-btn">
        <div id="side-panel">
          <button class="closebtn" onclick="closeNav()">×</button>
          <a class="home" href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
          <a class="about" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b>About Us</b></a>
          <a class="blogs" href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html"><b>Blogs</b></a>
          <a class="faqs" href="https://www.daynightpackersmovers.com/queries-before-shifting.html"><b>FAQs</b></a>
          <a class="services" href="https://www.daynightpackersmovers.com/day-night-packers-movers-services.html"><b>Services</b></a>
          <!--<div class="dropdown">
            <a href="javascript:void(0)" id="services"><b>Services</b></a>
            <div class="dropdown-content">
              <a id="packers-movers" href="https://www.daynightpackersmovers.com/packers-movers-service.html">Packers And Movers</a>
              <a id="car-bike-carrier" href="https://www.daynightpackersmovers.com/car-bike-carrier-service.html">Car And Bike Carrier</a>
              <a id="shipping" href="https://www.daynightpackersmovers.com/shipping-service.html">Shipping Service</a>
              <a id="air-freight" href="https://www.daynightpackersmovers.com/air-freight-forwarding-service.html">Air Freight Forwarding</a>
              <a id="sea-freight" href="https://www.daynightpackersmovers.com/sea-freight-forwarding-service.html">Sea Freight Forwarding</a>
              <a id="international-relocation" href="https://www.daynightpackersmovers.com/international-relocation-service.html">International Relocation</a>
              <a id="home-shifting" href="https://www.daynightpackersmovers.com/home-shifting-service.html">Home Shifting Services</a>
              <a id="warehousing" href="https://www.daynightpackersmovers.com/warehousing-service.html">Warehousing Service</a>
            </div>
          </div>-->
          <a class="contact-us" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Contact Us</b></a>
        </div>
        <button class="openbtn" onclick="openNav()">☰</button>
      </div>
    </div>
    <div style="background: ${brand}; width: 100%">
      <div class="nav-inner get-in-touch">
        <div style="align-self: center;">
          <p class="header-font-size" style="margin-left: 15px;">GSTIN: 06CQIPA7897P1ZY</p></a>
        </div>
        <div class="get-in-touch flex-div row-div">
          <div>
            <a aria-label="mobile" class="flex-div row-div" href=tel:+919911198767><img alt="" src=${"assets/phone.svg"} width="20px" height="20px"></img>
            <p class="header-font-size">+91-9911198767</p></a>
          </div>
          <div style="align-self: flex-end;">
            <a aria-label="email" class="flex-div row-div" href="mailto:daynightpackersandmovers@gmail.com"><img alt="" src=${"assets/mail.svg"} width="20px" height="20px"></img>
            <p class="header-font-size" style="line-break: anywhere;">daynightpackersandmovers@gmail.com</p></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  ${
    cityOrLinkName === "about-day-night-packers-movers"
      ? getAboutUsContent()
      : cityOrLinkName === "our-mission"
      ? getOurMissionContent()
      : cityOrLinkName === "our-team"
      ? getOurTeamContent()
      : cityOrLinkName === "our-service"
      ? getOurServiceContent()
      : cityOrLinkName === "why-choose-us"
      ? getWhyChooseUsContent()
      : cityOrLinkName === "self-preparation-before-shifting"
      ? getBlogsContent(brand)
      : cityOrLinkName === "queries-before-shifting"
      ? getFAQsContent()
      : cityOrLinkName === "packers-movers-service"
      ? getPackersMoversServiceContent()
      : cityOrLinkName === "car-bike-carrier-service"
      ? getCarBikeCarrierServiceContent()
      : cityOrLinkName === "shipping-service"
      ? getShippingServiceContent()
      : cityOrLinkName === "air-freight-forwarding-service"
      ? getAirFreightServiceContent()
      : cityOrLinkName === "sea-freight-forwarding-service"
      ? getSeaFreightServiceContent()
      : // : cityOrLinkName === "international-relocation-service"
      // ? getInternationalRelocationServiceContent()
      cityOrLinkName === "home-shifting-service"
      ? getHomeShiftingServiceContent()
      : cityOrLinkName === "warehousing-service"
      ? getWarehousingServiceContent()
      : [
          "local-moving-guides",
          "essential-moving-supplies",
          "moving-with-pets",
          "safely-moving",
          "moving-day-survival-kit",
          "packing-electronics",
          "storage-solution",
          "moving-estimates",
          "budgeting-the-move",
          "diy-moving",
          "moving-in-bad-weather",
          "decluttering-before-move",
          "organizing-new-location",
          "eco-friendly-moving",
          "label-boxes",
          "customer-success-stories",
          "ultimate-checklist",
          "packing-tips",
          "why-us",
          "long-distance-moving"
        ].includes(cityOrLinkName)
      ? renderSingleBlogContent()
      : `${
          cityOrLinkName === "index" || cityOrLinkName === ""
            ? `<div id="day-night" class="contact border-bottom-class" style="background: #fffbf6;">
    <div class="iyohgi" style="text-align: center; padding: 0px;">
      <div class="">
        <div class="slideshow-container">
          <div class="day-night-slides fade">
            <div class="slideImg" alt="best packers movers" style="position: relative; background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)),url('assets/best-packers-movers.webp');">
              <div class="day-night-text-welcome">
                <p>Welcome To</p>
                <div class="first-section-text">
                  <div class="flex-div row-div" style="justify-content: revert; gap: 10px;">
                    <h1 class="x3-p" style="color: black; margin-bottom: 0px;">Day</h1>
                    <h1 class="x3-p" style="color: ${brand}; margin-bottom: 0px;">Night</h1>
                  </div>
                  <h1 class="x3-p" style="margin-bottom: 0px;">Packers And Movers</h1>
                </div>
                <p><u>Your Moving Partner!</u></p>
              </div>
            </div>
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="boxes shifting to truck" style="background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/boxes-shifting-to-truck.webp');">
              <div class="day-night-text">
                <p class="x3-p">Your Helping Hand in Your Next Move</p>
                <h1></h1>
              </div>
            </div>
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="verify checklist" style="background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/verify-checklist.webp');">
              <div class="day-night-text">
                <p class="x3-p">Prepared With Precise Knowledge For Your Smooth Transition</p>
                <h1></h1>
              </div>
            </div>
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="start moving" style="background-image: linear-gradient(rgb(0 0 0 / 56%), rgb(0 0 0 / 62%)), url('assets/start-moving.webp');">
              <div class="day-night-text">
                <p class="x3-p">Hassle Free Move With Day Night Packers And Movers</p>
                <h1></h1>
              </div>
            </div>
          </div>

          <!-- Next and previous buttons -->
          <button class="prev" onclick="plusSlides(-1)">&#10094;</button>
          <button class="next" onclick="plusSlides(1)">&#10095;</button>
        </div>
      </div>
    </div>
  </div>`
            : cityOrLinkName === "day-night-packers-movers-services"
            ? getServicesContent()
            : cityOrLinkName !== "contact-day-night-packers-movers"
            ? `<div id="city-section" class="contact border-bottom-class" style="background: #f2f2f2;">
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/city-section.webp"}></img>
        </div>
        <div class="contact-details">
          <p style="font-size: 30px; font-weight: 700;">Welcome to Day Night Packers and Movers in ${extractLocation(
            cityOrLinkName,
            3
          )} - Your Trusted Partner in Relocation!</p><br /><br />
          <p style="font-size: 19px;">At Day Night Packers and Movers, we understand that moving can be a daunting task. Whether you're relocating your home or your business, we are here to make your transition seamless and stress-free.</p><br />
          <p style="font-size: 19px;">
          With years of experience in the industry, our team of dedicated professionals is committed to providing top-notch moving and packing services tailored to meet your specific needs. From packing fragile items with the utmost care to transporting your belongings safely to your new destination, we handle every aspect of your move with precision and efficiency.
          </p>
        </div>
      </div>
    </div>
  </div>`
            : ``
        }

  ${getInquiryFormContent()}

  ${
    cityOrLinkName !== "contact-day-night-packers-movers" &&
    cityOrLinkName !== "day-night-packers-movers-services"
      ? `<div id="take-our-services" class="contact border-bottom-class" style="background: #94ddd7;">
    <div class="iyohgi" style="text-align: center;">
      <div class="inquire-tos-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/take-our-services.webp"></img>
        </div>
        <div id="take-our-service-content" class="contact-details">
          <p style="font-size: 19px; font-weight: 700;" class="fading-text">Worried About Your Next Relocation During Busy Schedule??</p><br />
          <p style="font-size: 24px; font-weight: 800;" class="sliding-text">Let Us Help You!!</p><br /><br />
          <p>
          Moving to a new place and searching for house shifting services? Let Day Night Packers and Movers take the stress out of your relocation journey and make it seamless. We're your trusted local and long-distance movers, committed to smooth, efficient, and worry-free transitions. With transparent pricing, on-time delivery, and friendly, reliable moving services, we exceed your expectations every step of the way.
          </p><br /><br />
          <p> For professional movers, affordable packers, and reliable relocation services, contact us today!</p>
        </div>
      </div>
    </div>
  </div>

  ${getServicesContent()}

  <div id="our-team" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <div class="flex-div row-div"><h2 style="color: black;" class="i78bq-2-3">Day</h2> <h2 style="color: ${brand};" class="i78bq-2-3">Night</h2> <h2 class="i78bq-2-3 contact-details"> Packers And Movers Team</h2></div>
      <div id="our-team-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="team work" loading="lazy" width="400px" height="auto" src="assets/team-work.webp"></img>
        </div>
        <div class="contact-details" style="text-align: left;">
          <ul style="line-height: 2.0em;"><li><b>Highly Motivated and Professional Companions:</b> Day Night Packers and Movers are dedicated to ensuring your relocation is stress-free.</li>

          <li><b>Comprehensive Services:</b> From packing and loading to transportation and unpacking, our team handles every aspect of your move.</li>
          
          <li><b>Expertise and Experience:</b> With years of experience in the moving industry, we provide top-notch service and support.</li>
          
          <li><b>Local and Long-Distance Moving:</b> Whether you're moving across town or across the country, we've got you covered.</li>
          
          <li><b>24/7 Support:</b> We're available round the clock to assist you with your relocation needs.</li>
          
          <li><b>Transparent Pricing:</b> No hidden fees, just clear and upfront quotes.</li></ul><br /><br />
          
          <p>Contact us today to experience the difference our dedicated team can make in your next relocation journey.<br /><br /><br />
          
          <h2>Let's move forward with Day Night Packers and Movers!</h2></p>
        </div>
      </div>
    </div>
  </div>

  <div id="client-reviews" class="contact border-bottom-class" style="background: #e9e7e7;">
    <div class="iyohgi" style="text-align: center;">
      <div class="flex-div row-div"><h2 class="i78bq-2-3 contact-details">Customer Testimonials For </h2><h2 style="color: black;" class="i78bq-2-3">Day</h2> <h2 style="color: ${brand};" class="i78bq-2-3">Night</h2> <h2 class="i78bq-2-3 contact-details"> Packers And Movers</h2></div>
      <div class="flex-div col-div">
        <div>
          <img src="assets/google-reviews.webp" alt="google reviews" height="85px" width="200px"></img>
        </div>
        <div class="slideshow-container">
          <!-- Full-width images with number and caption text -->
          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/testimonial1.png"} height="200px" width="200px">
            <div class="text">Rahul Maan, Kapurthala, Punjab <br /><br />
            "Moving with Day Night Packers and Movers was a breeze! From the initial inquiry to the final delivery, their team was professional, efficient, and careful with our belongings. I highly recommend Day Night Packers and Movers for a stress-free moving experience. Undoubtedly, best packers and movers!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/testimonial2.png"} height="200px" width="200px">
            <div class="text">Mr. Lakshay Jeet Shah, Bhubaneswar, Orissa <br /><br />
            "I had a fantastic experience with Day Night Packers and Movers. Their team was punctual, polite, and incredibly hardworking. They handled all of our items with care and precision, ensuring nothing was damaged during the move. Kudos to the team!!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/testimonial3.png"} height="200px" width="200px">
            <div class="text">Shalini Dey, Siliguri, West Bengal<br /><br />
            "Day Night Packers and Movers exceeded my expectations, as I was searching for packers and movers near me. Their team went above and beyond to ensure my move went smoothly. I'm grateful for their excellent service and would highly recommend them to anyone in need of a moving company."
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/testimonial4.png"} height="200px" width="200px">
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

  ${getChargesTableContent()}

  ${getProcessCardsContent()}

  ${getOurPresenceContent()}
    `
      : ``
  }
  `
  }

  <div id="contact-us-section" class="contact border-bottom-class" style="background: #0f0f0f;">
    <div class="iyohgi" style="text-align: center;">
      <div class="flex-div row-div" style="gap: 50px; flex-wrap: wrap; align-items: flex-start; justify-content: space-around;">
        <div class="white flex-div col-div">
          <p><u><b>Why Day Night Packers and Movers</b></u></p>
          <p>We understand that moving can be a daunting task, and our goal is to handle every aspect of your move with care and efficiency. From the moment you search for "household shifting services near me" and contact us to the final delivery at your new location, we strive to exceed your expectations with our commitment to excellence.</p>
        </div>
        <div class="flex-div col-div">
          <p class="white" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b><u>Useful Links</u></b></p>
          <ul style="text-align: left; line-height: 2.0em;">
            <li><a class="white" href="https://www.daynightpackersmovers.com/">Home</a>
            <li><a class="white" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html">About Us</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html">Blogs</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/queries-before-shifting.html">FAQs</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/day-night-packers-movers-services.html">Services</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="flex-div col-div">
          <p class="white" href="https://www.daynightpackersmovers.com/day-night-packers-movers-services.html"><b><u>Services</u></b></p>
          <ul style="text-align: left; line-height: 2.0em;">
            <li><a class="white" href="https://www.daynightpackersmovers.com/packers-movers-service.html">Packers And Movers</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/car-bike-carrier-service.html">Car And Bike Carrier</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/shipping-service.html">Shipping Service</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/air-freight-forwarding-service.html">Air Freight Forwarding</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/sea-freight-forwarding-service.html">Sea Freight Forwarding</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/home-shifting-service.html">Home Shifting Services</a></li>
            <li><a class="white" href="https://www.daynightpackersmovers.com/warehousing-service.html">Warehousing Service</a></li>
          </ul>
        </div>
        <div class="flex-div col-div" style="gap: 20px;">
          <p class="white" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b><u>Contact Us</u></b></p>
          <a class="white" href="">
            <p>302, 1st floor, Near Jagmal Singh Stadium,</p>
            <p> Bhondsi, Gurugram, Haryana, 122102</p>
          </a>
          <div class="flex-div row-div" style="gap: 10px; flex-wrap: wrap;">
            <a id="i2tpy3" aria-label="facebook" href="https://www.facebook.com/profile.php?id=61559284304658" target="_blank"><img alt="facebook page link" loading="lazy" id="i3gekg" height="43px" width="43px" src=${"assets/fb.svg"} /></a>
            <a id="i2tpy3-2" aria-label="instagram" href="https://www.instagram.com/daynightpackersand/" target="_blank"><img alt="instagram page link" loading="lazy" id="i3gekg-2" height="37px" width="37px" src=${"assets/insta.svg"} /></a>
            <a id="i2tpy3-6" aria-label="youtube" href="https://www.youtube.com/@DayNightPackersandMovers" target="_blank"><img alt="youtube page link" loading="lazy" id="i3gekg-2" height="37px" width="37px" src=${"assets/youtube.svg"} /></a>
            <a id="i2tpy3-7" aria-label="linkedin" href="https://www.linkedin.com/in/day-night-packers-and-movers-a5488a31a" target="_blank"><img alt="linkedin page link" loading="lazy" id="i3gekg-2" height="37px" width="37px" src=${"assets/linkedin.svg"} /></a>
            <a id="i2tpy3-8" aria-label="X/twitter" href="https://x.com/daynightpackers" target="_blank"><img alt="X/twitter page link" loading="lazy" id="i3gekg-2" height="37px" width="37px" src=${"assets/twitter.svg"} /></a>
            <a id="i2tpy3-5" aria-label="whatsapp" href="https://wa.me/+919911198767" target="_blank"><img alt="chat on whatsapp" loading="lazy" id="i3gekg-3" height="37px" width="37px" src=${"assets/whatsapp.svg"} /></a>
            <a id="i2tpy3-3" aria-label="email" href="mailto:daynightpackersandmovers@gmail.com"><img alt="compose email" loading="lazy" id="i3gekg-4" height="37px" width="37px"
                src=${"assets/email.svg"} /></a>
            <a aria-label="mobile" href=tel:+919911198767><img alt="call" loading="lazy" id="i3gekg-5" height="43px" width="43px" src=${"assets/tel.svg"} /></a>
          </div>
          <img id="logo" alt="" src=${"assets/logo-white.png"} width="auto" height="80px"></img>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright-footer" style="background-color: #0f0f0f;">
    <p id="iy2lbi">All rights reserved © ${new Date().getFullYear()} Day Night Packers And Movers</p>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content flex-div col-div">
      <img alt="" loading="lazy" id="modal-img" width="50px" height="50px"></img>
      <p id="modal-p" style="text-align: center";></p>
    </div>
  </div>`;
}

function manageDOM(htmlContent) {
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  document.body.appendChild(container);
  if (cityOrLinkName.includes("packers-movers-in")) removeCurrentLocationLI();
}

function removeCurrentLocationLI() {
  const li = document.getElementById(cityOrLinkName);
  li?.remove();
}

function main() {
  const htmlContent = createHtmlContent();
  manageDOM(htmlContent);
}

main();
setActiveTab();

if (cityOrLinkName === "queries-before-shifting") collapsibleProcessing();

if (cityOrLinkName === "" || cityOrLinkName === "index") {
  showSlides("day-night-slides", "day-night-dot", dayNightSlideIndex);
}

if (
  cityOrLinkName !== "queries-before-shifting" &&
  cityOrLinkName !== "self-preparation-before-shifting" &&
  cityOrLinkName !== "about-day-night-packers-movers"
) {
  closeModal();
  onSubmit();
  showSlides("mySlides", "dot", slideIndex);
}

// applyAnimationWhenInViewport(".fading-text", "fade");
// applyAnimationWhenInViewport(".sliding-text", "slide-right");
