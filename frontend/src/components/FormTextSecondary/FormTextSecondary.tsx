export default function FormTextSecondary({
  text,
  linkText,
  link,
  textAlign = "text-center",
}: {
  text?: string;
  linkText?: string;
  link: string;
  textAlign?: string;
}) {
  return (
    <p className={"text-white mb-4 " + textAlign}>
      <span className={"opacity-75"}>{text} </span>
      {linkText && (
        <a
          className={
            "text-white fw-bold link-offset-3  text-decoration-underline link-underline-light opacity-75 opacity-100-hover "
          }
          href={link}
        >
          {linkText}
        </a>
      )}
    </p>
  );
}
