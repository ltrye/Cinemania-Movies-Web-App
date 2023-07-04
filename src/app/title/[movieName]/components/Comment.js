"use client";
import { useRef } from "react";
import { IoMdSend } from "react-icons/io";
export default function CommentSection() {
  const comment = useRef();
  return (
    <>
      <div
        onClick={() => {
          comment.current.style.display = "block";
          comment.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }}
        className="review-button"
      >
        {" "}
        Binh luan
      </div>
      <section ref={comment} className="comment-section">
        <div className="user-comment">
          <div className="comment-ava"></div>
          <div className="input-section">
            <textarea
              placeholder="Viet binh luan cua ban tai day..."
              className="comment-input"
              type="text"
            ></textarea>

            <button className="submit-comment">
              <IoMdSend style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>
          </div>
        </div>

        <div className="comment-list"></div>
      </section>
    </>
  );
}
