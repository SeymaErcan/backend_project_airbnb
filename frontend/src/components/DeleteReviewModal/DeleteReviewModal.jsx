import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import './DeleteReview.css';
import { deleteReview } from "../../store/review";
import { useState } from "react";

const DeleteReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { id: currSpotId } = useSelector((state) => state.spot);
    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleClickDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await dispatch(deleteReview(reviewId, currSpotId));
            closeModal();
        } catch (err) {
            console.error("Failed to delete the review:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="review-form-container" role="dialog" aria-labelledby="heading" aria-describedby="delete-confirmation">
            <h1 id="heading">Confirm to Delete</h1>
            <div id="delete-confirmation">Do you want to delete the review?</div>
            <button onClick={handleClickDelete} className="delete-review-button" disabled={isLoading}>
                {isLoading ? "Deleting..." : "Yes"}
            </button>
            <button onClick={closeModal} className="keep-review-button" disabled={isLoading}>No</button>
        </div>
    );
};

export default DeleteReviewModal;
