import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  text-align: justify-left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  max-width: 400px;
  &::placeholder {
    color: #d9d9d9;
    font-size: 1rem;
  }
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #2a4b42;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const TypeSelect = styled.select`
  height: 40px;
  padding: 5px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  outline: none;
  color: #333333;
  font-size: 16px;
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #990000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    duration: "",
    price: 0,
  });



  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/${id}`);
        const tourData = response.data;
        setFormData({
          title: tourData.title || "",
          image: tourData.image || "",
          category: tourData.category || "",
          duration: tourData.duration || "",
          price: tourData.price || 0,
        });

      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTour();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.patch(`${BASE_URL}/tours/update/${id}`, {
        title: data.title,
        image: data.image,
        category: data.category,
        duration: data.duration,
        price: data.price,
      });

      navigate("/tours");
    } catch (error) {
      console.error("Error updating tour:", error);
      setError("api", {
        message: "Error updating tour: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Title>Edit Tour</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 2,
                message: "Title must be between 2 and 50 characters long.",
              },
              maxLength: {
                value: 50,
                message: "Title must be between 2 and 50 characters long.",
              },
            })}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormField>
        {/*
        <FormField>
          <Label>Image URL</Label>
          <Input
            type="text"
            id="image"
            value={data.image}
            onChange={handleChange}
            {...register("image", {
              required: "Image URL is required.",
            })}
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Type</Label>
          <TypeSelect
            name="category"
            value={data.category}
            onChange={handleChange}
            {...register("category")}
          >
            <option value="group">Group</option>
            <option value="individual">Individual</option>
          </TypeSelect>
        </FormField>
        <FormField>
          <Label>Duration</Label>
          <Input
            name="duration"
            type="text"
            value={data.duration}
            onChange={handleChange}
            {...register("duration", {
              required: "Duration is required.",
            })}
          />
          {errors.duration && (
            <ErrorMessage>{errors.duration.message}</ErrorMessage>
          )}
        </FormField>
        <FormField>
          <Label>Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={data.price}
            onChange={handleChange}
            {...register("price", {
              required: "Price is required.",
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value > 0 || "Price must be a positive number.",
              },
            })}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormField> */}

        {errors.api && <ErrorMessage>{errors.api.message}</ErrorMessage>}
        {loading ? (
          <LoadingContainer>
            <SyncLoader size={8} color={"#ffffff"} />
          </LoadingContainer>
        ) : (
          <Button type="submit" disabled={loading}>
            Update
          </Button>
        )}
      </StyledForm>
    </Container>
  );
};

export default EditTour;
