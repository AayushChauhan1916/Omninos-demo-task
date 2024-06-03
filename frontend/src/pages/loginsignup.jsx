import { useState } from "react";
import "./css/loginsignup.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url =
        state === "Login"
          ? "http://localhost:8080/api/login"
          : "http://localhost:8080/api/signup";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(
          state === "Login" ? "Login Successfully" : "Welcome To Shopify"
        );
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } else {
        toast.error(responseData.error);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "SignUp" : "Login");
  };

  return (
    <div>
      {/* {isSubmitting && toast.info("loading.....")} */}
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="loginsignup-fields">
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <span className="red">Username is required</span>
              )}
              {state === "SignUp" && (
                <>
                  <input
                    {...register("email", {
                      required: "email required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "valid email required",
                      },
                    })}
                    type="email"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="red">{errors.email.message}</p>
                  )}
                </>
              )}
              <input
                {...register("password", {
                  required: "password required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters\n`,
                  },
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="red">{errors.password.message}</span>
              )}
            </div>
            <button disabled={isSubmitting} type="submit">
              Continue
            </button>
          </form>
          <p className="loginsignup-login">
            {state === "Login"
              ? "Create an account? "
              : "Already have an account? "}
            <span className="Login" onClick={toggleState}>
              {state === "Login" ? "Click Here" : "Login Here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
