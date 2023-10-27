import React from 'react'

const ShopReviewPane = () => {
  return (
    <div className="product-review p-0">
        <div className="review-head">
            <h4 className="customer-review-title">
            Customer Reviews
            </h4>

            <div className="user-review">
            <div className="review-list">
                <div className="col-md-8">
                <div className="comment-section">
                    <div className="comment-area">
                    <div className="single-comment mb-5">
                        <div className="commenter-img">
                        <img src="/img/customer/3.png" alt="" />
                        </div>
                        <div className="comment">
                        <h4 className="commenter-name">
                            Eunice J. Roller
                        </h4>
                        <div className="date-reply">
                            <p className="comment-date">
                            Jan 1, 2023
                            </p>
                            <a href="" className="reply-btn">
                            Reply
                            </a>
                        </div>
                        <p className="comment-content">
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna
                            aliqua. Quis ipsum suspendisse ultrices
                            gravida. Risus commodo viverra maecenas
                        </p>
                        </div>
                    </div>

                    <div className="single-comment my-5 reply-comment">
                        <div className="commenter-img">
                        <img src="/img/customer/4.png" alt="" />
                        </div>
                        <div className="comment">
                        <h4 className="commenter-name">
                            Bryan L. Parker
                        </h4>
                        <div className="date-reply">
                            <p className="comment-date">
                            March 1, 2023
                            </p>
                            <a href="" className="reply-btn">
                            Reply
                            </a>
                        </div>
                        <p className="comment-content">
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna
                            aliqua. Quis ipsum suspendisse ultrices
                            gravida. Risus commodo viverra maecenas
                            accumsan lacus vel facilisis.{" "}
                        </p>
                        </div>
                    </div>
                    <div className="single-comment my-5">
                        <div className="commenter-img">
                        <img src="/img/customer/5.png" alt="" />
                        </div>
                        <div className="comment">
                        <h4 className="commenter-name">
                            Paul E. Johnson
                        </h4>
                        <div className="date-reply">
                            <p className="comment-date">
                            May 1, 2023
                            </p>
                            <a href="" className="reply-btn">
                            Reply
                            </a>
                        </div>
                        <p className="comment-content">
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna
                            aliqua. Quis ipsum suspendisse ultrices
                            gravida. Risus commodo viverra maecenas
                            accumsan lacus vel facilisis.{" "}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="comment-form">
                    <h3 className="comment-form-title">
                    Leave A Comment
                    </h3>
                    <div className="form">
                    <form action="#">
                        <div className="row">
                        <div className="col-sm-6 mb-30">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            />
                        </div>
                        <div className="col-sm-6 mb-30">
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            />
                        </div>
                        <div className="col-md-12 mb-30">
                            <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            rows={5}
                            placeholder="Message"
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <button
                            type="submit"
                            id="alert"
                            className="custom-btn"
                            >
                            Submit Comment
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShopReviewPane