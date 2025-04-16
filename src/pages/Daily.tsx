
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Daily = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/practice");
  }, [navigate]);

  return null;
};

export default Daily;
