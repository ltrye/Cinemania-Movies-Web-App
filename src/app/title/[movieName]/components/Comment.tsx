"use client";
import { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
export default function CommentSection() {
  const comment = useRef<HTMLTableSectionElement>();
  return (
    <>
      <div
        onClick={() => {
          // if (comment.current.style.display === "block") {
          //   return (comment.current.style.display = "none");
          // }
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
        <BiCommentDetail />
        Binh luan
      </div>
      <section
        ref={comment}
        onAnimationEnd={() => {}}
        className="comment-section"
      >
        <div className="user-comment">
          <div className="comment-ava"></div>
          <div className="input-section">
            <textarea
              onInput={(e) => {
                e.currentTarget.style.height = "auto"; // Reset the height to auto
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px"; // Set the height to the scrollHeight
              }}
              rows={2}
              placeholder="Viet binh luan cua ban tai day..."
              className="comment-input"
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
