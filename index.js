function getPathAndLocation() {
  let path = window.location.pathname;
  let splittedPath = path.split("/");
  const finalPath = [splittedPath.at(-2), splittedPath.at(-1)].join("/"); //handled for both local and sever
  const cityOrLinkName = finalPath?.split("/")?.[1]?.split(".")?.[0];
  return { finalPath, cityOrLinkName };
}

const { finalPath, cityOrLinkName } = getPathAndLocation();

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
  <div id="about-us" class="contact border-bottom-class" style="background: #65b2d1;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">About Us - Day Night Packers And Movers</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src="assets/about-us.jpg"></img>
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

function getBlogsContent() {
  return `
  <div id="blogs" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Blogs</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src="assets/blog.jpg"></img>
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

function getFAQsContent() {
  return `
  <div id="faq" class="contact border-bottom-class" style="background: #ffffff;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">FAQs</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/faqs.jpg"}></img>
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

function getInquiryFormContent() {
  return `
  <div id="form-detail" class="contact border-bottom-class">
    <div class="iyohgi" class="flex-div col-div" style="align-items: unset;">
      <div id="get-a-quote"><p class="i78bq-2-3 contact-details" style="font-size: x-large; text-align: center; border-bottom: 70px;">Relocate with ease! Our professional packers and movers ensure a seamless transition for your home or office. From meticulous packing to safe transportation, trust us for a stress-free move. <b style="font-size: 34px;">Get a quote today!</b></p></div>
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
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/delivery-truck.gif"></img>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Packers and Movers Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/packers-and-movers.jpg"}></img>
        </div>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Car and Bike Carrier Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/car-carrier-services.jpg"}></img>
        </div>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Shipping Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/shipping-service.jpg"}></img>
        </div>
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
  <div id="air-freight-service-content" class="contact border-bottom-class" style="color: white; background: #032d3a;">
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 ">Air Freight Forwarding Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/air-freight-forwarding.jpg"}></img>
        </div>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Sea Freight Forwarding Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/sea-freight-forwarding.jpg"}></img>
        </div>
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
//           <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/international-relocation.jpg"}></img>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Home Shifting Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/home-shifting-services.jpg"}></img>
        </div>
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
    <div class="iyohgi" style="text-align: center;">
      <h1 class="i78bq-2-3 contact-details">Warehousing Services</h1>
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/warehousing-services.jpg"}></img>
        </div>
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
  const home = document.getElementById("home");
  const about = document.getElementById("about");
  const blogs = document.getElementById("blogs");
  const faqs = document.getElementById("faqs");
  const services = document.getElementById("services");
  const contactUs = document.getElementById("contact-us");

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

  const menus = [home, about, blogs, faqs, services, contactUs];
  const subMenus = [
    packersMovers,
    carBikeCarrier,
    shipping,
    airFreight,
    seaFreight,
    // internationalRelocation,
    homeShifting,
    warehousing,
  ];

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

  if (cityOrLinkName === "packers-movers-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    packersMovers.className += " active-dropdown-options";
  } else if (cityOrLinkName === "air-freight-forwarding-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    airFreight.className += " active-dropdown-options";
  } else if (cityOrLinkName === "sea-freight-forwarding-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    seaFreight.className += " active-dropdown-options";
  } else if (cityOrLinkName === "car-bike-carrier-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    carBikeCarrier.className += " active-dropdown-options";
  } else if (cityOrLinkName === "home-shifting-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    homeShifting.className += " active-dropdown-options";
  }
  // else if (cityOrLinkName === "international-relocation-service") {
  //   for (let i = 0; i < subMenus.length; i++) {
  //     subMenus[i].className.replace(" active-dropdown-options", "");
  //   }
  //   internationalRelocation.className += " active-dropdown-options";
  // }
  else if (cityOrLinkName === "shipping-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    shipping.className += " active-dropdown-options";
  } else if (cityOrLinkName === "warehousing-service") {
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].className.replace(" active-dropdown-options", "");
    }
    warehousing.className += " active-dropdown-options";
  }

  if (cityOrLinkName === "" || cityOrLinkName === "index") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    home.className += " active-menu";
  } else if (cityOrLinkName === "about-day-night-packers-movers") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    about.className += " active-menu";
  } else if (cityOrLinkName === "self-preparation-before-shifting") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    blogs.className += " active-menu";
  } else if (cityOrLinkName === "queries-before-shifting") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    faqs.className += " active-menu";
  } else if (serviceRoutes.includes(cityOrLinkName)) {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    services.className += " active-menu";
  } else if (cityOrLinkName === "contact-day-night-packers-movers") {
    for (let i = 0; i < menus; i++) {
      menus[i].className.replace(" active-menu", "");
    }
    contactUs.className += " active-menu";
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
  const brand = "#FF5823";
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
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont" style="background: #fffbf6;">
    
    <div id="ibulz" class="nav-inner">
      <div>
        <a href="https://daynightpackersmovers.com/">
          <img id="logo" alt="" src=${"assets/logo.png"} width="auto" height="80px"></img>
        </a>
      </div>
      <div id="menus" class="flex-div row-div" style="gap: 30px;">
        <a id="home" href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
        <a id="about" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b>About Us</b></a>
        <a id="blogs" href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html"><b>Blogs</b></a>
        <a id="faqs" href="https://www.daynightpackersmovers.com/queries-before-shifting.html"><b>FAQs</b></a>
        <div class="dropdown">
          <a href="javascript:void(0)" id="services"><b>Services</b></a>
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
        <a id="contact-us" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Contact Us</b></a>
      </div>
      <div id="menu-btn">
        <div id="side-panel">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
          <a id="home" href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
          <a id="about" href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b>About Us</b></a>
          <a id="blogs" href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html"><b>Blogs</b></a>
          <a id="faqs" href="https://www.daynightpackersmovers.com/queries-before-shifting.html"><b>FAQs</b></a>
          <div class="dropdown">
            <a href="javascript:void(0)" id="services"><b>Services</b></a>
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
          <a id="contact-us" href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Contact Us</b></a>
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
      : cityOrLinkName === "self-preparation-before-shifting"
      ? getBlogsContent()
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
      : `${
          cityOrLinkName === "index" || cityOrLinkName === ""
            ? `<div id="day-night" class="contact border-bottom-class" style="background: #fffbf6;">
    <div class="iyohgi" style="text-align: center; padding: 20px 0px;">
      <div class="">
        <div class="slideshow-container">
          <div class="day-night-slides fade">
            <div class="slideImg" alt="" style="background-image: url('assets/packing-moving.jpg');"></div>
            <!--<div class="day-night-text">
              24/7 Dedication: <b>Day Night Packers and Movers</b> Working Around the Clock to Serve You Better. ⏰ #Always On
            </div>-->
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="" style="background-image: url('assets/carrying-box.jpg');"></div>
          <!--<div class="day-night-text">Safe and Sound, Every Detail Perfected. 🛡️✨ #Excellence Assured
            <br /><br />
            </div>-->
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="" style="background-image: url('assets/packed-material.jpg');"></div>
            <!--<div class="day-night-text">Powered by Excellence: Our Arsenal of Resources Ready for You. 💼⚙️ #Prepared For Success
            </div>-->
          </div>

          <div class="day-night-slides fade">
            <div class="slideImg" alt="" style="background-image: url('assets/warehouse.jpg');"></div>
            <!--<div class="day-night-text">Your Trusted Partner: Where Every Customer Finds a Companion. 🤝 #Customer First
            </div>-->
          </div>

          <!--<div class="day-night-slides fade">
            <img class="slideImg" alt="" loading="lazy" src="assets/relaxing.png" height="300px" width="320px">
            <div class="day-night-text">Relax, We've Got You Covered: Ensuring Customer Satisfaction Every Step of the Way. 😌👌 #Peace Of Mind Service
            </div>
          </div>-->

          <!-- Next and previous buttons -->
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <br>

        <div style="text-align:center">
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 0)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 1)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 2)"></span>
          <span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 3)"></span>
          <!--<span class="day-night-dot" onclick="currentSlide('day-night-slides', 'day-night-dot', 4)"></span>-->
        </div>
      </div>
    </div>
  </div>`
            : cityOrLinkName !== "contact-day-night-packers-movers"
            ? `<div id="city-section" class="contact border-bottom-class" style="background: #f2f2f2;">
    <div class="iyohgi" style="text-align: center;">
      <div id="city-section-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="400px" height="auto" src=${"assets/city-section.gif"}></img>
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
    cityOrLinkName !== "contact-day-night-packers-movers"
      ? `<div id="take-our-services" class="contact border-bottom-class" style="background: #94ddd7;">
    <div class="iyohgi" style="text-align: center;">
      <div class="inquire-tos-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/take-our-services.gif"></img>
        </div>
        <div id="take-our-service-content" class="contact-details">
          <p style="font-size: 19px; font-weight: 700;" class="fading-text">Worried About Your Next Relocation During Busy Schedule??</p><br />
          <p style="font-size: xxx-large; font-weight: 800;" class="sliding-text">Let Us Help You!!</p><br /><br />
          <p>
          Moving to a new place and searching for house shifting services? Let Day Night Packers and Movers take the stress out of your relocation journey and make it seamless. We're your trusted local and long-distance movers, committed to smooth, efficient, and worry-free transitions. With transparent pricing, on-time delivery, and friendly, reliable moving services, we exceed your expectations every step of the way.
          </p><br /><br />
          <p> For professional movers, affordable packers, and reliable relocation services, contact us today!</p>
        </div>
      </div>
    </div>
  </div>

  <div id="our-services" class="contact border-bottom-class" style="background: #f5f5f5;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="i78bq-2-3 contact-details ">Decoding Excellence: Illuminating Our Range of Services at Day Night Packers and Movers</h2>
      <div id="our-services-content">   
        <div class="flex-div row-div" style="flex-wrap: wrap; justify-content: space-around; gap: 20px;">
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/moving-truck.svg" alt="moving truck" loading="lazy" width="100px" height="100px" />
            <a class="flip-btn">&#10095;</a>
            <p>Packers And Movers</p>
            <button class="service-btn" onclick="navigate('packers-movers-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/truck-flatbed.svg" alt="moving flatbed" loading="lazy" width="100px" height="100px" />
            <a class="flip-btn">&#10095;</a>
            <p>Car And Bike Carrier</p>
            <button class="service-btn" onclick="navigate('car-bike-carrier-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/shipping-icon.svg" alt="shipping" loading="lazy" width="100px" height="100px" />
            <a class="flip-btn">&#10095;</a>
            <p>Shipping Service</p>
            <button class="service-btn" onclick="navigate('shipping-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/plane.svg" alt="plane" loading="lazy" width="100px" height="80px" />
            <a class="flip-btn">&#10095;</a>
            <p>Air Freight Forwarding</p>
            <button class="service-btn" onclick="navigate('air-freight-forwarding-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/sea-ship-with-containers.svg" alt="sea-ship-with-containers" loading="lazy" width="100px" height="100px" />
            <a class="flip-btn">&#10095;</a>
            <p>Sea Freight Forwarding</p>
            <button class="service-btn" onclick="navigate('sea-freight-forwarding-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/home.svg" alt="home" loading="lazy" width="100px" height="80px" />
            <a class="flip-btn">&#10095;</a>
            <p>Home Shifting Services</p>
            <button class="service-btn" onclick="navigate('home-shifting-service')">View More</button>
          </div>
          <div class="card service-card flex-div col-div" style="position: relative;">
            <img src="assets/warehouse-hangar.svg" alt="warehouse hangar" loading="lazy" width="100px" height="80px" />
            <a class="flip-btn">&#10095;</a>
            <p>Warehousing Service</p>
            <button class="service-btn" onclick="navigate('warehousing-service')">View More</button>
          </div>
          <!--<div class="card service-card"><a href="https://www.daynightpackersmovers.com/car-bike-carrier-service.html">Car And Bike Carrier</a></div>
          <div class="card service-card"><a href="https://www.daynightpackersmovers.com/shipping-service.html">Shipping Service</a></div>
          <div class="card service-card"><a href="https://www.daynightpackersmovers.com/air-freight-forwarding-service.html">Air Freight Forwarding</a></div>
          <div class="card service-card"><a href="https://www.daynightpackersmovers.com/sea-freight-forwarding-service.html">Sea Freight Forwarding</a></div>
          <div class="card service-card"><a href="https://www.daynightpackersmovers.com/home-shifting-service.html">Home Shifting Services</a></div>
          <div class="card service-card"><a href="https://www.daynightpackersmovers.com/warehousing-service.html">Warehousing Service</a></div>
          <li><h2><a href="https://www.daynightpackersmovers.com/international-relocation-service.html">International Relocation</a></li>-->
        </div>
        <!--<div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/our-service.gif"></img>
        </div>-->
      </div>
    </div>
  </div>

  <div id="our-team" class="contact border-bottom-class" style="background: #5ad5ff;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="i78bq-2-3 contact-details ">United in Purpose, Stronger in Unity. 🌟 Dynamics of Day Night Packers and Movers Team</h2>
      <div id="our-team-content">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="600px" height="auto" src="assets/our-team.gif"></img>
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

  <div id="client-reviews" class="contact border-bottom-class" style="background: #d7e973;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="i78bq-2-3 contact-details ">Voices of Satisfaction: Hear What Customers Have to Say about Day Night Packers and Movers</h2>
      <div class="">
        <div class="slideshow-container">
          <!-- Full-width images with number and caption text -->
          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/client1.jpg"} height="200px" width="200px">
            <div class="text">Rahul Maan, Kapurthala, Punjab <br /><br />
            "Moving with Day Night Packers and Movers was a breeze! From the initial inquiry to the final delivery, their team was professional, efficient, and careful with our belongings. I highly recommend Day Night Packers and Movers for a stress-free moving experience. Undoubtedly, best packers and movers!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/client2.jpg"} height="200px" width="200px">
            <div class="text">Mr. Lakshay Jeet Shah, Bhubaneswar, Orissa <br /><br />
            "I had a fantastic experience with Day Night Packers and Movers. Their team was punctual, polite, and incredibly hardworking. They handled all of our items with care and precision, ensuring nothing was damaged during the move. Kudos to the team!!"
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/client3.jpg"} height="200px" width="200px">
            <div class="text">Shalini Dey, Siliguri, West Bengal<br /><br />
            "Day Night Packers and Movers exceeded my expectations, as I was searching for packers and movers near me. Their team went above and beyond to ensure my move went smoothly. I'm grateful for their excellent service and would highly recommend them to anyone in need of a moving company."
            </div>
          </div>

          <div class="mySlides fade">
            <img alt="" loading="lazy" src=${"assets/client4.jpg"} height="200px" width="200px">
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

  <div id="charges-table" class="contact border-bottom-class" style="background: ${brand};">
  <div class="iyohgi" style="text-align: center;">
    <h2 class="i78bq-2-3" style="color: white;">Fair Pricing, Exceptional Value: Explore Packers and Movers Charges at Day Night packers and Movers</h2>
    <div id="table-parent">
      <table style="border-color: white;">
        <thead style="background: #262626; color: white;">
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
            <td>By Road with labor and fuel cost</td>
            <td>Rs 12,000 to 14,500</td>
            <td>Rs 17,000 to 20,000</td>
            <td>Rs 21,000 to 25,000</td>
            <td>-</td>
          </tr>
          <tr style="background: #ffede8;">
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

  <div id="process-steps" class="contact border-bottom-class" style="background: #fddfd6;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="i78bq-2-3 contact-details">Unlocking Convenience: The Seamless Steps to Avail Services at Day Night Packers and Movers</h2>
      <div id="process-steps-content">
        <div style="text-align: left; display: flex; flex-direction: column; gap: 40px; padding: 0px 150px 0px 150px;" class="process-card-parent">
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">01 </b>  Get in Touch for a Seamless Moving Experience! 📦✨ <br />Contact Us Today!</div>
          <div class="card process-cards" style="align-self: flex-end;"><b style="font-size: 30px;">02 </b>  Planning Your Move? Let's Get Started with a Free Survey and Quotation!</div>
          <div class="card process-cards" style="align-self: flex-start;"><b style="font-size: 30px;">03 </b>  Ready to Make Your Move? Book with Us Today and Be a part of Smooth Transition!</div>
        </div>
      </div>
    </div>
  </div>

  <div id="services" class="services border-bottom-class iyohgi">
    <div id="iymxg" class="service-info">
      <h2 class="i78bq contact-details " data-custom-content="services">
      Everywhere You Need Us to Be: Discovering Global Presence of Day Night Packers and Movers
      </h2>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <div class="fill-form-img-div" style="align-self: center;">
        <img alt="" loading="lazy" width="500px" height="auto" src="assets/around-world.gif"></img>
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
  </div>`
      : ``
  }
  `
  }

  <div id="contact" class="contact border-bottom-class" style="background: #047d9d;">
    <div class="iyohgi" style="text-align: center;">
      <h2 class="contact-details ">Doubts Dismissed: Let Us Clear the Path to Clarity with Day Night Packers and Movers</h2>
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div class="fill-form-img-div" style="align-self: center;">
          <img alt="" loading="lazy" width="500px" height="auto" src="assets/contact-us.gif"></img>
        </div>
        <div>
        <p id="iqrh3-2-2" class="contact-details" style="margin-bottom: 10px; margin-top: 20px;">Contact us</p>
        <div class="igiuzk flex-div row-div">
          <a id="i2tpy3" aria-label="facebook" href="https://www.facebook.com/profile.php?id=61559284304658" target="_blank"><img alt="facebook page link" loading="lazy" id="i3gekg" height="49px" width="49px" src=${"assets/fb.svg"} /></a>
          <a id="i2tpy3-2" aria-label="instagram" href="https://www.instagram.com/daynightpackersand/" target="_blank"><img alt="instagram page link" loading="lazy" id="i3gekg-2" height="33px" width="33px" src=${"assets/insta.svg"} /></a>
          <a id="i2tpy3-5" aria-label="whatsapp" href="https://wa.me/+919911198767" target="_blank"><img alt="chat on whatsapp" loading="lazy" id="i3gekg-3" height="40px" width="40px" src=${"assets/whatsapp.svg"} /></a>
          <a id="i2tpy3-3" aria-label="email" href="mailto:daynightpackersandmovers@gmail.com"><img alt="compose email" loading="lazy" id="i3gekg-4" height="37px" width="37px"
              src=${"assets/email.svg"} /></a>
          <a aria-label="mobile" href=tel:+919911198767><img alt="call" loading="lazy" id="i3gekg-5" height="37px" width="37px" src=${"assets/tel.svg"} /></a>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright-footer" style="background-color: aliceblue;">
    <div class="igiuzk flex-div row-div" style="gap: 20px;">
      <a href="https://www.daynightpackersmovers.com/"><b>Home</b></a>
      <a href="https://www.daynightpackersmovers.com/about-day-night-packers-movers.html"><b>About Us</b></a>
      <a href="https://www.daynightpackersmovers.com/self-preparation-before-shifting.html"><b>Blogs</b></a>
      <a href="https://www.daynightpackersmovers.com/queries-before-shifting.html"><b>FAQs</b></a>
      <a href="https://www.daynightpackersmovers.com/#our-services"><b>Services</b></a>
      <a href="https://www.daynightpackersmovers.com/contact-day-night-packers-movers.html"><b>Contact Us</b></a>
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

applyAnimationWhenInViewport(".fading-text", "fade");
applyAnimationWhenInViewport(".sliding-text", "slide-right");
