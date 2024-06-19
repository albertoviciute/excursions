import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api"; // Assuming you have BASE_URL defined in your API utils

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ToursSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const TourList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TourCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TourImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TourInfo = styled.div`
  padding: 20px;
`;

const TourTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const TourDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Button = styled.button``;

const Tour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);
  const handleDelete = () => {
    axios.delete(`${BASE_URL}/tours/${id}`);
    navigate("/tours");
  };
  return (
    <Container>
      <ToursSection>
        <TourList>
          {loading ? (
            <SyncLoader color={"#f0f0f0"} loading={true} size={20} />
          ) : (
            tour && (
              <>
                <SectionTitle>Title: {tour[0].title}</SectionTitle>
                <TourCard key={id}>
                  <TourImage src={tour[0].image} alt={tour[0].title} />
                  <TourInfo>
                    <TourTitle>{tour[0].price} EUR</TourTitle>
                    <TourDescription>{tour[0].duration}</TourDescription>
                  </TourInfo>
                  <Button onClick={handleDelete}>Delete</Button>
                  <Button onClick={() => navigate(`/edit-tour/${id}`)}>
                    Edit
                  </Button>
                </TourCard>
              </>
            )
          )}
        </TourList>
      </ToursSection>
    </Container>
  );
};

export default Tour;
