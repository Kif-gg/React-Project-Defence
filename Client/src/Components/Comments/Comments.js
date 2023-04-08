import { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard/CommentCard";
import { createReview, deleteReview, updateReview } from "../../Services/commentService";

import { AuthContext } from "../../Contexts/AuthContext";


export default function Comments({ reviews, setProduct }) {

    const { userId } = useContext(AuthContext);

    const [revs, setRevs] = useState([]);

    const reviewChecker = revs.map(rev => rev.userId).includes(userId);

    const [didPostReview, setDidPostReview] = useState(reviewChecker);

    useEffect(() => {
        if (!!reviews) {
            setRevs(reviews);
            setDidPostReview(reviewChecker)
        }
    }, [reviews, reviewChecker]);

    const [editMode, setEditMode] = useState(false);

    const [reviewValues, setReviewValues] = useState({
        rating: '',
        comment: ''
    });

    const onReviewValuesChange = (e) => {
        setReviewValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        createReview(reviewValues).then(result => {
            if (!!result && !!reviews) {
                setRevs(result.reviews || []);
                setProduct(result);
            }
        }).catch(err => alert(err.message));

        setReviewValues({
            rating: '',
            comment: ''
        });
    };

    const cancelEdit = () => {
        setEditMode(false);
    };

    const onEditReview = () => {
        const { rating, comment } = { ...revs.find(rev => rev.userId === userId) };
        setReviewValues({
            rating: rating.toString(),
            comment
        });
        setEditMode(true);
    };

    const onEditedSubmit = (e) => {
        e.preventDefault();

        if (window.confirm('Are you sure you want to update your review?')) {
            updateReview(reviewValues).then(result => {
                if (!!result) {
                    setRevs(result.reviews);
                    setProduct(result);
                }
            }).catch(err => alert(err.message));
            setEditMode(false);
        }
    };

    const onDeleteReview = () => {
        if (window.confirm('Are you sure you want to delete your review?')) {
            deleteReview().then(result => {
                if (!!result) {
                    setRevs(result.reviews);
                    setProduct(result);
                }
            }).catch(err => alert(err.message));
            setReviewValues({
                rating: '',
                comment: ''
            });
        }
    };

    return (
        <div className="comments">
            {!!userId && (

                (!didPostReview && (
                    <form method="POST" onSubmit={onFormSubmit}>
                        <h3>Rate product</h3>
                        <div className="radio-stars">
                            <input type="radio" name="rating" id="5" value="5" onChange={onReviewValuesChange} checked={reviewValues.rating === '5'} />
                            <label htmlFor="5">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="4" value="4" onChange={onReviewValuesChange} checked={reviewValues.rating === '4'} />
                            <label htmlFor="4">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="3" value="3" onChange={onReviewValuesChange} checked={reviewValues.rating === '3'} />
                            <label htmlFor="3">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="2" value="2" onChange={onReviewValuesChange} checked={reviewValues.rating === '2'} />
                            <label htmlFor="2">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="1" value="1" onChange={onReviewValuesChange} checked={reviewValues.rating === '1'} />
                            <label htmlFor="1">
                                <i className="fa-solid fa-star"></i>
                            </label>
                        </div>
                        <br />
                        <label htmlFor="comment">
                            <h3>Add your comment</h3>
                            <textarea name="comment" id="comment" rows="10" minLength="5" maxLength="800" value={reviewValues.comment} onChange={onReviewValuesChange}></textarea>
                        </label>
                        <input type="submit" value="Publish review" />
                    </form>
                )) ||
                (editMode && (
                    <form method="POST" onSubmit={onEditedSubmit}>
                        <h3>Rate product</h3>
                        <div className="radio-stars">
                            <input type="radio" name="rating" id="5" value="5" onChange={onReviewValuesChange} checked={reviewValues.rating === '5'} />
                            <label htmlFor="5">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="4" value="4" onChange={onReviewValuesChange} checked={reviewValues.rating === '4'} />
                            <label htmlFor="4">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="3" value="3" onChange={onReviewValuesChange} checked={reviewValues.rating === '3'} />
                            <label htmlFor="3">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="2" value="2" onChange={onReviewValuesChange} checked={reviewValues.rating === '2'} />
                            <label htmlFor="2">
                                <i className="fa-solid fa-star"></i>
                            </label>
                            <input type="radio" name="rating" id="1" value="1" onChange={onReviewValuesChange} checked={reviewValues.rating === '1'} />
                            <label htmlFor="1">
                                <i className="fa-solid fa-star"></i>
                            </label>
                        </div>
                        <br />
                        <label htmlFor="comment">
                            <h3>Add your comment</h3>
                            <textarea name="comment" id="comment" rows="10" minLength="5" maxLength="800" value={reviewValues.comment} onChange={onReviewValuesChange}></textarea>
                        </label>
                        <input type="submit" value="Edit review" />
                        <br />
                        <button type="button" className="cancel" onClick={cancelEdit}>Cancel</button>
                    </form>
                ))
            )}

            <hr />
            <h2>Comments</h2>
            {/* IF COMMENTS */}
            {!!reviews && (
                revs.length >= 1 && (
                    revs.map(rev => <CommentCard review={rev} key={rev._id} onEditReview={onEditReview} onDeleteReview={onDeleteReview} owner={rev.userId === userId} />)
                )
            )}
            {/* IF EMPTY: add something */}
            {!!reviews && (
                revs.length === 0 && (
                    <h3>There are no comments yet!</h3>
                )
            )}
        </div>
    );
};