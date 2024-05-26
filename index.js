function getPathAndLocation() {
  let path = window.location.pathname;
  let splittedPath = path.split("/");
  const finalPath = [splittedPath.at(-2), splittedPath.at(-1)].join("/"); //handled for both local and sever
  let isLocation = false;
  let isLink = false;
  if (finalPath.includes("locations")) isLocation = true;
  if (finalPath.includes("links")) isLink = true;
  return { finalPath, isLocation, isLink };
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
  formEle?.addEventListener("submit", processFormSubmission);
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
    dots[i].className = dots[i]?.className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
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

function getAboutUsContent(nested) {
  return `
  <div id="about-us" class="contact border-bottom-class" style="background: #65b2d1;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">About Us - Day Night Packers And Movers</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${
            nested ? "../assets/ABOUTUS.jpg" : "assets/ABOUTUS.jpg"
          }></img>
        </div>
        <div class="contact-details" style="text-align: left;">
          <p>Welcome to Day Night Packers And Movers, your trusted partner for all your moving needs. With years of experience in the industry, we have established ourselves as a reliable and professional moving company dedicated to providing top-notch moving and packing services.</p><br /><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Our Mission</b><br />
          </p>
          <p>Our mission is to make your moving experience as smooth and stress-free as possible. We understand that moving can be a daunting task, and our goal is to handle every aspect of your move with care and efficiency. From the moment you contact us to the final delivery at your new location, we strive to exceed your expectations with our commitment to excellence.</p><br /><br />
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>Our Services</b><br />
          </p>  
          <p>At Day Night Packers And Movers, we offer a comprehensive range of moving services to cater to your specific needs:
          </p><br />
          <p><b>Residential Moving:</b> Whether you're moving across the street or across the country, our professional movers ensure your belongings are transported safely and securely.<br /><br />

          <b>Commercial Moving:</b> We specialize in office and business relocations, minimizing downtime and ensuring a smooth transition for your company.<br /><br />

          <b>Packing Services:</b> Our expert packers use high-quality materials and techniques to protect your items during transit. We offer full and partial packing services tailored to your needs.<br /><br />

          <b>Storage Solutions:</b> Need storage before, during, or after your move? Our secure storage facilities provide short-term and long-term solutions for your belongings.<br /><br />

          <b>Long-Distance Moving:</b> Moving to a different state? Our experienced movers handle all the logistics of long-distance moves, ensuring your possessions arrive on time and in perfect condition.<br /><br />

          <b>Local Moving:</b> Our local moving services are designed to make your move within the city or region hassle-free and efficient.</p><br /><br />

            <p style="margin-bottom: 5px; font-size: 22px;"><b>Why Choose Us?</b><br /></p>

            <p>Choosing Day Night Packers And Movers means choosing a team of experienced movers who are dedicated to providing exceptional service. Here are a few reasons why our customers trust us with their moves:<br /><br />

            <b>Professionalism:</b> Our movers are trained professionals who handle your belongings with the utmost care and respect.<br /><br />

            <b>Reliability:</b> We pride ourselves on being a reliable moving company that you can count on to show up on time and deliver as promised.<br /><br />

            <b>Experience:</b> With years of experience in the moving industry, we have the knowledge and expertise to handle moves of all sizes and complexities.<br /><br />

            <b>Customer Satisfaction:</b> Our top priority is customer satisfaction. We go above and beyond to ensure that our clients are happy with our services from start to finish.<br /><br />

            <b>Transparent Pricing:</b> We offer competitive and transparent pricing with no hidden fees. Our detailed quotes provide a clear understanding of the costs involved.<br />

        </div>
      </div>
    </div>
  </div>
  `;
}

function getBlogsContent(nested) {
  return `
  <div id="blogs" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Blogs</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${
            nested ? "../assets/BLOG.jpg" : "assets/BLOG.jpg"
          }></img>
        </div>
        <div class="contact-details" style="text-align: left;">
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>1. The Ultimate Moving Checklist: Everything You Need to Know</b><br />
          </p>
          <p>
          Moving can be a daunting task, but with the right preparation, it can be a smooth and stress-free experience. Here’s the ultimate moving checklist to ensure you don’t miss a thing.<br /><br /><br />
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Eight Weeks Before Moving:</b></span> Start decluttering your home and decide what to keep, sell, or donate. Begin researching professional movers and get quotes.</li>          
          <li><span><b>Six Weeks Before Moving:</b></span> Gather packing supplies such as boxes, bubble wrap, and tape. Start packing items you don’t use daily.</li>          
          <li><span><b>Four Weeks Before Moving:</b></span> Confirm your moving date with the moving company. Arrange for packing services if needed.</li>
          <li><span><b>Two Weeks Before Moving:</b></span> Notify utility companies of your move. Pack an essentials box with items you’ll need immediately after moving.</li>
          <li><span><b>Moving Day:</b></span> Do a final walk-through of your home to ensure nothing is left behind. Supervise the movers and double-check the inventory list.</li><br />
          </ul>
          </p>
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>2. Top 10 Packing Tips for a Stress-Free Move</b><br />
          </p>
          <p>
          Packing is one of the most critical aspects of moving. With these top 10 packing tips, you can ensure your belongings are safe and organized.<br /><br /><br />
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Start Early:</b></span> Begin packing well in advance to avoid last-minute stress.</li>
          <li><span><b>Use Quality Packing Materials:</b></span> Invest in sturdy boxes, bubble wrap, and packing tape to protect your items.</li>
          <li><span><b>Label Everything:</b></span> Clearly label each box with its contents and the room it belongs to.</li>
          <li><span><b>Pack Room by Room:</b></span> Focus on packing one room at a time to stay organized.</li>
          <li><span><b>Keep Essentials Accessible:</b></span> Pack a separate bag with essentials such as toiletries, medications, and important documents.</li>
          <li><span><b>Use Wardrobe Boxes:</b></span> These are perfect for transporting clothes without wrinkling them.</li>
          <li><span><b>Protect Fragile Items:</b></span> Use plenty of padding and mark boxes with fragile items clearly.</li>
          <li><span><b>Don’t Overpack Boxes:</b></span> Ensure boxes are not too heavy to lift and won’t break under the weight.</li>
          <li><span><b>Seal Boxes Properly:</b></span> Use packing tape to securely seal each box.</li>
          <li><span><b>Hire Professional Packers:</b></span> Consider hiring professional packers if you’re short on time or have valuable items.</li><br />
          </ul>
          </p>
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>3. How to Choose the Right Moving Company</b><br />
          </p>
          <p>
          Selecting the right moving company can make all the difference in your moving experience. Here’s how to choose a reliable mover.<br /><br /><br />
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Research and Recommendations:</b></span> Ask friends and family for recommendations and read online reviews.</li>
          <li><span><b>Check Credentials:</b></span> Ensure the moving company is licensed and insured.</li>
          <li><span><b>Get Multiple Quotes:</b></span> Obtain estimates from several moving companies to compare prices and services.</li>   
          <li><span><b>Understand the Services Offered:</b></span> Make sure the company provides the services you need, such as packing, storage, or long-distance moving.</li> 
          <li><span><b>Review the Contract:</b></span> Carefully read the contract before signing and clarify any doubts.</li>
          <li><span><b>Ask About Hidden Fees:</b></span> Ensure there are no hidden charges that could surprise you later.</li>
          <li><span><b>Inquire About Their Experience:</b></span> Choose a company with a proven track record in the moving industry.</li><br />
          </ul>
          </p>
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>4. Why You Should Consider Professional Packing Services</b><br />
          </p>
          <p>
          Packing can be one of the most time-consuming parts of moving. Here’s why you should consider hiring professional packing services.<br /><br /><br /> 
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Save Time:</b></span> Professional packers can efficiently pack your entire home in a fraction of the time it would take you.</li>
          <li><span><b>Ensure Safety:</b></span> They use high-quality packing materials and techniques to protect your belongings.</li>
          <li><span><b>Reduce Stress:</b></span> Letting professionals handle the packing frees up your time and reduces moving-related stress.</li>
          <li><span><b>Experience and Expertise:</b></span> Professional packers have the experience to pack items of all shapes and sizes securely.</li>
          <li><span><b>Insurance Coverage:</b></span> Many moving companies offer insurance options for items packed by their professionals, providing peace of mind.</li><br />
          </ul>
          </p>
          <p style="margin-bottom: 5px; font-size: 22px;">
            <b>5. How to Make Long-Distance Moving Easier</b><br />
          </p>
          <p>
          Long-distance moving comes with its unique set of challenges. Here are some tips to make your cross-country move easier.<br /><br /><br />
          <ul style="line-height: 2.0em; padding-left: 25px;">
          <li><span><b>Plan Ahead:</b></span> Start planning your move as early as possible to avoid last-minute issues.</li>
          <li><span><b>Choose the Right Movers:</b></span> Hire experienced long-distance movers who are licensed and insured.</li>
          <li><span><b>Stay Organized:</b></span> Keep a detailed inventory of your belongings and important documents.</li>
          <li><span><b>Pack Smart:</b></span> Use proper packing materials and techniques to protect your items during transit.</li>
          <li><span><b>Take Care of Utilities:</b></span> Arrange for utility services to be disconnected at your old home and connected at your new one.</li>
          <li><span><b>Stay in Touch with Your Movers:</b></span> Maintain open communication with your moving company to stay updated on the status of your move.</li>
          <li><span><b>Prepare for the Unexpected:</b></span> Have a contingency plan in case of delays or other issues.</li> 
          </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
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

function getFAQsContent(nested) {
  return `
  <div id="faq" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">FAQs</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${
            nested ? "../assets/FAQs.jpg" : "assets/FAQs.jpg"
          }></img>
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
  </div>
  `;
}

function createHtmlContent(finalPath, isLocation, isLink) {
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
    "Dehradun",
    "Delhi",
    "Dwarka",
    "Dwarka Delhi",
    "Faridabad",
    "Gandhidham",
    "Ghaziabad",
    "Goa",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Haridwar",
    "Hisar",
    "Hubli",
    "Hyderabad",
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
    "Lucknow",
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
    "Secunderabad",
    "Siliguri",
    "Surat",
    "Thoraipakkam",
  ];
  const locations5 = [
    "Tirupur",
    "Trichy",
    "Trivandrum",
    "Udaipur",
    "Vadodra",
    "Varanasi",
    "Vapi",
    "Vijaywada",
    "Vizag",
    "Whitefield",
  ];
  const nested = isLocation || isLink;
  const cityOrLinkName = finalPath?.split("/")?.[1]?.split(".")?.[0];
  return `
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont" style="background: #fffbf6;">
    <div id="ibulz" class="nav-inner">
      <a href="https://daynightpackersmovers.com/">
        <img id="logo" alt="" src=${
          nested ? "../assets/logonew.png" : "assets/logonew.png"
        } width="auto" height="100px"></img>
      </a>
      <div class="flex-div col-div">
        <div style="align-self: flex-start;">
        <a aria-label="mobile" class="flex-div row-div" href=tel:+919911198767><img alt="" src=${
          nested ? "../assets/phone.svg" : "assets/phone.svg"
        } width="30px" height="30px"></img>
          <p class="header-font-size" style="font-weight: 700; color: ${brand}">+91-9911198767</p></a>
        </div>
        <div style="align-self: flex-start;">
        <a aria-label="email" class="flex-div row-div" href="mailto:daynightpackersandmovers@gmail.com"><img alt="" src=${
          nested ? "../assets/mail.svg" : "assets/mail.svg"
        } width="30px" height="30px"></img>
          <p class="header-font-size" style="margin: 5px; font-weight: 700; line-break: anywhere; color: ${brand}">daynightpackersandmovers@gmail.com</p></a>
        </div>
      </div>
    </div>
  </div>

  ${
    isLink && cityOrLinkName === "AboutUs"
      ? getAboutUsContent(nested)
      : isLink && cityOrLinkName === "Blogs"
      ? getBlogsContent(nested)
      : isLink && cityOrLinkName === "FAQs"
      ? getFAQsContent(nested)
      : `${
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
              24/7 Dedication: Working Around the Clock to Serve You Better. ⏰ #Always On
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/2.png" : "assets/2.png"
            } height="300px" width="350px">
            <div class="day-night-text">Safe and Sound, Every Detail Perfected. 🛡️✨ #Excellence Assured
            <br /><br />
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/3.png" : "assets/3.png"
            } height="300px" width="350px">
            <div class="day-night-text">Powered by Excellence: Our Arsenal of Resources Ready for You. 💼⚙️ #Prepared For Success
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/4.png" : "assets/4.png"
            } height="300px" width="320px">
            <div class="day-night-text">Your Trusted Partner: Where Every Customer Finds a Companion. 🤝 #Customer First
            </div>
          </div>

          <div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src=${
              isLocation ? "../assets/5.png" : "assets/5.png"
            } height="300px" width="320px">
            <div class="day-night-text">Relax, We've Got You Covered: Ensuring Customer Satisfaction Every Step of the Way. 😌👌 #Peace Of Mind Service
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
            isLocation ? "../assets/citySection.gif" : "assets/citySection.gif"
          }></img>
        </div>
        <div class="contact-details">
          <p style="font-size: 30px; font-weight: 700;">Welcome to Day Night Packers and Movers in ${cityOrLinkName} - Your Trusted Partner in Relocation!</p><br /><br />
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
      <h1 class="i78bq-2-3 contact-details ">Decoding Excellence: Illuminating Our Range of Services at Day Night Packers and Movers</h1>
      <div id="our-services-content">   
        <div>
          <ul class="service-desc" style="line-height: 2.0em;">
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
      <h1 class="i78bq-2-3 contact-details ">United in Purpose, Stronger in Unity. 🌟 Dynamics of Day Night Packers and Movers Team</h1>
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
          
          <h2>Let's move forward with Day Night Packers and Movers!</h2></p>
        </div>
      </div>
    </div>
  </div>

  <div id="client-reviews" class="contact border-bottom-class" style="background: #d7e973;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details ">Voices of Satisfaction: Hear What Customers Have to Say about Day Night Packers and Movers</h1>
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
    <h1 class="i78bq-2-3 contact-details ">Fair Pricing, Exceptional Value: Explore Transparent Charges at Day Night packers and Movers</h1>
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
      <h1 class="i78bq-2-3 contact-details ">Unlocking Convenience: The Seamless Steps to Avail Services at Day Night Packers and Movers</h1>
      <div class="">
        <div style="text-align: left; display: flex; flex-direction: column; gap: 40px; padding: 0px 150px 0px 150px;"class="process-card-parent">
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">01 </b>  Get in Touch for a Seamless Moving Experience! 📦✨ <br />Contact Us Today!</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">02 </b>  Planning Your Move? Let's Get Started with a Free Survey and Quotation!</div>
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">03 </b>  Ready to Make Your Move? Book with Us Today and Be a part of Smooth Transition!</div>
        </div>
      </div>
    </div>
  </div>

  <div id="services" class="services border-bottom-class iyohgi">
    <div id="iymxg" class="service-info">
      <h1 class="i78bq contact-details " data-custom-content="services">
      Everywhere You Need Us to Be: Discovering Global Presence of Day Night Packers and Movers
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
                return `<li id="locations/${loc}.html"><a class="contact-details" href="https://www.daynightpackersmovers.com/locations/${loc}.html">Packers and
                  Movers in ${loc}</a></li>`;
              })
              .join("")}
          </ul>
        </div>
        <div id="ilmjk-2" class="service-cont">
          <ul id="ipekj-2" class="service-desc">
            ${locations2
              .map((loc) => {
                return `<li id="locations/${loc}.html"><a class="contact-details" href="https://www.daynightpackersmovers.com/locations/${loc}.html">Packers and Movers in ${loc}</a></li>`;
              })
              .join("")}
          </ul>
        </div>
        <div id="ilmjk-3" class="service-cont">
          <ul id="ipekj-3" class="service-desc">
          ${locations3
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="https://www.daynightpackersmovers.com/locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations4
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="https://www.daynightpackersmovers.com/locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
        <div id="ilmjk-4" class="service-cont">
          <ul id="ipekj-4" class="service-desc">
          ${locations5
            .map((loc) => {
              return `<li id="locations/${loc}.html"><a class="contact-details" href="https://www.daynightpackersmovers.com/locations/${loc}.html">Packers and
                Movers in ${loc}</a></li>`;
            })
            .join("")}
          </ul>
        </div>
      </div>
    </div>
  </div>`
  }

  <div id="contact" class="contact border-bottom-class" style="background: #047d9d;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="contact-details ">Doubts Dismissed: Let Us Clear the Path to Clarity with Day Night Packers and Movers</h1>
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="500px" height="auto" src=${
            nested ? "../assets/6ContactUs.gif" : "assets/6ContactUs.gif"
          }></img>
        </div>
        <div>
        <p id="iqrh3-2-2" class="contact-details" style="margin-bottom: 10px; margin-top: 20px;">Contact us</p>
        <div class="igiuzk flex-div row-div">
          <a id="i2tpy3" aria-label="facebook" href="https://www.facebook.com/profile.php?id=61559284304658" target="_blank"><img alt="facebook page link" loading="lazy" id="i3gekg" height="49px" width="49px" src=${
            nested ? "../assets/fb.svg" : "assets/fb.svg"
          } /></a>
          <a id="i2tpy3-2" aria-label="instagram" href="https://www.instagram.com/daynightpackersand/" target="_blank"><img alt="instagram page link" loading="lazy" id="i3gekg-2" height="33px" width="33px" src=${
            nested ? "../assets/insta.svg" : "assets/insta.svg"
          } /></a>
          <a id="i2tpy3-5" aria-label="whatsapp" href="https://wa.me/+919911198767" target="_blank"><img alt="chat on whatsapp" loading="lazy" id="i3gekg-3" height="40px" width="40px" src=${
            nested ? "../assets/whatsapp.svg" : "assets/whatsapp.svg"
          } /></a>
          <a id="i2tpy3-3" aria-label="email" href="mailto:daynightpackersandmovers@gmail.com"><img alt="compose email" loading="lazy" id="i3gekg-4" height="37px" width="37px"
              src=${nested ? "../assets/email.svg" : "assets/email.svg"} /></a>
          <a aria-label="mobile" href=tel:+919911198767><img alt="call" loading="lazy" id="i3gekg-5" height="37px" width="37px" src=${
            nested ? "../assets/tel.svg" : "assets/tel.svg"
          } /></a>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright-footer" style="background-color: aliceblue;">
    <div class="igiuzk flex-div row-div" style="gap: 20px;">
      <a href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
      <a href="https://www.daynightpackersmovers.com/links/AboutUs.html"><b>About Us</b></a>
      <a href="https://www.daynightpackersmovers.com/links/Blogs.html"><b>Blogs</b></a>
      <a href="https://www.daynightpackersmovers.com/links/FAQs.html"><b>FAQs</b></a>
      <a href="https://www.daynightpackersmovers.com/#our-services"><b>Services</b></a>
    </div><br />
    <p id="iy2lbi">© ${new Date().getFullYear()} powered by Day Night Packers And Movers</p>
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
  const { finalPath, isLocation, isLink } = getPathAndLocation();
  const htmlContent = createHtmlContent(finalPath, isLocation, isLink);
  manageDOM(htmlContent, finalPath, isLocation);
}

main();

// Events handling
closeModal();
onSubmit();
collapsibleProcessing();

let dayNightTimeout;
let dayNightSlideIndex = 0;
if (!getPathAndLocation().isLocation) {
  showSlides("day-night-slides", "day-night-dot", dayNightSlideIndex);
}

let slidesTimeout;
let slideIndex = 0;
showSlides("mySlides", "dot", slideIndex);
