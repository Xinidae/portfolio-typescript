import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Paste the code here */}
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Xoaesis</title>
          <link rel="stylesheet" href="src/CSS/style.css" />
        </head>
        <body>
          <div className="container">
            {/* Navigation bar */}
            <nav className="navbar">
              <a href="#" className="logo">
                Xoaesis
              </a>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
{/* Hero section */}
<section className="hero">
            <div className="hero-text">
              <h1>Control your content</h1>
              <p>
                Save time managing your content with Xoaesis.
                <br />
                Our intuitive web app lets you manage your content, analytics, and more.
              </p>
              <button>Learn more</button>
            </div>
            <div className="hero-image">
              {/* Replace this image with your own */}
              <img src="src/assets/Kaotic_Music.png" alt="Xoaesis hero image" height={50} width={50} />
            </div>
          </section>

          {/* Project Timeline Section */}
          <section className="project-timeline">
            <h2>Our Timeline</h2>
            <ul>
              <div className="year">2024</div>

              <div className="quarter">
                <div className="break">Q1</div>
                <div className="break">Q2</div>
                <div className="break">Q3</div>
                <div className="break">Q4</div>
              </div>
              <div className="pill-bar">
                <div className="column">Development/<br />Funding</div>
                <div className="column">Enter<br />Accelerator</div>
                <div className="column">Securing<br />Additional<br />Funding</div>
                <div className="column">Launch<br />MVP</div>
              </div>
            </ul>
          </section>

          {/* Development Milestones Section */}
          <section className="development-milestones">
            <h2>Development Milestones</h2>
            <ul>
              <li>Project Setup and Basic Structure</li>
              <li>User Authentication</li>
              <li>Social Media API Integration</li>
              <li>Content Management System Development</li>
              <li>Analytics Dashboard Development</li>
              <li>API Integration Development</li>
              <li>Testing and Quality Assurance</li>
              <li>Deployment and Launch</li>
            </ul>
          </section>

          {/* Development Methodology Section */}
          <section className="development-methodology">
            <h2>Development Methodology</h2>
            <p>
              Xoaesis plans to approach the project by following the Agile methodology, with a focus on iterative development and continuous improvement.
            </p>
          </section>

          {/* Xoaesis Company Milestones */}
          <section className="company-milestones">
            <h2>Company Milestones</h2>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Company Founded</td>
                  <td>09/13/2023</td>
                </tr>
                <tr>
                  <td>Funding Secured</td>
                  <td>TBH</td>
                </tr>
                <tr>
                  <td>MVP Launch</td>
                  <td>Q4 2024</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Projected Workload Allocation Section */}
          <section className="workload-allocation">
            <h2>Projected Workload Allocation</h2>
            <p>The Xoaesis team plans to allocate workload as follows:</p>
            <ul>
              <li>UI/UX Design: 10%</li>
              <li>Database Administration: 20%</li>
              <li>API Development: 30%</li>
              <li>Content Management System Development: 20%</li>
              <li>Analytics Dashboard Development: 10%</li>
              <li>Testing and Quality Assurance: 5%</li>
              <li>Deployment and Launch: 5%</li>
            </ul>
          </section>

          {/* Further Funding Methods Section */}
          <section className="funding-methods">
            <h2>Further Funding Methods</h2>
            <p>Xoaesis current funding:</p>
            <ul>
              <li>Xoaesis has secured $25,000 from Rowans innovation venture fund</li>
              <li>Crowdfunding</li>
              <li>Angel Investment</li>
              <li>Grants</li>
            </ul>
          </section>

          {/* Customer Acquisition Section */}
          <section className="customer-acquisition">
            <h2>Customer Acquisition</h2>
            <p>Xoaesis plans to acquire customers through the following channels:</p>
            <ul>
              <li>Search Engine Optimization</li>
              <li>Social Media Advertising</li>
              <li>Content Marketing</li>
              <li>Referral Marketing</li>
            </ul>
          </section>

          {/* RoadMap Section */}
          <section className="roadmap">
            <h2>RoadMap</h2>
            <p>Xoaesis plans to follow the following roadmap:</p>
            <ol>
              <li>Project Setup and Basic Structure</li>
              <li>User Authentication</li>
              <li>Social Media API Integration</li>
              <li>Content Management System Development</li>
              <li>Analytics Dashboard Development</li>
              <li>API Integration Development</li>
              <li>Testing and Quality Assurance</li>
              <li>Deployment and Launch</li>
            </ol>
          </section>

          {/* Current Allocation of Funds Section */}
          <section className="funds-allocation">
            <h2>Current Allocation of Funds</h2>
            <p>The Xoaesis team has allocated funds as follows:</p>
            <ul>
              <li>UI/UX Design: $50,000</li>
              <li>Database Administration: $100,000</li>
              <li>API Development: $150,000</li>
              <li>Content Management System Development: $100,000</li>
              <li>Analytics Dashboard Development: $50,000</li>
              <li>Testing and Quality Assurance: $25,000</li>
              <li>Deployment and Launch: $25,000</li>
            </ul>
          </section>

          {/* Footer section */}
          <footer className="footer">
            <p>© 2023 Xoaesis. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
</div>
  );
};

export default Home;
