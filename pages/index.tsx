import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, array, InferType, TypeOf } from "yup";
import styles from "../styles/Home.module.css";

enum Gender {
  male = "Male",
  female = "Female",
  nunya = "Nun ya business",
}

enum Vehicles {
  car = "Car",
  bike = "Bike",
  boat = "Boat",
  tractor = "Tractor",
}

const schema = object({
  name: string().required("Name is required"),
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  age: number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(13, "The minimum is 13"),
  gender: string()
    .required("Must provide a gender")
    .oneOf(Object.values(Gender)),
  vehicle: array()
    .of(string().oneOf(Object.values(Vehicles)))
    .nullable(),
});

function onSubmit(values: Props) {
  return axios.post("/api/register", values);
}

type Props = InferType<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <label
        className={`${styles.label} ${styles.flex} ${styles.column}`}
        htmlFor="name"
      >
        <span>Name</span>
        <input placeholder="Jane Doe" id="name" {...register("name")} />
      </label>
      <span className={styles.error}>{errors?.name?.message}</span>
      <label
        className={`${styles.label} ${styles.flex} ${styles.column}`}
        htmlFor="email"
      >
        <span>Email address</span>
        <input
          placeholder="j.doe@example.com"
          id="email"
          type="email"
          {...register("email")}
        />
      </label>

      <span className={styles.error}>{errors?.email?.message}</span>

      <label
        className={`${styles.label} ${styles.flex} ${styles.column}`}
        htmlFor="age"
      >
        <span>Age</span>
        <input placeholder="69" type="number" {...register("age")} />
      </label>
      <span className={styles.error}>{errors?.age?.message}</span>

      <label
        className={`${styles.label} ${styles.flex} ${styles.column}`}
        htmlFor="gender"
      >
        <span>Gender</span>
        <select {...register("gender")}>
          {Object.values(Gender).map((gender) => {
            return (
              <option key={gender} value={gender}>
                {gender}
              </option>
            );
          })}
        </select>
      </label>
      <span className={styles.error}>{errors?.gender?.message}</span>

      <label>What type of vehicle do you own?</label>
      {Object.values(Vehicles).map((vehicle) => {
        return (
          <label
            key={vehicle}
            className={`${styles.label} ${styles.flex} ${styles.row}`}
            htmlFor={vehicle}
          >
            <input
              value={vehicle}
              type="checkbox"
              id={vehicle}
              {...register("vehicle")}
            />
            <span>{vehicle}</span>
          </label>
        );
      })}

      <label
        className={`${styles.label} ${styles.flex} ${styles.row}`}
        htmlFor="Dodgem car"
      >
        <input
          value="Dodgem car"
          type="checkbox"
          id="Dodgem car"
          {...register("vehicle")}
        />
        <span>Dodgem car</span>
      </label>
      <span className={styles.error}>{JSON.stringify(errors.vehicle)}</span>
      <button className={styles.cta} type="submit">
        REGISTER ACCOUNT
      </button>
    </form>
  );
}
