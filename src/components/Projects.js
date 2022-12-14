import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import  ProjectCard  from "./ProjectCard";
import projImg1 from "../assets/img/a.png";
import projImg2 from "../assets/img/b.png";
import projImg3 from "../assets/img/c.png";
import projImg4 from "../assets/img/d.png";
import projImg5 from "../assets/img/e.png";
import projImg6 from "../assets/img/f.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Projects = () => {

  const projects = [
    {
      title: "Tenzies",
      description: "Game & Desing",
      imgUrl: projImg1,
      url: 'https://tenzies-drab.vercel.app/'
    },
    {
      title: "Travel Journey",
      description: "Design & Development",
      imgUrl: projImg2,
      url: 'https://traveljourney-9va0ghlf5-joacoalnabulsi.vercel.app/'
    },
    {
      title: "Air BnB Clone",
      description: "Design & Development",
      imgUrl: projImg3,
      url: 'https://airbnbclone-theta.vercel.app/'
    },
    {
      title: "Meme Generator",
      description: "Design & Development",
      imgUrl: projImg4,
      url:'https://memegenerator-woad.vercel.app/'
    },
    {
      title: "SpeedTypingGame",
      description: "Game",
      imgUrl: projImg5,
      url:'https://speedgame-joacoalnabulsi.vercel.app/'
    },
    {
      title: "FitnessClubPage",
      description: "Design & Development",
      imgUrl: projImg6,
      url:'https://gymfitness.vercel.app/'
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>All the projects i been working, since i started the journey of learning .</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
export default Projects