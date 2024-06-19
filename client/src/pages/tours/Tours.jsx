import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

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
  cursor: pointer; 
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

const Tours = () => {
  const [tours, setTours] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/tours/`);
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [loading]);

  return (
    <Container>
      <ToursSection>
        <SectionTitle>All Tours</SectionTitle>
        <TourList>
          {tours ? (
            tours.map((tour) => (
              <TourCard
                key={tour.id}
                onClick={() => navigate(`/tours/${tour.id}`)}
              >
                <TourImage src={tour.image} alt={tour.title} />
                <TourInfo>
                  <TourTitle>{tour.title}</TourTitle>
                  <TourDescription>{tour.description}</TourDescription>
                </TourInfo>
              </TourCard>
            ))
          ) : (
            <SyncLoader color={"#f0f0f0"} loading={loading} size={20} />
          )}
        </TourList>
      </ToursSection>
    </Container>
  );
};

export default Tours;
