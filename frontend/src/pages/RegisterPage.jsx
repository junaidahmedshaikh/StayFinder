import { ErrorMessage, Field, Form, Formik } from "formik";
import { Check, Eye, EyeOff, Lock, Mail, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { logoIcon } from "../../constant";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  };
  console.log(initialValues)
  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;

    return {
      score: strength,
      checks,
      label: strength < 2 ? "Weak" : strength < 4 ? "Medium" : "Strong",
      color: strength < 2 ? "red" : strength < 4 ? "yellow" : "green",
    };
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // In a real app, you would make an API call here
      console.log("Form values:", values);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const baseClasses =
    "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rausch focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const handleSocialSignup = (provider) => {
    // In a real app, this would initiate OAuth flow
    alert(`${provider} signup would be implemented here`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <Link to="/" className="flex items-center justify-center group">
                <div className="w-10 h-10 bg-transparent rounded-2xl flex items-center justify-center  group-hover:shadow-rausch-25 transition-all duration-300">
                  {/* <Sparkles className="text-white w-5 h-5" /> */}
                  <img
                    className="w-full h-full"
                    src={logoIcon}
                    style={{
                      filter: "contrast(100%)",
                      mixBlendMode: "multiply",
                    }}
                    alt=""
                  />
                </div>
                <span className="text-2xl font-bold gradient-text font-sans">
                  Stayfinder
                </span>
              </Link>
              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-gray-600">
                Join thousands of travelers worldwide
              </p>
            </div>

            <Card className="p-8">
              <Form className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <div className="relative">
                      <User className="absolute !mt-2 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Field
                        name="firstName"
                        type="text"
                        className={`${baseClasses} !pl-10`}
                        placeholder="First name"
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className={`${baseClasses} !pl-10`}
                      placeholder="Last name"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute !mt-2 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Field
                      name="email"
                      type="email"
                      className={`${baseClasses} !pl-10`}
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute !mt-2 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`${baseClasses} !pl-10 pr-10`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute !mt-2 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                  {/* Password Strength Indicator */}
                  {values.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              getPasswordStrength(values.password).color === "red"
                                ? "bg-red-500"
                                : getPasswordStrength(values.password).color === "yellow"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${(getPasswordStrength(values.password).score / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            getPasswordStrength(values.password).color === "red"
                              ? "text-red-600"
                              : getPasswordStrength(values.password).color === "yellow"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {getPasswordStrength(values.password).label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          {getPasswordStrength(values.password).checks.length ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              getPasswordStrength(values.password).checks.length
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            8+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getPasswordStrength(values.password).checks.uppercase ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              getPasswordStrength(values.password).checks.uppercase
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Uppercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getPasswordStrength(values.password).checks.lowercase ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              getPasswordStrength(values.password).checks.lowercase
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Lowercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getPasswordStrength(values.password).checks.number ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              getPasswordStrength(values.password).checks.number
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Number
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute !mt-2 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${baseClasses} !pl-10 pr-10`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute !mt-2 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Terms and Newsletter */}
                <div className="!space-y-3 !mt-2">
                  <label className="flex items-center">
                    <Field
                      type="checkbox"
                      name="agreeToTerms"
                      className="mt-1 rounded border-gray-300 text-Rausch focus:ring-rausch"
                    />
                    <span className="!ml-2 text-sm text-gray-600">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-rausch hover:text-rausch-600 font-medium"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-rausch hover:text-rausch-600 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  <ErrorMessage name="agreeToTerms" component="p" className="text-sm text-red-600" />

                  <label className="flex items-center">
                    <Field
                      type="checkbox"
                      name="subscribeNewsletter"
                      className="mt-1 rounded border-gray-300 text-rausch focus:ring-rausch"
                    />
                    <span className="!ml-2 text-sm text-gray-600">
                      Send me travel tips, deals, and updates (optional)
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </Form>

              {/* Divider */}
              <div className="!mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Signup */}
              <div className="!mt-6 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignup("Google")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialSignup("Facebook")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </Button>
              </div>

              {/* Sign in link */}
              <div className="!mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-rausch hover:text-rausch-600"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
