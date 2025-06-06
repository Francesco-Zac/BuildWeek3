import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobsArray } from "../redux/action";
import { Button, Card } from "react-bootstrap";

const JobsPage = () => {
  const jobsArray = useSelector((state) => state.jobs.content);
  const dispatch = useDispatch();

  console.log(jobsArray);

  //   const API_BASE = "https://striveschool-api.herokuapp.com/api/jobs";
  const API_BASE = "https://strive-benchmark.herokuapp.com/api/jobs?category=dev&limit=10";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";

  useEffect(() => {
    dispatch(setJobsArray(API_BASE, TOKEN));
  }, []);

  if (!jobsArray) return null;

  return (
    <div className="jobs-page">
      {jobsArray.map((job) => (
        <Card key={job._id}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>{job.category}</Card.Text>
            <Card.Text>{job.job_type}</Card.Text>
            <Card.Text>{job.company_name}</Card.Text>

            <Button variant="primary">scopri di piu</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default JobsPage;
