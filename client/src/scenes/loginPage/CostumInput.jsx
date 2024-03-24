import { useField } from "formik";

const CostumInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const errorTouched = meta.touched && meta.error;

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="px-2 py-3 rounded-lg w-full"
        {...field}
        {...props}
        onBlur={null}
        onChange={(e) => {
          helpers.setValue(e.target.value);
          helpers.setTouched(false);
        }}
      />
      {errorTouched && <div className="text-red-500">{meta.error}</div>}
    </div>
  );
};
export default CostumInput;
