import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
      .then((response) => {
        console.log(response);
        setTitle(response.data.title);
        setDescription(response.data.description);

        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      title,
      description,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`,
        updatedProject
      );
      navigate(`/projects/${params.projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = () => {
    // ...delete logic should be here

    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
      .then(() => {
        navigate("/projects");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* if (isFetching) {
    return <h3> Loading... </h3>
  } */

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={isFetching ? "Loading..." : ""}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={isFetching}>
          Update Project
        </button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
