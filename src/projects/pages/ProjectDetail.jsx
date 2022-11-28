import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../shared/components/Carousel";
import MainContainer from "../../shared/components/MainContainer";
import { AuthContext } from "../../context/AuthContext";

const ProjectDetail = (props) => {
  const pid = useParams().pid;
  const [projectDetail, setProjectDetail] = useState({});
  const httpAbortCtrl = new AbortController();
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const getProjectById = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authData.token}` },
          signal: httpAbortCtrl.signal,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            setProjectDetail(data);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Fetch Aborted");
              setProjectDetail({});
            }
          });
      } catch (err) {
        setProjectDetail({});
      }
    };
    // call getProjects
    getProjectById();

    // Abort signal
    return () => httpAbortCtrl.abort();
  }, [authData]);

  return (
    <>
      <MainContainer title="Project View" col="12">
        {projectDetail && <Carousel images={projectDetail.images} />}
        {projectDetail && (
          <div className="col-md-12  center">
            <h3>{projectDetail.title}</h3>
            <p>{projectDetail.description}</p>
            <p>
              <b>Github: </b>
              <a href={projectDetail.github}>{projectDetail.github}</a>
            </p>
            <p>
              <b>Link: </b>
              <a href={projectDetail.url}>{projectDetail.url}</a>
            </p>
          </div>
        )}
      </MainContainer>
    </>
  );
};

export default ProjectDetail;
