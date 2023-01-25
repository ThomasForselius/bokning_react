import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from '../../Components/Avatar'

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
        <>
            <Row>
                { is_owner && (
                    <Col sm={6} className="text-center py-2 p-2 p-lg-2">
                            <p>Owner</p>
                    </Col>
                )}
            </Row>
            <Row>
            <Col className="py-2 p-2 p-lg-2" lg={12}>
                <Container className={appStyles.Content}>
                {hasLoaded ? (
                    <Row noGutters className="px-3 text-center">
                    <Col lg={3} className="text-lg-left p-3">
                    <Avatar src={profileData.image} height={70}></Avatar>
                    </Col>
                    <Col lg={6}>
                        <h3 className="m-2">{profileData.owner}</h3>
                    </Col>
                </Row>
                ) : (
                    <p>spinner</p>
                )}
                </Container>
            </Col>
            </Row>
        </>
    );
    }

export default Profile;