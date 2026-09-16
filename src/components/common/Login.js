import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "../../stylesheets/homepage.module.scss";
import font from "../../stylesheets/font.module.scss";
import API from "../../helpers/api";
import toast from "react-hot-toast";
import * as auth from "../../helpers/auth";
import { useRouter } from "next/router";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { useLoader } from "../../constants/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  // const { setLoading } = useLoader();
  const [loading, setLoading] = useState(false)
  const [showSplash, setShowSplash] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { email, password };
    API.apiPost("login", payload)
      .then((response) => {
        const data = response?.data?.response;

        if (data) {
          toast.success("Successfully Login.");
          auth.login(
            `Bearer ${data?.token?.access}`,
            data?.token?.refresh,
            data
          );
          setLoading(false);
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error?.errorMessage ||
          "Invalid mobileNo/password."
        );
        setLoading(false);
      });
  };

  const handleLogin = () => {
    toast.success("Successfully Login.");
    router?.push("/home")
  }

  if (showSplash) {
    return (
      <AnimatePresence>
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            background: "#15240F",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="../images/welcome.gif"
            alt="Loading..."
            style={{
              width: "60%",
              maxHeight: "120%",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{ minHeight: "100vh", overflow: "hidden", background: "#F8FFF4" }}
    >
      <Container fluid className="vh-100">
        <Row className="h-100">
          {/* Left Panel */}
          <Col
            lg={6}
            md={6}
            className="d-flex flex-column justify-content-center px-5"
          >
            <div>
              <h1 className="text-center">
                Welcome To{" "}
                <span style={{ color: "#1795ac" }}>AUTO CAPTION</span>
              </h1>
              <motion.div
                className={`${styles.loginBox} mt-5`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <Form>
                  <div className="position-relative">
                    <Form.Label className={`${font.font14} mb-0`}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your email address"
                      className={`${font.formControl} ps-5`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Image
                      src="./images/Mail.png"
                      className={`${styles.mailIcon}`}
                    />
                  </div>
                  <div className="position-relative mt-4">
                    <Form.Label className={`${font.font14} mb-0`}>
                      Enter Password
                    </Form.Label>
                    <Form.Control
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      className={`${font.formControl} ps-5`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Image
                      src="./images/Passowrd.png"
                      className={`${styles.mailIcon}`}
                    />
                    {showPass ? (
                      <IoEyeOutline
                        className={`${styles.eyeIcon} CP`}
                        onClick={handleChange}
                      />
                    ) : (
                      <IoEyeOffOutline
                        className={`${styles.eyeIcon} CP`}
                        onClick={handleChange}
                      />
                    )}
                  </div>
                  <Button
                    className={`${font.loginBtn} mt-5`}
                    onClick={handleLogin}
                  >
                    LOGIN
                  </Button>
                </Form>
              </motion.div>
              <motion.p
                className={`${font.font14} green fw700 text-center mt-4 CP`}
                // onClick={() => router.push("/forgot-password")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Forgot Password?
              </motion.p>
            </div>
          </Col>

          {/* Right Panel */}
          <Col
            lg={6}
            md={6}
            className="d-none d-md-flex flex-column justify-content-center align-items-center"
            style={{
              background: "#bdbec3",
              color: "#fff",
              padding: "4rem 2rem",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <Image
              src="../images/logo.png"
              className="img img-fluid"
              style={{ width: "100%", maxWidth: "100px" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h1 style={{ color: "#1795ac" }}>AUTO CAPTION</h1>
              <h3 style={{ color: "#FFFFFF", lineHeight: "45px" }}>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
              </h3>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}
