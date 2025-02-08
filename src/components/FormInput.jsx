import PropTypes from "prop-types";

export default function FormInput({
  register,
  errors,
  id,
  labelText,
  type,
  rules,
}) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className={`form-control ${errors[id] && "is-invalid"}`}
        id={id}
        placeholder={`請輸入${labelText}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors?.[id]?.message}</div>
      )}
    </>
  );
}
FormInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  rules: PropTypes.object,
};