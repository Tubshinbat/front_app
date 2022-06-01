import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import base from "lib/base";
import { ToastContainer } from "react-toastify";
import { toastControl } from "lib/toastControl";
import { useRouter } from "next/router";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";
import { getInfo, getSocials } from "lib/webinfo";
import { getMenus } from "lib/menu";
import { getBanners } from "lib/banner";
import { getDownloads } from "lib/download";
import { getAbouts, getShortAbouts } from "lib/about";
import { getHows } from "lib/how";
import { getScreens } from "lib/screens";
import Link from "next/link";
import { maxLength, minLength, regEmail, requiredCheck } from "lib/inputRegex";
import { sendContact } from "lib/contact";

export default ({
  info,
  menus,
  banners,
  downloads,
  shortAbouts,
  hows,
  about,
  screens,
  socialLinks,
}) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [currentHow, setHow] = useState("how-1");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formData, setForm] = useState({});

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".header");

      if (window.pageYOffset > 100) {
        header.classList.add(`headerSticky`);
      } else {
        header.classList.remove(`headerSticky`);
      }
    };
  }, []);

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    const valueErrors = Object.keys(errors);
    let result;

    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);

      if (name === "email" && result === true) result = regEmail(val);
      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkForm(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkForm(event.target.name, event.target.value);
  };

  const send = async () => {
    if (allCheck()) {
      const { success, error } = await sendContact(formData);
      if (success) {
        toastControl("success", success);
        setForm({});
        router.push("#");
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  return (
    <Fragment>
      <section className="head">
        <nav className="header">
          <div className="container header-menu">
            <div className="header-left">
              <Link href="/">
                <a className="Logo">
                  <img src={base.cdnUrl + "/" + info.logo} />
                </a>
              </Link>
              <ul className="menus">
                {menus &&
                  menus.map((menu) => (
                    <li key={menu._id}>
                      <a href={menu.direct}> {menu.name} </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="socialLinks">
              {socialLinks &&
                socialLinks.map((social) => (
                  <li>
                    <a href={social.link} target="_blank">
                      <i className={`fa-brands fa-${social.name}-f`}></i>
                    </a>
                  </li>
                ))}
            </div>
          </div>
        </nav>

        <div className={`mobileHeader `}>
          <div className="mid">
            {
              <Link href="/">
                <img
                  src={`${base.cdnUrl}/${info.logo}`}
                  className="mobileLogo"
                />
              </Link>
            }
          </div>
          <div className="burger-menu" onClick={handleToggle}>
            <span className="line"> </span>
            <span className="line"> </span>
            <span className="line"> </span>
          </div>
        </div>
        <div
          className={`menuMobile  ${
            active === true ? "displayBlock" : "displayNone"
          }`}
        >
          <h5>
            <i className="fa-solid fa-xmark" onClick={handleToggle}></i> Үндсэн
            цэс
          </h5>
          <ul>
            {menus &&
              menus.map((menu) => (
                <li key={`mobile-${menu._id}`} onClick={() => handleToggle()}>
                  <a href={menu.direct}> {menu.name} </a>
                </li>
              ))}
          </ul>
          <div className="contactMobile">
            <li>
              <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
            </li>
            <li>
              <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
            </li>
            <li>Хаяг: {info.address}</li>
          </div>
          <div className="socialMobile">
            {socialLinks &&
              socialLinks.map((el) => (
                <a href={el.link} target="_blank">
                  <i class={`fa-brands fa-${el.name.toLowerCase()}-square`}></i>
                </a>
              ))}
          </div>
        </div>
        <div
          className={`menuMobile-bg ${
            active === true ? "displayBlock" : "displayNone"
          }`}
          onClick={handleToggle}
        ></div>

        <Swiper
          loop={true}
          modules={[EffectFade, Autoplay]}
          effect="fade"
          // autoplay={{
          //   delay: 5000,
          // }}
          className="header-banner"
        >
          {banners &&
            banners.map((banner) => (
              <SwiperSlide className="bannerItem" key={banner._id}>
                <section
                  className="banner-item"
                  style={{
                    backgroundImage: `url(${
                      base.cdnUrl + "/" + banner.picture
                    })`,
                  }}
                >
                  <div className="container-mid">
                    <div className="container banner-container">
                      <div className="row colomn-res">
                        <div className="col-lg-4">
                          <div className="mobile-1">
                            <img src="/images/mobile-1.png" />
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="banner-text">
                            <h3 className="banner-top-title"> {banner.name}</h3>
                            <p className="banner-desc">{banner.details}</p>
                          </div>
                          <div className="download-links">
                            {downloads &&
                              downloads.map((download) => (
                                <div className="download-link">
                                  <a href={download.link} target="_blank">
                                    <img
                                      src={base.cdnUrl + "/" + download.picture}
                                    />
                                  </a>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ffffff"
                      fill-opacity="1"
                      d="M0,320L80,298.7C160,277,320,235,480,234.7C640,235,800,277,960,282.7C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                  </svg>
                  <div className="banner-mask"></div>
                </section>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      <section className="infos">
        <div className="container">
          <div className="row">
            {shortAbouts &&
              shortAbouts.map((short, index) => (
                <div
                  className="col-lg-4 wow animate__animated animate__fadeInUp"
                  data-wow-delay={`${index * 0.4}s`}
                  key={short._id}
                >
                  <div className="info">
                    <div className="info-logo">
                      <img src={base.cdnUrl + "/" + short.picture} />
                    </div>
                    <h5>{short.name}</h5>
                    <p>{short.shortDetails}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="howto" id="how">
        <div className="howtoUp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,64L60,58.7C120,53,240,43,360,64C480,85,600,139,720,181.3C840,224,960,256,1080,250.7C1200,245,1320,203,1380,181.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div
                className="howTitle wow animate__animated animate__fadeInUp"
                data-wow-delay={`0.3s`}
              >
                <h3>Хэрхэн ажилладаг вэ?</h3>
              </div>
              <div className="howButtons">
                {hows &&
                  hows.map((how, index) => (
                    <button
                      className={`howbtn ${
                        "how-" + index === currentHow && "current"
                      } wow animate__animated animate__fadeIn`}
                      data-wow-delay={`${index * 0.5}s`}
                      onClick={() => setHow(`how-${index}`)}
                    >
                      {how.name}
                    </button>
                  ))}
              </div>
              {hows &&
                hows.map((how, index) => (
                  <p
                    className={`how ${
                      "how-" + index === currentHow ? "block" : "none"
                    } wow animate__animated animate__fadeIn`}
                  >
                    {how.details}
                  </p>
                ))}

              <div className="rounded"></div>
              <div className="square"></div>
            </div>
            <div className="col-lg-4">
              <div className="mobile-2">
                <img src="/images/mobile-2.png" className="mb-2-img" />
                <div className="shape1">
                  <img src="/images/shape1.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="about wow animate__animated animate__fadeIn"
        data-wow-delay={`0.6s`}
        id="about"
      >
        <div className="container">
          {about && (
            <>
              <div className="aboutTitle">
                <h3>{about[0].name}</h3>
              </div>
              <p className="section-about">{about[0].shortDetails}</p>
              <div className="row">
                <div className="col-lg-5">
                  <div className="about-img">
                    <img src={base.cdnUrl + "/" + about[0].picture} />
                  </div>
                </div>
                <div className="col-lg-7">
                  <p className="about-info">{about[0].details}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="screenshots">
        <Swiper
          loop={true}
          slidesPerView={8}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            1399: {
              slidesPerView: 8,
            },
            1023: {
              slidesPerView: 6,
            },
            782: {
              slidesPerView: 5,
            },
            605: {
              slidesPerView: 4,
            },
            400: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            },
            200: {
              slidesPerView: 2,
            },
          }}
          centeredSlides={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
            el: ".slider_pagination",
          }}
          modules={[Pagination]}
          className="screen-slider wow animate__animated animate__fadeIn"
          data-wow-delay={`0.6s`}
        >
          {screens &&
            screens.map((screen) => (
              <SwiperSlide className="screen">
                <img src={base.cdnUrl + "/" + screen.picture} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="iphone-frame">
          <img
            src="images/mobile-3.png"
            alt="iphone-image"
            className="wow animate__animated animate__fadeIn"
            data-wow-delay={`0.6s`}
          />
        </div>
        <div className="screen-slider-footer">
          <div className="slider__pagination-wrapper">
            <div className="slider_pagination swiper-pagination"></div>
          </div>
        </div>
      </section>
      <section
        className="contact wow animate__animated animate__fadeIn"
        data-wow-delay={`0.6s`}
        id="contact"
      >
        <div className="container">
          <div className="row contactForm">
            <p>
              Хэрэв танд манай аппликэйшний талаар бидэнтэй хуваалцах мэдээлэл,
              хамтран ажиллах санал, хүсэлт байвал дараах цахим шууданд илгээнэ
              үү <a href={`mailto:${info.mail}`}> {info.email}</a>
            </p>
            <div className="col-lg-6">
              <input
                className="contact-form"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Таны нэр"
              />
              <div className="field"> {errors.name && errors.name} </div>
            </div>
            <div className="col-lg-6">
              <input
                className="contact-form"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Таны имэйл"
              />
              <div className="field"> {errors.email && errors.email} </div>
            </div>
            <div className="col-lg-12">
              <textarea
                className="contact-textarea"
                name="message"
                onChange={handleChange}
                placeholder="Санал хүсэлт, сэтгэгдэлээ оруулна уу"
              ></textarea>
              <div className="field"> {errors.message && errors.message} </div>
            </div>
            <div className="contact-footer">
              <button className="contact-btn" onClick={send}>
                {" "}
                Илгээх{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bg">
          <img src="/images/footer-bg.png" />
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-contacts">
            <div
              className="footer-contact wow animate__animated animate__fadeInDown"
              data-wow-delay={`0.4s`}
            >
              <a href={`"mailto:${info.email}`}>
                <i className="fa-solid fa-envelope"></i>
                {info.email}
              </a>{" "}
            </div>
            <div
              className="footer-contact wow animate__animated animate__fadeInDown"
              data-wow-delay={`0.6s`}
            >
              <a href={`callto: ${info.phone}`}>
                <i className="fa-solid fa-phone"></i>
                {info.phone}
              </a>{" "}
            </div>
          </div>
          <div className="footer-foot">
            <div className="copy">
              Бүх эрхийг хуулиар хамгаалсан © {new Date().getFullYear()}
            </div>
            <div className="socials-footer">
              <li>
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();
  const { menus } = await getMenus();
  const { banners } = await getBanners();
  const { downloads } = await getDownloads();
  const { shortAbouts } = await getShortAbouts();
  const { hows } = await getHows();
  const { about } = await getAbouts();
  const { screens } = await getScreens();
  const { socialLinks } = await getSocials();

  return {
    props: {
      info,
      menus,
      banners,
      downloads,
      shortAbouts,
      hows,
      about,
      screens,
      socialLinks,
    },
    revalidate: 50,
  };
};
