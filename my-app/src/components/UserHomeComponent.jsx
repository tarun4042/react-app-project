import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../userHome.css';

const UserHomeComponent = () => {
    const [internetServices, setInternetServices] = useState([]);
    const [tvServices, setTvServices] = useState([]);
    const [subscribedServices, setSubscribedServices] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching services
                const internetResponse = await axios.get('/api/internet-services/');
                const tvResponse = await axios.get('/api/tv-services/');
                
                // Fetching subscribed services
                const subscribedResponse = await axios.get(`/api/subscribed-service/${userId}`);
                
                setInternetServices(internetResponse.data);
                setTvServices(tvResponse.data);
                setSubscribedServices(subscribedResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        if (userId) { // Only fetch data if userId is present
            fetchData();
        }
    }, [userId]);

    const filterServices = (services) => {
        return services.filter(service => !subscribedServices.includes(service.id));
    };

    return (
        <div className="container mt-4">
            <div className="profile-card-container">
                <div className="card profile-card">
                    <div className="card-body">
                        <h5 className="card-title">User Profile</h5>
                        <p className="card-text">User Name</p>
                        <Link to={`/profile/${userId}`} className="btn btn-primary">View Profile</Link>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h3>Available Internet Services</h3>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Description</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterServices(internetServices).map(service => (
                                    <tr key={service.serviceId}>
                                        <td>{service.serviceName}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <Link to={`/api/internet-services/${service.serviceId}`} className="btn btn-info btn-sm">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-4">
                        <h3>Available TV Services</h3>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Description</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterServices(tvServices).map(service => (
                                    <tr key={service.serviceId}>
                                        <td>{service.serviceName}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <Link to={`/api/tv-services/${service.serviceId}`} className="btn btn-info btn-sm">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHomeComponent;
