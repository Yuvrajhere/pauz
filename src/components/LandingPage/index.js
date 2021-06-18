import "./LandingPage.css";

import { Link } from "react-router-dom";

// components
import Navbar from "../smallerComponents/Navbar";
import Button from "../smallerComponents/Button";

import Landpage1 from "../../assets/images/Landpage1.png";
import iconDiscord from "../../assets/images/icon_discord.png";
import iconGithub from "../../assets/images/icon_github.png";
import iconInstagram from "../../assets/images/icon_instagram.png";
import iconLinkedin from "../../assets/images/icon_linkedin.png";
import iconTwitter from "../../assets/images/icon_twitter.png";

const LandingPage = () => {
  return (
    <div className="LandingPage container-1">
      <Navbar />
      <main className="container-2">
        <div>
          <img src={Landpage1} alt="character" />
          <div className="main-right">
            <h1>Pauz</h1>
            <p>
              A Private Social Media Platform So You can connect with
              <span> your close ones.</span>
            </p>
            <div className="buttons">
              <Link to="/signup">
                <Button className="primary">Sign Up Now</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="container-2 info">
        <h1>Why choose Pauz?</h1>
        <div>
          <div className="info-card">
            <h1>Connect with only close ones</h1>
            <p>
              We connect our users only to their close friends, family and known
              ones so they can post whatever they want without being judged by
              other people.
            </p>
          </div>
          <div className="info-card">
            <h1>No worries in Posting content</h1>
            <p>
              Pauz allows you to post your pictures and by default only your
              connections will be able to see those, so you can post without
              worrying.
            </p>
          </div>
        </div>
      </div>
      <div className="container-2 info works">
        <h1>How it works?</h1>
        <div>
          <div className="info-card">
            <h1>Easy Signup and Login</h1>
            <p>
              Signup and Login by giving basic details like email, name and
              choose a username for yourself. Once login, You can start
              connecting with your close ones.
            </p>
          </div>
          <div className="info-card">
            <h1>Connect with code</h1>
            <p>
              Once you are logged in, You can go to connect page to generate a
              connection code or enter the code given by your friend and click
              connect.
            </p>
          </div>
          <div className="info-card">
            <h1>Share and engage</h1>
            <p>
              Now that you have few connections, You can upload a post by going
              to Add Post page. You can also see posts uploaded by your
              connections on Home page
            </p>
          </div>
        </div>
      </div>
      <footer className="container-2 info">
        <h1>Know more</h1>
        <div>
          <div className="info-card">
            <h1>About project</h1>
            <p>
              This project was built using MERN stack and only for learning
              purposes. Do try this Web Application and give your valuable
              feedback.
            </p>
          </div>
          <div className="info-card">
            <h1>About me</h1>
            <p>
              I am Yuvraj Singh Chouhan, I am a budding JavaScript developer
              from Bangalore, India. I like to build awesome UIs, landing pages,
              APIs and games using JavaScript. If you ever want to have a chat,
              mail me at{" "}
              <a href="mailto:yuvrajisbest13@gmail.com">
                yuvrajisbest13@gmail.com
              </a>{" "}
              or connect on below platforms.
            </p>{" "}
          </div>
        </div>
        <div className="socials">
          <a href="https://github.com/Yuvrajhere" title="github">
            <img src={iconGithub} alt="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/yuvrajhere/"
            title="linkedin"
          >
            <img src={iconLinkedin} alt="linkedin" />
          </a>
          <a href="https://twitter.com/Yuvraj_Here" title="twitter">
            <img src={iconTwitter} alt="twitter" />
          </a>
          <a href="https://www.instagram.com/yuvraj_singh_c/" title="instagram">
            <img src={iconInstagram} alt="instagram" />
          </a>
          <a
            href="https://discordapp.com/users/301767714685321226/"
            title="discord"
          >
            <img src={iconDiscord} alt="discord" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
