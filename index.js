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

function onSubmit() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const movingDate = document.getElementById("moving-date").value;

  const subject = `Inquiry | ${name}`;
  const emailContent = `You got an inquiry! <br /><br /> <b>Name:</b> ${name} <br /> <b>Phone:</b> ${phone} <br /> <b>Moving From:</b> ${from} <br /> <b>Moving To:</b> ${to} <br /> <b>Requested Moving Date:</b> ${movingDate} <br />`;
  const key = "C658082A837A6EF33562359FC952BB33D40E";

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "eshagoyal98@gmail.com",
    // Password: key,
    To: "eshagoyal98@gmail.com",
    From: "eshagoyal98@gmail.com",
    Subject: subject,
    Body: emailContent,
  }).then((message) => {
    const modalImg = document.getElementById("modal-img");
    const modalP = document.getElementById("modal-p");
    const { isLocation } = getPathAndLocation();
    if (message === "OK") {
      modalImg.src = isLocation ? "../assets/tick.svg" : "assets/tick.svg";
      modalP.innerHTML = "Email sent successfully!";
    } else {
      modalImg.src = isLocation ? "../assets/cross.svg" : "assets/cross.svg";
      modalP.innerHTML = "Unable to send email!";
    }
    showModal();
  });
}

function createHtmlContent(isLocation) {
  return `
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="iu9w" class="navbar-cont">
    <!-- <div id="iyfr81-2" class="resp-menu">
        <div id="i11hrv-2">
          <a id="icweon-2" href="/">Home</a>
          <a id="i7ux92-2" href="/about/index.html"
            >Services</a
          >
          <a id="i4aufb-2" href="/contact/index.html">About</a>
          <a id="itwuck-2" href="/help/index.html">Clients</a>
          <a id="itwuck-2-2" href="/help/index.html"
            >Contact</a
          >
        </div>
      </div> -->
    <div id="ibulz" class="nav-inner" style="justify-content: space-between;">
      <div class="flex-div row-div" style="gap: 10px;">
        <img id="i7tv" src=${
          isLocation ? "../assets/logo.png" : "assets/logo.png"
        } width="auto" height="100px"></img>
        <h1 id="max-width-content">Packers and Movers</h1>
      </div>
      <div class="flex-div col-div">
        <div class="flex-div row-div" style="align-self: flex-start;">
          <img src=${
            isLocation ? "../assets/phone.svg" : "assets/phone.svg"
          } width="30px" height="30px"></img>
          <h4>33183901801</h4>
        </div>
        <div class="flex-div row-div" style="align-self: flex-start;">
          <img src=${
            isLocation ? "../assets/mail.svg" : "assets/mail.svg"
          } width="30px" height="30px"></img>
          <h4 style="margin: 5px;">abc.com</h4>
        </div>
      </div>

      <!-- <div id="i7ce" class="nav-links">
          <a id="i7gk" href="/#header">Home</a>
          <a id="idaj" href="/#services">Services</a>
          <a id="iu8w2" href="/#about">About</a>
          <a id="ihb0i" href="/#testimonials">Testimonials</a>
          <a id="ihb0i-2" href="#/clients">Clients</a>
          <a id="ihb0i-3" href="/#contact">Contact</a>
        </div> -->
      <!-- <div id="iu06p">
          <div id="i6jg-3-3-2" class="menu-item-1">
            <a
              id="iz026q-2"
            
              href="/#form-2"
              autocomplete="off"
              class="log-in"
              >Call Now</a
            >
          </div>
        </div> -->
      <!-- <div id="iywjo" class="menu-box">
          <img
            id="iicpb"
        
            src="https://granite-ecs-test.s3.amazonaws.com/cms/asset/0343c7dd-4521-4de0-ade2-f6eb7194f1f1.png"
          />
        </div> -->
    </div>
  </div>
  <div id="header" class="header">
    <img id="igitx"
      src="https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_1081,h_960,al_br,q_90,usm_0.66_1.00_0.01,enc_auto/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png"
      alt="" fetchpriority="high" />
    <div id="is6pf">
      <h1 id="i1itu" data-custom-content="good-advice">
        The Power of <br id="ie9xy" />Good Advice
      </h1>
      <p id="idax7" data-custom-content="description">
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

  <div id="form-detail" class="contact">
    <div id="iyohgi" class="flex-div col-div" style="align-items: unset;">
      <h2 id="i78bq-2-3">INQUIRE</h2>
      <div style="display: flex; justify-content: space-around; flex-direction: row;">
        <div id="fill-form-img-div" style="align-self: center;">
            <img height="auto" width="400px" src=${
              isLocation ? "../assets/fillForms.svg" : "assets/fillForms.svg"
            }></img>
        </div>
        <div id="customer-form">
          <form class="flex-div col-div" style="align-items: flex-start;" onsubmit="onSubmit()">
            <label for="name">Name*</label>
            <input id="name" placeholder="Enter Name" autocomplete="off" required></input>
            <label for="phone">Phone*</label>
            <input id="phone" type="tel" placeholder="Enter Phone" autocomplete="off" required pattern="[0-9]{10}"></input>
            <label for="from">Moving From*</label>
            <select id="from" placeholder="Select Location" autocomplete="off" required>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
            </select>
            <label for="to">Moving To*</label>
            <select id="to" placeholder="Select Location" autocomplete="off" required>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
            </select>
            <label for="moving-date">Request Moving Date*</label>
            <input id="moving-date" type="date" autocomplete="off" required></input>
            <button id="submit-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>  
    </div>
  </div>

  <div id="services" class="services">
    <div id="iymxg" class="service-info">
      <h2 id="i78bq" data-custom-content="services">
        OUR SERVICES
      </h2>
      <!-- <p id="iqrh3">
          Taking Your Business to
          <br id="im8z6" />
          the Next Level
        </p> -->
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
      <!-- <div id="ilmjk-2" class="service-cont">
          <svg
            id="i9kl3d"
        
            preserveAspectRatio="xMidYMid meet"
            data-bbox="20 34.606 159.999 126.634"
            viewBox="20 34.606 159.999 126.634"
            height="200"
            width="200"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="presentation"
            aria-hidden="true"
            aria-labelledby="svgcid-udmxjp18njyw"
          >
            <defs id="ib00ls"></defs>
            <title id="svgcid-udmxjp18njyw"></title>
            <g id="ih5frb">
              <path
                id="iygbjz"
            
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M60.163 40.369a5.763 5.763 0 1 1-11.526 0 5.763 5.763 0 0 1 11.526 0z"
                fill="#000000"
                data-color="1"
              ></path>
              <path
                id="i7qo8f"
            
                d="M37.029 103.69l40.464 40.531a9.606 9.606 0 0 1 0 13.572l-.627.628a9.604 9.604 0 0 1-13.583.011l-.011-.011-40.465-40.531a9.606 9.606 0 0 1 0-13.572l.627-.628a9.604 9.604 0 0 1 13.583-.011c.005.003.008.007.012.011z"
                fill="#E7E7EB"
                clip-rule="evenodd"
                fill-rule="evenodd"
                data-color="2"
              ></path>
              <path
                id="imtnbf"
            
                d="M62.556 144.076L162.971 43.492a9.604 9.604 0 0 1 13.583-.011l.011.011.627.628a9.606 9.606 0 0 1 0 13.572L76.777 158.276a9.604 9.604 0 0 1-13.583.011l-.011-.011-.627-.628a9.604 9.604 0 0 1 0-13.572z"
                fill="#9E3FFD"
                clip-rule="evenodd"
                fill-rule="evenodd"
                data-color="3"
              ></path>
            </g>
          </svg>
          <h3 id="iaqap-2" class="service-name">
            Business Plans
          </h3>
          <p id="ipekj-2" class="service-desc">
            I'm a paragraph. Click here to add your own text and edit me.
          </p>
        </div>
        <div id="ilmjk-3" class="service-cont">
          <svg
            id="ibvrrp"
        
            preserveAspectRatio="xMidYMid meet"
            data-bbox="26.982 26 146.037 148"
            viewBox="26.982 26 146.037 148"
            height="200"
            width="200"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="presentation"
            aria-hidden="true"
            aria-labelledby="svgcid--q10526lqxiie"
          >
            <defs id="iibh3q"></defs>
            <title id="svgcid--q10526lqxiie"></title>
            <g id="irul34">
              <path
                id="ieb2q3"
            
                fill="#16163F"
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M173.019 168.11a5.89 5.89 0 1 1-11.78 0 5.89 5.89 0 0 1 11.78 0z"
                data-color="1"
              ></path>
              <path
                id="iis2d6"
            
                fill="#16163F"
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M173.019 168.11a5.89 5.89 0 1 1-11.78 0 5.89 5.89 0 0 1 11.78 0z"
                data-color="1"
              ></path>
              <path
                id="iy50vo"
            
                fill="#E7E7EB"
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M153.608 59.374v93.252H60.356V59.374h93.252z"
                data-color="2"
              ></path>
              <path
                id="ixjv2l"
            
                fill="#9E3FFD"
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M92.749 26v65.767H26.982V26h65.767z"
                data-color="3"
              ></path>
            </g>
          </svg>
          <h3 id="iaqap-3" class="service-name">
            Business Plans
          </h3>
          <p id="ipekj-3" class="service-desc">
            I'm a paragraph. Click here to add your own text and edit me.
          </p>
        </div> -->
    </div>
  </div>
  <!-- <div id="i1p8v1" class="service-numbers">
      <h2 id="iy25xc">We're Good with Numbers</h2>
      <div id="ik8mtv">
        <div id="iemi8a-5-2" class="numbers">
          <h3
            id="i4kkjg-5-2"
        
            data-custom-content="h"
            class="num"
          >
            15
          </h3>
          <p id="ihcms2-5-2" class="num-desc">
            Years of Experience
          </p>
        </div>
        <div id="iemi8a-2" class="numbers">
          <h3
            id="i4kkjg-2"
        
            data-custom-content="f"
            class="num"
          >
            36
          </h3>
          <p id="ihcms2-2" class="num-desc">
            Qualified Experts
          </p>
        </div>
        <div id="iemi8a-3" class="numbers">
          <h3
            id="i4kkjg-3"
        
            data-custom-content="h"
            class="num"
          >
            120
          </h3>
          <p id="ihcms2-3" class="num-desc">
            Clients Every year
          </p>
        </div>
        <div id="iemi8a-4" class="numbers">
          <h3
            id="i4kkjg-4"
        
            data-custom-content="r"
            class="num"
          >
            9
          </h3>
          <p id="ihcms2-4" class="num-desc">Intl. Partners</p>
        </div>
      </div>
    </div>
    <div id="about" class="about">
      <div id="ivxz4q" class="about-info">
        <div id="i3skrg">
          <h2 id="i78bq-2">ABOUT</h2>
          <p id="iqrh3-2">Our Experts Are the Finest</p>
          <p id="iq0nkw" class="para">
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop me
            anywhere you like on your page. I’m a great place for you to tell a
            story and let your users know a little more about you.
          </p>
          <p id="i4j886" class="para">
            This is a great space to write a long text about your company and
            your services. You can use this space to go into a little more
            detail about your company. Talk about your team and what services
            you provide. Tell your visitors the story of how you came up with
            the idea for your business and what makes you different from your
            competitors. Make your company stand out and show your visitors who
            you are.
          </p>
        </div>
      </div>
      <div id="ii7bc1" class="about-img-cont">
        <img
          id="iivwvc"
        
          src="https://granite-ecs-test.s3.amazonaws.com/cms/asset/311430aa-33e8-4e71-a35a-7e6b70c95f59.jpg"
        />
      </div>
    </div>
    <div id="testimonials" class="testimonials">
      <h2 id="inn5ir">Testimonials</h2>
      <p id="ilxl61">
        “I'm a testimonial. Click to edit me and add text”
      </p>
    </div>
    <div id="clients" class="clients-cont">
      <div id="irf093" class="our-clients">
        <h2 id="ie3h9q">OUR HAPPY CLIENTS</h2>
      </div>
      <div id="irf093-2" class="clients-box">
        <svg
          id="if9jxf"
        
          preserveAspectRatio="xMidYMid meet"
          data-bbox="0.558 0.13 196.922 50.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.558 0.13 196.922 50.5"
          height="51"
          width="198"
          data-type="color"
          role="presentation"
          aria-hidden="true"
        >
          <defs id="iw78ai"></defs>
          <g id="i2i43k" fill-rule="evenodd">
            <path
              id="i6ll5y"
            
              d="M105.583.13v50.5H.558V.13h105.025zM25.245 12.093H14.19v3.357h2.882v17.397H14.19v3.323h11.597c1.289 0 2.408-.068 3.595-.407 2.611-.78 4.781-3.188 4.781-6.545 0-2.543-1.22-4.883-3.9-5.697v-.068c1.866-.983 2.95-2.916 2.95-5.154 0-2.68-1.491-4.714-3.662-5.562-1.254-.509-2.509-.644-4.306-.644zm29.092 0h-5.053l-7.223 20.754h-2.204v3.323h9.02v-3.323h-2.374l1.492-4.51h7.597l1.492 4.51H54.71v3.323h9.054v-3.323H61.56l-7.223-20.754zm25.735 0H69.457v3.357h2.883v17.397h-2.883v3.323h10.106v-3.323h-2.78v-5.9h2.204c1.39 0 1.83.304 2.34 1.22l3.425 6.206c.746 1.39 1.356 1.797 3.357 1.797h2.814v-3.323h-.78c-.813 0-1.288-.17-1.627-.78l-2.781-5.02c-.475-.88-1.187-1.254-1.187-1.254v-.068c2.78-.95 4.544-3.323 4.544-6.68 0-3.392-1.763-5.562-4.442-6.444-1.357-.406-2.815-.508-4.578-.508zM26.16 25.453c2.205 0 3.493 1.425 3.493 3.494 0 1.526-.712 2.882-1.933 3.391-.508.203-1.153.271-1.73.271h-4.476v-7.155h4.646zm25.701-9.494s.068.915.441 2.102l2.272 6.816h-5.561l2.306-6.816c.339-1.187.44-2.102.44-2.102h.102zm28.177-.306c1.119 0 2.034.136 2.713.441 1.322.543 1.899 1.764 1.899 3.324 0 2.577-1.526 3.967-3.866 3.967h-4.002v-7.732h3.256zm-54.793 0c.847 0 1.492.102 2.068.374.95.508 1.39 1.56 1.39 2.746 0 1.832-1.05 3.154-2.95 3.154h-4.239v-6.274h3.73z"
              fill="#16163F"
              data-color="1"
            ></path>
            <path
              id="ibgsnx"
            
              d="M197.48.13v50.5h-86.847V.13h86.847zm-62.257 11.963h-3.832l-6.036 5.799 2.577 2.713 1.933-1.832c.78-.78 1.051-1.356 1.051-1.356h.068s-.03.709-.034 1.465V32.61h-5.256v3.561h14.717v-3.56h-5.188V12.092zm19.224-.407c-5.765 0-7.97 4.815-7.97 4.815l3.052 2.103s1.73-3.018 4.545-3.018c2.034 0 3.662 1.153 3.662 3.425 0 5.188-11.53 6.341-11.53 15.023 0 .678.102 1.356.238 2.136h16.684v-6.613h-3.798v3.052h-8.308c.101-4.95 11.292-6.341 11.292-13.802 0-4.544-3.628-7.121-7.867-7.121zm25.226.407h-3.832l-6.036 5.799 2.577 2.713 1.933-1.832c.78-.78 1.051-1.356 1.051-1.356h.068s-.03.709-.034 1.465V32.61h-5.256v3.561h14.717v-3.56h-5.188V12.092z"
              fill="#16163F"
              data-color="1"
            ></path>
          </g>
        </svg>
        <svg
          id="i9msgy"
        
          preserveAspectRatio="xMidYMid meet"
          data-bbox="0.424 0.937 185.415 23.599"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.424 0.937 185.415 23.599"
          height="25"
          width="186"
          data-type="color"
          role="presentation"
          aria-hidden="true"
        >
          <defs id="imcckw"></defs>
          <g id="igngrf">
            <path
              id="i224mc"
            
              d="M20.887 24.076l1.708-.016c.56 0 1.107-.016 1.644-.048.355-.022.612-.06.773-.113.162-.054.344-.132.548-.234a.894.894 0 0 0 .427-.403c.08-.166.121-.392.121-.676 0-.285-.14-.46-.419-.524-.107-.032-.34-.067-.7-.105a1.743 1.743 0 0 1-.92-.354c-.252-.199-.378-.535-.378-1.007V4.886c0-.592.21-.984.629-1.177.118-.054.343-.1.676-.137.333-.038.602-.102.806-.193.204-.092.306-.256.306-.492 0-.505-.424-.908-1.273-1.208-.44-.161-1.434-.242-2.98-.242h-.613c-.376 0-.838.016-1.386.048-.376.022-.663.062-.862.121a5.86 5.86 0 0 0-.62.226.958.958 0 0 0-.468.378 1.09 1.09 0 0 0-.145.572c0 .22.062.395.186.524.123.129.459.22 1.007.274.806.075 1.208.51 1.208 1.305v6.655H6.353V4.885c0-.601.21-.988.629-1.16.118-.054.343-.097.676-.129.752-.086 1.128-.322 1.128-.709-.021-.677-.462-1.117-1.32-1.321-.42-.086-1.379-.129-2.877-.129-1.499 0-2.516.048-3.054.145-.419.075-.709.212-.87.41a1.035 1.035 0 0 0-.241.67c0 .247.032.445.096.596.065.15.435.252 1.112.306.806.064 1.209.505 1.209 1.321v15.71c0 .591-.21.973-.629 1.145-.118.053-.349.107-.693.16-.73.098-1.095.334-1.095.71.032.666.462 1.106 1.289 1.321.408.086 1.364.129 2.868.129h.294c1.344-.007 2.272-.06 2.783-.161.43-.075.726-.212.887-.411.16-.199.241-.47.241-.814 0-.343-.145-.548-.435-.612-.096-.032-.327-.067-.693-.105a1.753 1.753 0 0 1-.926-.354c-.253-.199-.379-.535-.379-1.007v-7.203h13.81v7.203c0 .569-.21.95-.63 1.144-.128.064-.356.118-.684.16-.328.044-.59.116-.79.218-.198.102-.298.288-.298.556 0 .269.081.505.242.71.365.461 1.327.692 2.884.692zm27.644.322c2.32 0 4.405-.392 6.252-1.176 3.255-1.386 4.883-3.475 4.883-6.268V4.176c0-.215.225-.376.676-.483l1.354-.322c.451-.108.677-.274.677-.5a1.06 1.06 0 0 0-.161-.588c-.108-.167-.277-.3-.508-.403a4.965 4.965 0 0 0-.7-.25 4.957 4.957 0 0 0-.927-.137 19.761 19.761 0 0 0-1-.048 45.27 45.27 0 0 0-.853-.008c-.285 0-.583-.003-.895-.008a13.698 13.698 0 0 0-.677 0c-.14.005-.349.01-.628.016-.28.005-.489.021-.628.048-.14.027-.315.062-.524.105-.21.043-.37.102-.483.177a4.43 4.43 0 0 0-.347.258.777.777 0 0 0-.25.363 1.578 1.578 0 0 0-.072.5c0 .187.225.33.677.426.45.097.9.202 1.345.314.446.113.669.293.669.54v12.44c0 .902-.226 1.71-.677 2.425a5 5 0 0 1-1.837 1.716c-.773.43-1.638.757-2.594.983-.956.225-2.047.338-3.271.338-1.225 0-2.439-.215-3.642-.644-1.203-.43-2.18-1.05-2.932-1.862-.752-.81-1.128-1.726-1.128-2.747V4.176c0-.215.225-.376.676-.483l1.354-.322c.451-.108.677-.274.677-.5a1.06 1.06 0 0 0-.17-.596c-.112-.172-.295-.309-.547-.411a5.404 5.404 0 0 0-.741-.242 6.017 6.017 0 0 0-1-.129 24.741 24.741 0 0 0-1.063-.048 50.3 50.3 0 0 0-.943-.008H37.22c-.548 0-.967.021-1.257.064-.172.033-.379.07-.62.113-.242.043-.427.1-.556.17-.13.07-.26.155-.395.257a.889.889 0 0 0-.29.363c-.06.14-.089.303-.089.491s.234.33.701.427c.468.097.932.202 1.394.314.462.113.693.293.693.54v12.665c0 1.032.228 1.977.685 2.836a6.361 6.361 0 0 0 1.829 2.143c2.32 1.719 5.392 2.578 9.216 2.578zm23.922-.241c2.03.515 3.851.505 5.463-.033.397-.14.725-.34.982-.604.258-.263.387-.561.387-.894 0-.183-.225-.368-.677-.556l-1.353-.564c-.451-.188-.677-.373-.677-.556V6.61c7.853 8.582 12.934 14.098 15.243 16.548.774.838 1.43 1.256 1.966 1.256.698 0 1.048-.59 1.048-1.772l.016-18.127c0-.14.445-.387 1.337-.742.892-.354 1.337-.601 1.337-.74 0-1.397-1.546-2.096-4.64-2.096-1.257 0-2.31.323-3.158.967-.44.333-.661.71-.661 1.128 0 .161.462.414 1.386.757l.19.073c.797.305 1.195.523 1.195.653v11.488l.017.113v2.111L76.707 1.807v.017c-.29-.258-1.026-.387-2.207-.387h-.21c-.687 0-1.251.021-1.692.064a2.9 2.9 0 0 0-.741.13 3.537 3.537 0 0 0-.548.25.92.92 0 0 0-.395.402 1.26 1.26 0 0 0-.12.556c0 .204.464.427 1.393.669.93.241 1.394.464 1.394.668V20.95c0 .29-.23.508-.693.653-.462.145-.926.282-1.394.41-.467.13-.7.323-.7.58 0 .763.553 1.284 1.66 1.564zm43.289-.098c.16-.001.364-.007.613-.015.312-.01.554-.03.726-.057.171-.026.378-.061.62-.104s.427-.102.556-.177a5.38 5.38 0 0 0 .475-.323c.188-.14.282-.397.282-.773 0-.258-.46-.465-1.378-.62-.918-.156-1.377-.39-1.377-.701V3.45l4.72.016c.334 0 .63.186.887.556.258.37.457.782.596 1.233.366 1.192.822 1.788 1.37 1.788.838 0 1.257-.462 1.257-1.385 0-.484-.038-.951-.113-1.402-.28-1.816-.972-2.75-2.079-2.804a253.11 253.11 0 0 0-4.589-.031l-1.024-.001h-10.113c-1.225 0-2.07.346-2.538 1.04-.467.692-.7 1.726-.7 3.101 0 .988.418 1.482 1.256 1.482.505 0 .975-.596 1.41-1.788.435-1.193.916-1.789 1.442-1.789l4.721-.016v17.84c0 .279-.225.461-.677.547-.45.086-.902.17-1.353.25-.451.08-.677.255-.677.524 0 .967 1.3 1.45 3.9 1.45h1.787zm33.204.065c1.096 0 2.095-.43 2.997-1.289.903-.859 1.354-1.826 1.354-2.9 0-1.074-.42-1.611-1.257-1.611-.44 0-.86.228-1.257.684a10.484 10.484 0 0 0-1.16 1.668c-.376.655-.66 1.08-.854 1.273h-10.296v-8.717h6.896c.086.15.228.467.427.95.199.484.392.833.58 1.048a.91.91 0 0 0 .717.322c.548 0 .948-.32 1.2-.959.253-.639.38-1.399.38-2.28 0-2.062-.608-3.093-1.822-3.093-.225 0-.585.5-1.08 1.498-.182.365-.31.586-.386.66h-6.912v-8.04h10.892c-.01.258-.016.739-.016 1.442 0 .704.132 1.273.395 1.708.263.436.738.653 1.426.653 1.106 0 1.66-.795 1.66-2.385 0-.924-.25-1.708-.75-2.352-.5-.645-1.157-.967-1.974-.967h-13.422c-1.482 0-2.492.048-3.03.145-.418.075-.711.212-.878.41a.975.975 0 0 0-.25.637c0 .226.022.409.065.548.022.054.057.1.105.137.048.038.089.067.12.089.033.021.092.04.178.056s.193.032.322.049c.13.016.269.034.42.056.805.107 1.208.548 1.208 1.321v15.71c0 .591-.21.973-.629 1.145-.118.053-.349.107-.693.16-.73.098-1.095.334-1.095.71.032.666.472 1.112 1.321 1.337.408.075 1.354.113 2.836.113l12.262.064zm34.21.194c1.789 0 2.683-.425 2.683-1.273a.882.882 0 0 0-.274-.645c-1.471 0-2.543-.255-3.214-.765a13.13 13.13 0 0 1-1.958-1.861 20.54 20.54 0 0 1-.919-1.12 43.632 43.632 0 0 1-.846-1.128c-.22-.306-.518-.728-.894-1.265l-.57-.81-.23-.322-.102-.14-.838-1.16c1.482-.291 2.76-.753 3.835-1.387a7.041 7.041 0 0 0 1.539-1.2 5.183 5.183 0 0 0 1.03-1.636 5.258 5.258 0 0 0 .396-2.006c0-.693-.078-1.297-.234-1.812a5.065 5.065 0 0 0-.62-1.354 4.077 4.077 0 0 0-1.023-1.04 7.885 7.885 0 0 0-1.298-.765 8.649 8.649 0 0 0-1.595-.531 29.145 29.145 0 0 0-2.352-.444c-.946-.145-2.793-.217-5.543-.217h-2.788c-.902 0-1.67.021-2.304.064a7.134 7.134 0 0 0-1.128.13c-.3.064-.596.147-.886.25-.29.101-.508.235-.653.402a.856.856 0 0 0-.217.58c0 .22.225.376.676.467.452.092.903.19 1.354.298.451.108.677.29.677.548V21.29c0 .43-.452.66-1.354.692a2.472 2.472 0 0 0-.934.202c-.28.123-.42.357-.42.7 0 .344.183.608.548.79.183.097.395.175.637.234.242.059.505.097.79.113a28.045 28.045 0 0 0 1.861.032c.311-.005.91-.008 1.796-.008s1.62-.048 2.2-.145c.45-.086.762-.234.934-.443.172-.21.258-.492.258-.846 0-.161-.226-.304-.677-.427a42.838 42.838 0 0 1-1.353-.395c-.451-.14-.677-.306-.677-.5v-7.202h4.463l1.338 2.45c1.847 3.426 3.475 5.72 4.882 6.88h-.016c.892.601 2.232.902 4.02.902zM172.82 12.136h-4.351V5.643c0-.946.204-1.563.612-1.854.409-.29 1.335-.435 2.78-.435 1.445 0 2.758.178 3.94.532.709.204 1.3.478 1.772.822.473.344.857.811 1.152 1.402.296.59.443 1.262.443 2.014 0 2.675-2.116 4.012-6.348 4.012z"
              fill="#16163F"
              data-color="1"
            ></path>
          </g>
        </svg>
        <svg
          id="igv4a2"
        
          preserveAspectRatio="xMidYMid meet"
          data-bbox="-0.01 0.796 245.721 51.114"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-0.01 0.796 245.721 51.114"
          height="52"
          width="246"
          data-type="color"
          role="presentation"
          aria-hidden="true"
        >
          <defs id="if87il"></defs>
          <g id="i15kr8">
            <path
              id="ipwmc3"
            
              d="M9.602 43.744c0-.624.052-1.3.104-2.08 7.124-1.196 11.96-1.664 16.536-1.768 1.976 0-1.508-5.044-2.392-5.096-3.068-.156-7.436.26-13.52 1.56 1.508-10.348 4.888-25.22 6.864-31.668-.988-.78-5.304-2.548-6.708-1.716C8.198 9.424 4.974 28.3 3.57 37.972c-1.04.312-2.132.572-3.276.884-1.196.312 1.404 4.316 3.12 4.004l.364-.104c1.716.832 5.772 2.184 5.824.988zm22.1-1.768c8.632 0 11.18-12.48 11.492-18.252.156-5.46-.988-10.556-8.008-10.556-1.404 0-2.392.624-2.392.624-.156-.468-.832-.936-1.716-1.3-4.212.988-8.476 9.672-8.788 16.484-.208 5.772 2.34 13 9.412 13zm-.884-4.472c-1.976 0-2.86-3.016-2.652-6.708.104-1.82.468-3.172.468-3.172.26.208 1.352.624 1.404.416.572-2.756 3.068-11.336 5.928-11.336 1.976 0 1.56 3.484 1.456 4.888-.156 2.912-2.028 15.912-6.604 15.912zm23.816 5.252c8.424 0 11.336-7.54 11.336-10.14 0-2.444-1.248-3.38-2.548-3.38-.884 0-1.664.312-1.664.312-.416 3.484-3.276 8.996-7.384 8.996-2.288 0-3.952-1.456-3.952-6.24 0-7.696 2.756-14.716 5.252-14.716.572 0 .832.468.78 1.196-.104 3.172-1.924 5.72-1.924 5.72 0 .052 0 .208.052.312.156 1.456 1.144 2.392 2.912 2.392 2.34 0 4.472-2.6 4.472-7.436 0-3.484-3.952-5.98-7.332-5.98-7.644 0-11.18 10.504-11.18 17.316 0 7.124 4.94 11.648 11.18 11.648zm17.576-.78c8.632 0 11.18-12.48 11.492-18.252.156-5.46-.988-10.556-8.008-10.556-1.404 0-2.392.624-2.392.624-.156-.468-.832-.936-1.716-1.3-4.212.988-8.476 9.672-8.788 16.484-.208 5.772 2.34 13 9.412 13zm-.884-4.472c-1.976 0-2.86-3.016-2.652-6.708.104-1.82.468-3.172.468-3.172.26.208 1.352.624 1.404.416.572-2.756 3.068-11.336 5.928-11.336 1.976 0 1.56 3.484 1.456 4.888-.156 2.912-2.028 15.912-6.604 15.912zm36.816 5.252c8.32 0 12.324-7.332 12.324-11.232 0-2.184-.832-3.796-1.872-4.888a41.955 41.955 0 0 1 5.252-.468c.832 0 .936-.728.936-1.092 0-.416-1.144-1.924-2.08-2.808-.416-.416-.832-.572-2.34-.572-1.664 0-5.096.416-7.54 1.196-2.34-.572-6.136-.156-6.136 1.508 0 .936 1.664 4.108 3.068 3.9.884-.104 2.028-.364 3.38-.676.52.728.936 1.716.936 3.016 0 4.472-3.068 7.436-7.228 7.436-3.276 0-5.2-3.172-5.2-8.216 0-10.504 7.176-23.036 10.712-23.036.728 0 1.768.52 1.768 1.976 0 4.524-3.328 6.916-3.328 7.436 0 .572 1.82 2.548 3.9 2.548 2.652 0 5.2-3.536 5.2-8.06 0-4.472-4.108-8.008-8.788-8.008-9.828 0-15.912 16.276-15.912 25.272 0 8.84 4.836 14.768 12.948 14.768zm21.424-2.028c.26-7.436 2.808-14.352 4.004-17.16.156 2.392.884 5.2 4.784 5.2 3.432 0 5.616-3.432 5.668-5.928 0-1.456-1.664-1.56-1.976-1.56-.312 0-1.248 3.744-3.64 3.744-.78 0-1.352-.78-1.352-1.456.104-3.536 2.548-6.812 2.6-8.58.052-.988-.416-1.82-2.236-2.236-2.132-.468-3.692 0-4.108 1.404-.676 2.34-1.768 6.76-3.068 9.88l-.312-.156c.208-2.86.936-6.448 1.144-9.1 0 0-2.496-1.456-4.16-1.456-1.84 0-2.402 3.462-2.714 7.142l-.043.54c-.029.36-.055.722-.08 1.08l-.038.536-.037.53c-.78 10.452-1.352 13.832-1.352 15.34 0 1.144 5.408 2.964 6.916 2.236zm30.888.676c4.992 0 7.488-5.252 7.488-8.268 0-2.808-3.172-2.392-3.172-2.392-.364 3.276-1.04 6.448-3.432 6.448-1.508 0-1.872-1.664-1.768-3.9.052-3.952 1.196-9.256 2.756-14.508.364-1.144-2.236-1.196-2.808-1.404 0 0 .104-.364.104-.676 0-2.08-2.756-4.368-7.54-4.368-7.384 0-11.856 9.36-11.856 18.616 0 6.552 3.64 10.452 8.788 10.452 2.912 0 5.252-1.976 6.292-3.796h.312c.156 1.248 1.3 3.796 4.836 3.796zm-11.96-4.264c-1.196 0-1.612-1.196-1.508-4.212.208-5.096 2.6-16.692 5.876-16.692.744 0 .825.848.832 1.364v.248a9.083 9.083 0 0 1-1.716 4.836c.624.78 2.08 1.092 2.08 1.092-.104 1.768-2.912 13.364-5.564 13.364zm18.096 14.768c.52-.052.988-.052 1.248-1.144.312-1.82.832-7.8 1.456-11.908.884 1.716 2.548 2.86 5.304 2.86 7.436 0 11.128-11.128 11.284-18.096.104-5.304-2.08-10.296-7.696-10.296-1.924 0-3.796 1.404-5.408 3.692.052-.624.156-1.248.26-1.872.052-.572-3.224-2.184-4.784-2.184-1.82 0-3.172 11.18-3.432 17.628-1.82 9.62-4.108 19.448-2.912 19.916.988.52 4.108 1.456 4.68 1.404zm7.228-14.56c-1.924 0-2.652-3.016-2.496-6.708.104-1.612.52-3.172.52-3.172.26.26 1.144.624 1.196.468.572-2.756 3.016-11.284 5.772-11.284 1.872 0 1.508 3.432 1.404 4.888-.156 2.86-2.028 15.808-6.396 15.808zm18.148 4.264c1.352 0 2.028-.572 2.028-.572.468-6.604 4.628-16.64 5.564-17.888l.572.104c-.364 1.3-1.56 6.864-1.56 10.036 0 4.004 1.768 8.164 6.552 8.164 4.836 0 8.944-3.692 8.944-7.384 0-2.496-2.964-2.184-2.964-2.184-.572 2.86-2.132 5.98-3.9 5.98-1.56 0-2.184-1.508-2.184-3.484 0-5.824 3.276-16.068 3.276-18.72 0-1.144-3.12-2.912-6.292-2.912-2.34 0-6.968 12.636-8.06 15.756l-.468-.104c0-2.184 2.132-15.392 2.912-18.304.52-2.184 1.508-4.368 1.508-7.176 0-1.352-4.888-2.704-5.876-1.872-2.496 2.236-5.408 31.356-5.408 36.296 0 2.288 2.6 4.264 5.356 4.264zm27.04-30.472c4.628 0 6.136-3.38 6.136-5.2 0-1.56-1.092-2.184-2.184-2.652.52-1.82-.572-2.184-2.392-2.184-3.692 0-4.628 4.836-4.628 6.396 0 2.6 1.924 3.64 3.068 3.64zm-2.08 30.992c5.98 0 9.62-5.408 9.62-8.892 0-2.808-3.276-2.496-3.276-2.496-.156 1.976-1.352 7.228-4.264 7.228-.78 0-1.404-.832-1.352-2.652.048-3.518 2.196-11.86 3.628-16.913l.22-.77.104-.361c.624-2.132-4.836-2.912-5.564-2.912-.468 0-.988.104-1.196.676-1.3 3.692-4.212 15.288-4.212 20.228 0 4.628 2.34 6.864 6.292 6.864zm24.648.468l1.456-1.144c.676-.572.26-1.716-.208-2.6a251.613 251.613 0 0 0-5.98-10.868c3.38-4.212 6.968-8.476 8.84-9.516.364-.988-2.808-4.524-3.952-4.524-1.404 0-4.836 3.536-8.684 7.956-1.768-2.756-3.536-5.148-5.044-6.76-.936-.936-2.028-1.144-2.392-.832l-1.612 1.924c-.364.416-.988.988-.104 1.768 1.976 1.924 4.004 4.68 5.98 7.696-3.536 4.264-6.916 8.684-8.996 11.232-.728.884 2.548 4.42 3.588 4.368 0 0 2.132-.156 5.668-3.692l-.312-.988c.832-.936 2.236-2.652 3.848-4.68 2.236 3.9 4.212 7.644 5.72 10.244.572 1.04 1.612.832 2.184.416z"
              fill="#16163F"
              data-color="1"
            ></path>
          </g>
        </svg>
        <svg
          id="in3pj9"
        
          preserveAspectRatio="xMidYMid meet"
          data-bbox="0.405 0.672 246.651 33"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.405 0.672 246.651 33"
          height="34"
          width="248"
          data-type="color"
          role="presentation"
          aria-hidden="true"
        >
          <defs id="ibhplz"></defs>
          <g id="i18c0v">
            <path
              id="i5x9hw"
            
              d="M29.84 33.672c2.333 0 3.213-1.716 3.213-3.52V4.412c0-2.904-1.98-3.564-3.916-3.564h-2.024c-2.244 0-3.3.88-4.048 3.3l-6.204 20.328h-.088L10.481 4.148c-.748-2.42-1.804-3.3-4.048-3.3H4.321c-1.936 0-3.916.66-3.916 3.564v25.74c0 1.804.88 3.52 3.212 3.52 2.332 0 3.212-1.716 3.212-3.52V10.528h.088l6.732 21.032c.484 1.496 1.584 2.112 3.08 2.112s2.596-.616 3.08-2.112l6.732-21.032h.088v19.624c0 1.804.88 3.52 3.212 3.52zM41.358 7.36a3.343 3.343 0 0 0 3.344-3.344A3.343 3.343 0 0 0 41.358.672a3.343 3.343 0 0 0-3.344 3.344 3.343 3.343 0 0 0 3.344 3.344zm0 26.312c2.508 0 3.212-1.496 3.212-3.212V12.728c0-1.716-.704-3.212-3.212-3.212s-3.212 1.496-3.212 3.212V30.46c0 1.716.704 3.212 3.212 3.212zm26.52 0c1.98 0 2.904-1.056 2.904-3.036V4.06c0-2.112-1.276-3.212-3.212-3.212-1.936 0-3.212 1.1-3.212 3.212v8.712h-.088c-1.276-2.068-3.476-3.256-6.336-3.256-6.776 0-9.9 5.764-9.9 11.924 0 8.316 4.708 12.232 10.076 12.232 3.124 0 5.72-1.32 6.776-4.048h.088v1.012c0 1.98 1.012 3.036 2.904 3.036zm-8.316-5.016c-3.432-.088-5.104-3.212-5.104-6.996 0-2.992 1.012-7.128 5.104-7.128 3.916-.044 5.148 3.828 5.148 7.128 0 3.652-1.408 6.996-5.148 6.996zm41.426 4.444c9.636 0 15.224-5.808 15.224-15.84 0-12.408-7.216-15.84-15.092-15.84h-8.8c-2.552 0-4.224 1.012-4.224 4.224v23.232c0 3.212 1.672 4.224 4.224 4.224h8.668zm.396-5.808h-6.072V7.228h6.028c5.28 0 7.656 3.784 7.656 10.032 0 4.884-1.848 10.032-7.612 10.032zm21.857 6.38c2.508 0 3.212-1.496 3.212-3.212v-7.48c0-5.324 1.408-7.128 4.004-7.128h1.144c1.584 0 3.168-.836 3.168-3.212 0-1.804-1.496-3.124-3.52-3.124-3.124 0-4.576 2.772-5.324 5.456h-.088v-2.464c0-1.936-1.276-2.992-2.904-2.992s-2.904 1.056-2.904 2.992V30.46c0 1.716.704 3.212 3.212 3.212zm24.188 0c3.872 0 10.076-1.804 10.076-5.676 0-1.188-1.1-2.508-2.64-2.508-2.596 0-2.596 3.168-7.436 3.168-3.74 0-5.94-2.464-5.94-5.852h14.52c2.156 0 2.816-.572 2.816-2.772 0-5.28-4.224-10.516-11.616-10.516-7.612 0-12.144 5.016-12.144 12.496 0 5.588 3.388 11.66 12.364 11.66zm5.324-14.564H141.49c.704-3.124 2.64-5.104 5.852-5.104 2.86 0 5.06 2.156 5.412 5.104zm28.281 14.564c1.54 0 2.904-1.012 2.904-2.464 0-1.012-.66-1.628-.66-4.312v-10.78c0-4.62-4.268-6.6-10.428-6.6-6.6 0-10.208 3.256-10.208 5.808 0 1.32 1.1 2.464 2.728 2.464 2.552 0 2.684-3.52 7.436-3.52 2.156 0 4.048.792 4.048 2.64s-1.232 2.2-2.772 2.376l-3.916.44c-4.928.572-8.976 2.068-8.976 7.392 0 4.048 3.608 6.556 7.26 6.556 3.388 0 6.292-.968 8.8-3.74.088 1.98 1.012 3.74 3.784 3.74zm-9.856-4.224c-2.2 0-3.564-1.188-3.564-2.64 0-1.936 1.452-2.772 4.136-3.168l2.332-.352c.748-.132 2.068-.352 2.772-1.012v2.508c0 2.376-2.156 4.664-5.676 4.664zm49.049 4.224c2.508 0 3.212-1.496 3.212-3.212V17.304c0-5.764-3.564-7.788-8.008-7.788-3.476 0-5.764 1.54-7.568 4.048-1.188-3.036-3.96-4.048-6.16-4.048-3.256 0-6.072 1.496-7.744 4.048h-.088v-.836c0-1.936-1.144-3.212-3.036-3.212-1.892 0-3.036 1.276-3.036 3.212V30.46c0 1.716.704 3.212 3.212 3.212s3.212-1.496 3.212-3.212V19.768c0-2.992 2.2-4.972 4.664-4.972 2.508 0 3.52 1.848 3.52 4.136V30.46c0 1.716.704 3.212 3.212 3.212s3.212-1.496 3.212-3.212V19.768c0-2.992 2.2-4.972 4.664-4.972 2.508 0 3.52 1.848 3.52 4.136V30.46c0 1.716.704 3.212 3.212 3.212zm16.929 0c4.84 0 9.9-2.42 9.9-7.656 0-4.488-4.356-6.028-8.008-6.864l-2.684-.616c-1.98-.44-3.432-.792-3.432-2.288 0-1.364 1.452-1.98 3.696-1.98 4.048 0 4.136 2.948 6.644 2.948 1.672 0 2.684-1.32 2.684-2.816 0-2.948-4.928-4.884-9.812-4.884-4.444 0-9.636 1.936-9.636 7.172 0 4.312 2.904 5.852 6.644 6.776l3.784.924c2.288.572 3.696.836 3.696 2.464 0 1.32-1.452 2.332-3.74 2.332-4.752 0-5.016-3.96-7.788-3.96-1.804 0-2.596 1.276-2.596 2.684 0 3.168 4.84 5.764 10.648 5.764z"
              fill="#16163F"
              data-color="1"
            ></path>
          </g>
        </svg>
        <svg
          id="ilrkvg"
        
          preserveAspectRatio="xMidYMid meet"
          data-bbox="0.844 0.929 180.389 35.578"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.844 0.929 180.389 35.578"
          height="37"
          width="182"
          data-type="color"
          role="presentation"
          aria-hidden="true"
        >
          <defs id="ie0a2s"></defs>
          <g id="icxc1t">
            <path
              id="ix5s3e"
            
              d="M4.617 36.08c4.372 0 7.405-.756 9.097-2.269 1.377-1.212 2.366-2.972 2.965-5.278.614-2.41.92-5.525.92-9.344 0-4.162-.276-7.36-.83-9.59-.555-2.306-1.483-4.178-2.786-5.616-.868-.958-1.856-1.624-2.965-1.999C9.821 1.595 8.346 1.4 6.594 1.4H.844v34.68h3.773zm.899-4.088V5.331H6.1c2.515 0 4.245 1.003 5.188 3.01.943 2.006 1.415 5.682 1.415 11.028 0 4.971-.494 8.318-1.482 10.04-.959 1.722-2.86 2.583-5.705 2.583zm19.589 4.088l1.325-6.76h6.873l1.303 6.76h4.627L31.798 1.4h-3.639l-7.547 34.68h4.493zm7.524-10.377h-5.548l.854-4.447c.449-2.396.838-4.66 1.168-6.795.33-2.133.599-4.241.808-6.322.434 4.267.996 8.28 1.685 12.039l1.033 5.525zM50.062 36.08L56.867 1.4H52.51l-2.246 12.803c-.06.314-.124.674-.191 1.078s-.138.846-.213 1.325l-.786 5.279-.607 4.02c-.03.18-.06.404-.09.674s-.067.577-.112.92l-.225-1.706c-.075-.57-.16-1.206-.258-1.91-.097-.703-.206-1.482-.326-2.335l-.74-5.031-.36-2.314L44.266 1.4h-4.604l6.694 34.68h3.706zm23.025 0v-3.953h-7.749V20.29h6.873v-3.953h-6.873V5.353h7.75V1.4H60.666v34.68h12.421zm17.504.427c2.635 0 4.537-.876 5.705-2.628.793-1.198 1.19-3.152 1.19-5.862V1.4h-4.694v26.392c0 2.89-1.026 4.335-3.077 4.335-.734 0-1.767-.397-3.1-1.19v4.671c1.093.6 2.418.899 3.976.899zm21.947 0c3.205 0 5.488-1.288 6.85-3.864 1.363-2.575 2.045-6.925 2.045-13.05 0-4.372-.21-7.696-.63-9.972-.419-2.456-1.092-4.35-2.02-5.683-1.408-1.991-3.565-2.987-6.47-2.987-3.249 0-5.555 1.288-6.917 3.863-1.348 2.56-2.022 6.926-2.022 13.095 0 6.918.681 11.732 2.044 14.442 1.378 2.77 3.751 4.156 7.12 4.156zm-.112-4.268c-1.602 0-2.696-.928-3.28-2.785-.569-1.962-.853-5.48-.853-10.557 0-5.51.27-9.179.809-11.005.554-1.812 1.662-2.718 3.324-2.718s2.763.988 3.302 2.965c.539 1.961.808 5.944.808 11.949 0 4.642-.292 7.824-.876 9.546-.584 1.737-1.662 2.605-3.234 2.605zm19.477 3.841l-.248-15.116c0-.434-.003-.824-.01-1.168a22.093 22.093 0 0 0-.034-.876l-.248-4.29-.247-3.527c-.015-.194-.037-.43-.067-.707-.03-.277-.067-.61-.112-1l.236 1.034c.067.3.116.554.146.763.359 1.677.752 3.28 1.179 4.807.427 1.527.88 3.017 1.359 4.47l5.233 15.61h4.38V1.4h-4.694v12.938c0 1.916.09 3.96.27 6.132.179 2.17.456 4.597.83 7.277-1.033-4.432-2.223-8.603-3.571-12.51L131.655 1.4h-4.357v34.68h4.605zm30.572 0v-3.953h-7.749V20.29h6.873v-3.953h-6.873V5.353h7.749V1.4h-12.42v34.68h12.42zm10.672.427c2.366 0 4.305-.846 5.817-2.538 1.513-1.737 2.269-3.946 2.269-6.626 0-1.977-.344-3.646-1.033-5.01-.689-1.407-1.984-3.076-3.886-5.008a63.51 63.51 0 0 1-2.527-2.65c-.651-.734-1.12-1.333-1.404-1.797-.554-.869-.83-1.91-.83-3.122 0-1.378.389-2.478 1.167-3.302.779-.868 1.782-1.303 3.01-1.303 1.138 0 2.418.51 3.84 1.528v-4.56a10.11 10.11 0 0 0-4.76-1.19c-2.397 0-4.306.8-5.728 2.403-1.408 1.587-2.112 3.736-2.112 6.446 0 2.007.36 3.669 1.078 4.987.375.673.951 1.46 1.73 2.358.779.898 1.76 1.932 2.942 3.1.764.763 1.4 1.456 1.91 2.077.509.622.905 1.172 1.19 1.651.554 1.003.831 2.134.831 3.392 0 1.452-.36 2.601-1.078 3.447-.719.846-1.715 1.27-2.987 1.27-1.363 0-2.875-.607-4.538-1.82v4.627c1.408 1.093 3.108 1.64 5.1 1.64z"
              fill="#16163F"
              data-color="1"
            ></path>
          </g>
        </svg>
      </div>
    </div> -->
  <div id="contact" class="contact">
    <!-- <div id="i3skrg-2"> -->
    <div id="iyohgi" style="text-align: center;">
      <h2 id="i78bq-2-2">CONTACT</h2>
      <p id="iqrh3-2-2" style="margin-bottom: 10px; margin-top: 20px;">Let's Work Together</p>
      <!-- <div class="flex-div col-div" style="font-size: x-large;" id="ic40w5">
            <a class="contact-details" href="mailto:someone@example.com">abc.com</a>
            <a class="contact-details" href=“tel:5556667777”>Tel: 555-666-7777</a>
          </div> -->
      <div id="igiuzk">
        <a id="i2tpy3" href=""><img id="i3gekg" height="30px" width="30px" src=${
          isLocation ? "../assets/fb.svg" : "assets/fb.svg"
        } /></a>
        <a id="i2tpy3-2" href=""><img id="i3gekg-2" height="30px" width="30px" src=${
          isLocation ? "../assets/insta.svg" : "assets/insta.svg"
        } /></a>
        <a id="i2tpy3-3" href="mailto:someone@example.com"><img id="i3gekg-2" height="30px" width="30px"
            src=${
              isLocation ? "../assets/email.svg" : "assets/email.svg"
            } /></a>
        <a id="i2tpy3-4" href=“tel:5556667777”><img id="i3gekg-2" height="30px" width="30px" src=${
          isLocation ? "../assets/tel.svg" : "assets/tel.svg"
        } /></a>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <div class="copyright-footer">
    <p id="iy2lbi">© 2035 by BizBud. Powered and secured by Wix</p>
  </div>
  <wix-bg-media id="bgMedia_comp-kq5dfsdh" data-container-id="comp-kq5dfsdh" data-container-size="0, 0"
    data-page-id="qhya0" data-bg-effect-name="BgParallax" class="SUz0WK">
    <wow-image id="img_comp-kq5dfsdh"
      data-image-info='{"containerId":"comp-kq5dfsdh","alignType":"bottom_right","displayMode":"fill","targetWidth":980,"targetHeight":960,"isLQIP":true,"imageData":{"width":3840,"height":1800,"uri":"84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png","name":"","displayMode":"fill"}}'
      data-bg-effect-name="BgParallax" data-has-ssr-src=""
      data-src="https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_1081,h_960,al_br,q_90,usm_0.66_1.00_0.01,enc_auto/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png"
      class="HlRz5e Kv1aVt dLPlxY mNGsUM bgImage">
    </wow-image>
  </wix-bg-media>

  <div id="modal" class="modal">
    <!-- Modal content -->
    <div class="modal-content flex-div col-div">
      <img id="modal-img" width="50px" height="50px"></img>
      <p id="modal-p"></p>
    </div>
  </div>`;
}

function manageDOM(htmlContent, finalPath) {
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  document.body.appendChild(container);
  removeCurrentLocationLI(finalPath);
}

function removeCurrentLocationLI(finalPath) {
  const li = document.getElementById(finalPath);
  li.remove();
}

function main() {
  const { finalPath, isLocation } = getPathAndLocation();
  const htmlContent = createHtmlContent(isLocation);
  manageDOM(htmlContent, finalPath);
}

main();

// Events handling
closeModal();