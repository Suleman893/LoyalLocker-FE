import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SideBar2 from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import "./style.css";
import "../../../components/dashboard/Dashboard.css";

const ConsumerFAQ = () => {
  const [collapsed, setCollapsed] = useState(false);
  const openSidebar = useSelector((state) => state.consumer.openSidebar);

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
      <SideBar2 />
      <Stack className="main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <div className={`${openSidebar ? 'dashboard-main-div-toggle' : 'dashboard-main-div'}`}>
          <div className="consumer-faq-container">
            <div style={{ display: "flex" }}>
              {" "}
              <div className="faq-title-design"></div>
              <div className="faq-title" style={{paddingLeft:'15px'}}>FAQ'S</div>
            </div>
            <div className="faq-header">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="faq-title">General</div>
              </div>
            </div>
            <div className="faq-q1">
              <p className="faq-q">
                What is the My Origins Rewards loyalty program and how does it
                work?
              </p>
              <p className="faq-ans">
                The My Origins Rewards loyalty program is a points-based program
                through which our customers (like you!) earn points in
                company-owned Origins Retail Stores in the United States
                (excluding Massachusetts) and on Origins.com. Your points unlock
                tier benefits and can be redeemed for rewards. Just another way
                for us to say thank you to our customers and show how much we
                appreciate your loyalty.
              </p>{" "}
            </div>
            <div className="faq-q1">
              <p className="faq-q">Who is eligible to join?</p>
              <p className="faq-ans">
                My Origins Rewards is available to individuals who are legal
                residents of the United States (including its territories and
                possessions) and at least 18 years of age or older and who
                provide and maintain a valid email address. Employees of Origins
                are eligible to participate in the program. Individuals employed
                by our business partners or vendors are eligible for membership
                for personal use only but may be excluded from certain benefits.
              </p>
            </div>
            <div className="faq-header">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="faq-title">MemberShip</div>
              </div>
            </div>
            <div className="faq-q1">
              <p className="faq-q">
                How do I join? Does it cost anything to join?
              </p>
              <p className="faq-ans">
                You may join the program by signing up in-store at an Origins
                Retail Store in the United States (excluding Massachusetts) or
                by visiting Origins.com and clicking on the My Origins account
                page. Here you will follow the prompts to register for My
                Origins Rewards. In order to sign up, you must provide your full
                name and email address. If you sign up online, you will need to
                create a password. There is no cost to join the My Origins
                Rewards loyalty program.
              </p>
            </div>
            <div className="faq-q1">
              <p className="faq-q">What am I agreeing to by joining?</p>
              <p className="faq-ans">
                By becoming a My Origins Rewards member, you agree that you have
                read, understood and agree to be bound by the program Terms &
                Conditions, and by the terms of our Privacy Policy, our website
                Terms and Conditions and by any changes or modifications we may
                make.
              </p>
            </div>
            <div className="faq-header">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="faq-title">Account</div>
              </div>
            </div>
            <div className="faq-q1">
              <p className="faq-q">How do I update my information?</p>
              <p className="faq-ans">
                You can update your information by logging into your My Origins
                account on Origins.com or by informing an associate in a
                participating Origins Retail Store.
              </p>
            </div>
            <div className="faq-q1">
              <p className="faq-q">How do I check my account status?</p>
              <p className="faq-ans">
                Your current Tier and Points status are accessible in the My
                Origins section on Origins.com.
              </p>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default ConsumerFAQ;
