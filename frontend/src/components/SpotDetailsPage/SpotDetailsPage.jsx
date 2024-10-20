import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getSpotById, getReviewsBySpotId } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import CreateReviewFormModal from "../CreateReviewFormModal/CreateReviewFormModal";
import { MdStarRate } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import './SpotDetails.css';
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

const SpotDetailsPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(true);
    const { spotId } = useParams();
    const spotDetails = useSelector(state => state.spot);
    const currUser = useSelector((state) => state.session.user);
    const review = useSelector((state) => state.review);

    useEffect(() => {
        Promise.all([
            dispatch(getSpotById(spotId)),
            dispatch(getReviewsBySpotId(spotId))
        ])
            .then(() => setisLoading(false))
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setisLoading(false);
            });
    }, [dispatch, spotId]);

    const handleClick = () => {
        alert('Feature Coming Soon...');
    }

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="spot-details-container">
                    <h2>{spotDetails.name}</h2>
                    <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
                    {spotDetails.SpotImages.length ? (
                        <div className="spot-images-container">
                            <div className="preview-image">
                                <img src={spotDetails.SpotImages.find(image => image.preview).url} alt="preview" />
                            </div>
                            <div className="smaller-images">
                                {spotDetails.SpotImages.slice(1, 5).map((image, idx) => (
                                    <img key={idx} src={image.url} alt={`Spot Image ${idx}`} className="spot-images" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>No Images Yet</div>
                    )}
                    <div className="description-price-container">
                        <div className="description-container">
                            <h3>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h3>
                            <p id="description">{spotDetails.description}</p>
                        </div>
                        <div className="price-container">
                            <div className="price-details">
                                <h3>${spotDetails.price} night</h3>
                                {spotDetails.Reviews.length ? (
                                    <div>
                                        <MdStarRate />
                                        {spotDetails.avgRating ? spotDetails.avgRating.toFixed(2) : spotDetails.avgRating}
                                        <LuDot />
                                        {spotDetails.numReviews} {spotDetails.numReviews > 1 ? 'reviews' : 'review'}
                                    </div>
                                ) : (
                                    <div><MdStarRate /> New</div>
                                )}
                            </div>
                            <button id="reserve-button" onClick={handleClick}>Reserve</button>
                        </div>
                    </div>
                    <hr />
                    <div className="reviews-outer-container">
                        {spotDetails.Reviews.length ? (
                            <h3><MdStarRate /> {spotDetails.avgRating ? spotDetails.avgRating.toFixed(2) : spotDetails.avgRating} <LuDot /> {spotDetails.numReviews} reviews</h3>
                        ) : (
                            <h3><MdStarRate /> New</h3>
                        )}
                        <div className="reviews-inner-container">
                            {currUser && spotDetails.ownerId !== currUser.id &&
                                !(spotDetails.Reviews.find(review => review.userId === currUser.id)) && !spotDetails.Reviews.length ? (
                                <div>
                                    <OpenModalButton
                                        buttonText="Post Your Review"
                                        buttonClassName="review-button"
                                        modalComponent={<CreateReviewFormModal />}
                                    />
                                    <div style={{ marginTop: '15px' }}>Be the first to post a review!</div>
                                </div>
                            ) : null}
                            {spotDetails.Reviews.length > 0 && (
                                <div className="reviews-list">
                                    {spotDetails.Reviews.map(review => (
                                        <div key={review.id} className="single-review">
                                            <div className="reviewer-name">{review.User.firstName}</div>
                                            <div className="review-date">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                                            <div className="review-text">{review.review}</div>
                                            {currUser && currUser.id === review.userId ? (
                                                <OpenModalButton
                                                    buttonText="Delete"
                                                    buttonClassName="delete-review-modal-button"
                                                    reviewId={review.id}
                                                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SpotDetailsPage;
