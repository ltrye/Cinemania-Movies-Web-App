"use client";

import { saveTolist } from "@/api/saveToList";
import { BsBookmark } from "react-icons/bs";

export function SaveButton({ id }) {
    return (
      <button onClick={() => saveTolist(id)} className="bookmark-button">
        <BsBookmark
          style={{ height: "1.5rem", width: "1.5rem", color: "white" }}
        />
        Luu xem sau
      </button>
    );
  }