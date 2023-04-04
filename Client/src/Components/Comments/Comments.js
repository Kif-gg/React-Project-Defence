import { useEffect, useState } from "react";
import CommentCard from "./CommentCard/CommentCard";

export default function Comments({ reviews }) {

    const [revs, setRevs] = useState([]);

    useEffect(() => {
        if (!!reviews) {
            setRevs(reviews)
        }
    }, [reviews]);

    return (
        <div className="comments">
            <form action="" method="">
                <h3>Rate product</h3>
                <div className="radio-stars">
                    <input type="radio" name="rate" id="5" defaultValue="5" />
                    <label htmlFor="5">
                        <i className="fa-solid fa-star"></i>
                    </label>
                    <input type="radio" name="rate" id="4" defaultValue="4" />
                    <label htmlFor="4">
                        <i className="fa-solid fa-star"></i>
                    </label>
                    <input type="radio" name="rate" id="3" defaultValue="3" />
                    <label htmlFor="3">
                        <i className="fa-solid fa-star"></i>
                    </label>
                    <input type="radio" name="rate" id="2" defaultValue="2" />
                    <label htmlFor="2">
                        <i className="fa-solid fa-star"></i>
                    </label>
                    <input type="radio" name="rate" id="1" defaultValue="1" />
                    <label htmlFor="1">
                        <i className="fa-solid fa-star"></i>
                    </label>
                </div>
                <br />
                <label htmlFor="comment-text">
                    <h3>Add your comment</h3>
                    <textarea name="comment-text" id="comment-text" rows="10" minLength="5" maxLength="800"></textarea>
                </label>
                <input type="submit" value="Publish review" />
            </form>
            <hr />
            <h2>Comments</h2>
            {/* IF COMMENTS */}
            {revs.map(rev => <CommentCard review={rev} key={rev._id} />)}
            {/* IF EMPTY: add something */}
            {revs.length === 0 && (
                <h3>There are no comments yet!</h3>
            )}
        </div>
    );
};