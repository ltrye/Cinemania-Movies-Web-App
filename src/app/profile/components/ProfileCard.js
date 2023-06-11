import Link from "next/link";
export default function ProfileCard({ data }) {
  const expire = new Date(data.premiumExpires);
  return (
    <>
      <div className="profile-info-card">
        <div className="profile-card-title">
          <div>
            Cinemania - <span>{data.premium ? "Gold" : "Silver"}</span>
          </div>
          <span className="profile-premium-status">
            {data.premium
              ? `Expire: ${
                  expire.getDay() +
                  "/" +
                  expire.getMonth() +
                  "/" +
                  expire.getFullYear()
                } `
              : "Non premium"}
          </span>
        </div>
        <div className="profile-personal-info">
          <div>
            <span className="key">Name:</span>
            <span className="data"> {data.name}</span>
          </div>

          <div>
            <span className="key">Email:</span>
            <span className="data"> {data.email}</span>
          </div>
          <Link href="/user/resetPassword">
            <div className="profile-password">Change password</div>
          </Link>
        </div>
      </div>
    </>
  );
}
