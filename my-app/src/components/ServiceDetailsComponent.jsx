import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

const ServiceDetailsComponent = () => {
    const { serviceId, type } = useParams();
    const [service, setService] = useState(null);
    
    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(`/api/${type}-services/${type}-service/${serviceId}`);
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service details', error);
            }
        };
        
        fetchServiceDetails();
    }, [serviceId, type]);
    
    if (!service) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="container mt-4">
            <h2>{service.serviceName}</h2>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>Benefits:</strong> {service.benefits}</p>
            <p><strong>Criteria:</strong> {service.criteria}</p>
            <p><strong>Monthly Cost:</strong> ${service.monthlyCost}</p>
            <Link to="/home" className="btn btn-primary">Back to Home</Link>
        </div>
    );
};

export default ServiceDetailsComponent;
