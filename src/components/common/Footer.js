import React, { useState, useEffect } from "react";
import styles from "../../stylesheets/layout.module.scss";
import font from "../../stylesheets/font.module.scss";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <div>
      <div className={`${styles.footerBox}`}>
        <Image
          src="images/footerSideImg.png"
          className={`${styles.footerSideImg}`}
        />
        <Container>
          <Row>
            <Col lg={5} md={6} sm={12}>
              <div className="dflexAC">
                <Image
                  src="images/logo.png"
                  className={`${styles.footerLogoImg} me-3`}
                />
                <div>
                  <h6 className={`${font.inter18} fw800 text-white`}>
                    Dummy Project
                  </h6>
                  <h6 className={`${font.poppins} text-white`}>
                    Discover Your Faith, Shop Divine
                  </h6>
                </div>
              </div>
              <h6 className={`${font.font14} ${font.max350} bWhite mt-3`}>
                Kombucha gastropub truffaut bicycle rights tumeric photo booth
                leggings disrupt cray roof party la croix. Tbh bitters pinterest
                la croix yuccie. Irony PBR&B skateboard craft beer taxidermy.
              </h6>
              <div className="dflexAC mt-4 mb-3">
                <div className={`${styles.socialIconBox} dflexCC me-2`}>
                  <FaFacebookF />
                </div>
                <div className={`${styles.socialIconBox} dflexCC me-2`}>
                  <FaInstagram />
                </div>
                <div className={`${styles.socialIconBox} dflexCC me-2`}>
                  <FaYoutube />
                </div>
              </div>
            </Col>
            <Col lg={7} md={6} sm={12} className={`${styles.footerText}`}>
              <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <h5 className={`${font.font20} fw600 text-white`}>
                    Lorem lorem
                  </h5>
                  <h6 className={`${font.font16} fw400 bWhite`}>Help Center</h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>Contact Us</h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Report Abuse
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite `}>
                    Submit a Dispute
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Policies & Rules
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Get Paid for Your Feedback
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>Enquiry</h6>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <h5 className={`${font.font20} fw600 text-white`}>
                    Lorem lorem
                  </h5>
                  <h6 className={`${font.font16} fw400 bWhite`}>Help Center</h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>Contact Us</h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Report Abuse
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite `}>
                    Submit a Dispute
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Policies & Rules
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>
                    Get Paid for Your Feedback
                  </h6>
                  <h6 className={`${font.font16} fw400 bWhite`}>Enquiry</h6>
                </Col>{" "}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${styles.copyRightDiv} py-2`}>
        <p className={`${font.font18} text-center`}>
          COPYRIGHT © 2023. DESIGNED AND DEVELOPED BY{" "}
          <span className="fw600">Apponward Technologies </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
