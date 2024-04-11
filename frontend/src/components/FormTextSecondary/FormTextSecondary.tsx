export default function FormTextSecondary({
  text,
  linkText,
  link,
}: {
  text: string;
  linkText?: string;
  link: string;
}) {
  return (
    <p className="text-center text-white mb-4 ">
      <span className="opacity-75">{text} </span>
      {linkText && (
        <a
          className="text-white fw-bold link-offset-3  text-decoration-underline link-underline-light opacity-75 opacity-100-hover "
          href={link}
        >
          {linkText}
        </a>
      )}
    </p>
  );
}
