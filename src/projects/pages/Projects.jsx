import React, { Component } from "react";
import HeaderContainer from "../../shared/components/HeaderContainer";
import ProjectItem from "./ProjectItem";
import AlertWarning from "../../shared/components/AlertWarning";

const date = new Date();

const DUMMY_PROJECTS = [
  {
    id: 1,
    title: "First Project",
    date_created: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto praesentium blanditiis magni, nesciunt ex laudantium consequuntur voluptatum repellendus unde doloremque qui distinctio. Porro velit tempore consequuntur sapiente incidunt eum reiciendis.",
    author: "StephenR",
    avatar: "dog.jpg",
    price: 60,
  },
  {
    id: 2,
    title: "Second Project",
    date_created: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
    description: "This is my second project created using MERN STACK",
    author: "StephenR",
    avatar: "dog.jpg",
    price: 0,
  },
  {
    id: 3,
    title: "Third Project",
    date_created: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
    description: "This is my third project created using MERN STACK",
    author: "StephenR",
    avatar: "dog.jpg",
    price: 999,
  },
];

const Projects = (props) => {
  return (
    <React.Fragment>
      <HeaderContainer title="Projects" />
      {DUMMY_PROJECTS.length === 0 && (
        <AlertWarning type="warning" message="No Projects Uploaded" />
      )}
      {DUMMY_PROJECTS.map((project) => {
        return (
          <ProjectItem
            id={project.id}
            key={project.id}
            title={project.title}
            date_created={project.date_created}
            description={project.description}
            author={project.author}
            avatar={project.avatar}
            price={project.price}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Projects;
