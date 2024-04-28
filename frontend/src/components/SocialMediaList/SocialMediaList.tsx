import "./SocialMediaList.css";
export default function SocialMediaList() {
  return (
    <ul className="d-flex justify-content-evenly list-unstyled w-100">
      <li>
        <a href="" target="_blank">
          <i className="bi bi-twitter-x fs-2 social-link social-x"></i>
        </a>
      </li>
      <li>
        <a href="https://github.com/miluski/Checkers" target="_blank">
          <i className="bi bi-github fs-2 social-link social-github"></i>
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <i className="bi bi-instagram fs-2 social-link"></i>
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <i className="bi bi-facebook fs-2 social-link"></i>
        </a>
      </li>
    </ul>
  );
}
