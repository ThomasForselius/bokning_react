import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from '../../Components/Avatar'
import { ProfileDropdown } from "../../Components/ProfileDropDown";
import loader from '../../assets/loading.gif'

function Profile() {
    
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const {id} = useParams();
    const [profileData, setProfileData] = useState();
    const is_owner = currentUser?.username === profileData?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const {data} = await axiosReq.get(`/profiles/${id}/`)
                setProfileData(data)
                setHasLoaded(true);
            }catch(error){
                console.log(error)
            }
        };
        fetchData();
    }, [id])

    return (
        <Container>
            <Row>
            <Col className="py-2 p-2 p-lg-2" lg={12}>
                <Container className={appStyles.Content}>
                {hasLoaded ? (
                    <Row noGutters className="px-3 text-center">
                        {is_owner && <ProfileDropdown id={profileData?.id} /> }
                        <Col lg={3} className="text-lg-left p-3">
                        <Avatar src={profileData.image} height={70}></Avatar>
                        </Col>
                        <Col lg={6}>
                            <h2 className="m-2">{profileData.owner}</h2>
                        </Col>
                        <Col sm={12}>
                            <h4>Bio:</h4>
                            <p>{profileData.bio}</p>
                        </Col>
                    </Row>
                ) : (
                    <img src={loader} className="d-flex m-auto" alt="Loading"></img>
                )}
                </Container>
            </Col>
            </Row>
        </Container>
    );
    }

export default Profile;