import { Col } from "react-bootstrap";

 const ProjectCard = ({ title, description, imgUrl, url }) => {
  return (
    <Col size={12} sm={6} md={4}>
        <div className="proj-imgbx" onClick={()=> window.open(url, "_blank")}>
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
export default ProjectCard