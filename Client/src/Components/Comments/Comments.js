import { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard/CommentCard";
import { createReview } from "../../Services/commentService";

import { AuthContext } from "../../Contexts/AuthContext";


export default function Comments({ reviews }) {

    const { userId } = useContext(AuthContext);
    
    const [revs, setRevs] = useState([]);

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
                setRevs(result.reviews);
            }
        });

        setReviewValues({
            rating: '',
            comment: ''
        });
    };

    const onEditReview = (e) => {
        console.log(e);
    };


    useEffect(() => {
        if (!!reviews) {
            setRevs(reviews);
        }
    }, [reviews]);

    return (
        <div className="comments">
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
            <hr />
            <h2>Comments</h2>
            {/* IF COMMENTS */}
            {!!reviews && (
                revs.length >= 1 && (
                    revs.map(rev => <CommentCard review={rev} key={rev._id} onEditReview={onEditReview} owner={rev.userId === userId} />)
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