export default function CommentCard({ review, onEditReview, onDeleteReview, owner }) {

    const createdAt = new Date(review.createdAt);

    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();
    const date = createdAt.getDate();
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let stars = [];

    for (let i = 0; i < review.rating; i++) {
        stars.push(<i className="fa-solid fa-star" key={i}></i>);
    };

    for (let i = 0; i < 5 - review.rating; i++) {
        stars.push(<i className="fa-regular fa-star" key={i + 5}></i>);
    }

    return (
        <div className="comment">
            {/* IF OWNER OF COMMENT */}
            {owner && (
                <div className="edit-delete">
                    <button type="button" className="edit" onClick={onEditReview}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" className="delete" onClick={onDeleteReview}><i className="fa-solid fa-trash"></i></button>
                </div>
            )}
            <h4>@{review.username}</h4>
            <span className="rating">{stars}</span>
            <p>{review.comment}</p>
            <time>Posted: {date} {months[month]} {year} at {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}</time>
        </div>
    );
};