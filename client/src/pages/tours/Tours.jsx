import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import data from "../../utils/tours.json";
import { useNavigate } from "react-router-dom";

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

const Tours = ({
  title, image
}) => {

  
  const navigate = useNavigate();
  return (
    <Container>
      <ToursSection>
        <SectionTitle>All Tours</SectionTitle>
        <TourList>
          {data ? (
            data?.map((tour) => (
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
            <SyncLoader color={"#f0f0f0"} loading={true} size={20} />
          )}
        </TourList>
      </ToursSection>
    </Container>
  );
};

export default Tours;
